"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@radix-ui/react-dialog";
import { Transition } from "@headlessui/react";
import {
  LayoutDashboard,
  Weight,
  History,
  Truck,
  IdCardLanyard,
  Handshake,
  Settings,
  X, LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Pesagem Ativa", href: "/weighing", icon: Weight },
  { name: "Histórico", href: "/history", icon: History },
  { name: "Frota", href: "/fleet", icon: Truck },
  { name: "Motoristas", href: "/drivers", icon: IdCardLanyard },
  { name: "Parceiros", href: "/partners", icon: Handshake },
];

const systemNavigation: NavItem[] = [
  { name: "Configurações", href: "/settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  const NavItem = ({item} : {item: NavItem}) => {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-x-3 py-3.5 px-6",
          "text-sm leading-6 text-gray-700",
          "transition-colors group",
          "hover:text-black hover:bg-gray-100",
          pathname === item.href &&
            "bg-primary-100 text-primary-600 border-primary-600 " +
            "hover:bg-primary-100 hover:text-primary-600",
        )}
      >
        <item.icon
          className={cn(
            pathname === item.href
              ? "text-primary-600"
              : "text-gray-400 group-hover:text-black",
            "h-5 w-5 shrink-0 transition-colors"
          )}
          aria-hidden="true"
        />
        {item.name}
      </Link>
    )
  }

  const SidebarContent = () => (
    <div className="flex grow flex-col overflow-y-auto gap-y-7 bg-white shadow-lg">
      <div className="flex items-center gap-3 px-6 pt-4 shrink-0">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={74}
          height={74}
          className="h-10 w-auto"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-900">Semensol</h1>
          <p className="text-xs text-gray-500 font-medium">Sistema de pesagem</p>
        </div>
      </div>
      <nav className="flex flex-col">
        <div className="flex flex-col gap-y-7">
          <div>
            <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider px-6">
              OPERAÇÕES
            </div>
            <div className="mt-2">
              {navigation.map((item) => <NavItem key={item.name} item={item} />)}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider px-6">
              SISTEMA
            </div>
            <div className="mt-2">
              {systemNavigation.map((item) => <NavItem key={item.name} item={item} />)}
            </div>
          </div>
        </div>
      </nav>
      <div className="flex items-center gap-3 mb-2 mt-auto px-6 py-4">
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <span className="text-sm font-medium text-gray-900">
          Sistema Online
        </span>
      </div>
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