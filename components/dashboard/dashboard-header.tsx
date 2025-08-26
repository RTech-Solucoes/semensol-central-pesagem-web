'use client';

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <h1 className="text-4xl font-bold font-display text-white">
        Dashboard
      </h1>
      <p className="text-gray-200">
        Visão geral das operações de pesagem e logística
      </p>
    </div>
  );
}
