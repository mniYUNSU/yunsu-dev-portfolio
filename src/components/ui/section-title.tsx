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
      className={cn(
        "text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
