"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  TrendingUp,
  Truck,
  Users,
  Activity,
  ArrowUpRight,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

export function ExecutiveDashboard() {
  const kpis = [
    {
      title: "Pesagens Hoje",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: Scale,
      color: "green",
    },
    {
      title: "Em Operação",
      value: "8",
      status: "Ativo agora",
      icon: Activity,
      color: "blue",
    },
    {
      title: "Volume Total",
      value: "1848t",
      change: "+8.5%",
      trend: "up",
      icon: TrendingUp,
      color: "orange",
    },
    {
      title: "Eficiência",
      value: "94.2%",
      status: "Excelente",
      icon: CheckCircle,
      color: "emerald",
    },
  ];

  const quickActions = [
    {
      title: "Iniciar Pesagem",
      description: "Conectar balança e iniciar novo ciclo de pesagem",
      icon: Scale,
      color: "green",
      href: "/weighing",
    },
    {
      title: "Gerenciar Frota",
      description: "Cadastrar e gerenciar veículos da frota",
      icon: Truck,
      color: "blue",
      href: "/fleet",
    },
    {
      title: "Motoristas",
      description: "Cadastrar e gerenciar motoristas",
      icon: Users,
      color: "orange",
      href: "/drivers",
    },
    {
      title: "Parceiros",
      description: "Gerenciar empresas parceiras",
      icon: Truck,
      color: "purple",
      href: "/partners",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "completed",
      title: "Pesagem concluída - ABC-1234 (Soja)",
      time: "14:32",
      status: "Concluído",
    },
    {
      id: 2,
      type: "started",
      title: "Nova pesagem iniciada - DEF-5678 (Milho)",
      time: "14:28",
      status: "Em andamento",
    },
    {
      id: 3,
      type: "registered",
      title: "Novo motorista cadastrado - Carlos Lima",
      time: "13:45",
      status: "Concluído",
    },
    {
      id: 4,
      type: "maintenance",
      title: "Manutenção programada - Balança 02",
      time: "12:15",
      status: "Pendente",
    },
  ];

  const systemStatus = [
    { name: "Balança Principal", status: "Online", color: "green" },
    { name: "Balança Secundária", status: "Online", color: "green" },
    { name: "Backup Server", status: "Standby", color: "yellow" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard Executivo
          </h1>
          <p className="text-gray-600 mt-1">
            Visão geral das operações de pesagem e logística
          </p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Scale className="h-4 w-4 mr-2" />
            Nova Pesagem
          </Button>
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Relatórios
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {kpi.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {kpi.value}
                  </p>
                  {kpi.change && (
                    <p
                      className={`text-sm flex items-center gap-1 ${
                        kpi.trend === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                      {kpi.change} vs ontem
                    </p>
                  )}
                  {kpi.status && (
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        kpi.color === "brown"
                          ? "bg-brown-100 text-brown-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {kpi.status}
                    </Badge>
                  )}
                </div>
                <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                    kpi.color === "brown"
                      ? "bg-brown-100"
                      : "bg-gray-100"
                  }`}
                >
                  <kpi.icon
                    className={`h-6 w-6 ${
                      kpi.color === "brown"
                        ? "text-brown-600"
                        : "text-gray-600"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-brown-600" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border-2 border-dashed p-6 transition-all hover:border-solid hover:shadow-md cursor-pointer ${
                      "border-brown-200 hover:border-brown-300 hover:bg-brown-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {action.description}
                        </p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        "bg-brown-100"
                      }`}
                    >
                      <action.icon
                        className={`h-5 w-5 ${
                          "text-brown-600"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-brown-600" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div
                      className={`h-2 w-2 rounded-full mt-2 ${
                        activity.type === "completed"
                          ? "bg-brown-500"
                          : activity.type === "started"
                          ? "bg-brown-500"
                          : activity.type === "registered"
                          ? "bg-brown-500"
                          : "bg-brown-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        <Badge
                          variant={
                            activity.status === "Concluído"
                              ? "default"
                              : activity.status === "Em andamento"
                              ? "secondary"
                              : "outline"
                          }
                          className={`text-xs ${
                            activity.status === "Concluído"
                              ? "bg-brown-100 text-brown-700"
                              : activity.status === "Em andamento"
                              ? "bg-brown-100 text-brown-700"
                              : "bg-brown-100 text-brown-700"
                          }`}
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver Histórico Completo
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-brown-600" />
                Status do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemStatus.map((system, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {system.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        system.color === "brown"
                          ? "bg-brown-100 text-brown-700"
                          : "bg-brown-100 text-brown-700"
                      }`}
                    >
                      {system.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}