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
} from "@phosphor-icons/react";
import WeightIcon from "@/components/icons/WeightIcon";
import { IconContext } from "@phosphor-icons/react";
import ptBR from 'antd/locale/pt_BR';
import {ConfigProvider} from "antd";
import {PWAInstaller} from "@/components/ui/pwa-installer";

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
  {name: "Pesagem Ativa", href: "/weighing", section: "Operações", icon: WeightIcon},
  {name: "Histórico", href: "/history", section: "Operações", icon: ClockIcon},
  {name: "Frota", href: "/fleet", section: "Operações", icon: TruckIcon},
  {name: "Motoristas", href: "/drivers", section: "Operações", icon: IdentificationCardIcon},
];

export default function RootLayout({children}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
        <meta name="apple-mobile-web-app-title" content="Semensol Agro"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#059669"/>
        <link rel="icon" href="/images/favicon.ico"/>
        <link rel="apple-touch-icon" href="/images/logo.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <title>Semensol Agro</title>
      </head>
      <body
        className={cn(
          font.variable,
          "flex flex-col min-h-screen max-h-screen waves-background relative"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ConfigProvider locale={ptBR}>
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
              <PWAInstaller/>
            </IconContext.Provider>
          </ConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}