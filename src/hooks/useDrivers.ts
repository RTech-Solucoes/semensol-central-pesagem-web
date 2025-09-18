import { useState, useEffect } from "react";
import { Driver } from "@/types/driver";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function useDrivers() {
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
        description: response.error?.message,
        variant: "destructive",
      });
    } else if (response.data) {
      const mappedDrivers: Driver[] = response.data.map((motorista: any) => ({
        id: motorista.id,
        name: motorista.nome,
        document: motorista.cnh ?? "",
        cpf: motorista.cpf ?? "",
        phone: motorista.telefone ?? "",
        email: motorista.email ?? "",
        status: motorista.status ?? "Ativo",
        company: motorista.empresa ?? undefined,
        experience: motorista.experiencia ?? undefined,
        category: motorista.categoria_cnh ?? undefined,
      }));

      setDrivers(mappedDrivers);
    }

    setLoading(false);
  };


  const addDriver = (driver: Omit<Driver, "id">) => {
    const newDriver = { ...driver, id: Date.now() };
    setDrivers((prev) => [...prev, newDriver]);
  };

  const updateDriver = (updated: Driver) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d))
    );
  };

  const deleteDriver = (driverId: number) => {
    setDrivers((prev) => prev.filter((d) => d.id !== driverId));
  };

  return { drivers, loading, addDriver, updateDriver, deleteDriver, reload: loadDrivers };
}
