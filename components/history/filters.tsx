"use client";

import {CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {FunnelSimpleIcon, XIcon} from "@phosphor-icons/react";

interface FilterState {
  startDate: string;
  endDate: string;
  driver: string;
  company: string;
  cargoType: string;
  plate: string;
}

interface FiltersCardProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const filtersOptions = {
  empresa: [
    { id: 0, value: "all", label: "Todas" },
    { id: 1, value: "Agro Brasil Ltda", label: "Agro Brasil Ltda" },
    { id: 2, value: "Transportes Campo", label: "Transportes Campo" },
    { id: 3, value: "Rural Express", label: "Rural Express" }
  ],
  tiposDeCarga: [
    { id: 0, value: "all", label: "Todos" },
    { id: 1, value: "Soja", label: "Soja" },
    { id: 2, value: "Milho", label: "Milho" },
    { id: 3, value: "Fertilizante", label: "Fertilizante" },
    { id: 4, value: "Ração", label: "Ração" }
  ]
}

export default function Component({ filters, setFilters, onClearFilters }: FiltersCardProps) {
  return (
    <div className="w-full h-fit">
      <CardHeader className="flex flex-row justify-between pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FunnelSimpleIcon className="h-5 w-5"/>
          Filtros
        </CardTitle>
        <Button
          variant="secondary"
          onClick={onClearFilters}
          className="mt-auto shrink-0 gap-2"
        >
          <XIcon className="h-4 w-4" />
          Limpar Filtros
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-6 w-full gap-4">
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
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  {filtersOptions.empresa.map((option) =>
                    <SelectItem key={option.id} value={option.value}>{option.label}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cargo-filter">Tipo de Carga</Label>
              <Select value={filters.cargoType} onValueChange={(value) => setFilters({ ...filters, cargoType: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  {filtersOptions.empresa.map((option) =>
                    <SelectItem key={option.id} value={option.value}>{option.label}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
