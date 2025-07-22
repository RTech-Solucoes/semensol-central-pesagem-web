"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ExecutiveDashboard } from "@/components/dashboard/executive-dashboard";

export default function Home() {
  return (
    <MainLayout>
      <ExecutiveDashboard />
    </MainLayout>
  );
}