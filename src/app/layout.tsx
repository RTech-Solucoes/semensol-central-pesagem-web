import "./globals.css";
import { Outfit as Font } from "next/font/google";
import { cn } from "@/lib/utils";
import { Provider } from "@/providers/provider";
import {ReactNode} from "react";
import {Metadata} from "next";

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

export const metadata: Metadata = {
  title: "Semensol Pesagem",
  description: "Software de Controle de Pesagem Semensol",
  icons: {
    icon: {
      url: "/images/favicon.ico",
      sizes: "any",
    },
    shortcut: "/images/favicon.ico",
  },
};

export default function RootLayout({ children }: {
  children: ReactNode;
}) {

  return (
    <html lang="pt-BR">
      <body
        className={cn(
          font.variable,
          "min-h-screen max-h-screen svg-background relative"
        )}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
