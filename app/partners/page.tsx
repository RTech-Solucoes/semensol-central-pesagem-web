"use client";

import Header from "@/components/layout/header";
import CardPartners from "@/components/partners/card-partners";

export default function PartnersPage() {
  return (
    <section className="p-4 md:p-6">
      <Header title="Gerenciamento de Parceiros" subtitle="Funcionalidade em desenvolvimento" />
      <CardPartners />
    </section>
  );
}