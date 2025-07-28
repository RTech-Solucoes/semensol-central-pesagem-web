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
  Weight,
  Truck,
  Filter,
  Download,
  Eye,
  MoreHorizontal, X, CheckCircle,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";
import {cn} from "@/lib/utils";

export function WeighingHistory() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    driver: "",
    company: "",
    cargoType: "",
    plate: "",
  });

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc"
  });

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
      status: "Em andamento",
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

  // Filter the data based on current filters
  const filteredRecords = weighingRecords.filter(record => {
    // Date filtering (convert DD/MM/YYYY to YYYY-MM-DD for comparison)
    const recordDate = record.date.split('/').reverse().join('-');
    if (filters.startDate && recordDate < filters.startDate) return false;
    if (filters.endDate && recordDate > filters.endDate) return false;
    
    // Text filtering
    if (filters.driver && !record.driver.toLowerCase().includes(filters.driver.toLowerCase())) return false;
    if (filters.plate && !record.plate.toLowerCase().includes(filters.plate.toLowerCase())) return false;
    if (filters.company && filters.company !== "all" && record.company !== filters.company) return false;
    if (filters.cargoType && filters.cargoType !== "all" && record.cargo !== filters.cargoType) return false;
    
    return true;
  });

  // Sort the filtered data
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    let aValue, bValue;
    
    switch (sortConfig.key) {
      case "date":
        aValue = new Date(a.date.split('/').reverse().join('-') + ' ' + a.time);
        bValue = new Date(b.date.split('/').reverse().join('-') + ' ' + b.time);
        break;
      case "entryWeight":
      case "exitWeight":
      case "netWeight":
        aValue = parseFloat((a as any)[sortConfig.key].replace('.', ''));
        bValue = parseFloat((b as any)[sortConfig.key].replace('.', ''));
        break;
      default:
        aValue = (a as any)[sortConfig.key]?.toLowerCase() || '';
        bValue = (b as any)[sortConfig.key]?.toLowerCase() || '';
    }
    
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      driver: "",
      company: "",
      cargoType: "",
      plate: "",
    });
  };

  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc"
    }));
  };

  const tableCols = [
    { label: "Data/Hora", key: "date" },
    { label: "Caminhão", key: "plate" },
    { label: "Motorista", key: "driver" },
    { label: "Empresa", key: "company" },
    { label: "Carga", key: "cargo" },
    { label: "Entrada (kg)", key: "entryWeight" },
    { label: "Saída (kg)", key: "exitWeight" },
    { label: "Líquido (kg)", key: "netWeight" },
    { label: "Status", key: "status" },
    // "Ações"
  ]

  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc" 
      ? <ChevronUp className="h-4 w-4 text-primary-600" />
      : <ChevronDown className="h-4 w-4 text-primary-600" />;
  };

  return (
    <div className="flex flex-col w-full space-y-8 page-animation">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Histórico de Pesagens
          </h1>
          <p className="text-gray-200 mt-1">
            Consulte o histórico completo de pesagens
          </p>
        </div>
        <Button className="bg-primary-900 hover:bg-primary-900/70">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Card */}
        <Card className="w-full lg:w-80 h-fit">
          <CardHeader className="flex flex-row justify-between pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary-600" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
                <Label htmlFor="plate">Placa do Veículo</Label>
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
                <Select value={filters.company} onValueChange={(value) => setFilters({ ...filters, company: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Todas as empresas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as empresas</SelectItem>
                    <SelectItem value="Agro Brasil Ltda">Agro Brasil Ltda</SelectItem>
                    <SelectItem value="Transportes Campo">Transportes Campo</SelectItem>
                    <SelectItem value="Rural Express">Rural Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cargo-filter">Tipo de Carga</Label>
                <Select value={filters.cargoType} onValueChange={(value) => setFilters({ ...filters, cargoType: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="Soja">Soja</SelectItem>
                    <SelectItem value="Milho">Milho</SelectItem>
                    <SelectItem value="Fertilizante">Fertilizante</SelectItem>
                    <SelectItem value="Ração">Ração</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Table Card */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Weight className="h-5 w-5 text-primary-600" />
              Registros de Pesagem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-2xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    {tableCols.map((col, index) =>
                      <TableHead 
                        key={index} 
                        className="cursor-pointer hover:bg-gray-50 select-none"
                        onClick={() => handleSort(col.key)}
                      >
                        <div className="flex items-center justify-between">
                          {col.label}
                          {getSortIcon(col.key)}
                        </div>
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRecords.map((record) => (
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
                          className={cn(
                            "flex items-center w-fit space-x-1",
                            record.status === "Concluído"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                          )}
                        >
                          <span>
                            {record.status}
                          </span>
                          {
                            record.status === "Concluído"
                              ? <CheckCircle className="w-4 h-4"/>
                              : <Clock className="w-4 h-4"/>
                          }
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}