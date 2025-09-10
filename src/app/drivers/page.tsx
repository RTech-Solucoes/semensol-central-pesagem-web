"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PlusIcon,
  IdentificationCardIcon,
  CameraIcon,
  UploadIcon,
  XIcon,
} from "@phosphor-icons/react";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface Driver {
  id: number;
  nome: string;
  cpf: string;
  cnh: string;
  imagem_path?: string;
}

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cnh: "",
    imagem: null as File | null,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    setLoading(true);
    const response = await apiClient.getMotoristas();
    if (response.error) {
      toast({
        title: "Erro ao carregar motoristas",
        description: response.error?.message,
        variant: "destructive",
      });
    } else if (response.data) {
      const mappedDrivers = response.data.map((motorista) => ({
        id: motorista.id,
        nome: motorista.nome,
        cpf: "",
        cnh: "",
        imagem_path: undefined,
      }));
      setDrivers(mappedDrivers);
    }
    setLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, imagem: e.target.files![0] }));
    }
  };

  const startCamera = async () => {
    try {
      console.log("Solicitando permissão da câmera...");

      const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });

      if (permission.state === 'denied') {
        toast({
          title: "Permissão negada",
          description: "Acesso à câmera foi negado. Verifique as configurações do navegador.",
          variant: "destructive",
        });
        return;
      }

      setIsCameraMode(true);

      console.log("Iniciando câmera...");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 720 },
          height: { ideal: 1280 },
          aspectRatio: { ideal: 9 / 16 },
        },
      });

      console.log("Stream obtido:", mediaStream);
      setStream(mediaStream);

      requestAnimationFrame(() => {
        if (videoRef.current) {
          console.log("Configurando vídeo...");
          videoRef.current.srcObject = mediaStream;

          videoRef.current
            .play()
            .then(() => {
              console.log("Vídeo iniciado com sucesso");
            })
            .catch((err) => {
              console.error("Erro ao reproduzir vídeo:", err);
            });
        } else {
          console.error("videoRef.current não está disponível");
        }
      });
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
      setIsCameraMode(false);

      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          toast({
            title: "Permissão necessária",
            description: "Por favor, permita o acesso à câmera para tirar fotos.",
            variant: "destructive",
          });
        } else if (error.name === 'NotFoundError') {
          toast({
            title: "Câmera não encontrada",
            description: "Nenhuma câmera foi encontrada no dispositivo.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro ao acessar câmera",
            description: `Não foi possível acessar a câmera: ${error.message}`,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Erro ao acessar câmera",
          description: "Não foi possível acessar a câmera. Verifique as permissões.",
          variant: "destructive",
        });
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraMode(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
              setFormData((prev) => ({ ...prev, imagem: file }));
              stopCamera();
            }
          },
          "image/jpeg",
          0.8
        );
      }
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const handleModalClose = () => {
    stopCamera();
    setIsModalOpen(false);
    setFormData({ nome: "", cpf: "", cnh: "", imagem: null });
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open && isCameraMode) {
      return;
    }
    setIsModalOpen(open);
    if (!open) {
      handleModalClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.cpf || !formData.cnh || !formData.imagem) return;

    setLoading(true);
    const form = new FormData();
    form.append("nome", formData.nome);
    form.append("cpf", formData.cpf);
    form.append("cnh", formData.cnh);
    form.append("imagem", formData.imagem);

    const response = await apiClient.cadastrarMotorista(form);

    if (response.error) {
      toast({
        title: "Erro ao cadastrar motorista",
        description: response.error?.message,
        variant: "destructive",
      });
    } else if (response.data) {
      toast({
        title: "Motorista cadastrado",
        description: "Motorista cadastrado com sucesso!",
      });
      setDrivers((prev) => [...prev, response.data]);
      setFormData({ nome: "", cpf: "", cnh: "", imagem: null });
      handleModalClose();
      loadDrivers();
    }
    setLoading(false);
  };

  return (
    <section className="p-4 md:p-6">
      {isCameraMode && (
        <div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <div
            className="relative bg-black flex items-center justify-center"
            style={{
              height: "100vh",
              aspectRatio: "9/16",
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
              controls={false}
              onError={(e) => {
                console.error("Erro no elemento video:", e);
              }}
              onLoadedMetadata={() => {
                console.log("Video metadata carregada");
              }}
              onCanPlay={() => {
                console.log("Video pode reproduzir");
              }}
            />
            <canvas ref={canvasRef} className="hidden"></canvas>

            <button
              onClick={(e) => {
                e.stopPropagation();
                stopCamera();
              }}
              className="absolute top-6 right-6 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
            >
              <XIcon className="h-6 w-6" />
            </button>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  capturePhoto();
                }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all active:scale-95"
              >
                <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-300"></div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold text-white">
          Gerenciamento de Motoristas
        </h1>
        <p className="text-gray-200">
          Cadastre e gerencie os motoristas autorizados
        </p>
      </div>

      <Card className="w-full max-w-none">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <IdentificationCardIcon className="h-5 w-5" />
              Motoristas Cadastrados
            </CardTitle>

            <Dialog
              open={isModalOpen}
              onOpenChange={handleModalOpenChange}
              modal={!isCameraMode}
            >
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Novo Motorista
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Motorista</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      placeholder="Nome do motorista"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, nome: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      placeholder="CPF do motorista"
                      value={formData.cpf}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, cpf: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cnh">CNH</Label>
                    <Input
                      id="cnh"
                      placeholder="CNH do motorista"
                      value={formData.cnh}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, cnh: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="imagem">Foto do Motorista</Label>
                    <div className="flex flex-col gap-y-3">
                      <div className="flex items-center gap-2">
                        <Input
                          id="imagem"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="flex-1"
                        />
                        <UploadIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="text-center">
                        <span className="text-sm text-gray-500">ou</span>
                      </div>
                      <Button
                        type="button"
                        onClick={startCamera}
                        variant="outline"
                        className="w-full"
                      >
                        <CameraIcon className="h-4 w-4 mr-2" />
                        Tirar Foto com a Câmera
                      </Button>
                    </div>
                    {formData.imagem && (
                      <p className="text-sm text-green-600 mt-2">
                        Imagem selecionada: {formData.imagem.name}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleModalClose}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !formData.imagem}
                      className="flex-1"
                    >
                      {loading ? "Cadastrando..." : "Cadastrar"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingSpinner text="Carregando motoristas..." />
          ) : drivers.length === 0 ? (
            <div className="text-center py-12">
              <IdentificationCardIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Nenhum motorista cadastrado</p>
              <p className="text-sm text-gray-400">
                Clique em <strong>Novo Motorista</strong> para começar
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {drivers.map((driver) => (
                <Card key={driver.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center flex flex-col gap-y-3">
                      <div className="flex flex-col items-center text-center gap-y-3">
                        {driver.imagem_path ? (
                          <img
                            src={driver.imagem_path}
                            alt={driver.nome}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <IdentificationCardIcon className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{driver.nome}</h3>
                        {/*<p className="text-sm text-gray-500">CPF: {driver.cpf}</p>*/}
                        {/*<p className="text-sm text-gray-500">CNH: {driver.cnh}</p>*/}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
