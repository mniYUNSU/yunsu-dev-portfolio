"use client";

import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion";
import { Github, X } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "@/components/ui/external-link-icon";
import { useMediaQuery } from "@/lib/use-media-query";
import { projects, type Project } from "@/data/projects";

const sectionMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
} satisfies Partial<HTMLMotionProps<"section">>;

export function ProjectsSection() {
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const isLgUp = useMediaQuery("(min-width: 1024px)");
  const revealDuration = isMdUp ? 0.55 : 0.38;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>, project: Project) => {
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedProject(project);
    }
  };

  // Breakpoints: single column on mobile, md introduces two-up layout, lg expands to three-card grid.
  return (
    <>
      <motion.section
        id="projects"
        className="mx-auto w-full max-w-[1200px] space-y-10 px-4 py-16 sm:px-6 md:py-24"
        {...sectionMotion}
        transition={{ duration: revealDuration, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionTitle>Selected work</SectionTitle>
          <p className="max-w-xl text-base leading-relaxed text-neutral-500 md:text-lg md:leading-relaxed lg:text-xl dark:text-neutral-400">
            Close collaboration with product, design, and data teams to deliver measurable outcomes. Here are a few
            highlights from recent product cycles.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{
                duration: isMdUp ? 0.45 : 0.32,
                delay: index * (isLgUp ? 0.08 : 0.06),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Card
                tabIndex={0}
                onKeyDown={(event) => handleCardKeyDown(event, project)}
                className="group flex h-full translate-y-0 flex-col overflow-hidden p-0 transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="relative h-48 w-full overflow-hidden sm:h-52">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    priority={index === 0}
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                    <span>{project.year}</span>
                    <span>{project.role}</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-h3">{project.title}</h3>
                    <p className="text-base leading-relaxed text-neutral-500 line-clamp-3 md:text-lg md:leading-relaxed lg:text-xl dark:text-neutral-400">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} className="bg-brand/10 text-xs text-brand-600">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                    {project.links.live && (
                      <Link
                        href={project.links.live}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live
                        <ExternalLinkIcon className="size-4" />
                      </Link>
                    )}
                    {project.links.github && (
                      <Link
                        href={project.links.github}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-neutral-200"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                    <Github className="size-4" aria-hidden="true" />
                  </Link>
                )}
                    <button
                      type="button"
                      className="ml-auto inline-flex items-center gap-2 rounded-lg border border-border/60 px-3 py-1.5 text-sm font-semibold text-neutral-600 transition hover:border-border/80 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-neutral-200"
                      onClick={() => setSelectedProject(project)}
                    >
                      More details
                      <ExternalLinkIcon className="size-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
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
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
                <button
                  type="button"
                  className="text-foreground absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/80 transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-6 overflow-y-auto p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h3 id="project-dialog-title" className="text-h3">
                      {selectedProject.title}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {selectedProject.year} · {selectedProject.role}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <Badge key={tech} className="bg-brand/10 text-xs text-brand-600">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-base leading-relaxed text-neutral-500 md:text-lg dark:text-neutral-400">
                  {selectedProject.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-[0.28em] dark:text-neutral-400">
                    Highlights
                  </h4>
                  <ul className="space-y-2 text-base leading-relaxed text-neutral-500 md:text-lg dark:text-neutral-300">
                    {selectedProject.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 inline-block size-1.5 rounded-full bg-brand/60" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {selectedProject.links.live && (
                    <Link
                      href={selectedProject.links.live}
                      className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-soft transition hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit live site
                      <ExternalLinkIcon className="size-4" />
                    </Link>
                  )}
                  {selectedProject.links.github && (
                    <Link
                      href={selectedProject.links.github}
                      className="inline-flex items-center gap-2 rounded-xl border border-border/60 px-4 py-2 text-sm font-semibold text-neutral-600 transition hover:border-border/80 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-neutral-200"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View repository
                      <Github className="size-4" aria-hidden />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
