"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlayIcon,
  PlugsConnectedIcon,
  PlugsIcon,
  ClockIcon,
  SquareIcon
} from "@phosphor-icons/react";
import WeightIcon from "@/components/icons/WeightIcon";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api";
import { VideoVerification } from "@/components/weighing/video-verification";
import { useToast } from "@/hooks/use-toast";
import { CicloAberto } from "../types/dashboard";

interface Motorista {
  id: number;
  nome: string;
}

export default function WeighingPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [isWeighing, setIsWeighing] = useState(false);
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [ciclosAbertos, setCiclosAbertos] = useState<CicloAberto[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
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
        description: response.error?.message,
        variant: "destructive",
      });
    } else if (response.data) {
      setMotoristas(response.data);
    }
    
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
        description: response.error?.message,
        variant: "destructive",
      });
    } else if (response.data) {
      setCiclosAbertos(response.data);
    }
    
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
        description: response.error?.message,
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
        description: response.error?.message,
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
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold text-white">
          Central de Pesagem
        </h1>
        <p className="text-gray-200">
          Controle e monitoramento das operações de pesagem em tempo real
        </p>
      </div>

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

        <Card className="flex flex-col w-full max-w-none">
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <WeightIcon className="h-5 w-5" />
              Balança
            </CardTitle>
            <Badge
              variant="secondary"
              className={cn(
                "flex items-center text-xs gap-1",
                isConnected
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              <div
                className={cn(
                  "w-1 h-1 rounded-full",
                  isConnected ? "bg-green-700" : "bg-red-700"
                )}
              />
              {isConnected ? "Conectada" : "Desconectada"}
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col h-full justify-between">
            <div className="flex flex-col justify-center h-full text-center my-auto">
              {!isConnected ? (
                <>
                  <WeightIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Balança desconectada</p>
                </>
              ) : (
                <div className="space-y-4">
                  <p className="text-4xl md:text-6xl lg:text-7xl font-bold">{currentWeight} kg</p>
                  <Input
                    type="number"
                    placeholder="Peso manual"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(Number(e.target.value))}
                    className="text-center text-lg"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <div className="flex flex-row gap-3">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setCurrentWeight(0)}
                >
                  Zerar Peso
                </Button>
                <Button
                  onClick={() => setIsConnected(!isConnected)}
                  variant={isConnected ? "destructive" : "default"}
                  className={cn(
                    !isConnected && "bg-green-700 hover:bg-green-700/90",
                    "flex w-full items-center gap-2"
                  )}
                >
                  {isConnected ? <PlugsIcon className="h-4 w-4" /> : <PlugsConnectedIcon className="h-4 w-4" />}
                  {isConnected ? "Desconectar" : "Conectar Balança"}
                </Button>
              </div>
              <Button
                className="w-full"
                disabled={!isConnected || !formData.placa || !formData.motorista_id || loading}
                onClick={handleRegistrarEntrada}
              >
                {loading ? (
                  <ClockIcon className="h-4 w-4 mr-2" />
                ) : isWeighing ? (
                  <SquareIcon className="h-4 w-4 mr-2" />
                ) : (
                  <PlayIcon className="h-4 w-4 mr-2" />
                )}
                {loading ? "Processando..." : "Registrar Entrada"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}