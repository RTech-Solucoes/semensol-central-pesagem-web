import { Badge } from "@/components/ui/badge";
import { CheckCircleIcon, ClockIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function RecentActivityList({ activities }: { activities: any[] }) {
  if (activities.length === 0)
    return <div className="text-center py-4"><p className="text-gray-500">Nenhuma atividade recente</p></div>;

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
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
          <Badge className={cn("text-xs", activity.status === "concluido" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>
            {activity.status === "concluido" ? <CheckCircleIcon className="w-3 h-3" /> : <ClockIcon className="w-3 h-3" />}
          </Badge>
        </div>
      ))}
    </div>
  );
}