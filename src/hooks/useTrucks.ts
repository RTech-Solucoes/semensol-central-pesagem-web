"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export interface Truck {
  id: number;
  placa: string;
  modelo?: string;
  empresa?: string;
}

interface FormData {
  placa: string;
  modelo: string;
  empresa: string;
  imagem: File | null;
}

export function useTrucks() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
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
        description: response.error?.message,
        variant: "destructive",
      });
    } else if (response.data) {
      setTrucks(response.data);
    }
    setLoading(false);
  };

  const cadastrarManual = async (formData: Omit<FormData, "imagem">) => {
    setSubmitLoading(true);
    const response = await apiClient.cadastrarCaminhaoManual(formData);

    if (response.error) {
      toast({
        title: "Erro ao cadastrar veículo",
        description: response.error?.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Veículo cadastrado",
        description: "Veículo cadastrado com sucesso!",
      });
      await loadTrucks();
    }
    setSubmitLoading(false);
  };

  const cadastrarPorImagem = async (formData: FormData) => {
    if (!formData.imagem) return;

    setSubmitLoading(true);
    const form = new FormData();
    form.append("modelo", formData.modelo);
    form.append("empresa", formData.empresa);
    form.append("imagem", formData.imagem);

    const response = await apiClient.cadastrarCaminhaoPorImagem(form);

    if (response.error) {
      toast({
        title: "Erro ao cadastrar veículo por imagem",
        description: response.error?.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Veículo cadastrado",
        description: `Veículo com placa ${response.data?.placa} cadastrado com sucesso!`,
      });
      await loadTrucks();
    }
    setSubmitLoading(false);
  };

  return {
    trucks,
    loading,
    submitLoading,
    cadastrarManual,
    cadastrarPorImagem,
  };
}
