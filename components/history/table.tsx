"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CaretDownIcon, CaretUpDownIcon, CaretUpIcon, CheckCircleIcon, ClockIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Key, useCallback } from "react";

interface WeighingRecord {
  id: number;
  date: string;
  time: string;
  plate: string;
  driver: string;
  company: string;
  cargo: string;
  entryWeight: string;
  exitWeight: string;
  netWeight: string;
  status: string;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

interface WeighingTableProps {
  records: WeighingRecord[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

const columns = [
  { key: "date", label: "Data/Hora", sortable: true },
  { key: "plate", label: "Caminhão", sortable: true },
  { key: "driver", label: "Motorista", sortable: true },
  { key: "company", label: "Empresa", sortable: true },
  { key: "cargo", label: "Carga", sortable: true },
  { key: "entryWeight", label: "Entrada (kg)", sortable: true },
  { key: "exitWeight", label: "Saída (kg)", sortable: true },
  { key: "netWeight", label: "Líquido (kg)", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

export default function Component({ records, sortConfig, onSort }: WeighingTableProps) {
  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <CaretUpDownIcon className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc"
      ? <CaretUpIcon className="h-4 w-4 text-primary-600" />
      : <CaretDownIcon className="h-4 w-4 text-primary-600" />;
  };

  const renderCell = useCallback((record: WeighingRecord, columnKey: Key) => {
    const cellValue = record[columnKey as keyof WeighingRecord];

    switch (columnKey) {
      case "date":
        return (
          <div className="text-sm">
            <div className="font-medium">{record.date}</div>
            <div className="text-gray-500">{record.time}</div>
          </div>
        );
      case "plate":
        return <span className="font-medium">{record.plate}</span>;
      case "netWeight":
        return <span className="font-medium">{record.netWeight}</span>;
      case "status":
        return (
          <Badge
            variant="secondary"
            className={cn(
              "flex items-center w-fit space-x-1",
              record.status === "Concluído"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            )}
          >
            <span>{record.status}</span>
            {record.status === "Concluído" ? (
              <CheckCircleIcon className="w-4 h-4" />
            ) : (
              <ClockIcon className="w-4 h-4" />
            )}
          </Badge>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="border-t border-gray-200">
      <div className="overflow-x-auto rounded-2xl">
        <Table
          aria-label="Weighing records table"
          className="min-w-full"
          selectionMode="none"
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn
                key={column.key}
                className="cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => column.sortable && onSort(column.key)}
                allowsSorting={column.sortable}
              >
                <div className="flex items-center justify-between">
                  {column.label}
                  {column.sortable && getSortIcon(column.key)}
                </div>
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent="Nenhum registro encontrado">
            {records.map((record) => (
              <TableRow key={record.id}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {renderCell(record, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
