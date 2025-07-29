"use client";

import {CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {CheckCircle, ChevronDown, ChevronsUpDown, ChevronUp, Clock, Weight,} from "lucide-react";
import {cn} from "@/lib/utils";

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
];

export default function Component({ records, sortConfig, onSort }: WeighingTableProps) {
  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc"
      ? <ChevronUp className="h-4 w-4 text-primary-600" />
      : <ChevronDown className="h-4 w-4 text-primary-600" />;
  };

  return (
    <div className="border-t border-gray-200">
      <div className="overflow-x-auto rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              {tableCols.map((col, index) => (
                <TableHead
                  key={index}
                  className="cursor-pointer hover:bg-gray-50 select-none"
                  onClick={() => onSort(col.key)}
                >
                  <div className="flex items-center justify-between">
                    {col.label}
                    {getSortIcon(col.key)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
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
    </div>
  );
}
