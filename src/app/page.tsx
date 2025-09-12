"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LightningIcon, ClockIcon, ActivityIcon } from "@phosphor-icons/react";
import WeightIcon from "@/components/icons/WeightIcon";
import { apiClient } from "@/lib/api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CiclosAbertosList } from "@/components/CiclosAbertosList/CiclosAbertosList";
import { CicloAberto, HistoricoItem } from "@/types/dashboardTypes";
import { QuickActionCard } from "@/components/quickActionCard/QuickActionCard";
import { RecentActivityList } from "@/components/recentActivityList/RecentActivityList";

export default function Home() {
  const [ciclosAbertos, setCiclosAbertos] = useState<CicloAberto[]>([]);
  const [recentActivity, setRecentActivity] = useState<HistoricoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

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
      icon: require("@phosphor-icons/react").TruckIcon,
      color: "blue",
      href: "/fleet",
    },
    {
      title: "Gerenciar Motoristas",
      description: "Cadastrar e gerenciar motoristas",
      icon: require("@phosphor-icons/react").IdentificationCardIcon,
      color: "orange",
      href: "/drivers",
    },
    {
      title: "Histórico",
      description: "Consultar histórico de pesagens",
      icon: require("@phosphor-icons/react").ClockIcon,
      color: "purple",
      href: "/history",
    },
  ];

  return (
    <section className="p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-4xl font-bold font-display text-white">
          Dashboard
        </h1>
        <p className="text-gray-200">
          Visão geral das operações de pesagem e logística
        </p>
      </div>

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
                  <QuickActionCard key={index} action={action} />
                ))}
              </div>
            </CardContent>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex-1 border-b md:border-r md:border-b-0 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ClockIcon className="h-5 w-5" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <LoadingSpinner size="sm" text="Carregando atividades..." />
                ) : (
                  <RecentActivityList activities={recentActivity} />
                )}
              </CardContent>
            </div>

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
                ) : (
                  <CiclosAbertosList ciclos={ciclosAbertos} />
                )}
              </CardContent>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}