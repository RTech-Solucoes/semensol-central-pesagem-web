"use client";

import Header from "@/components/layout/header";
import CardsWeighing from "@/components/weighing/cards-weighing";

export default function WeighingPage() {
  return (
    <section className="p-4 md:p-6">
      <Header title="Central de Pesagem" subtitle="Controle e monitoramento das operações de pesagem em tempo real" />
      <CardsWeighing />
    </section>
  );
}