"use client";

import {useCallback, useRef, useState} from "react";
import {Button} from "@chakra-ui/react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import Select from "@/components/ui/select";
import {IconCamera, IconCameraRotate, IconCarFilled, IconCircleCheck, IconUserCheck} from "@tabler/icons-react";
import {apiClient} from "@/lib/api";
import {cn} from "@/lib/utils";
import {useToast} from "@/hooks/use-toast";
import {TextField} from "@/components/ui/text-field";

interface Motorista {
  id: number;
  nome: string;
}

interface VideoVerificationProps {
  onDriverVerified: (driverId: number, driverName: string) => void;
  onPlateDetected: (plate: string) => void;
  onVerificationComplete: (success: boolean) => void;
  formData: {
    placa: string;
    motorista_id: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    placa: string;
    motorista_id: string;
    peso: string;
  }>>;
  motoristas: Motorista[];
  verificationComplete: boolean;
  ciclosAbertos: any[];
  isConnected: boolean;
  loading: boolean;
  onRegistrarSaida: (eventoId: number) => void;
}

export function VideoVerification({
  onDriverVerified,
  onPlateDetected,
  onVerificationComplete,
  formData,
  setFormData,
  motoristas,
  verificationComplete: initialVerificationComplete,
  ciclosAbertos: initialCiclosAbertos,
  isConnected,
  loading: initialLoading,
  onRegistrarSaida
}: VideoVerificationProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [verificationState, setVerificationState] = useState<{
    driver: { verified: boolean; name?: string; confidence?: number };
    plate: { detected: boolean; value?: string };
    loading: boolean;
  }>({
    driver: { verified: false },
    plate: { detected: false },
    loading: false
  });
  const [verificationComplete, setVerificationComplete] = useState(initialVerificationComplete);
  const [ciclosAbertos, setCiclosAbertos] = useState<any[]>(initialCiclosAbertos);
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      toast({
        title: "Erro de câmera",
        description: "Não foi possível acessar a câmera. Verifique as permissões.",
        variant: "destructive",
      });
    }
  }, [facingMode, toast]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const captureImage = useCallback((): Promise<Blob | null> => {
    if (!videoRef.current || !canvasRef.current) return Promise.resolve(null);

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (!context) return Promise.resolve(null);

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.8);
    });
  }, []);

  const verifyDriver = useCallback(async () => {
    const imageBlob = await captureImage();
    if (!imageBlob) {
      toast({
        title: "Erro na captura",
        description: "Não foi possível capturar a imagem da câmera.",
        variant: "destructive",
      });
      return;
    }

    setVerificationState(prev => ({ ...prev, loading: true }));

    const formData = new FormData();
    formData.append('imagem_rosto', imageBlob, 'driver.jpg');

    const response = await apiClient.reconhecerMotorista(formData);

    if (response.error) {
      toast({
        title: "Erro na verificação",
        description: response.error?.message,
        variant: "destructive",
      });
      setVerificationState(prev => ({ ...prev, driver: { verified: false }, loading: false }));
    } else if (response.data?.motorista?.id_motorista) {
      const motorista = response.data.motorista;
      const driverData = {
        verified: true,
        name: motorista.nome,
        confidence: motorista.confianca
      };

      setVerificationState(prev => ({ ...prev, driver: driverData, loading: false }));

      if (motorista.id_motorista && motorista.nome) {
        onDriverVerified(motorista.id_motorista, motorista.nome);
        toast({
          title: "Motorista verificado",
          description: `${motorista.nome} identificado com sucesso!`,
        });
      }
    } else {
      toast({
        title: "Motorista não reconhecido",
        description: "Não foi possível identificar o motorista na imagem.",
        variant: "destructive",
      });
      setVerificationState(prev => ({ ...prev, driver: { verified: false }, loading: false }));
    }
  }, [captureImage, onDriverVerified, toast]);

  const detectPlate = useCallback(async () => {
    const imageBlob = await captureImage();
    if (!imageBlob) {
      toast({
        title: "Erro na captura",
        description: "Não foi possível capturar a imagem da câmera.",
        variant: "destructive",
      });
      return;
    }

    setVerificationState(prev => ({ ...prev, loading: true }));

    const formData = new FormData();
    formData.append('imagem_placa', imageBlob, 'plate.jpg');

    const response = await apiClient.reconhecerPlaca(formData);

    if (response.error) {
      toast({
        title: "Erro na detecção de placa",
        description: response.error?.message,
        variant: "destructive",
      });
      setVerificationState(prev => ({ ...prev, plate: { detected: false }, loading: false }));
    } else if (response.data?.placa) {
      const plateData = {
        detected: true,
        value: response.data.placa
      };

      setVerificationState(prev => ({ ...prev, plate: plateData, loading: false }));
      onPlateDetected(response.data.placa);
      toast({
        title: "Placa detectada",
        description: `Placa ${response.data.placa} identificada com sucesso!`,
      });
    } else {
      toast({
        title: "Placa não detectada",
        description: "Não foi possível identificar a placa na imagem.",
        variant: "destructive",
      });
      setVerificationState(prev => ({ ...prev, plate: { detected: false }, loading: false }));
    }
  }, [captureImage, onPlateDetected, toast]);

  const performCompleteVerification = useCallback(async () => {
    const imageBlob = await captureImage();
    if (!imageBlob) {
      toast({
        title: "Erro na captura",
        description: "Não foi possível capturar a imagem da câmera.",
        variant: "destructive",
      });
      return;
    }

    setVerificationState(prev => ({ ...prev, loading: true }));

    const formData = new FormData();
    formData.append('imagem_rosto', imageBlob, 'driver.jpg');
    formData.append('imagem_placa', imageBlob, 'plate.jpg');

    const response = await apiClient.reconhecimentoCompleto(formData);

    if (response.error) {
      toast({
        title: "Erro na verificação completa",
        description: response.error?.message,
        variant: "destructive",
      });
      setVerificationState(prev => ({ ...prev, loading: false }));
    } else if (response.data) {
      const newState = {
        driver: {
          verified: Boolean(response.data.id_motorista),
          name: response.data.nome,
          confidence: response.data.confianca_motorista
        },
        plate: {
          detected: Boolean(response.data.placa_valida),
          value: response.data.placa_reconhecida
        },
        loading: false
      };

      setVerificationState(newState);

      if (response.data.id_motorista && response.data.nome) {
        onDriverVerified(response.data.id_motorista, response.data.nome);
      }

      if (response.data.placa_reconhecida) {
        onPlateDetected(response.data.placa_reconhecida);
      }

      const success = Boolean(response.data.id_motorista) && Boolean(response.data.placa_valida);
      onVerificationComplete(success);

      setVerificationComplete(true);

      if (success) {
        toast({
          title: "Verificação completa",
          description: "Motorista e placa verificados com sucesso!",
        });
      } else {
        toast({
          title: "Verificação parcial",
          description: "Nem todos os elementos foram verificados com sucesso.",
          variant: "destructive",
        });
      }
    }
  }, [captureImage, onDriverVerified, onPlateDetected, onVerificationComplete, toast]);

  const flipCamera = useCallback(async () => {
    if (isStreaming) {
      stopCamera();
      const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
      setFacingMode(newFacingMode);

      setTimeout(async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 640 },
              height: { ideal: 480 },
              facingMode: newFacingMode
            }
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setIsStreaming(true);
          }
        } catch (error) {
          console.error('Erro ao trocar câmera:', error);
          toast({
            title: "Erro ao trocar câmera",
            description: "Não foi possível trocar a câmera. Tente novamente.",
            variant: "destructive",
          });
          setFacingMode(facingMode);
        }
      }, 500);
    }
  }, [isStreaming, facingMode, stopCamera, toast]);

  return (
    <Card className="w-full max-w-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <IconCamera className="h-5 w-5" />
          Verificação e Entrada
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col w-full h-full space-y-4">
          <h3 className="text-md font-medium flex items-center gap-2">
            <IconCamera className="h-4 w-4" />
            Entrada por Vídeo
          </h3>

          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full aspect-video bg-gray-100 rounded-lg object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
            <canvas ref={canvasRef} className="hidden" />

            {isStreaming && (
              <Button
                onClick={flipCamera}
                size="sm"
                variant="subtle"
                className="absolute bottom-2 right-2 w-10 h-10 p-0 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-white/90 backdrop-blur-sm border border-gray-200"
                disabled={verificationState.loading}
                title="Trocar câmera"
              >
                <IconCameraRotate className="h-4 w-4 text-gray-700" />
              </Button>
            )}

            {!isStreaming && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <IconCamera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Câmera desligada</p>
                  <p className="text-xs text-gray-400">Clique em <strong>Iniciar Câmera</strong> para começar</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={isStreaming ? stopCamera : startCamera}
              variant={isStreaming ? "solid" : "solid"}
              className="flex items-center gap-2"
              disabled={verificationState.loading}
              {...(isStreaming ? { colorPalette: "error" as any } : {})}
            >
              <IconCamera className="h-4 w-4" />
              {isStreaming ? "Parar Câmera" : "Iniciar Câmera"}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={verifyDriver}
              disabled={!isStreaming || verificationState.loading}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <IconUserCheck className="h-3 w-3" />
              Verificar Motorista
            </Button>

            <Button
              onClick={detectPlate}
              disabled={!isStreaming || verificationState.loading}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <IconCarFilled className="h-3 w-3" />
              Verificar Placa
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-full h-full space-y-4">
          <h3 className="text-md font-medium flex items-center gap-2">
            <IconUserCheck className="h-4 w-4" />
            Entrada Manual
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              id="placa"
              label="Placa do Veículo"
              placeholder="ABC-1234"
              value={formData.placa}
              onChange={(value) => setFormData(prev => ({ ...prev, placa: value.toUpperCase() }))}
              inputClassName={cn(
                formData.placa && "border-green-500 bg-green-50"
              )}
            />
            <div>
              <Label htmlFor="driver">Motorista</Label>
              <Select
                value={formData.motorista_id}
                onValueChange={(value) => setFormData(prev => ({ ...prev, motorista_id: value as string }))}
                placeholder="Selecione o motorista"
                items={motoristas.map((m) => ({ label: m.nome, value: String(m.id) }))}
                grouped
                groups={[]}
              />
            </div>
          </div>
        </div>

        {(verificationState.driver.verified || verificationState.plate.detected) && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Status da Verificação</h4>
            <div className="space-y-2">
              {verificationState.driver.verified && (
                <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                  <IconUserCheck className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">
                    Motorista: {verificationState.driver.name}
                    {verificationState.driver.confidence && (
                      <span className="text-xs ml-1">({Math.round(verificationState.driver.confidence * 100)}%)</span>
                    )}
                  </span>
                </div>
              )}

              {verificationState.plate.detected && (
                <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                  <IconCarFilled className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">
                    Placa: {verificationState.plate.value}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {verificationComplete && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <IconCircleCheck className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">Verificação realizada com sucesso!</span>
            </div>
          </div>
        )}

        {ciclosAbertos.length > 0 && (
          <div className="space-y-3">
            <Label>Ciclos em Andamento</Label>
            <div className="space-y-2">
              {ciclosAbertos.map((ciclo) => (
                <div key={ciclo.id_pesagem} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{ciclo.placa}</p>
                    <p className="text-sm text-gray-500">{ciclo.motorista}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!isConnected || initialLoading}
                    onClick={() => onRegistrarSaida(ciclo.id_pesagem)}
                  >
                    Registrar Saída
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
