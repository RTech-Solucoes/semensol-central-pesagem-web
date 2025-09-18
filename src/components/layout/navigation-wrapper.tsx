"use client";

import { IconClock, IconHomeFilled, IconId, IconTruck } from "@tabler/icons-react";
import { IconWeight } from "@tabler/icons-react";
import { NavItem } from "@/types/nav-item";
import { Navbar } from "@/components/layout/navbar";

const navigation: NavItem[] = [
  {name: "Tela Inicial", href: "/", section: "Operações", icon: IconHomeFilled},
  {name: "Pesagem Ativa", href: "/weighing", section: "Operações", icon: IconWeight},
  {name: "Histórico", href: "/history", section: "Operações", icon: IconClock},
  {name: "Frota", href: "/fleet", section: "Operações", icon: IconTruck},
  {name: "Motoristas", href: "/drivers", section: "Operações", icon: IconId},
];

export function NavigationWrapper() {
  return <Navbar navigation={navigation} />;
}
