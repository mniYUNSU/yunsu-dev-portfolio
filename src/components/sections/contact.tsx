"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const sectionMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} satisfies Partial<HTMLMotionProps<"section">>;

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ??
  "https://formspree.io/f/yourFormId";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Share a bit more context (min 10 characters)"),
  honeypot: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: { name: "", email: "", message: "", honeypot: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormValues | undefined;
        if (!field) return;
        setError(field, { type: "manual", message: issue.message });
      });
      return;
    }

    // Honeypot triggered
    if (parsed.data.honeypot) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please reload the page and try again.",
      });
      return;
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          data?.message ??
            "Unable to send message right now. Try email instead.",
        );
      }

      toast({
        title: "Thanks! I’ll get back to you soon.",
        description: "Expect a reply within 1–2 business days.",
      });
      reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description:
          error instanceof Error
            ? error.message
            : "Please email me directly at hello@yunsu.dev.",
      });
    }
  });

  const errorText = (field: keyof ContactFormValues) => errors[field]?.message;

  return (
    <motion.section
      id="contact"
      className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1fr_1fr]"
      {...sectionMotion}
    >
      <div className="space-y-6">
        <SectionTitle>Let&apos;s build together</SectionTitle>
        <p className="text-base leading-relaxed text-neutral-500 md:text-lg dark:text-neutral-400">
          Whether you&apos;re shipping a new product or levelling up an existing
          experience, I can help shape the front-end roadmap, motion, and DX
          strategy. Prefer email?{" "}
          <a
            href="mailto:hello@yunsu.dev"
            className="text-brand font-semibold underline-offset-4 hover:underline"
          >
            hello@yunsu.dev
          </a>
        </p>
      </div>

      <Card className="p-8">
        <form className="space-y-6" onSubmit={onSubmit} noValidate>
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("honeypot")}
            />
          </div>

          <fieldset className="space-y-2">
            <label
              className="text-foreground text-sm font-semibold"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="border-border/60 bg-background/70 text-foreground focus:border-brand focus:ring-brand/70 w-full rounded-xl border px-4 py-2 text-sm transition outline-none focus:ring-1"
              placeholder="Jane Doe"
              disabled={isSubmitting}
            />
            {errorText("name") ? (
              <p
                id="name-error"
                role="status"
                className="text-brand text-xs font-medium"
              >
                {errorText("name")}
              </p>
            ) : null}
          </fieldset>

          <fieldset className="space-y-2">
            <label
              className="text-foreground text-sm font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="border-border/60 bg-background/70 text-foreground focus:border-brand focus:ring-brand/70 w-full rounded-xl border px-4 py-2 text-sm transition outline-none focus:ring-1"
              placeholder="you@example.com"
              disabled={isSubmitting}
            />
            {errorText("email") ? (
              <p
                id="email-error"
                role="status"
                className="text-brand text-xs font-medium"
              >
                {errorText("email")}
              </p>
            ) : null}
          </fieldset>

          <fieldset className="space-y-2">
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
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="border-border/60 bg-background/70 text-foreground focus:border-brand focus:ring-brand/70 w-full rounded-xl border px-4 py-2 text-sm transition outline-none focus:ring-1"
              placeholder="Share goals, timelines, and what success looks like."
              disabled={isSubmitting}
            />
            {errorText("message") ? (
              <p
                id="message-error"
                role="status"
                className="text-brand text-xs font-medium"
              >
                {errorText("message")}
              </p>
            ) : null}
          </fieldset>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send message"}
          </Button>
        </form>
      </Card>
    </motion.section>
  );
}
