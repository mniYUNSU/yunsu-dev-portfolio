import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Example:
 * ```tsx
 * <Badge className="bg-brand/10 text-brand-600">
 *   Next.js
 * </Badge>
 * ```
 */
type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/50 bg-surface/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-200",
        className,
      )}
      {...props}
    />
  );
}

export const Tag = Badge;
