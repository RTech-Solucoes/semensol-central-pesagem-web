"use client";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {

  return (
    <div className="flex w-full">
      <main className="
        waves-background
        flex w-full
        py-8 px-4 pb-24
        sm:px-6 lg:px-12 lg:pb-0
        lg:my-4 lg:mr-4 lg:rounded-3xl
        overflow-y-auto
      ">
        {children}
      </main>
    </div>
  );
}