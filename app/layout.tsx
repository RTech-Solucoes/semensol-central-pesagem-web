"use client";

import "./globals.css";
import {Outfit as Font} from "next/font/google";
import { ThemeProvider } from "next-themes";
import {Toaster} from "@/components/ui/toaster";
import {cn} from "@/lib/utils";
import {Navbar} from "@/components/layout/navbar";
import {NavItem} from "@/types/nav-item";
import {
  ClockIcon,
  HandshakeIcon,
  HouseIcon,
  IdentificationCardIcon,
  GearIcon,
  TruckIcon,
  BarbellIcon
} from "@phosphor-icons/react";
import { IconContext } from "@phosphor-icons/react";

const font = Font({
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ],
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const navigation: NavItem[] = [
  {name: "Tela Inicial", href: "/", section: "Operações", icon: HouseIcon},
  {name: "Pesagem Ativa", href: "/weighing", section: "Operações", icon: BarbellIcon},
  {name: "Histórico", href: "/history", section: "Operações", icon: ClockIcon},
  {name: "Frota", href: "/fleet", section: "Operações", icon: TruckIcon},
  {name: "Motoristas", href: "/drivers", section: "Operações", icon: IdentificationCardIcon},
  {name: "Parceiros", href: "/partners", section: "Operações", icon: HandshakeIcon},
  // {name: "Configurações", href: "/settings", section: "Sistema", icon: GearIcon},
];

export default function RootLayout({children}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <link rel="icon" href="/images/favicon.ico"/>
        <title>Semensol Agro</title>
      </head>
      <body
        className={cn(
          font.className,
          "flex flex-col min-h-screen max-h-screen waves-background relative"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <IconContext.Provider
            value={{
              size: 32,
              weight: "bold",
              mirrored: false,
              "aria-hidden": true,
            }}
          >
            {children}
            <Navbar navigation={navigation}/>
            <Toaster/>
          </IconContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}