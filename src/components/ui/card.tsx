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
type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  showWindowControls?: boolean;
};

export function Card({
  className,
  showWindowControls = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/30 bg-white/60 text-foreground shadow-window transition duration-300 backdrop-blur-[32px] dark:border-white/10 dark:bg-white/5",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.35),rgba(255,255,255,0.05))] before:opacity-90 before:content-[''] dark:before:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]",
        className,
      )}
      {...props}
    >
      <div className="relative z-[1]">
        {showWindowControls ? (
          <div className="mb-4 flex items-center gap-2">
            <span className="size-3 rounded-full bg-mac-chrome-red/90 shadow-[0_0_8px_rgba(255,95,86,0.5)]" />
            <span className="size-3 rounded-full bg-mac-chrome-yellow/90 shadow-[0_0_8px_rgba(255,189,46,0.4)]" />
            <span className="size-3 rounded-full bg-mac-chrome-green/90 shadow-[0_0_8px_rgba(40,201,64,0.45)]" />
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
