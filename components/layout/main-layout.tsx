"use client";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {

  return (
    <div className="
      flex w-full lg:max-h-screen
      lg:py-4 lg:pr-4
    ">
      <main
        className="
        waves-background bg-primary-700
        flex w-full py-8 pb-32 box-border
        px-4 sm:px-6 lg:px-12
        lg:rounded-3xl
        overflow-y-auto
      ">
        {children}
      </main>
    </div>
  );
}