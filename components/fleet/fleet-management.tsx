"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Plus, Eye, Edit, Trash2 } from "lucide-react";

export function FleetManagement() {
  const trucks = [
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
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Caminhões
          </h1>
          <p className="text-gray-200 mt-1">Gerencie a frota de caminhões</p>
        </div>
        <Button className="bg-black hover:bg-black/70">
          <Plus className="h-4 w-4 mr-2" />
          Novo Caminhão
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trucks.map((truck) => (
          <Card key={truck.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">
                      {truck.plate}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{truck.model}</p>
                  </div>
                </div>
                <Badge
                  variant={truck.status === "Ativo" ? "default" : "secondary"}
                  className={
                    truck.status === "Ativo"
                      ? "bg-primary-100 text-primary-700"
                      : "bg-primary-100 text-primary-700"
                  }
                >
                  {truck.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Empresa</p>
                  <p className="text-sm text-gray-900">{truck.company}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Capacidade
                  </p>
                  <p className="text-sm text-gray-900">{truck.capacity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Observações
                  </p>
                  <p className="text-sm text-gray-900">{truck.observations}</p>
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