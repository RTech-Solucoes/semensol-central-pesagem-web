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
    {
      id: 3,
      name: "Pedro Oliveira",
      document: "CNH: 5566778899",
      cpf: "456.789.123-45",
      phone: "(11) 97777-7777",
      email: "pedro.oliveira@email.com",
      status: "Ativo",
    },
    {
      id: 4,
      name: "Ana Costa",
      document: "CNH: 1122334455",
      cpf: "789.123.456-78",
      phone: "(11) 96666-6666",
      email: "ana.costa@email.com",
      status: "Inativo",
    },
    {
      id: 5,
      name: "Carlos Lima",
      document: "CNH: 9988776655",
      cpf: "321.654.987-32",
      phone: "(11) 95555-5555",
      email: "carlos.lima@email.com",
      status: "Ativo",
    },
    {
      id: 6,
      name: "Fernanda Rocha",
      document: "CNH: 4433221100",
      cpf: "654.321.987-65",
      phone: "(11) 94444-4444",
      email: "fernanda.rocha@email.com",
      status: "Ativo",
    },
    {
      id: 7,
      name: "Roberto Mendes",
      document: "CNH: 7788990011",
      cpf: "159.753.486-15",
      phone: "(11) 93333-3333",
      email: "roberto.mendes@email.com",
      status: "Suspenso",
    },
    {
      id: 8,
      name: "Juliana Ferreira",
      document: "CNH: 2233445566",
      cpf: "357.159.753-35",
      phone: "(11) 92222-2222",
      email: "juliana.ferreira@email.com",
      status: "Ativo",
    },
    {
      id: 9,
      name: "Ricardo Barbosa",
      document: "CNH: 6677889900",
      cpf: "741.852.963-74",
      phone: "(11) 91111-1111",
      email: "ricardo.barbosa@email.com",
      status: "Ativo",
    },
    {
      id: 10,
      name: "Patrícia Alves",
      document: "CNH: 3344556677",
      cpf: "852.963.741-85",
      phone: "(11) 90000-0000",
      email: "patricia.alves@email.com",
      status: "Inativo",
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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