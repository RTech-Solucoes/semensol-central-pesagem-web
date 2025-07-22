"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Weight,
  Truck,
  IdCardLanyard,
  AlertTriangle,
  CheckCircle,
  Play,
  Square,
} from "lucide-react";

export function WeighingCenter() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [isWeighing, setIsWeighing] = useState(false);

  const stats = [
    {
      title: "Peso Atual",
      value: `${currentWeight} kg`,
      icon: Weight,
      color: "brown",
    },
    {
      title: "Em Carregamento",
      value: "0",
      icon: Truck,
      color: "brown",
    },
    {
      title: "Concluídas Hoje",
      value: "0",
      icon: IdCardLanyard,
      color: "brown",
    },
    {
      title: "Status da Balança",
      value: isConnected ? "Conectada" : "Desconectada",
      icon: isConnected ? CheckCircle : AlertTriangle,
      color: isConnected ? "brown" : "brown",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Central de Pesagem
          </h1>
          <p className="text-gray-200 mt-1">
            Controle e monitoramento das operações de pesagem em tempo real
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                    "bg-primary-100"
                  }`}
                >
                  <stat.icon
                    className={`h-6 w-6 ${
                      "text-primary-600"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Weight className="h-5 w-5 text-primary-600" />
                Controle da Balança
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isConnected && (
                <Alert className="mb-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Balança não conectada. Verifique a conexão serial e clique em
                    "Conectar Balança".
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-4 mb-6">
                <Button
                  onClick={() => setIsConnected(!isConnected)}
                  variant={isConnected ? "outline" : "default"}
                  className={
                    isConnected
                      ? "text-primary-600 border-primary-600 hover:bg-primary-50"
                      : ""
                  }
                >
                  <Weight className="h-4 w-4 mr-2" />
                  {isConnected ? "Desconectar" : "Conectar Balança"}
                </Button>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pause" />
                  <Label htmlFor="pause" className="text-sm">
                    Parar Pesagem
                  </Label>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Nova Pesagem - Entrada
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="plate">Caminhão (Placa)</Label>
                      <Input
                        id="plate"
                        placeholder="ABC-1234"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="driver">Motorista</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="joao">João Silva</SelectItem>
                          <SelectItem value="maria">Maria Santos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="company">Empresa</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agro">Agro Brasil Ltda</SelectItem>
                          <SelectItem value="transportes">
                            Transportes Campo
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cargo">Tipo de Carga</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="soja">Soja</SelectItem>
                          <SelectItem value="milho">Milho</SelectItem>
                          <SelectItem value="fertilizante">Fertilizante</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-6"
                    disabled={!isConnected}
                    onClick={() => setIsWeighing(!isWeighing)}
                  >
                    {isWeighing ? (
                      <Square className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Registrar Entrada (0 kg)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
               <Weight className="h-5 w-5 text-primary-600" />
                Ciclos Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Weight className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum ciclo ativo no momento</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}