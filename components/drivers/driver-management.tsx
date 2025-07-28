"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Plus, Eye, Edit, Trash2, Phone, Mail } from "lucide-react";

export function DriverManagement() {
  const drivers = [
    {
      id: 1,
      name: "João Silva",
      document: "CNH: 1234567890",
      cpf: "123.456.789-01",
      phone: "(11) 99999-9999",
      email: "joao@email.com",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Maria Santos",
      document: "CNH: 0987654321",
      cpf: "987.654.321-09",
      phone: "(11) 88888-8888",
      email: "maria@email.com",
      status: "Ativo",
    },
  ];

  return (
    <div className="w-full space-y-8 page-animation">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Motoristas
          </h1>
          <p className="text-gray-200 mt-1">Gerencie os motoristas cadastrados</p>
        </div>
        <Button className="bg-primary-900 hover:bg-primary-900/70">
          <Plus className="h-4 w-4 mr-2" />
          Novo Motorista
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {drivers.map((driver) => (
          <Card key={driver.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">
                      {driver.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{driver.document}</p>
                  </div>
                </div>
                <Badge
                  variant="default"
                  className="bg-primary-100 text-primary-700"
                >
                  {driver.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">CPF</p>
                  <p className="text-sm text-gray-900">{driver.cpf}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{driver.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{driver.email}</p>
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