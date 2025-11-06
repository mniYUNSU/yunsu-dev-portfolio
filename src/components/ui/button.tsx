"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_10px_40px_-15px_rgba(125,211,252,0.65)] hover:shadow-[0_10px_45px_-12px_rgba(125,211,252,0.7)]",
  secondary:
    "bg-slate-800/40 text-foreground hover:bg-slate-800/70 dark:bg-slate-800/60 dark:hover:bg-slate-700/70",
  ghost:
    "bg-transparent text-foreground hover:bg-white/10 dark:hover:bg-white/5",
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
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          buttonVariants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
