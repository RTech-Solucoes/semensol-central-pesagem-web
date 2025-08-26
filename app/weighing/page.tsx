"use client";

import Header from "@/components/layout/header";
import { VideoVerification } from "@/components/weighing/video-verification";
import WeightScale from "@/components/weighing/weight-scale";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";
import { useEffect, useState } from "react";

interface Motorista {
  id: number;
  nome: string;
}

interface CicloAberto {
  id_pesagem: number;
  placa: string;
  motorista: string;
}

export default function WeighingPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [isWeighing, setIsWeighing] = useState(false);
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [ciclosAbertos, setCiclosAbertos] = useState<CicloAberto[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    placa: "",
    motorista_id: "",
    peso: ""
  });
  const [verificationComplete, setVerificationComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadMotoristas();
    loadCiclosAbertos();
  }, []);

  const loadMotoristas = async () => {
    const response = await apiClient.getMotoristas();
    if (response.error) {
      toast({
        title: "Erro ao carregar motoristas",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      setMotoristas(response.data);
    }

    // Handle warning messages
    if (response.warning) {
      toast({
        title: "Aviso",
        description: response.warning,
        variant: "default",
      });
    }
  };

  const loadCiclosAbertos = async () => {
    const response = await apiClient.getCiclosAbertos();
    if (response.error) {
      toast({
        title: "Erro ao carregar ciclos",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      setCiclosAbertos(response.data);
    }

    // Handle warning messages
    if (response.warning) {
      toast({
        title: "Aviso",
        description: response.warning,
        variant: "default",
      });
    }
  };

  const handleDriverVerified = (driverId: number, driverName: string) => {
    setFormData(prev => ({ ...prev, motorista_id: driverId.toString() }));
  };

  const handlePlateDetected = (plate: string) => {
    setFormData(prev => ({ ...prev, placa: plate }));
  };

  const handleVerificationComplete = (success: boolean) => {
    setVerificationComplete(success);
  };

  const handleRegistrarEntrada = async () => {
    if (!formData.placa || !formData.motorista_id || !currentWeight) return;

    setLoading(true);
    const response = await apiClient.registrarEntrada({
      placa: formData.placa,
      motorista_id: parseInt(formData.motorista_id),
      peso: currentWeight
    });

    if (response.error) {
      toast({
        title: "Erro ao registrar entrada",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      toast({
        title: "Entrada registrada",
        description: "Entrada registrada com sucesso!",
      });
      setFormData({ placa: "", motorista_id: "", peso: "" });
      setCurrentWeight(0);
      setVerificationComplete(false);
      loadCiclosAbertos();
    }

    // Handle warning messages
    if (response.warning) {
      toast({
        title: "Aviso - Entrada",
        description: response.warning,
        variant: "default",
      });
    }

    setLoading(false);
  };

  const handleRegistrarSaida = async (eventoId: number) => {
    if (!currentWeight) return;

    setLoading(true);
    const response = await apiClient.registrarSaida({
      evento_id: eventoId,
      peso: currentWeight
    });

    if (response.error) {
      toast({
        title: "Erro ao registrar saída",
        description: response.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Saída registrada",
        description: "Saída registrada com sucesso!",
      });
      setCurrentWeight(0);
      loadCiclosAbertos();
    }

    // Handle warning messages
    if (response.warning) {
      toast({
        title: "Aviso - Saída",
        description: response.warning,
        variant: "default",
      });
    }

    setLoading(false);
  };

  return (
    <section className="p-4 md:p-6">
      <Header title="Central de Pesagem" subtitle="Controle e monitoramento das operações de pesagem em tempo real" />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <VideoVerification
          onDriverVerified={handleDriverVerified}
          onPlateDetected={handlePlateDetected}
          onVerificationComplete={handleVerificationComplete}
          formData={formData}
          setFormData={setFormData}
          motoristas={motoristas}
          verificationComplete={verificationComplete}
          ciclosAbertos={ciclosAbertos}
          isConnected={isConnected}
          loading={loading}
          onRegistrarSaida={handleRegistrarSaida}
        />

        <WeightScale
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          currentWeight={currentWeight}
          setCurrentWeight={setCurrentWeight}
          formData={formData}
          loading={loading}
          handleRegistrarEntrada={handleRegistrarEntrada}
          isWeighing={isWeighing}
        />
      </div>
    </section>
  );
}