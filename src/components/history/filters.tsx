"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@chakra-ui/react";
import { TextField } from "@/components/ui/text-field";
import Select from "@/components/ui/select";
import { IconFilterFilled, IconX } from "@tabler/icons-react";
import { Label } from "@radix-ui/react-label";

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
          <IconFilterFilled className="h-5 w-5"/>
          Filtros
        </CardTitle>
        <Button
          variant="subtle"
          onClick={onClearFilters}
          className="mt-auto shrink-0 gap-2"
        >
          <IconX className="h-4 w-4" />
          Limpar Filtros
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-6 w-full gap-4">
            <TextField
              id="startDate"
              label="Data Início"
              type="date"
              value={filters.startDate}
              onChange={(value) =>
                setFilters({ ...filters, startDate: value })
              }
            />
            <TextField
              id="endDate"
              label="Data Fim"
              type="date"
              value={filters.endDate}
              onChange={(value) =>
                setFilters({ ...filters, endDate: value })
              }
            />
            <TextField
              id="plate"
              label="Placa do Veículo"
              placeholder="ABC-1234"
              value={filters.plate}
              onChange={(value) =>
                setFilters({ ...filters, plate: value })
              }
            />
            <TextField
              id="driver-filter"
              label="Motorista"
              placeholder="Nome do motorista"
              value={filters.driver}
              onChange={(value) =>
                setFilters({ ...filters, driver: value })
              }
            />
            <div>
              <Label htmlFor="company-filter">Empresa</Label>
              <Select
                value={filters.company}
                onValueChange={(value) => setFilters({ ...filters, company: value as string })}
                placeholder="Todas"
                items={filtersOptions.empresa.map((o) => ({ label: o.label, value: o.value }))}
                grouped
                groups={[]}
              />
            </div>
            <div>
              <Label htmlFor="cargo-filter">Tipo de Carga</Label>
              <Select
                value={filters.cargoType}
                onValueChange={(value) => setFilters({ ...filters, cargoType: value as string })}
                placeholder="Todos"
                items={filtersOptions.tiposDeCarga.map((o) => ({ label: o.label, value: o.value }))}
                grouped
                groups={[]}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
