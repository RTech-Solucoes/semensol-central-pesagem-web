"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@radix-ui/react-dialog";
import { Transition } from "@headlessui/react";
import {
  LayoutDashboard,
  Scale,
  History,
  Truck,
  Users,
  Building2,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Pesagem Ativa", href: "/weighing", icon: Scale },
  { name: "Histórico", href: "/history", icon: History },
  { name: "Frota", href: "/fleet", icon: Truck },
  { name: "Motoristas", href: "/drivers", icon: Users },
  { name: "Parceiros", href: "/partners", icon: Building2 },
];

const systemNavigation = [
  { name: "Configurações", href: "/settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-lg">
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brown-500 to-brown-600 flex items-center justify-center">
            <Scale className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">FarmLogistics</h1>
            <p className="text-xs text-gray-500 font-medium">PROFESSIONAL</p>
          </div>
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider">
              OPERAÇÕES
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? "bg-brown-50 text-brown-600 border-r-2 border-brown-600"
                        : "text-gray-700 hover:text-brown-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md py-2 px-3 text-sm leading-6 font-medium transition-colors"
                    )}
                  >
                    <item.icon
                      className={cn(
                        pathname === item.href
                          ? "text-brown-600"
                          : "text-gray-400 group-hover:text-brown-600",
                        "h-5 w-5 shrink-0 transition-colors"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider">
              SISTEMA
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {systemNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? "bg-brown-50 text-brown-600 border-r-2 border-brown-600"
                        : "text-gray-700 hover:text-brown-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md py-2 px-3 text-sm leading-6 font-medium transition-colors"
                    )}
                  >
                    <item.icon
                      className={cn(
                        pathname === item.href
                          ? "text-brown-600"
                          : "text-gray-400 group-hover:text-brown-600",
                        "h-5 w-5 shrink-0 transition-colors"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <div className="rounded-lg bg-gradient-to-r from-brown-50 to-brown-100 p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-brown-500"></div>
                <span className="text-sm font-medium text-gray-900">
                  Sistema Online
                </span>
              </div>
              <p className="text-xs text-gray-600">
                FarmLogistics Pro v2.1
                <br />
                © 2025 Todos os direitos reservados
              </p>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Transition.Root show={open} as={Fragment}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80 lg:hidden" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative mr-16 flex w-full max-w-xs flex-1 lg:hidden">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-gray-300"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
              <SidebarContent />
            </div>
          </Transition.Child>
        </Transition.Root>
      </Dialog>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent />
      </div>
    </>
  );
}