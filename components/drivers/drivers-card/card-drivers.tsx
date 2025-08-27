"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";
import { IdentificationCardIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import AddDriverDialog from "./add-driver-dialog";
import DriverContent from "./driver-content";

interface Driver {
  id: number;
  nome: string;
  cpf: string;
  cnh: string;
  imagem_path?: string;
}

export default function CardDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    setLoading(true);
    const response = await apiClient.getMotoristas();
    if (response.error) {
      toast({
        title: "Erro ao carregar motoristas",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      const mappedDrivers = response.data.map((motorista) => ({
        id: motorista.id,
        nome: motorista.nome,
        cpf: "",
        cnh: "",
        imagem_path: undefined,
      }));
      setDrivers(mappedDrivers);
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-none">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <IdentificationCardIcon className="h-5 w-5" />
            Motoristas Cadastrados
          </CardTitle>

          <AddDriverDialog onCreated={loadDrivers} />
        </div>
      </CardHeader>
      <DriverContent drivers={drivers} loading={loading} />
    </Card>
  );
}