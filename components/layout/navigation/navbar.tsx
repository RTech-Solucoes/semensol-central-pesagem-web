"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn, selectedClasses} from "@/lib/utils";
import {NavItem} from "@/types/NavItem";
import Logo from "@/components/layout/logo";

export function Navbar({navigation} : {navigation: NavItem[]}) {
  const pathname = usePathname();

  const selectedLinkIndex = navigation.findIndex((item) => item.href === pathname);

  const isSelected = (href: string) => href === pathname

  return (
    <div className="
      flex-row w-full px-4 py-6 sm:px-6 lg:px-12
      hidden xl:flex justify-between
      fixed z-20
    ">
      <Logo />
      <nav className="
        flex h-fit justify-between relative
        rounded-2xl p-2.5 shadow-lg gap-2 overflow-hidden
        bg-popover backdrop-blur-xl
      ">
        <div
          style={{
            left: selectedLinkIndex === 0 ? 32 : (52 * selectedLinkIndex) + 32,
          }}
          className="
            absolute bg-primary-600 w-fit h-full z-0
            transition-all duration-300
          "
        />
        {navigation.map((item) =>
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-2 py-2 px-4",
              "rounded-xl relative z-10 shrink-0",
              "text-sm leading-6 text-gray-400",
              "transition-colors duration-200 group font-medium box-border",
              selectedClasses(isSelected(item.href),
                "bg-primary-600 text-white",
                "hover:bg-primary-100 hover:text-primary-600"
              )
            )}
          >
            <item.icon
              weight={isSelected(item.href) ? "fill" : "bold"}
              className={cn(
                "h-5 w-5 shrink-0 transition-colors",
                selectedClasses(isSelected(item.href), "text-white")
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        )}
      </nav>
    </div>
  )
}