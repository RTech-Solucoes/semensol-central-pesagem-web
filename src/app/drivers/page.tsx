"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@chakra-ui/react";
import { IconPlus, IconId } from "@tabler/icons-react";

import { AddDriverModal } from "@/components/drivers/add-driver-modal";
import { EditDriverModal } from "@/components/drivers/edit-driver-modal";
import { DriverCard } from "@/components/drivers/driver-card";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useDrivers } from "@/hooks/useDrivers";
import { Driver } from "@/types/driver";

export default function DriversPage() {
  const { drivers, loading, addDriver, updateDriver, deleteDriver } = useDrivers();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  return (
    <section className="p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold text-white">
          Gerenciamento de Motoristas
        </h1>
        <p className="text-gray-200">
          Cadastre e gerencie os motoristas autorizados
        </p>
      </div>

      <Card className="w-full max-w-none">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <IconId className="h-5 w-5" />
              Motoristas Cadastrados
            </CardTitle>

            <Button
              className="flex items-center gap-2"
              onClick={() => setIsAddOpen(true)}
            >
              <IconPlus className="h-4 w-4" />
              Novo Motorista
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <LoadingSpinner text="Carregando motoristas..." />
          ) : drivers.length === 0 ? (
            <div className="text-center py-12">
              <IconId className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Nenhum motorista cadastrado</p>
              <p className="text-sm text-gray-400">
                Clique em <strong>Novo Motorista</strong> para começar
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {drivers.map((driver) => (
                <DriverCard
                  key={driver.id}
                  driver={driver}
                  onEdit={setEditingDriver}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddDriverModal
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSave={addDriver}
      />

      <EditDriverModal
        open={!!editingDriver}
        onOpenChange={() => setEditingDriver(null)}
        driver={editingDriver}
        onSave={updateDriver}
        onDelete={deleteDriver}
      />
    </section>
  );
}
