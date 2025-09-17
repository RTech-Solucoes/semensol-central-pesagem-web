import "./globals.css";
import { Outfit as Font } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClientProviders } from "@/components/providers/client-providers";
import { Provider } from "@/components/ui/provider"

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

export const metadata = {
  title: "Semensol Agro",
  themeColor: "#4D3319",
}


export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Semensol Agro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4D3319" />
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={cn(
          font.variable,
          "min-h-screen max-h-screen svg-background relative"
        )}
      >
        <Provider>
          <ClientProviders>
            {children}
          </ClientProviders>
        </Provider>
      </body>
    </html>
  );
}
