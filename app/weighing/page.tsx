"use client";

import {useState, useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {CheckCircleIcon, ClockIcon, PlayIcon, PlugsConnectedIcon, ScalesIcon, SquareIcon, PlugsIcon} from "@phosphor-icons/react";
import WeightIcon from "@/components/icons/WeightIcon";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {apiClient} from "@/lib/api";
import {VideoVerification} from "@/components/weighing/video-verification";
import {useToast} from "@/hooks/use-toast";

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
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      setMotoristas(response.data);
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
    setLoading(false);
  };

  return (
    <main className="p-4 md:p-6">
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
        />

        <Card className="w-full max-w-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            <div className="border-b lg:border-b-0 lg:border-r border-dashed">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ScalesIcon className="h-5 w-5"/>
                  Controle da Balança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="placa">Placa do Veículo</Label>
                    <Input
                      id="placa"
                      placeholder="ABC-1234"
                      value={formData.placa}
                      onChange={(e) => setFormData(prev => ({ ...prev, placa: e.target.value.toUpperCase() }))}
                      className={cn(
                        formData.placa && "border-green-500 bg-green-50"
                      )}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="driver">Motorista</Label>
                    <Select value={formData.motorista_id} onValueChange={(value) => setFormData(prev => ({ ...prev, motorista_id: value }))}>
                      <SelectTrigger className={cn(
                        formData.motorista_id && "border-green-500 bg-green-50"
                      )}>
                        <SelectValue placeholder="Selecione o motorista"/>
                      </SelectTrigger>
                      <SelectContent>
                        {motoristas.map((motorista) => (
                          <SelectItem key={motorista.id} value={motorista.id.toString()}>
                            {motorista.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {verificationComplete && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-600"/>
                      <span className="text-green-800 font-medium">Verificação realizada com sucesso!</span>
                    </div>
                  </div>
                )}

                {ciclosAbertos.length > 0 && (
                  <div className="space-y-3">
                    <Label>Ciclos em Andamento</Label>
                    <div className="space-y-2">
                      {ciclosAbertos.map((ciclo) => (
                        <div key={ciclo.id_pesagem} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{ciclo.placa}</p>
                            <p className="text-sm text-gray-500">{ciclo.motorista}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!isConnected || loading}
                            onClick={() => handleRegistrarSaida(ciclo.id_pesagem)}
                          >
                            Registrar Saída
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  disabled={!isConnected || !formData.placa || !formData.motorista_id || loading}
                  onClick={handleRegistrarEntrada}
                >
                  {loading ? (
                    <ClockIcon className="h-4 w-4 mr-2"/>
                  ) : isWeighing ? (
                    <SquareIcon className="h-4 w-4 mr-2"/>
                  ) : (
                    <PlayIcon className="h-4 w-4 mr-2"/>
                  )}
                  {loading ? "Processando..." : "Registrar Entrada"}
                </Button>
              </CardContent>
            </div>

            <div className="flex flex-col">
              <CardHeader className="flex-row justify-between items-center">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <WeightIcon className="h-5 w-5"/>
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
                <div className="text-center my-auto">
                  {!isConnected ? (
                    <>
                      <WeightIcon className="h-16 w-16 text-gray-300 mx-auto mb-4"/>
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
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setCurrentWeight(0)}
                  >
                    Zerar Peso
                  </Button>
                  <Button
                    onClick={() => setIsConnected(!isConnected)}
                    variant={isConnected ? "destructive" : "default"}
                    className={cn(
                      !isConnected && "bg-green-700 hover:bg-green-700/90",
                      "flex-1 flex items-center gap-2"
                    )}
                  >
                    {isConnected ? <PlugsIcon className="h-4 w-4"/> : <PlugsConnectedIcon className="h-4 w-4"/>}
                    {isConnected ? "Desconectar" : "Conectar Balança"}
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}