"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {NavItem} from "@/types/NavItem";

export function Bottombar({navigation} : {navigation: NavItem[]}) {
  const pathname = usePathname();

  const selectedLinkIndex = navigation.findIndex((item) => item.href === pathname);

  const BottombarItem = ({ item } : { item: NavItem }) => {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center justify-center rounded-full relative w-12 h-12",
        )}
      >
        <item.icon
          className={cn(
            "w-6 h-6",
            "text-gray-300",
            pathname === item.href && "text-white"
          )}
          aria-hidden="true"
        />
      </Link>
    )
  }

  return (
    <div className="lg:hidden fixed flex items-center justify-center z-20 px-4 sm:px-6 lg:px-12 bottom-4 left-0 right-0">
      <nav
        className={cn(
          "flex rounded-full justify-between bg-white relative",
          "w-fit gap-4 p-4 py-2"
        )}
      >
        <div
          style={{
            left: (selectedLinkIndex * 64) + 8,
          }}
          className="absolute w-16 h-12 bg-primary-600 rounded-full transition-all duration-300 shadow-lg"
        />
        {navigation.filter(item => item.section === "Operações").map((item) =>
          <BottombarItem
            key={item.name}
            item={item}
          />
        )}
      </nav>
    </div>
  )
}