"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {NavItem} from "@/types/NavItem";

export function Bottombar({navigation} : {navigation: NavItem[]}) {
  const pathname = usePathname();
  const selectedClasses = (href, classes) => pathname === href && classes

  return (
    <nav className={
      cn(
        "lg:hidden w-full h-fit p-3 pb-0 mx-auto",
        "flex items-center justify-between",
        "fixed z-20 bottom-0 left-0 right-0",
        "border-t border-gray-200",
        "bg-white drop-shadow-2xl rounded-t-3xl",
        "sm:max-w-md sm:rounded-3xl sm:bottom-4 sm:border-0 sm:pb-3"
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
              selectedClasses(item.href, "opacity-100 bottom-1.5")
            )}
          />
          <item.icon
            className={cn(
              "w-8 h-8 p-3 box-content rounded-2xl",
              "transition-all duration-200",
              "text-gray-300 bg-white",
              selectedClasses(item.href, "text-primary-600 bg-primary-100 pt-2.5 pb-3.5")
            )}
            aria-hidden="true"
          />
        </Link>
      )}
    </nav>
  )
}