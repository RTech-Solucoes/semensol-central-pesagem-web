"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {NavItem} from "@/types/nav-item";
import Logo from "@/components/layout/logo";

export function Navbar({navigation} : {navigation: NavItem[]}) {
  const pathname = usePathname();

  const isSelected = (href: string) => href === pathname

  return (
    <div className="navbar">
      {/*<Logo className="navbar-logo"/>*/}
      <nav className="navbar-inner">
        {navigation.map((item) =>
          <Link
            style={{ '--item-name': `'${item.name}'` }}
            data-active={isSelected(item.href).toString()}
            className="navbar-link"
            key={item.name}
            href={item.href}
          >
            <item.icon
              className="navbar-icon"
              weight={isSelected(item.href) ? "fill" : "bold"}
              data-active={isSelected(item.href).toString()}
              aria-label={item.name}
            />
          </Link>
        )}
      </nav>
    </div>
  )
}