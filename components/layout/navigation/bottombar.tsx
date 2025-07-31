"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn, selectedClasses} from "@/lib/utils";
import {NavItem} from "@/types/NavItem";

export function Bottombar({navigation} : {navigation: NavItem[]}) {
  const pathname = usePathname();

  const isSelected = (href: string) => href === pathname

  return (
    <nav className={
      cn(
        "flex xl:hidden items-center justify-between",
        "w-full h-fit p-3 pb-3 mx-auto",
        "max-w-md rounded-3xl",
        "fixed z-20 left-0 right-0 bottom-4",
        "bg-popover drop-shadow-2xl",
      )
    }>
      {navigation.filter(item => item.section === "Operações").map((item) =>
        <Link
          key={item.name}
          href={item.href}
          className="flex flex-col items-center relative"
        >
          <div
            className={cn(
              "absolute -bottom-2 opacity-0 transition-all duration-200",
              "rounded-full bg-primary-600 w-3 h-1 mx-auto",
              selectedClasses(isSelected(item.href), "opacity-100 bottom-1.5")
            )}
          />
          <item.icon
            weight={isSelected(item.href) ? "fill" : "bold"}
            className={cn(
              "w-8 h-8 p-3 box-content rounded-2xl",
              "transition-all duration-200",
              "text-gray-300 bg-popover",
              selectedClasses(isSelected(item.href), "text-primary-600 bg-primary-100 pt-2.5 pb-3.5")
            )}
            aria-hidden="true"
          />
        </Link>
      )}
    </nav>
  )
}