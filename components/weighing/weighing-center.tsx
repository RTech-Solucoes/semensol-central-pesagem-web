"use client";

import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {CheckCircle, Clock, Play, Plug, Scale, Square, Unplug, Weight,} from "lucide-react";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";

export function WeighingCenter() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [isWeighing, setIsWeighing] = useState(false);

  return (
    <div className="flex flex-col w-full space-y-8 page-animation">
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary-600"/>
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
                    <Square className="h-4 w-4 mr-2"/>
                  ) : (
                    <Play className="h-4 w-4 mr-2"/>
                  )}
                  Registrar Entrada
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Weight className="h-5 w-5 text-primary-600"/>
                Balança
                <Badge
                  variant="secondary"
                  className={cn(
                    "flex items-center text-xs gap-1 ml-auto",
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
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full justify-between">
              <div className="text-center my-auto">
                {!isConnected ?
                  <>
                    <Weight className="h-16 w-16 text-gray-300 mx-auto mb-4"/>
                    <p className="text-gray-500">Balança desconectada</p>
                  </> :
                  <p className="text-7xl font-bold">20 kg</p>
                }
              </div>
              <div className="flex gap-4 w-full justify-end mt-6">
                <Button
                  onClick={() => {
                  }}
                  variant="outline"
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
                  {isConnected ? <Unplug className="h-4 w-4"/> : <Plug className="h-4 w-4"/>}
                  {isConnected ? "Desconectar" : "Conectar Balança"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/*<div>*/}
        {/*  <Card>*/}
        {/*    <CardHeader>*/}
        {/*      <CardTitle className="text-lg font-semibold flex items-center gap-2">*/}
        {/*        <Weight className="h-5 w-5 text-primary-600"/>*/}
        {/*        Ciclos Ativos*/}
        {/*      </CardTitle>*/}
        {/*    </CardHeader>*/}
        {/*    <CardContent>*/}
        {/*      <div className="text-center py-12">*/}
        {/*        <Weight className="h-16 w-16 text-gray-300 mx-auto mb-4"/>*/}
        {/*        <p className="text-gray-500">Nenhum ciclo ativo no momento</p>*/}
        {/*      </div>*/}
        {/*    </CardContent>*/}
        {/*  </Card>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}