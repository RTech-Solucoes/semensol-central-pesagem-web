"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { FleetManagement } from "@/components/fleet/fleet-management";

export default function FleetPage() {
  return (
    <MainLayout>
      <FleetManagement />
    </MainLayout>
  );
}