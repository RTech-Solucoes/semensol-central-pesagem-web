"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { WeighingHistory } from "@/components/history/weighing-history";

export default function HistoryPage() {
  return (
    <MainLayout>
      <WeighingHistory />
    </MainLayout>
  );
}