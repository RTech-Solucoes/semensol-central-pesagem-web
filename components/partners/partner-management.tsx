"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Edit, Phone, Mail, MapPin } from "lucide-react";
import { FAB } from "@/components/ui/fab";
import { AddPartnerModal } from "./add-partner-modal";
import { EditPartnerModal } from "./edit-partner-modal";
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

export function PartnerManagement() {
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
    <div className="flex flex-col w-full space-y-8 page-animation">
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
                    <Building2 className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">
                      {partner.name}
                    </CardTitle>
                    <p className="text-sm text-gray-400">CNPJ: {partner.cnpj}</p>
                  </div>
                </div>
                <Badge
                  variant="default"
                  className="bg-primary-100 text-primary-700"
                >
                  {partner.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{partner.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{partner.email}</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">{partner.address}</p>
                    <p className="text-sm text-gray-600">{partner.city}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tipo</p>
                  <p className="text-sm text-gray-900">{partner.type}</p>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleEditPartner(partner)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FAB
        icon={Plus}
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
    </div>
  );
}