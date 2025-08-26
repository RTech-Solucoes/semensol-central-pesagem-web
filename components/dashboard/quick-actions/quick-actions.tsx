'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClockIcon,
  IdentificationCardIcon,
  LightningIcon,
  TruckIcon
} from "@phosphor-icons/react";
import Link from "next/link";
import WeightIcon from "../../icons/WeightIcon";
import OngoingCicles from "./ongoing-cicles";
import RecentActivity from "./recent-activity";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";

export interface CicloAberto {
  id_pesagem: number;
  placa: string;
  motorista: string;
}

export interface HistoricoItem {
  id: number;
  placa: string;
  motorista: string;
  peso_entrada: number;
  peso_saida?: number;
  data_entrada: string;
  data_saida?: string;
  status: string;
}

export default function QuickActions() {
  const [ciclosAbertos, setCiclosAbertos] = useState<CicloAberto[]>([]);
  const [recentActivity, setRecentActivity] = useState<HistoricoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [recentActivity, ciclosAbertos]);

  const loadDashboardData = async () => {
    setLoading(true);

    const [ciclosResponse, historicoResponse] = await Promise.all([
      apiClient.getCiclosAbertos(),
      apiClient.getHistorico()
    ]);

    if (ciclosResponse.data) {
      setCiclosAbertos(ciclosResponse.data);
    }

    if (historicoResponse.data) {
      setRecentActivity(historicoResponse.data.slice(0, 5));
    }

    setLoading(false);
  };

  const quickActions = [
    {
      title: "Iniciar Pesagem",
      description: "Iniciar novo ciclo de pesagem",
      icon: WeightIcon,
      color: "green",
      href: "/weighing",
    },
    {
      title: "Gerenciar Frota",
      description: "Cadastrar e gerenciar veículos da frota",
      icon: TruckIcon,
      color: "blue",
      href: "/fleet",
    },
    {
      title: "Gerenciar Motoristas",
      description: "Cadastrar e gerenciar motoristas",
      icon: IdentificationCardIcon,
      color: "orange",
      href: "/drivers",
    },
    {
      title: "Histórico",
      description: "Consultar histórico de pesagens",
      icon: ClockIcon,
      color: "purple",
      href: "/history",
    },
  ];

  return (
    <Card className="w-full">
      <div className="grid grid-cols-1">
        <div className="flex flex-col border-b border-dashed">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <LightningIcon className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <div className="grid grid-cols-1 h-full gap-6 md:grid-cols-2 auto-rows-fr">
              {quickActions.map((action, index) => (
                <Link
                  href={action.href}
                  key={index}
                  className="
                      flex gap-4 items-center p-6 relative overflow-hidden
                      rounded-2xl border-4 border-dashed border-primary-200
                      transition-all duration-200
                      cursor-pointer brick-effect
                      hover:border-solid hover:bg-primary-100
                      group
                    "
                >
                  <action.icon
                    className="
                        absolute text-primary-100
                        -top-8 -right-8
                        h-24 w-24
                        2xl:-top-14 2xl:-right-12
                        2xl:h-36 2xl:w-36
                        group-hover:text-primary-200
                        transition-colors duration-200
                      "
                  />
                  <div className="flex items-center gap-4 relative">
                    <action.icon
                      className="
                          text-primary-600 h-14 w-14 p-3
                          bg-primary-100
                          group-hover:bg-primary-200
                          box-border rounded-2xl
                          transition-colors duration-200
                        "
                    />
                    <div className="flex flex-col transition-all duration-200">
                      <h3 className="text-lg sm:text-xl font-semibold text-card-foreground align-bottom group-hover:text-primary-600 transition-colors duration-200">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-400 group-hover:text-card-foreground transition-colors duration-200">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <RecentActivity loading={loading} recentActivity={recentActivity} />
        <OngoingCicles loading={loading} ciclosAbertos={ciclosAbertos} />
      </div>
    </Card>
  )
}