"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const baseButton =
  "inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99]";

const buttonVariants = {
  primary:
    "border-border/80 bg-foreground/90 text-background shadow-soft hover:bg-foreground",
  secondary:
    "border-border/70 bg-card text-foreground shadow-soft hover:bg-card/80",
  ghost:
    "border-transparent bg-transparent text-foreground hover:border-border/60 hover:bg-surface/60",
} satisfies Record<string, string>;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseButton, buttonVariants[variant], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
