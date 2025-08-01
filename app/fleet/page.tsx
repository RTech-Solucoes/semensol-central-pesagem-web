"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, TruckIcon, CameraIcon } from "@phosphor-icons/react";
import { apiClient } from "@/lib/api";
import {useToast} from "@/hooks/use-toast";
import {LoadingSpinner} from "@/components/ui/loading-spinner";

interface Truck {
  id: number;
  placa: string;
  modelo?: string;
  empresa?: string;
}

export default function FleetPage() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    placa: "",
    modelo: "",
    empresa: "",
    imagem: null as File | null,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadTrucks();
  }, []);

  const loadTrucks = async () => {
    setLoading(true);
    const response = await apiClient.getCaminhoes();
    if (response.error) {
      toast({
        title: "Erro ao carregar veículos",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      setTrucks(response.data);
    }
    setLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, imagem: e.target.files![0] }));
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.placa || !formData.modelo || !formData.empresa) return;

    setSubmitLoading(true);
    const response = await apiClient.cadastrarCaminhaoManual({
      placa: formData.placa,
      modelo: formData.modelo,
      empresa: formData.empresa,
    });

    if (response.error) {
      toast({
        title: "Erro ao cadastrar veículo",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      toast({
        title: "Veículo cadastrado",
        description: "Veículo cadastrado com sucesso!",
      });
      setFormData({ placa: "", modelo: "", empresa: "", imagem: null });
      setIsModalOpen(false);
      loadTrucks(); // Reload trucks from API
    }
    setSubmitLoading(false);
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.modelo || !formData.empresa || !formData.imagem) return;

    setSubmitLoading(true);
    const form = new FormData();
    form.append("modelo", formData.modelo);
    form.append("empresa", formData.empresa);
    form.append("imagem", formData.imagem);

    const response = await apiClient.cadastrarCaminhaoPorImagem(form);

    if (response.error) {
      toast({
        title: "Erro ao cadastrar veículo por imagem",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      toast({
        title: "Veículo cadastrado",
        description: `Veículo com placa ${response.data.placa} cadastrado com sucesso!`,
      });
      setFormData({ placa: "", modelo: "", empresa: "", imagem: null });
      setIsModalOpen(false);
      loadTrucks(); // Reload trucks from API
    }
    setSubmitLoading(false);
  };

  return (
    <main className="p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold text-white">
          Gerenciamento da Frota
        </h1>
        <p className="text-gray-200">Cadastre e gerencie os veículos da frota</p>
      </div>

      <Card className="w-full max-w-none">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TruckIcon className="h-5 w-5" />
              Veículos Cadastrados
            </CardTitle>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Novo Veículo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Veículo</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="manual" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="manual">Manual</TabsTrigger>
                    <TabsTrigger value="image">Por Imagem</TabsTrigger>
                  </TabsList>

                  <TabsContent value="manual" className="mt-4">
                    <form onSubmit={handleManualSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="placa-manual">Placa</Label>
                        <Input
                          id="placa-manual"
                          placeholder="ABC-1234"
                          value={formData.placa}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              placa: e.target.value.toUpperCase(),
                            }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="modelo-manual">Modelo</Label>
                        <Input
                          id="modelo-manual"
                          placeholder="Modelo do veículo"
                          value={formData.modelo}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, modelo: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="empresa-manual">Empresa</Label>
                        <Input
                          id="empresa-manual"
                          placeholder="Nome da empresa"
                          value={formData.empresa}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, empresa: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsModalOpen(false)}
                          className="flex-1"
                        >
                          Cancelar
                        </Button>
                        <Button type="submit" disabled={submitLoading} className="flex-1">
                          {submitLoading ? "Cadastrando..." : "Cadastrar"}
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="image" className="mt-4">
                    <form onSubmit={handleImageSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="modelo-image">Modelo</Label>
                        <Input
                          id="modelo-image"
                          placeholder="Modelo do veículo"
                          value={formData.modelo}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, modelo: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="empresa-image">Empresa</Label>
                        <Input
                          id="empresa-image"
                          placeholder="Nome da empresa"
                          value={formData.empresa}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, empresa: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="imagem-placa">Foto da Placa</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="imagem-placa"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                            className="flex-1"
                          />
                          <CameraIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        {formData.imagem && (
                          <p className="text-sm text-green-600 mt-1">
                            Imagem selecionada: {formData.imagem.name}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          A placa será reconhecida automaticamente
                        </p>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsModalOpen(false)}
                          className="flex-1"
                        >
                          Cancelar
                        </Button>
                        <Button type="submit" disabled={submitLoading} className="flex-1">
                          {submitLoading ? "Processando..." : "Cadastrar"}
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingSpinner text="Carregando veículos..." />
          ) : trucks.length === 0 ? (
            <div className="text-center py-12">
              <TruckIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Nenhum veículo cadastrado</p>
              <p className="text-sm text-gray-400">
                Clique em <strong>Novo Veículo</strong> para começar
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {trucks.map((truck) => (
                <Card key={truck.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <TruckIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-card-foreground">
                          {truck.placa}
                        </h3>
                        {truck.modelo && (
                          <p className="font-medium text-gray-900">
                            {truck.modelo}
                          </p>
                        )}
                        {truck.empresa && (
                          <p className="text-sm text-gray-500">
                            {truck.empresa}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}