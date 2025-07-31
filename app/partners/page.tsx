"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BuildingOfficeIcon, PlusIcon, PencilSimpleLineIcon, PhoneIcon, EnvelopeSimpleIcon, MapPinIcon } from "@phosphor-icons/react";
import { FAB } from "@/components/ui/fab";
import { AddPartnerModal } from "@/components/partners/add-partner-modal";
import { EditPartnerModal } from "@/components/partners/edit-partner-modal";
import { useState } from "react";

interface Partner {
  id: number;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  status: "Ativa" | "Inativa";
  type: string;
}

export default function PartnerPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: 1,
      name: "Agro Brasil Ltda",
      cnpj: "12.345.678/0001-90",
      phone: "(11) 3333-3333",
      email: "contato@agrobrasil.com",
      address: "Rua das Plantações, 123",
      city: "Ribeirão Preto - SP 14000-000",
      status: "Ativa",
      type: "Cliente preferencial",
    },
    {
      id: 2,
      name: "Transportes Campo",
      cnpj: "98.765.432/0001-12",
      phone: "(16) 2222-2222",
      email: "admin@transportescampo.com",
      address: "Av. Rural, 456",
      city: "Sertãozinho - SP 14160-000",
      status: "Ativa",
      type: "Transportadora",
    },
  ]);

  const handleNewPartner = () => {
    setAddModalOpen(true);
  };

  const handleEditPartner = (partner: Partner) => {
    setSelectedPartner(partner);
    setEditModalOpen(true);
  };

  const handleSavePartner = (newPartner: Omit<Partner, "id">) => {
    const partner: Partner = {
      ...newPartner,
      id: Math.max(...partners.map((p) => p.id)) + 1,
    };
    setPartners((prev) => [...prev, partner]);
  };

  const handleUpdatePartner = (updatedPartner: Partner) => {
    setPartners((prev) =>
      prev.map((partner) =>
        partner.id === updatedPartner.id ? updatedPartner : partner
      )
    );
  };

  const handleDeletePartner = (partnerId: number) => {
    setPartners((prev) => prev.filter((partner) => partner.id !== partnerId));
  };

  return (
    <main>
      <div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Empresas parceiras
          </h1>
          <p className="text-gray-200 mt-1">Gerencie as empresas parceiras</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {partners.map((partner) => (
          <Card key={partner.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <BuildingOfficeIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-gray-400">CNPJ: {partner.cnpj}</p>
                  </div>
                </div>
                <Badge
                  className={
                    partner.status === "Ativa"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-red-100 text-red-700 border-red-200"
                  }
                >
                  {partner.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-primary-600" />
                  <p className="text-sm font-medium text-card-foreground">{partner.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <EnvelopeSimpleIcon className="h-4 w-4 text-primary-600" />
                  <p className="text-sm font-medium text-card-foreground">{partner.email}</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPinIcon className="h-4 w-4 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{partner.address}</p>
                    <p className="text-sm text-gray-600">{partner.city}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-600">Tipo</p>
                  <p className="text-sm font-medium text-card-foreground">{partner.type}</p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="ml-auto mt-6"
                onClick={() => handleEditPartner(partner)}
              >
                <PencilSimpleLineIcon className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <FAB
        icon={PlusIcon}
        label="Nova Empresa"
        onClick={handleNewPartner}
      />

      <AddPartnerModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSave={handleSavePartner}
      />

      <EditPartnerModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        partner={selectedPartner}
        onSave={handleUpdatePartner}
        onDelete={handleDeletePartner}
      />
    </main>
  );
}