'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";
import { PlusIcon, TruckIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Truck } from "../types";
import { AddVehicleModal } from "./add-vehicle-modal";
import CardFleetContent from "./card-fleet-content";

export default function CardFleet() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTrucks();
  }, []);

  const loadTrucks = async () => {
    setLoading(true);
    const response = await apiClient.getCaminhoes();
    if (response.error) {
      toast({
        title: "Erro ao carregar veículos",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      setTrucks(response.data);
    }
    setLoading(false);
  };



  return (
    <Card className="w-full max-w-none">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TruckIcon className="h-5 w-5" />
            Veículos Cadastrados
          </CardTitle>

          <AddVehicleModal onVehicleAdded={loadTrucks}>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Novo Veículo
            </Button>
          </AddVehicleModal>
        </div>
      </CardHeader>
      <CardFleetContent
        loading={loading}
        trucks={trucks}
      />
    </Card>
  )
}