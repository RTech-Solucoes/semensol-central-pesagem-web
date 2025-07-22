"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Scale,
  Truck,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
} from "lucide-react";

export function WeighingHistory() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    driver: "",
    company: "",
    cargoType: "",
    plate: "",
  });

  const stats = [
    {
      title: "Total de Pesagens",
      value: "5",
      icon: Clock,
      color: "brown",
    },
    {
      title: "Peso Total Transportado",
      value: "131.800 kg",
      icon: Scale,
      color: "brown",
    },
    {
      title: "Peso Médio por Viagem",
      value: "26.360 kg",
      icon: Truck,
      color: "brown",
    },
  ];

  const weighingRecords = [
    {
      id: 1,
      date: "19/01/2025",
      time: "08:30",
      plate: "ABC-1234",
      driver: "João Silva",
      company: "Agro Brasil Ltda",
      cargo: "Soja",
      entryWeight: "45.200",
      exitWeight: "15.800",
      netWeight: "29.400",
      status: "Concluído",
    },
    {
      id: 2,
      date: "19/01/2025",
      time: "09:15",
      plate: "DEF-5678",
      driver: "Maria Santos",
      company: "Transportes Campo",
      cargo: "Milho",
      entryWeight: "38.900",
      exitWeight: "14.200",
      netWeight: "24.700",
      status: "Concluído",
    },
    {
      id: 3,
      date: "19/01/2025",
      time: "10:45",
      plate: "GHI-9012",
      driver: "Pedro Oliveira",
      company: "Rural Express",
      cargo: "Fertilizante",
      entryWeight: "42.100",
      exitWeight: "16.500",
      netWeight: "25.600",
      status: "Concluído",
    },
    {
      id: 4,
      date: "18/01/2025",
      time: "16:20",
      plate: "JKL-3456",
      driver: "Ana Costa",
      company: "Agro Brasil Ltda",
      cargo: "Ração",
      entryWeight: "39.800",
      exitWeight: "13.900",
      netWeight: "25.900",
      status: "Concluído",
    },
    {
      id: 5,
      date: "18/01/2025",
      time: "14:10",
      plate: "MNO-7890",
      driver: "Carlos Lima",
      company: "Transportes Campo",
      cargo: "Soja",
      entryWeight: "41.300",
      exitWeight: "15.100",
      netWeight: "26.200",
      status: "Concluído",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Histórico de Pesagens
          </h1>
          <p className="text-gray-600 mt-1">
            Consulte o histórico completo de pesagens
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                    "bg-brown-100"
                  }`}
                >
                  <stat.icon
                    className={`h-6 w-6 ${
                      "text-brown-600"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5 text-brown-600" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-4">
            <div>
              <Label htmlFor="startDate">Data Início</Label>
              <Input
                id="startDate"
                type="date"
                className="mt-1"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="endDate">Data Fim</Label>
              <Input
                id="endDate"
                type="date"
                className="mt-1"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="plate">Caminhão (Placa)</Label>
              <Input
                id="plate"
                placeholder="ABC-1234"
                className="mt-1"
                value={filters.plate}
                onChange={(e) =>
                  setFilters({ ...filters, plate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="driver-filter">Motorista</Label>
              <Input
                id="driver-filter"
                placeholder="Nome do motorista"
                className="mt-1"
                value={filters.driver}
                onChange={(e) =>
                  setFilters({ ...filters, driver: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="company-filter">Empresa</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as empresas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as empresas</SelectItem>
                  <SelectItem value="agro">Agro Brasil Ltda</SelectItem>
                  <SelectItem value="transportes">Transportes Campo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cargo-filter">Tipo de Carga</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="soja">Soja</SelectItem>
                  <SelectItem value="milho">Milho</SelectItem>
                  <SelectItem value="fertilizante">Fertilizante</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button>
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="outline">Limpar Filtros</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Registros de Pesagem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Caminhão</TableHead>
                  <TableHead>Motorista</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Carga</TableHead>
                  <TableHead>Entrada (kg)</TableHead>
                  <TableHead>Saída (kg)</TableHead>
                  <TableHead>Líquido (kg)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weighingRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{record.date}</div>
                        <div className="text-gray-500">{record.time}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {record.plate}
                    </TableCell>
                    <TableCell>{record.driver}</TableCell>
                    <TableCell>{record.company}</TableCell>
                    <TableCell>{record.cargo}</TableCell>
                    <TableCell>{record.entryWeight}</TableCell>
                    <TableCell>{record.exitWeight}</TableCell>
                    <TableCell className="font-medium">
                      {record.netWeight}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                       className="bg-brown-100 text-brown-700"
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}