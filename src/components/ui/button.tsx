"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const baseButton =
  "relative isolate inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99]";

const buttonVariants = {
  primary:
    "text-slate-900 shadow-window border border-white/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(120,180,255,0.25))] dark:text-white dark:border-white/15 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(33,59,120,0.55))]",
  secondary:
    "text-foreground border border-white/30 bg-white/30 shadow-soft backdrop-blur-xl hover:bg-white/40 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
  ghost:
    "text-foreground border border-transparent bg-transparent hover:border-white/20 hover:bg-white/10 dark:hover:bg-white/5",
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
