import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

type IconProps = ComponentProps<typeof ArrowUpRight>;

export function ExternalLinkIcon(props: IconProps) {
  return <ArrowUpRight aria-hidden="true" {...props} />;
}
