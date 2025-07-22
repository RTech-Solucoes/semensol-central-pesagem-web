"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { DriverManagement } from "@/components/drivers/driver-management";

export default function DriversPage() {
  return (
    <MainLayout>
      <DriverManagement />
    </MainLayout>
  );
}