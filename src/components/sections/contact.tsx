"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sectionMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} satisfies Partial<HTMLMotionProps<"section">>;

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Share a bit more context (min 10 characters)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      // surface schema issues back through react-hook-form to drive inline errors.
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormValues | undefined;
        if (!field) return;
        setError(field, { type: "manual", message: issue.message });
      });
      return;
    }

    // Simulate async submission while we wire up a backend later.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("submitted");
    reset();
  });

  return (
    <motion.section
      id="contact"
      className="mainComponentWrapper grid gap-10 lg:grid-cols-[1fr_1fr]"
      {...sectionMotion}
    >
      <div className="space-y-6">
        <SectionTitle>Let&apos;s build together</SectionTitle>
        <p className="text-lead max-w-xl">
          Whether you&apos;re shipping a new product or levelling up an existing
          experience, I can help you bring clarity to your front-end roadmap.
          Drop a message and I&apos;ll be in touch shortly.
        </p>
        {status === "submitted" ? (
          <Card className="border-brand/40 bg-brand/10 text-brand border p-6 text-sm">
            Thanks! Your message is on its way. I&apos;ll respond within 1-2
            business days.
          </Card>
        ) : null}
      </div>

      <Card className="p-8">
        <form className="space-y-6" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <label
              className="text-foreground text-sm font-semibold"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="border-border/60 bg-background/70 text-foreground focus:border-brand focus:ring-brand/70 w-full rounded-xl border px-4 py-2 text-sm transition outline-none focus:ring-1"
              placeholder="Jane Doe"
              disabled={isSubmitting}
            />
            {errors.name ? (
              <p className="text-brand text-xs font-medium">
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              className="text-foreground text-sm font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="border-border/60 bg-background/70 text-foreground focus:border-brand focus:ring-brand/70 w-full rounded-xl border px-4 py-2 text-sm transition outline-none focus:ring-1"
              placeholder="you@example.com"
              autoComplete="email"
              disabled={isSubmitting}
            />
            {errors.email ? (
              <p className="text-brand text-xs font-medium">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              className="text-foreground text-sm font-semibold"
              htmlFor="message"
            >
              Project details
            </label>
            <textarea
              id="message"
              rows={4}
              {...register("message")}
              className="border-border/60 bg-background/70 text-foreground focus:border-brand focus:ring-brand/70 w-full rounded-xl border px-4 py-2 text-sm transition outline-none focus:ring-1"
              placeholder="Share goals, timelines, and what success looks like."
              disabled={isSubmitting}
            />
            {errors.message ? (
              <p className="text-brand text-xs font-medium">
                {errors.message.message}
              </p>
            ) : null}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send message"}
          </Button>
        </form>
      </Card>
    </motion.section>
  );
}
