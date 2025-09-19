"use client";

import { Table } from "antd";
import { Badge } from "@/components/ui/badge";
import { CaretDownIcon, CaretUpDownIcon, CaretUpIcon, CheckCircleIcon, ClockIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Key, useCallback } from "react";
import {Column} from "rc-table";

interface WeighingRecord {
  key: number;
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


export default function Component({ records, sortConfig, onSort }: WeighingTableProps) {
  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <CaretUpDownIcon className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc"
      ? <CaretUpIcon className="h-4 w-4 text-primary-600" />
      : <CaretDownIcon className="h-4 w-4 text-primary-600" />;
  };

  let columns = [
    { dataIndex: "date", key: "date", title: "Data/Hora", sorter: onSort},
    { dataIndex: "plate", key: "plate", title: "Caminhão", sorter: onSort},
    { dataIndex: "driver", key: "driver", title: "Motorista", sorter: onSort},
    { dataIndex: "company", key: "company", title: "Empresa", sorter: onSort},
    { dataIndex: "cargo", key: "cargo", title: "Carga", sorter: onSort},
    { dataIndex: "entryWeight", key: "entryWeight", title: "Entrada (kg)", sorter: onSort},
    { dataIndex: "exitWeight", key: "exitWeight", title: "Saída (kg)", sorter: onSort},
    { dataIndex: "netWeight", key: "netWeight", title: "Líquido (kg)", sorter: onSort},
    { dataIndex: "status", key: "status", title: "Status", sorter: onSort},
  ];

  columns = columns.map((col) => {return {...col, defaultSortOrder: 'ascend', sorter: onSort }})

  const renderCell = useCallback((record: WeighingRecord, columnKey: Key) => {
    const cellValue = record[columnKey as keyof WeighingRecord];

    switch (columnKey) {
      case "date":
        return (
          <div className="text-sm">
            <div className="font-semibold">{record.date}</div>
            <div className="text-gray-500">{record.time}</div>
          </div>
        );
      case "plate":
        return <span className="font-semibold">{record.plate}</span>;
      case "netWeight":
        return <span className="font-semibold">{record.netWeight}</span>;
      case "status":
        return (
          <Badge
            variant="secondary"
            className={cn(
              "flex items-center w-fit space-x-1",
              record.status === "Concluído"
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-amber-100 text-amber-700 border-amber-200"
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
    <div className="flex-1 rounded-3xl m-4 mt-0 bg-gray-50 overflow-hidden">
      <Table
        className="font-sans mt-0 min-h-[557px]"
        pagination={{ pageSize: 6 }}
        showSorterTooltip={{ target: 'sorter-icon' }}
        dataSource={records}
      >
        {columns.map((col) => {
          return (
            <Column
              dataIndex={col.dataIndex}
              key={col.key}
              title={col.title}
              render={(_:any, record: WeighingRecord) => renderCell(record, col.key)}
            />
          )
        })}
      </Table>
    </div>
  );
}
