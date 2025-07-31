"use client";

import {PlusIcon} from "@phosphor-icons/react";
import {Driver, DriverCard} from "@/components/drivers/driver-card";
import {FAB} from "@/components/ui/fab";
import {AddDriverModal} from "@/components/drivers/add-driver-modal";
import {EditDriverModal} from "@/components/drivers/edit-driver-modal";
import {useState} from "react";

export default function DriversPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: 1,
      name: "João Silva",
      document: "CNH: 1234567890",
      cpf: "123.456.789-01",
      phone: "(11) 99999-9999",
      email: "joao@email.com",
      status: "Ativo",
      company: "Transportes Silva Ltda",
      experience: "5 anos",
      category: "D",
    },
    {
      id: 2,
      name: "Maria Santos",
      document: "CNH: 0987654321",
      cpf: "987.654.321-09",
      phone: "(11) 88888-8888",
      email: "maria@email.com",
      status: "Ativo",
      company: "Logística Santos",
      experience: "8 anos",
      category: "E",
    },
    {
      id: 3,
      name: "Pedro Oliveira",
      document: "CNH: 5566778899",
      cpf: "456.789.123-45",
      phone: "(11) 97777-7777",
      email: "pedro.oliveira@email.com",
      status: "Ativo",
      company: "Frota Oliveira",
      experience: "12 anos",
      category: "C",
    },
    {
      id: 4,
      name: "Ana Costa",
      document: "CNH: 1122334455",
      cpf: "789.123.456-78",
      phone: "(11) 96666-6666",
      email: "ana.costa@email.com",
      status: "Inativo",
      company: "Auto Costa",
      experience: "3 anos",
      category: "B",
    },
    {
      id: 5,
      name: "Carlos Lima",
      document: "CNH: 9988776655",
      cpf: "321.654.987-32",
      phone: "(11) 95555-5555",
      email: "carlos.lima@email.com",
      status: "Ativo",
      company: "Lima Transportes e Logística Integrada",
      experience: "15 anos",
      category: "E",
    },
    {
      id: 6,
      name: "Fernanda Rocha",
      document: "CNH: 4433221100",
      cpf: "654.321.987-65",
      phone: "(11) 94444-4444",
      email: "fernanda.rocha@email.com",
      status: "Ativo",
      company: "Rocha Cargas",
      experience: "7 anos",
      category: "D",
    },
    {
      id: 7,
      name: "Roberto Mendes",
      document: "CNH: 7788990011",
      cpf: "159.753.486-15",
      phone: "(11) 93333-3333",
      email: "roberto.mendes@email.com",
      status: "Suspenso",
      company: "Mendes & Filhos Transportadora",
      experience: "20 anos",
      category: "E",
    },
    {
      id: 8,
      name: "Juliana Ferreira",
      document: "CNH: 2233445566",
      cpf: "357.159.753-35",
      phone: "(11) 92222-2222",
      email: "juliana.ferreira@email.com",
      status: "Ativo",
      company: "Ferreira Logística",
      experience: "4 anos",
      category: "C",
    },
    {
      id: 9,
      name: "Ricardo Barbosa",
      document: "CNH: 6677889900",
      cpf: "741.852.963-74",
      phone: "(11) 91111-1111",
      email: "ricardo.barbosa@email.com",
      status: "Ativo",
      company: "Barbosa Transportes",
      experience: "10 anos",
      category: "D",
    },
    {
      id: 10,
      name: "Patrícia Alves",
      document: "CNH: 3344556677",
      cpf: "852.963.741-85",
      phone: "(11) 90000-0000",
      email: "patricia.alves@email.com",
      status: "Inativo",
      company: "Alves Express",
      experience: "6 anos",
      category: "C",
    },
  ]);

  const handleNewDriver = () => {
    setAddModalOpen(true);
  };

  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setEditModalOpen(true);
  };

  const handleSaveDriver = (newDriver: Omit<Driver, "id">) => {
    const driver: Driver = {
      ...newDriver,
      id: Math.max(...drivers.map((d) => d.id)) + 1,
    };
    setDrivers((prev) => [...prev, driver]);
  };

  const handleUpdateDriver = (updatedDriver: Driver) => {
    setDrivers((prev) =>
      prev.map((driver) =>
        driver.id === updatedDriver.id ? updatedDriver : driver
      )
    );
  };

  const handleDeleteDriver = (driverId: number) => {
    setDrivers((prev) => prev.filter((driver) => driver.id !== driverId));
  };

  return (
    <main>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Motoristas
        </h1>
        <p className="text-gray-200 mt-1">
          Gerencie os motoristas cadastrados
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
        {drivers.map((driver) => (
          <DriverCard
            key={driver.id}
            driver={driver}
            onEdit={handleEditDriver}
          />
        ))}
      </div>

      <FAB
        icon={PlusIcon}
        label="Novo Motorista"
        onClick={handleNewDriver}
      />

      <AddDriverModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSave={handleSaveDriver}
      />

      <EditDriverModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        driver={selectedDriver}
        onSave={handleUpdateDriver}
        onDelete={handleDeleteDriver}
      />
    </main>
  );
}