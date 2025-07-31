import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icon as PhosphorIcon } from "@phosphor-icons/react";

interface FABProps {
  icon: PhosphorIcon;
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
  size = "default"
}: FABProps) {
  return (
    <Button
      onClick={onClick}
      variant="fab"
      size={size}
      className={cn(
        "fixed z-50",
        "bottom-28 right-4",
        "xl:bottom-12 xl:right-14",
        "transition-all duration-500",
        "h-fit w-fit p-5 rounded-full",
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
