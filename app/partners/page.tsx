"use client";

import Header from "@/components/layout/header";
import PartnersCard from "@/components/partners/partners-card";

export default function PartnersPage() {
  return (
    <section className="p-4 md:p-6">
      <Header title="Gerenciamento de Parceiros" subtitle="Funcionalidade em desenvolvimento" />
      <PartnersCard />
    </section>
  );
}