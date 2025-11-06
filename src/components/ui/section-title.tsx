import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Example:
 * ```tsx
 * <SectionTitle className="text-h2">
 *   Featured Projects
 * </SectionTitle>
 * ```
 */
type SectionTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function SectionTitle({
  className,
  children,
  ...props
}: SectionTitleProps) {
  return (
    <h2
      className={cn("text-balance text-h2 text-foreground", className)}
      {...props}
    >
      {children}
    </h2>
  );
}
