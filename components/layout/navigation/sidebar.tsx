"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {NavItem} from "@/types/NavItem";
import Image from "next/image";

export function Sidebar({navigation} : {navigation: NavItem[]}) {
  const pathname = usePathname();

  const selectedLinkIndex = navigation.findIndex((item) => item.href === pathname);

  const SidebarItem = ({ item } : { item: NavItem }) => {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-x-3 py-3.5 pr-6 pl-5",
          "text-sm leading-6 text-gray-700",
          "from-gray-100 to-transparent",
          "transition-all duration-500 group font-semibold  box-border",
          pathname === item.href ? "text-primary-600" :
            "hover:text-black hover:bg-gradient-to-r ",
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

  const SidebarItemListSection = ({section}: {section: string}) => {
    const navigationFilteredBySection = navigation.filter(item => item.section === section);

    return (
      <div className="relative">
        <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider px-6">
          {section.toUpperCase()}
        </div>
        <div className="mt-2">
          {navigationFilteredBySection.map((item) =>
            <SidebarItem
              key={item.name}
              item={item}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="hidden lg:flex flex-col min-w-[230px] z-20 sticky min-h-screen gap-y-7 bg-white">
      <div className="flex items-center gap-3 px-6 pt-4 shrink-0">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={74}
          height={74}
          className="h-10 w-auto"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-900">Semensol</h1>
          <p className="text-xs text-gray-500 font-medium">Sistema de pesagem</p>
        </div>
      </div>
      <nav className="flex flex-col h-full justify-between relative pb-4">
        <div
          style={
            selectedLinkIndex === navigation.length - 1
              ? { top: 'calc(100% - 100px)' }
              : { top: 52 * selectedLinkIndex }
          }
          className="
            flex items-center justify-start
            absolute w-full h-[52px] mt-8
            border-l-4 border-primary-600
            bg-gradient-to-r from-primary-100 to-transparent
            transition-all duration-300
          "
        />
        <SidebarItemListSection section="Operações" />
        <SidebarItemListSection section="Sistema" />
      </nav>
    </div>
  )
}