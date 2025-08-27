"use client";

import CardDrivers from "@/components/drivers/drivers-card/card-drivers";
import Header from "@/components/layout/header";

export default function DriversPage() {
  return (
    <section className="p-4 md:p-6">
      <Header title="Gerenciamento de Motoristas" subtitle="Cadastre e gerencie os motoristas autorizados" />
      <CardDrivers />
    </section>
  );
}