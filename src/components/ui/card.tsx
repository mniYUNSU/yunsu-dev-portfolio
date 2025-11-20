import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Example:
 * ```tsx
 * <Card className="shadow-soft">
 *   <h3 className="text-h3">Card title</h3>
 *   <p className="text-muted">Supporting details live here.</p>
 * </Card>
 * ```
 */
type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card text-card-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated",
        className,
      )}
      {...props}
    />
  );
}
