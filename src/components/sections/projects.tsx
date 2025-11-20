"use client";

import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Github } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "@/components/ui/external-link-icon";
import { useMediaQuery } from "@/lib/use-media-query";
import { projects, type Project } from "@/data/projects";
import { useLocale } from "@/context/locale-context";
import { sectionMotion } from "@/styles/animations";

const ProjectDetailModal = dynamic(
  () => import("./projects-modal").then((mod) => mod.ProjectDetailModal),
  { ssr: false },
);

export function ProjectsSection() {
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const isLgUp = useMediaQuery("(min-width: 1024px)");
  const revealDuration = isMdUp ? 0.55 : 0.38;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { translations } = useLocale();

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
          <SectionTitle>{translations.sections.projects.title}</SectionTitle>
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
                showWindowControls={false}
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
                    loading={index === 0 ? "eager" : "lazy"}
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
                        {translations.projects.viewProject}
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
        {selectedProject ? (
          <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
