"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WeightIcon from "@/components/icons/WeightIcon";
import { PlugsIcon, PlugsConnectedIcon, ClockIcon, SquareIcon, PlayIcon } from "@phosphor-icons/react";

type WeightScaleFormData = {
  placa: string;
  motorista_id: string;
  peso: string;
};

interface WeightScaleProps {
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
  currentWeight: number;
  setCurrentWeight: (value: number) => void;
  formData: WeightScaleFormData;
  loading: boolean;
  handleRegistrarEntrada: () => void;
  isWeighing: boolean;
}

export default function WeidhtScale({
  isConnected,
  setIsConnected,
  currentWeight,
  setCurrentWeight,
  formData,
  loading,
  handleRegistrarEntrada,
  isWeighing,
}: WeightScaleProps) {
  return (
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
  )
}