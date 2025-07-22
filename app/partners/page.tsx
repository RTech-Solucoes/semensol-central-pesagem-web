"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PartnerManagement } from "@/components/partners/partner-management";

export default function PartnersPage() {
  return (
    <MainLayout>
      <PartnerManagement />
    </MainLayout>
  );
}