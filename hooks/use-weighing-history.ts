import { useState, useMemo } from "react";

export interface WeighingRecord {
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

export interface FilterState {
  startDate: string;
  endDate: string;
  driver: string;
  company: string;
  cargoType: string;
  plate: string;
}

export interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

const mockWeighingRecords: WeighingRecord[] = [
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

export function useWeighingHistory() {
  const [filters, setFilters] = useState<FilterState>({
    startDate: "",
    endDate: "",
    driver: "",
    company: "",
    cargoType: "",
    plate: "",
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "asc"
  });

  const filteredRecords = useMemo(() => {
    return mockWeighingRecords.filter(record => {
      const recordDate = record.date.split('/').reverse().join('-');
      if (filters.startDate && recordDate < filters.startDate) return false;
      if (filters.endDate && recordDate > filters.endDate) return false;

      if (filters.driver && !record.driver.toLowerCase().includes(filters.driver.toLowerCase())) return false;
      if (filters.plate && !record.plate.toLowerCase().includes(filters.plate.toLowerCase())) return false;
      if (filters.company && filters.company !== "all" && record.company !== filters.company) return false;
      if (filters.cargoType && filters.cargoType !== "all" && record.cargo !== filters.cargoType) return false;

      return true;
    });
  }, [filters]);

  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      if (!sortConfig.key) return 0;

      let aValue: any, bValue: any;

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
  }, [filteredRecords, sortConfig]);

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

  const handleSort = (key: string) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc"
    }));
  };

  const handleExport = () => {
    // Export logic here
    console.log("Exporting weighing history...");
  };

  return {
    filters,
    setFilters,
    sortConfig,
    sortedRecords,
    clearFilters,
    handleSort,
    handleExport,
  };
}
