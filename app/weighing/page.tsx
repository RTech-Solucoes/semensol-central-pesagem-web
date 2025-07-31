"use client";

import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {CheckCircleIcon, ClockIcon, PlayIcon, PlugsConnectedIcon, ScalesIcon, SquareIcon, PlugsIcon, BarbellIcon,} from "@phosphor-icons/react";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";

export default function WeighingPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [isWeighing, setIsWeighing] = useState(false);

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold  text-white">
            Central de Pesagem
          </h1>
          <p className="text-gray-200 mt-1">
            Controle e monitoramento das operações de pesagem em tempo real
          </p>
        </div>
      </div>

      <Card className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b lg:border-b-0 lg:border-r border-dashed">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <ScalesIcon className="h-5 w-5"/>
              Controle da Balança
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="plate">Placa do Veículo</Label>
                  <Input
                    id="plate"
                    placeholder="ABC-1234"
                  />
                </div>
                <div>
                  <Label htmlFor="driver">Motorista</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione"/>
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
                      <SelectValue placeholder="Selecione"/>
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
                      <SelectValue placeholder="Selecione"/>
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
                className="ml-auto mt-6"
                disabled={!isConnected}
                onClick={() => setIsWeighing(!isWeighing)}
              >
                {isWeighing ? (
                  <SquareIcon className="h-4 w-4 mr-2"/>
                ) : (
                  <PlayIcon className="h-4 w-4 mr-2"/>
                )}
                Registrar Entrada
              </Button>
            </div>
          </CardContent>
        </div>

        <div className="flex flex-col h-full">
          <CardHeader className="flex-row justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BarbellIcon className="h-5 w-5"/>
              Balança
            </CardTitle>
            <Badge
              variant="secondary"
              className={cn(
                "flex h-fit items-center text-xs gap-1 ml-auto",
                isConnected
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              <div
                className={cn(
                  "w-1 h-1 rounded-full",
                  isConnected
                    ? "bg-green-700"
                    : "bg-red-700"
                )}
              />
              {
                isConnected
                  ? "Conectada"
                  : "Desconectada"
              }
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col h-full justify-between">
            <div className="text-center my-auto">
              {!isConnected ?
                <>
                  <BarbellIcon className="h-16 w-16 text-gray-300 mx-auto mb-4"/>
                  <p className="text-gray-500">Balança desconectada</p>
                </> :
                <p className="text-7xl font-bold">20 kg</p>
              }
            </div>
            <div className="flex gap-4 w-full justify-end mt-6">
              <Button
                onClick={() => {
                }}
                variant="secondary"
                className={cn(
                  "flex items-center gap-2"
                )}
              >
                Parar pesagem
              </Button>
              <Button
                onClick={() => setIsConnected(!isConnected)}
                variant={isConnected ? "destructive" : "default"}
                className={cn(
                  !isConnected && "bg-green-700 hover:bg-green-700/90",
                  "flex items-center gap-2"
                )}
              >
                {isConnected ? <PlugsIcon className="h-4 w-4"/> : <PlugsConnectedIcon className="h-4 w-4"/>}
                {isConnected ? "Desconectar" : "Conectar Balança"}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </main>
  );
}