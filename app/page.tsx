"use client";

import {useState, useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {
  ActivityIcon,
  CheckCircleIcon,
  ClockIcon,
  HandshakeIcon,
  IdentificationCardIcon,
  TruckIcon,
  LightningIcon,
} from "@phosphor-icons/react";
import WeightIcon from "@/components/icons/WeightIcon";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {apiClient} from "@/lib/api";

interface CicloAberto {
  id_pesagem: number;
  placa: string;
  motorista: string;
}

interface HistoricoItem {
  id: number;
  placa: string;
  motorista: string;
  peso_entrada: number;
  peso_saida?: number;
  data_entrada: string;
  data_saida?: string;
  status: string;
}

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
    <main className="p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-4xl font-bold font-display text-white">
          Dashboard
        </h1>
        <p className="text-gray-200">
          Visão geral das operações de pesagem e logística
        </p>
      </div>

      <Card className="w-full max-w-none">
        <div className="grid grid-cols-1 2xl:grid-cols-3 min-h-[400px]">
          <div className="flex flex-col 2xl:col-span-2 border-r-0 border-b 2xl:border-b-0 2xl:border-r border-dashed">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <LightningIcon className="h-5 w-5"/>
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="grid grid-cols-1 h-full gap-4 md:grid-cols-2 auto-rows-fr">
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
                        2xl:h-44 2xl:w-44
                        group-hover:text-primary-200
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

          <div className="flex flex-col">
            <div className="flex-1 border-b border-dashed">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ClockIcon className="h-5 w-5"/>
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Carregando...</p>
                  </div>
                ) : recentActivity.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Nenhuma atividade recente</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full mt-2 bg-primary-600"/>
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
                            <CheckCircleIcon className="w-3 h-3"/>
                          ) : (
                            <ClockIcon className="w-3 h-3"/>
                          )}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </div>

            <div className="flex-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ActivityIcon className="h-5 w-5"/>
                  Ciclos em Andamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Carregando...</p>
                  </div>
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
                          <ClockIcon className="w-3 h-3 mr-1"/>
                          Em Andamento
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}