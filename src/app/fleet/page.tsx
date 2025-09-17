"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrashIcon, PencilSimpleIcon } from "@phosphor-icons/react";
import { TruckModal } from "@/components/fleet/truck-modal";
import { Truck } from "@/types/truck";


export default function TrucksPage() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTruck, setEditingTruck] = useState<Truck | null>(null);

  const handleAdd = (truckData: Omit<Truck, "id">) => {
    const newTruck: Truck = { id: Date.now(), ...truckData };
    setTrucks((prev) => [...prev, newTruck]);
  };

  const handleEdit = (truckData: Omit<Truck, "id">, id?: number) => {
    if (!id) return;
    setTrucks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...truckData } : t))
    );
  };

  const handleDelete = (id?: number) => {
    if (!id) return;
    setTrucks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gerenciamento de Caminhões</h1>
        <Button
          onClick={() => {
            setEditingTruck(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Novo Caminhão
        </Button>
      </div>

      {/* Lista de Caminhões */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trucks.map((truck) => (
          <Card key={truck.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{truck.plate}</span>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    truck.status === "Ativo"
                      ? "bg-green-100 text-green-700"
                      : truck.status === "Manutenção"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {truck.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Modelo:</strong> {truck.model}
              </p>
              <p>
                <strong>Empresa:</strong> {truck.company}
              </p>
              {truck.capacity && (
                <p>
                  <strong>Capacidade:</strong> {truck.capacity}
                </p>
              )}
              {truck.observations && (
                <p>
                  <strong>Obs:</strong> {truck.observations}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingTruck(truck);
                    setModalOpen(true);
                  }}
                >
                  <PencilSimpleIcon className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="text-red-600 bg-red-100 hover:bg-red-200"
                  onClick={() => handleDelete(truck.id)}
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TruckModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={editingTruck ? "edit" : "create"}
        truck={editingTruck}
        onSave={(data, id) =>
          editingTruck ? handleEdit(data, id) : handleAdd(data)
        }
        onDelete={handleDelete}
      />
    </div>
  );
}
