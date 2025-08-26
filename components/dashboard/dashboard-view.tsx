'use client';

import DashboardHeader from "./dashboard-header";
import QuickActions from "./quick-actions/quick-actions";

export default function DashboardView() {

  return (
    <section className="p-4 md:p-6">
      <DashboardHeader />
      <QuickActions />
    </section>
  )
}