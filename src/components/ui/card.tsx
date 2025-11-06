import * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-background/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur",
        "transition-colors duration-200 hover:border-border/80",
        className,
      )}
      {...props}
    />
  );
}
