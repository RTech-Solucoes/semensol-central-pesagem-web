import Link from "next/link";
import { QuickActionsProps } from "@/types/dashboard";

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 h-full gap-6 md:grid-cols-2 auto-rows-fr">
      {actions.map((action, index) => (
        <Link
          href={action.href}
          key={index}
          className="flex gap-4 items-center p-6 relative overflow-hidden rounded-2xl border-4 border-dashed border-primary-200 transition-all duration-200 cursor-pointer brick-effect hover:border-solid hover:bg-primary-100 group"
        >
          <action.icon
            className="absolute text-primary-100 -top-8 -right-8 h-24 w-24 2xl:-top-14 2xl:-right-12 2xl:h-36 2xl:w-36 group-hover:text-primary-200 transition-all duration-200"
          />
          <div className="flex items-center gap-4 relative">
            <action.icon
              className="text-primary-600 h-14 w-14 p-3 bg-primary-100 group-hover:bg-primary-200 box-border rounded-2xl transition-all duration-200"
            />
            <div className="flex flex-col transition-all duration-200">
              <h3 className="text-lg sm:text-xl font-semibold text-card-foreground align-bottom group-hover:text-primary-600 transition-all duration-200">
                {action.title}
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-card-foreground transition-all duration-200">
                {action.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
