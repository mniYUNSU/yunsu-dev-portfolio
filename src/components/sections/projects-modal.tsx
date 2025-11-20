"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "@/components/ui/external-link-icon";
import { Github, X } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectDetailModalProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="border-border/60 bg-surface max-h-[85vh] w-[92%] max-w-3xl overflow-hidden rounded-3xl border shadow-[0_32px_80px_-40px_rgba(15,15,35,0.65)] sm:w-[88%]"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
        exit={{ opacity: 0, y: 24, transition: { duration: 0.2 } }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-52 w-full overflow-hidden sm:h-64">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 60vw, 100vw"
            loading="lazy"
          />
          <button
            type="button"
            className="text-foreground absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/80 transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={onClose}
            aria-label="Close project details"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h3 id="project-dialog-title" className="text-h3">
                {project.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {project.year} · {project.role}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge key={tech} className="bg-brand/10 text-xs text-brand-600">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-base leading-relaxed text-neutral-500 md:text-lg dark:text-neutral-400">
            {project.description}
          </p>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
              Highlights
            </h4>
            <ul className="space-y-2 text-base leading-relaxed text-neutral-500 md:text-lg dark:text-neutral-300">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span className="mt-2 inline-block size-1.5 rounded-full bg-brand/60" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.links.live && (
              <a
                href={project.links.live}
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-soft transition hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                target="_blank"
                rel="noreferrer"
              >
                Visit live site
                <ExternalLinkIcon className="size-4" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 px-4 py-2 text-sm font-semibold text-neutral-600 transition hover:border-border/80 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-neutral-200"
                target="_blank"
                rel="noreferrer"
              >
                View repository
                <Github className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
