"use client";

import AddDriverDialog from "@/components/drivers/add-driver-dialog";
import DriverCardContent from "@/components/drivers/driver-card-content";
import Header from "@/components/layout/header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";
import {
  IdentificationCardIcon
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

interface Driver {
  id: number;
  nome: string;
  cpf: string;
  cnh: string;
  imagem_path?: string;
}

export default function DriversPage() {
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
    <section className="p-4 md:p-6">
      <Header title="Gerenciamento de Motoristas" subtitle="Cadastre e gerencie os motoristas autorizados" />
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
        <DriverCardContent drivers={drivers} loading={loading} />
      </Card>
    </section>
  );
}