"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@chakra-ui/react";

import {
  IconPlayerPlayFilled
,
  IconPlugConnected,
  IconPlugConnectedX,
  IconClock,
  IconSquareFilled,
} from "@tabler/icons-react";
import { IconWeight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface WeighingCardProps {
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
  currentWeight: number;
  setCurrentWeight: (value: number) => void;
  formData: { placa: string; motorista_id: string };
  loading: boolean;
  verificationComplete: boolean;
  onReloadCiclos: () => void;
}

export function WeighingCard({
  isConnected,
  setIsConnected,
  currentWeight,
  setCurrentWeight,
  formData,
  loading,
  verificationComplete,
  onReloadCiclos
}: WeighingCardProps) {
  const { toast } = useToast();
  const [isWeighing, setIsWeighing] = useState(false);

  const handleRegistrarEntrada = async () => {
    if (!formData.placa || !formData.motorista_id || !currentWeight) return;

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
      setCurrentWeight(0);
      onReloadCiclos();
    }

    if (response.warning) {
      toast({
        title: "Aviso - Entrada",
        description: response.warning,
        variant: "default",
      });
    }
  };

  return (
    <Card className="flex flex-col w-full max-w-none">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <IconWeight className="h-5 w-5" />
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
              <IconWeight className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Balança desconectada</p>
            </>
          ) : (
            <p className="text-4xl md:text-6xl lg:text-7xl font-bold">
              {currentWeight} kg
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <div className="flex flex-row gap-3">
            <Button
              variant="subtle"
              className="w-1/2"
              onClick={() => setCurrentWeight(0)}
            >
              Zerar Peso
            </Button>
            <Button
              onClick={() => setIsConnected(!isConnected)}
              variant="solid"
              className={cn(
                !isConnected && "bg-green-700 hover:bg-green-700/90",
                "flex w-1/2 items-center gap-2"
              )}
              {...(isConnected ? { colorPalette: "error" as any } : {})}
            >
              {isConnected ? (
                <IconPlugConnectedX className="h-4 w-4" />
              ) : (
                <IconPlugConnected className="h-4 w-4" />
              )}
              {isConnected ? "Desconectar" : "Conectar Balança"}
            </Button>
          </div>
          <Button
            className="w-full"
            disabled={!isConnected || !formData.placa || !formData.motorista_id || loading}
            onClick={handleRegistrarEntrada}
          >
            {loading ? (
              <IconClock className="h-4 w-4 mr-2" />
            ) : isWeighing ? (
              <IconSquareFilled className="h-4 w-4 mr-2" />
            ) : (
              <IconPlayerPlayFilled className="h-4 w-4 mr-2" />
            )}
            {loading ? "Processando..." : "Registrar Entrada"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
