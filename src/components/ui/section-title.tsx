import * as React from "react";
import { cn } from "@/lib/utils";

type SectionTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function SectionTitle({
  className,
  children,
  ...props
}: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
