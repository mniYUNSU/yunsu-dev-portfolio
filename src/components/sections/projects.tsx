"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "@/components/ui/external-link-icon";

const sectionMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} satisfies Partial<HTMLMotionProps<"section">>;

const projects = [
  {
    title: "Design System Core",
    description:
      "Architected a headless component system with tokens, accessibility primitives, and automated visual regression coverage.",
    stack: ["Next.js", "Tailwind", "Storybook"],
    href: "#",
  },
  {
    title: "Realtime Collaboration Suite",
    description:
      "Led the front-end squad delivering multiplayer whiteboarding with CRDT-based syncing and optimistic UI.",
    stack: ["React", "Zustand", "Framer Motion"],
    href: "#",
  },
  {
    title: "Pricing Intelligence Platform",
    description:
      "Built dashboards that blend streaming analytics with advanced filtering, featuring sub-second interactions on large data sets.",
    stack: ["Next.js", "tRPC", "Tailwind"],
    href: "#",
  },
] as const;

export function ProjectsSection() {
  return (
    <motion.section
      id="projects"
      className="container space-y-10 py-24"
      {...sectionMotion}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle>Selected work</SectionTitle>
        <p className="max-w-xl text-sm text-foreground/70">
          Close collaboration with product, design, and data teams to deliver
          measurable outcomes. Here are a few highlights from recent product
          cycles.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="flex h-full flex-col gap-4 border-border/50 bg-background/65">
              <div className="flex items-center gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} className="bg-primary/10 text-xs text-primary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-foreground/75">{project.description}</p>
              </div>
              <div className="mt-auto">
                <Link
                  href={project.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
                >
                  View project
                  <ExternalLinkIcon className="size-4" />
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
