"use client";

import CardFleet from "@/components/fleet/card-fleet/card-fleet";
import Header from "@/components/layout/header";

export default function FleetPage() {

  return (
    <section className="p-4 md:p-6">
      <Header title="Gerenciamento da Frota" subtitle="Cadastre e gerencie os veículos da frota" />

      <CardFleet />
    </section>
  );
}