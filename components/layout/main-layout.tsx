"use client";

import {useState} from "react";
import {Sidebar} from "./sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="lg:pl-72">
        <main className="py-8 px-4 sm:px-6 lg:px-12">
          {children}
        </main>
      </div>
    </div>
  );
}