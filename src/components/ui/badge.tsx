import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/60 bg-secondary/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-secondary-foreground/80",
        className,
      )}
      {...props}
    />
  );
}

export const Tag = Badge;
