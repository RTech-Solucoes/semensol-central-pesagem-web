"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TruckIcon, PlusIcon, PencilSimpleLineIcon } from "@phosphor-icons/react";
import { FAB } from "@/components/ui/fab";
import { AddTruckModal } from "@/components/fleet/add-truck-modal";
import { EditTruckModal } from "@/components/fleet/edit-truck-modal";
import { useState } from "react";

interface Truck {
  id: number;
  plate: string;
  model: string;
  company: string;
  capacity: string;
  status: "Ativo" | "Manutenção" | "Inativo";
  observations: string;
}

export default function FleetPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [trucks, setTrucks] = useState<Truck[]>([
    {
      id: 1,
      plate: "ABC-1234",
      model: "Mercedes-Benz Axor 2644",
      company: "Agro Brasil Ltda",
      capacity: "30.000 kg",
      status: "Ativo",
      observations: "Caminhão em perfeitas condições",
    },
    {
      id: 2,
      plate: "DEF-5678",
      model: "Volvo FH 540",
      company: "Transportes Campo",
      capacity: "45.000 kg",
      status: "Manutenção",
      observations: "Em manutenção preventiva",
    },
  ]);

  const handleNewTruck = () => {
    setAddModalOpen(true);
  };

  const handleEditTruck = (truck: Truck) => {
    setSelectedTruck(truck);
    setEditModalOpen(true);
  };

  const handleSaveTruck = (newTruck: Omit<Truck, "id">) => {
    const truck: Truck = {
      ...newTruck,
      id: Math.max(...trucks.map((t) => t.id)) + 1,
    };
    setTrucks((prev) => [...prev, truck]);
  };

  const handleUpdateTruck = (updatedTruck: Truck) => {
    setTrucks((prev) =>
      prev.map((truck) =>
        truck.id === updatedTruck.id ? updatedTruck : truck
      )
    );
  };

  const handleDeleteTruck = (truckId: number) => {
    setTrucks((prev) => prev.filter((truck) => truck.id !== truckId));
  };

  return (
    <main>
      <div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Caminhões
          </h1>
          <p className="text-gray-200 mt-1">Gerencie a frota de caminhões</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trucks.map((truck) => (
          <Card key={truck.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <TruckIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">
                      {truck.plate}
                    </h3>
                    <p className="text-sm text-gray-400">{truck.model}</p>
                  </div>
                </div>
                <Badge
                  className={
                    truck.status === "Ativo"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : truck.status === "Manutenção"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                        : "bg-red-100 text-red-700 border-red-200"
                  }
                >
                  {truck.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-primary-600">Empresa</p>
                  <p className="text-sm font-medium text-card-foreground">{truck.company}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-600">
                    Capacidade
                  </p>
                  <p className="text-sm font-medium text-card-foreground">{truck.capacity}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-600">
                    Observações
                  </p>
                  <p className="text-sm font-medium text-card-foreground">{truck.observations}</p>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleEditTruck(truck)}
                >
                  <PencilSimpleLineIcon className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FAB icon={PlusIcon} label="Novo Caminhão" onClick={handleNewTruck} />

      <AddTruckModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSave={handleSaveTruck}
      />

      <EditTruckModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        truck={selectedTruck}
        onSave={handleUpdateTruck}
        onDelete={handleDeleteTruck}
      />
    </main>
  );
}