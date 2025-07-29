"use client";

import "./globals.css";
import {Lexend as Font} from "next/font/google";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/sonner";
import {cn} from "@/lib/utils";
import {Sidebar} from "@/components/layout/navigation/sidebar";
import {Bottombar} from "@/components/layout/navigation/bottombar";
import {NavItem} from "@/types/NavItem";
import {Handshake, History, IdCardLanyard, Home, Settings, Truck, Weight,} from "lucide-react";

const font = Font({
  subsets: ["latin"],
  display: "swap",
});

const navigation: NavItem[] = [
  { name: "Tela Inicial", href: "/", section: "Operações", icon: Home },
  { name: "Pesagem Ativa", href: "/weighing", section: "Operações", icon: Weight },
  { name: "Histórico", href: "/history", section: "Operações", icon: History },
  { name: "Frota", href: "/fleet", section: "Operações", icon: Truck },
  { name: "Motoristas", href: "/drivers", section: "Operações", icon: IdCardLanyard },
  { name: "Parceiros", href: "/partners", section: "Operações", icon: Handshake },
  { name: "Configurações", href: "/settings", section: "Sistema", icon: Settings },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <link rel="icon" href="/images/favicon.ico"/>
      <title>Semensol</title>
    </head>
    <body
      className={cn(
        font.className,
        "bg-white relative"
      )}
    >
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="
            flex min-h-screen overflow-hidden
          ">
            <Sidebar navigation={navigation}/>
            <Bottombar navigation={navigation}/>
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}