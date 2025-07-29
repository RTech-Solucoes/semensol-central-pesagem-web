"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface WeighingHistoryHeaderProps {
  onExport: () => void;
}

export default function Component({ onExport }: WeighingHistoryHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Histórico de Pesagens
        </h1>
        <p className="text-gray-200 mt-1">
          Consulte o histórico completo de pesagens
        </p>
      </div>
      <Button className="bg-primary-900 hover:bg-primary-900/70" onClick={onExport}>
        <Download className="h-4 w-4 mr-2" />
        Exportar
      </Button>
    </div>
  );
}
