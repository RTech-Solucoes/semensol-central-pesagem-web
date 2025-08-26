'use client';

import Header from "../layout/header";
import QuickActions from "./quick-actions/quick-actions";

export default function DashboardView() {

  return (
    <section className="p-4 md:p-6">
      <Header title="Dashboard" subtitle="Visão geral das operações de pesagem e logística" />
      <QuickActions />
    </section>
  )
}