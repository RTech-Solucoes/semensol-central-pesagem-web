import { Badge } from "@/components/ui/badge";
import { ClockIcon } from "@phosphor-icons/react";

export function CiclosAbertosList({ ciclos }: { ciclos: any[] }) {
  if (ciclos.length === 0)
    return <div className="text-center py-4"><p className="text-gray-500">Nenhum ciclo em andamento</p></div>;

  return (
    <div className="space-y-3">
      {ciclos.map((ciclo) => (
        <div key={ciclo.id_pesagem} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
          <div>
            <p className="font-medium text-amber-900">{ciclo.placa}</p>
            <p className="text-sm text-amber-700">{ciclo.motorista}</p>
          </div>
          <Badge variant="secondary" className="bg-amber-100 text-amber-700">
            <ClockIcon className="w-3 h-3 mr-1" />
            Em Andamento
          </Badge>
        </div>
      ))}
    </div>
  );
}