"use client";

import { useMemo } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/lib/use-media-query";

const sectionMotion = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-15% 0px -15% 0px" },
} satisfies Partial<HTMLMotionProps<"section">>;

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/yunsux",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yunsu",
    icon: Linkedin,
  },
] as const;

export function HeroSection() {
  const isMdUp = useMediaQuery("(min-width: 768px)");

  const headingVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: isMdUp ? 28 : 18 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: isMdUp ? 0.6 : 0.4,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    }),
    [isMdUp],
  );

  const subcopyVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: isMdUp ? 24 : 14 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: isMdUp ? 0.55 : 0.38,
          delay: 0.12,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    }),
    [isMdUp],
  );

  const ctaVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: isMdUp ? 24 : 12 },
      visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: isMdUp ? 0.45 : 0.3,
          delay: (isMdUp ? 0.25 : 0.18) + index * (isMdUp ? 0.1 : 0.08),
          ease: [0.16, 1, 0.3, 1],
        },
      }),
    }),
    [isMdUp],
  );

  // Breakpoints: single-column stacks on mobile, md introduces two-column grid, lg widens spacing and media tile.
  return (
    <motion.section
      id="home"
      className="mainComponentWrapper grid items-center gap-12 md:min-h-[70vh] md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-16 lg:gap-24"
      {...sectionMotion}
    >
      <div className="flex flex-col justify-center gap-8">
        <motion.div
          variants={headingVariants}
          className="flex flex-col gap-6 text-balance"
        >
          <Badge className="bg-brand/10 text-small text-brand-600 w-fit">
            Yunsu Kim · Product-focused Front-end
          </Badge>
          <h1 className="text-h1 text-foreground">
            Senior Front-end Engineer shaping immersive, accessible product
            experiences.
          </h1>
        </motion.div>

        <motion.p
          variants={subcopyVariants}
          className="max-w-2xl text-base leading-relaxed font-medium text-neutral-600 md:text-lg md:leading-relaxed lg:text-xl dark:text-neutral-300"
        >
          I build resilient customer journeys with React, Next.js, and motion
          systems—bridging design and engineering to launch experiences that
          feel effortless across devices.
        </motion.p>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {[
              {
                href: "#projects",
                label: "View My Work",
                className:
                  "inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground shadow-soft transition duration-200 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-base",
              },
              {
                href: "#contact",
                label: "Contact Me",
                className:
                  "inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-surface/80 px-5 py-2 text-sm font-semibold text-foreground transition duration-200 hover:border-border/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-base",
              },
            ].map((cta, index) => (
              <motion.span
                key={cta.label}
                custom={index}
                variants={ctaVariants}
              >
                <Link href={cta.href} className={cta.className}>
                  {cta.label}
                </Link>
              </motion.span>
            ))}
          </div>

          <motion.div
            variants={ctaVariants}
            custom={2}
            className="flex flex-wrap items-center gap-3"
            aria-label="Social media"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.span
                  key={social.label}
                  custom={index}
                  variants={ctaVariants}
                >
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    title={social.label}
                    className="border-border/60 bg-surface/80 hover:text-brand focus-visible:ring-brand/60 focus-visible:ring-offset-background inline-flex h-11 w-11 items-center justify-center rounded-xl border text-neutral-600 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:text-neutral-200"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </motion.span>
              );
            })}
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={ctaVariants}
        custom={3}
        className="relative mx-auto flex h-64 w-full max-w-xs items-center justify-center md:h-72 md:max-w-sm lg:h-80"
        aria-hidden="true"
      >
        <div className="from-brand/15 via-brand/30 to-brand/10 absolute inset-0 rounded-[2.25rem] bg-gradient-to-br blur-3xl" />
        <div className="border-border/50 bg-surface/80 shadow-elevated relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] border backdrop-blur">
          <div className="bg-surface/70 flex h-full w-full flex-col items-center justify-center gap-4 p-10 text-center">
            <span className="border-brand/40 bg-brand/10 text-small text-brand-600 rounded-full border px-4 py-1">
              Currently
            </span>
            <p className="max-w-[16rem] text-base leading-relaxed text-neutral-600 md:text-lg lg:text-xl dark:text-neutral-300">
              Leading design systems & motion strategy for growth-stage
              products.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
