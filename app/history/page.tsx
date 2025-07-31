"use client";

import { Card } from "@/components/ui/card";
import { useWeighingHistory } from "@/hooks/use-weighing-history";
import HistoryHeader from "@/components/history/history-header";
import Filters from "@/components/history/filters";
import Table from "@/components/history/table";
import { FAB } from "@/components/ui/fab";
import { ExportModal } from "@/components/history/export-modal";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function HistoryPage() {
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
    <main>
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
        icon={DownloadSimpleIcon}
        label="Exportar"
        onClick={handleExport}
      />

      <ExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
      />
    </main>
  );
}