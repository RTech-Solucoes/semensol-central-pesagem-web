'use client';

import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  ActivityIcon,
  ClockIcon
} from "@phosphor-icons/react";
import { CicloAberto } from "./quick-actions";

interface IOngoingCicles {
  loading: boolean;
  ciclosAbertos: CicloAberto[];
}

export default function OngoingCicles({ loading, ciclosAbertos }: IOngoingCicles) {
  return (
    <div className="flex-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <ActivityIcon className="h-5 w-5" />
          Ciclos em Andamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSpinner size="sm" text="Carregando ciclos..." />
        ) : ciclosAbertos.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">Nenhum ciclo em andamento</p>
          </div>
        ) : (
          <div className="space-y-3">
            {ciclosAbertos.map((ciclo) => (
              <div key={ciclo.id_pesagem} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div>
                  <p className="font-medium text-amber-900">{ciclo.placa}</p>
                  <p className="text-sm text-amber-700">{ciclo.motorista}</p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-700"
                >
                  <ClockIcon className="w-3 h-3 mr-1" />
                  Em Andamento
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </div>
  )
}