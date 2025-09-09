"use client";

import { ThemeProvider } from "next-themes";
import { ConfigProvider } from "antd";
import ptBR from 'antd/locale/pt_BR';
import { IconProvider } from "@/components/providers/icon-provider";
import { NavigationWrapper } from "@/components/layout/navigation-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { PWAInstaller } from "@/components/ui/pwa-installer";
import { ReactNode, useEffect, useState } from "react";

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ConfigProvider locale={ptBR}>
        <IconProvider>
          <main>
            <NavigationWrapper />
            {children}
          </main>
          <Toaster/>
          <PWAInstaller/>
        </IconProvider>
      </ConfigProvider>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ConfigProvider locale={ptBR}>
        <IconProvider>
          <main>
            <NavigationWrapper />
            {children}
          </main>
          <Toaster/>
          <PWAInstaller/>
        </IconProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}
