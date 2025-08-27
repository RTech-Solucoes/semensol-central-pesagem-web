"use client";

import Header from "@/components/layout/header";
import CardSettings from "@/components/settings/card-settings";

export default function SettingsPage() {
  return (
    <section className="p-4 md:p-6">
      <Header title="Configurações do Sistema" subtitle="Funcionalidade em desenvolvimento" />
      <CardSettings />
    </section>
  );
}