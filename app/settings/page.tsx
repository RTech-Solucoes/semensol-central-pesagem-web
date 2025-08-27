"use client";

import Header from "@/components/layout/header";
import SettingsCard from "@/components/settings/settings-card";

export default function SettingsPage() {
  return (
    <section className="p-4 md:p-6">
      <Header title="Configurações do Sistema" subtitle="Funcionalidade em desenvolvimento" />
      <SettingsCard />
    </section>
  );
}