import { useState, useMemo } from "react";

export interface WeighingRecord {
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
    key: 1,
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
    key: 2,
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
    key: 3,
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
    key: 4,
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
    key: 5,
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
  {
    key: 6,
    date: "18/01/2025",
    time: "11:30",
    plate: "PQR-1122",
    driver: "Fernanda Alves",
    company: "Grãos Sul",
    cargo: "Trigo",
    entryWeight: "43.500",
    exitWeight: "17.200",
    netWeight: "26.300",
    status: "Concluído",
  },
  {
    key: 7,
    date: "17/01/2025",
    time: "15:45",
    plate: "STU-3344",
    driver: "Roberto Souza",
    company: "Rural Express",
    cargo: "Açúcar",
    entryWeight: "40.700",
    exitWeight: "14.800",
    netWeight: "25.900",
    status: "Concluído",
  },
  {
    key: 8,
    date: "17/01/2025",
    time: "13:20",
    plate: "VWX-5566",
    driver: "Luiza Martins",
    company: "Transportes Campo",
    cargo: "Farelo",
    entryWeight: "37.800",
    exitWeight: "12.900",
    netWeight: "24.900",
    status: "Pendente",
  },
  {
    key: 9,
    date: "17/01/2025",
    time: "09:10",
    plate: "YZA-7788",
    driver: "Marcos Pereira",
    company: "Agro Brasil Ltda",
    cargo: "Milho",
    entryWeight: "44.200",
    exitWeight: "16.300",
    netWeight: "27.900",
    status: "Concluído",
  },
  {
    key: 10,
    date: "16/01/2025",
    time: "16:50",
    plate: "BCD-9900",
    driver: "Sandra Ribeiro",
    company: "Grãos Sul",
    cargo: "Soja",
    entryWeight: "46.100",
    exitWeight: "18.400",
    netWeight: "27.700",
    status: "Concluído",
  },
  {
    key: 11,
    date: "16/01/2025",
    time: "14:35",
    plate: "EFG-1357",
    driver: "Antonio Ferreira",
    company: "Rural Express",
    cargo: "Fertilizante",
    entryWeight: "41.600",
    exitWeight: "15.700",
    netWeight: "25.900",
    status: "Em andamento",
  },
  {
    key: 12,
    date: "16/01/2025",
    time: "10:15",
    plate: "HIJ-2468",
    driver: "Claudia Nunes",
    company: "Transportes Campo",
    cargo: "Ração",
    entryWeight: "38.300",
    exitWeight: "13.500",
    netWeight: "24.800",
    status: "Concluído",
  },
  {
    key: 13,
    date: "15/01/2025",
    time: "17:25",
    plate: "KLM-3691",
    driver: "Ricardo Mendes",
    company: "Agro Brasil Ltda",
    cargo: "Algodão",
    entryWeight: "35.900",
    exitWeight: "11.200",
    netWeight: "24.700",
    status: "Concluído",
  },
  {
    key: 14,
    date: "15/01/2025",
    time: "12:40",
    plate: "NOP-4702",
    driver: "Juliana Barbosa",
    company: "Grãos Sul",
    cargo: "Milho",
    entryWeight: "42.800",
    exitWeight: "17.100",
    netWeight: "25.700",
    status: "Pendente",
  },
  {
    key: 15,
    date: "15/01/2025",
    time: "08:55",
    plate: "QRS-5813",
    driver: "Felipe Rocha",
    company: "Rural Express",
    cargo: "Trigo",
    entryWeight: "39.500",
    exitWeight: "14.600",
    netWeight: "24.900",
    status: "Concluído",
  },
  {
    key: 16,
    date: "14/01/2025",
    time: "15:10",
    plate: "TUV-6924",
    driver: "Cristina Lopes",
    company: "Transportes Campo",
    cargo: "Soja",
    entryWeight: "47.300",
    exitWeight: "19.200",
    netWeight: "28.100",
    status: "Concluído",
  },
  {
    key: 17,
    date: "14/01/2025",
    time: "11:25",
    plate: "WXY-7035",
    driver: "Daniel Cardoso",
    company: "Agro Brasil Ltda",
    cargo: "Farelo",
    entryWeight: "36.700",
    exitWeight: "12.800",
    netWeight: "23.900",
    status: "Em andamento",
  },
  {
    key: 18,
    date: "14/01/2025",
    time: "09:40",
    plate: "ZAB-8146",
    driver: "Patrícia Silva",
    company: "Grãos Sul",
    cargo: "Açúcar",
    entryWeight: "41.900",
    exitWeight: "16.400",
    netWeight: "25.500",
    status: "Concluído",
  },
  {
    key: 19,
    date: "13/01/2025",
    time: "16:30",
    plate: "CDE-9257",
    driver: "Gustavo Teixeira",
    company: "Rural Express",
    cargo: "Fertilizante",
    entryWeight: "43.800",
    exitWeight: "18.100",
    netWeight: "25.700",
    status: "Concluído",
  },
  {
    key: 20,
    date: "13/01/2025",
    time: "13:05",
    plate: "FGH-0368",
    driver: "Vanessa Dias",
    company: "Transportes Campo",
    cargo: "Milho",
    entryWeight: "40.200",
    exitWeight: "15.300",
    netWeight: "24.900",
    status: "Pendente",
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