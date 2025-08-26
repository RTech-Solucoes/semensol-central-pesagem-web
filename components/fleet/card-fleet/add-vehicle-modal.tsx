"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";
import { useState } from "react";
import { AddVehicleModalProps, VehicleFormData } from "../types";
import TabsContentImage from "./tabs-content-image";
import TabsContentManual from "./tabs-content-manual";

export function AddVehicleModal({ children, onVehicleAdded }: AddVehicleModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState<VehicleFormData>({
    placa: "",
    modelo: "",
    empresa: "",
    imagem: null,
  });

  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imagem: file }));
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
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
      } else {
        toast({
          title: "Veículo cadastrado",
          description: "Veículo cadastrado com sucesso!",
        });
        setIsModalOpen(false);
        setFormData({ placa: "", modelo: "", empresa: "", imagem: null });
        onVehicleAdded?.();
      }

      if (response.warning) {
        toast({
          title: "Aviso",
          description: response.warning,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao cadastrar veículo",
        variant: "destructive",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imagem) return;

    setSubmitLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("modelo", formData.modelo);
      formDataToSend.append("empresa", formData.empresa);
      formDataToSend.append("imagem", formData.imagem);

      const response = await apiClient.cadastrarCaminhaoPorImagem(formDataToSend);

      if (response.error) {
        toast({
          title: "Erro ao cadastrar veículo",
          description: response.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Veículo cadastrado",
          description: `Veículo cadastrado com sucesso! Placa: ${response.data?.placa}`,
        });
        setIsModalOpen(false);
        setFormData({ placa: "", modelo: "", empresa: "", imagem: null });
        onVehicleAdded?.();
      }

      if (response.warning) {
        toast({
          title: "Aviso",
          description: response.warning,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao cadastrar veículo",
        variant: "destructive",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        {children}
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

          <TabsContentManual
            formData={formData}
            setFormData={setFormData}
            submitLoading={submitLoading}
            setIsModalOpen={setIsModalOpen}
            handleManualSubmit={handleManualSubmit}
          />

          <TabsContentImage
            formData={formData}
            setFormData={setFormData}
            submitLoading={submitLoading}
            setIsModalOpen={setIsModalOpen}
            handleImageSubmit={handleImageSubmit}
            handleImageChange={handleImageChange}
          />
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
