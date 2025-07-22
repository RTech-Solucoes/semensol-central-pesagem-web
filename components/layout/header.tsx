"use client";

import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </Button>

      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            📅 Terça-Feira, 22 De Julho De 2025 • 🕐 08:34
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar pesagens, placas..."
              className="pl-10 w-full sm:w-64"
            />
          </div>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
              3
            </Badge>
          </Button>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-gray-900">
                João Silva
              </div>
              <div className="text-xs text-gray-500">
                Supervisor de Operações
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-brown-500 flex items-center justify-center">
              <span className="text-sm font-medium text-white">JS</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-brown-500"></div>
              <span className="text-xs text-brown-600 font-medium">
                Sistema Operacional
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}