"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { WeighingCenter } from "@/components/weighing/weighing-center";

export default function WeighingPage() {
  return (
    <MainLayout>
      <WeighingCenter />
    </MainLayout>
  );
}