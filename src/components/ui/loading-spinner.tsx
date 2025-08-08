"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8 border-2",
    md: "h-16 w-16 border-8",
    lg: "h-24 w-24 border-8"
  };

  return (
    <div className="text-center py-12">
      <div
        className={cn(
          "animate-spin rounded-full border-gray-200 border-t-primary mx-auto mb-4",
          sizeClasses[size],
          className
        )}
      />
      {text && <p className="text-gray-500">{text}</p>}
    </div>
  );
}
