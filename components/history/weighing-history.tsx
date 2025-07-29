"use client";

import { Card } from "@/components/ui/card";
import { useWeighingHistory } from "@/hooks/use-weighing-history";
import HistoryHeader from "./components/history-header";
import Filters from "./components/filters";
import Table from "./components/table";

export function WeighingHistory() {
  const {
    filters,
    setFilters,
    sortConfig,
    sortedRecords,
    clearFilters,
    handleSort,
    handleExport,
  } = useWeighingHistory();

  return (
    <div className="flex flex-col w-full space-y-8 page-animation">
      <HistoryHeader onExport={handleExport} />

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
    </div>
  );
}