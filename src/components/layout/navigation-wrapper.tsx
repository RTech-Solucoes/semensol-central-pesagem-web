"use client";

import { ClockIcon, HouseIcon, IdentificationCardIcon, TruckIcon } from "@phosphor-icons/react";
import WeightIcon from "@/components/icons/WeightIcon";
import { NavItem } from "@/types/nav-item";
import { Navbar } from "@/components/layout/navbar";

const navigation: NavItem[] = [
  {name: "Tela Inicial", href: "/", section: "Operações", icon: HouseIcon},
  {name: "Pesagem Ativa", href: "/weighing", section: "Operações", icon: WeightIcon},
  {name: "Histórico", href: "/history", section: "Operações", icon: ClockIcon},
  {name: "Frota", href: "/fleet", section: "Operações", icon: TruckIcon},
  {name: "Motoristas", href: "/drivers", section: "Operações", icon: IdentificationCardIcon},
];

export function NavigationWrapper() {
  return <Navbar navigation={navigation} />;
}
