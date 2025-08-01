"use client";

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

export default function Home() {

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
      title: "Gerenciar Parceiros",
      description: "Gerenciar empresas parceiras",
      icon: HandshakeIcon,
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
    <main>
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold  font-display text-white">
          Dashboard
        </h1>
        <p className="text-gray-200 mt-1">
          Visão geral das operações de pesagem e logística
        </p>
      </div>

      <Card className="grid grid-cols-1 2xl:grid-cols-3">
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
                      <h3 className="text-xl sm:text-2xl font-semibold text-card-foreground align-bottom group-hover:text-primary-600 transition-colors duration-200">
                        {action.title}
                      </h3>
                      <p className="text-sm sm:text-md text-medium text-gray-400 group-hover:text-card-foreground transition-colors duration-200">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </div>
        <div>
          <div className="h-fit border-b border-dashed">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ClockIcon className="h-5 w-5"/>
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
                        <p className="text-sm font-medium text-card-foreground">
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
                          ? <CheckCircleIcon className="w-4 h-4"/>
                          : <ClockIcon className="w-4 h-4"/>
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
                <ActivityIcon className="h-5 w-5"/>
                Status do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemStatus.map((system, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-card-foreground">
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
    </main>
  );
}