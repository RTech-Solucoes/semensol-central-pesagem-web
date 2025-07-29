"use client";

import { Card } from "@/components/ui/card";
import { useWeighingHistory } from "@/hooks/use-weighing-history";
import HistoryHeader from "./components/history-header";
import Filters from "./components/filters";
import Table from "./components/table";
import { FAB } from "@/components/ui/fab";
import { ExportModal } from "./export-modal";
import { Download } from "lucide-react";
import { useState } from "react";

export function WeighingHistory() {
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const {
    filters,
    setFilters,
    sortConfig,
    sortedRecords,
    clearFilters,
    handleSort,
  } = useWeighingHistory();

  const handleExport = () => {
    setExportModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full space-y-8 page-animation">
      <HistoryHeader />

      <Card className="flex flex-col">
        <Filters
          filters={filters}
          setFilters={setFilters}
          onClearFilters={clearFilters}
        />
        <Table
          records={sortedRecords}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </Card>

      <FAB
        icon={Download}
        label="Exportar"
        onClick={handleExport}
      />

      <ExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
      />
    </div>
  );
}