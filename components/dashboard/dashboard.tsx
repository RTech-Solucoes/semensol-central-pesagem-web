"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Activity, CheckCircle, Clock, Handshake, IdCardLanyard, TrendingUp, Truck, Weight, Zap,} from "lucide-react";
import {cn} from "@/lib/utils";
import Link from "next/link";

export function Dashboard() {

  const quickActions = [
    {
      title: "Iniciar Pesagem",
      description: "Iniciar novo ciclo de pesagem",
      icon: Weight,
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
      title: "Gerenciar Motoristas",
      description: "Cadastrar e gerenciar motoristas",
      icon: IdCardLanyard,
      color: "orange",
      href: "/drivers",
    },
    {
      title: "Gerenciar Parceiros",
      description: "Gerenciar empresas parceiras",
      icon: Handshake,
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
  ];

  const systemStatus = [
    {name: "Balança R1", status: "Online"},
    {name: "Balança R2", status: "Offline"},
  ];

  return (
    <div className="flex flex-col w-full space-y-8 page-animation">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Dashboard
          </h1>
          <p className="text-gray-200 mt-1">
            Visão geral das operações de pesagem e logística
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-primary-900 hover:bg-primary-900/70">
            <Weight className="h-4 w-4 mr-2"/>
            Nova Pesagem
          </Button>
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2"/>
            Relatórios
          </Button>
        </div>
      </div>

      <Card className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex flex-col lg:col-span-2 border-r">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary-600"/>
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <div className="grid grid-cols-1 h-full gap-4 sm:grid-cols-2 auto-rows-fr">
              {quickActions.map((action, index) => (
                <Link
                  href={action.href}
                  key={index}
                  className="
                    flex gap-4 items-center p-6 relative overflow-hidden
                    rounded-2xl border-2 border-dashed border-primary-300
                    transition-all duration-200
                    cursor-pointer brick-animation
                    hover:border-solid hover:bg-primary-100
                    group
                  "
                >
                  <div className="
                    flex items-center justify-center bg-primary-100
                    flex-shrink-0 h-16 w-16 rounded-2xl
                    transition-all duration-200 z-10
                    group-hover:bg-transparent
                  ">
                    <action.icon className="
                      h-10 w-10 text-primary-600 transition-all duration-200
                      group-hover:h-16 group-hover:w-16
                    "/>
                  </div>
                  <div className="absolute -top-4 -right-4">
                    <action.icon
                      className="
                        text-primary-300
                        h-16 w-16
                      "
                    />
                  </div>
                  <div className="flex flex-col transition-all duration-200 z-10">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {action.title}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </div>
        <div>
          <div className="h-fit border-b">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary-600"/>
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full mt-2 bg-primary-600"/>
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <Badge
                      className={cn(
                        "text-xs p-1 ml-auto",
                        activity.status === "Concluído"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      )}
                    >
                      {
                        activity.status === "Concluído"
                          ? <CheckCircle className="w-4 h-4"/>
                          : <Clock className="w-4 h-4"/>
                      }
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
          <div>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary-600"/>
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
                      className={`flex gap-1 text-xs ${
                        system.status === "Online"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <div
                        className={cn(
                          "w-1 h-1 rounded-full",
                          system.status === "Online"
                            ? "bg-green-700"
                            : "bg-red-700"
                        )}
                      />
                      {system.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}