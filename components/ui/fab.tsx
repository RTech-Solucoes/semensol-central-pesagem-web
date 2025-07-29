import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FABProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function FAB({
  icon: Icon,
  label,
  onClick,
  className,
  variant = "default",
  size = "default"
}: FABProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={cn(
        "fixed z-50 shadow-lg hover:shadow-xl",
        "bottom-24 right-4",
        "sm:bottom-28 lg:bottom-16",
        "sm:right-6 lg:right-16",
        "transition-all duration-200 ease-in-out",
        "bg-primary-900 hover:bg-primary-900",
        "h-fit w-fit p-5 rounded-2xl",
        "flex items-center group",
        className
      )}
    >
      <Icon className="shrink-0 h-5 w-5" />
      <div className="
        transition-all duration-200
        max-w-0 overflow-hidden
        lg:group-hover:max-w-xs
        lg:group-hover:opacity-100
      ">
        <span className="pl-2 font-medium">
          {label}
        </span>
      </div>
    </Button>
  );
}
