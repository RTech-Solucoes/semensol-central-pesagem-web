"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, Plus, Eye, Edit, Trash2, Phone, Mail, MapPin } from "lucide-react";

export function PartnerManagement() {
  const partners = [
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
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Empresas
          </h1>
          <p className="text-gray-200 mt-1">Gerencie as empresas parceiras</p>
        </div>
        <Button className="bg-black">
          <Plus className="h-4 w-4 mr-2" />
          Nova Empresa
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {partners.map((partner) => (
          <Card key={partner.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <Handshake className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">
                      {partner.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">CNPJ: {partner.cnpj}</p>
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
              <div className="flex gap-2 mt-6">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary-600 border-primary-200 hover:bg-primary-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}