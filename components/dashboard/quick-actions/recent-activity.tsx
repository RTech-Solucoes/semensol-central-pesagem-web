'use client';

import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";
import {
  CheckCircleIcon,
  ClockIcon
} from "@phosphor-icons/react";
import { HistoricoItem } from "./quick-actions";

interface IRecentActivity {
  loading: boolean;
  recentActivity: HistoricoItem[];
}

export default function RecentActivity({ loading, recentActivity }: IRecentActivity) {
  return (
    <div className="flex-1 border-b 2xl:border-r 2xl:border-b-0 border-dashed">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <ClockIcon className="h-5 w-5" />
          Atividade Recente
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSpinner size="sm" text="Carregando atividades..." />
        ) : recentActivity.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">Nenhuma atividade recente</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full mt-2 bg-primary-600" />
                <div className="flex flex-col flex-1">
                  <p className="text-sm font-medium text-card-foreground">
                    {activity.placa} - {activity.motorista}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.data_entrada).toLocaleString('pt-BR')}
                  </p>
                </div>
                <Badge
                  className={cn(
                    "text-xs",
                    activity.status === "concluido"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  )}
                >
                  {activity.status === "concluido" ? (
                    <CheckCircleIcon className="w-3 h-3" />
                  ) : (
                    <ClockIcon className="w-3 h-3" />
                  )}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </div>
  )
}