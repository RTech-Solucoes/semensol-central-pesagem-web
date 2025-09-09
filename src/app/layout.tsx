import "./globals.css";
import {Outfit as Font} from "next/font/google";
import {ThemeProvider} from "next-themes";
import {Toaster} from "@/components/ui/toaster";
import {cn} from "@/lib/utils";
import {NavigationWrapper} from "@/components/layout/navigation-wrapper";
import ptBR from 'antd/locale/pt_BR';
import {ConfigProvider} from "antd";
import {PWAInstaller} from "@/components/ui/pwa-installer";
import {IconProvider} from "@/components/providers/icon-provider";

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

export default function RootLayout({children}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR">
      <head>
        <meta name="mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
        <meta name="apple-mobile-web-app-title" content="Semensol Agro"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#4D3319"/>
        <link rel="icon" href="/images/favicon.ico"/>
        <link rel="apple-touch-icon" href="/images/logo.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <title>Semensol Agro</title>
      </head>
      <body
        className={cn(
          font.variable,
          "min-h-screen max-h-screen svg-background relative"
        )}
      >
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
      </body>
    </html>
  );
}
