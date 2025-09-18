"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { system } from "@/theme"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

import {Toaster} from "@/components/ui/toaster"
import {ConfigProvider} from "antd";
import ptBR from "antd/locale/pt_BR";
import {IconProvider} from "@/providers/icon-provider";
import {NavigationWrapper} from "@/components/layout/navigation-wrapper";
import {PWAInstaller} from "@/components/ui/pwa-installer";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props}>
        <ConfigProvider locale={ptBR}>
          <IconProvider>
            <main>
              <NavigationWrapper />
              {props.children}
            </main>
            <Toaster />
            <PWAInstaller />
          </IconProvider>
        </ConfigProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}
