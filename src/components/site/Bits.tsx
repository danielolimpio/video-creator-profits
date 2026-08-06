import { AppLink } from "./AppLink";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-2", className)}>
      <span className="inline-block h-px w-6 bg-current opacity-40" />
      {children}
    </p>
  );
}

export function Badge({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "primary" | "ink";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-tight",
        tone === "muted" && "border-border bg-secondary text-muted-foreground",
        tone === "primary" &&
          "border-primary/25 bg-primary/10 text-primary shadow-[0_6px_18px_-12px_var(--primary)]",
        tone === "ink" && "border-white/15 bg-white/10 text-ink-foreground",
      )}
    >
      {children}
    </span>
  );
}

type CtaProps = {
  to: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "ink";
  className?: string;
};

export function Cta({ to, children, variant = "primary", className }: CtaProps) {
  return (
    <AppLink
      to={to}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-300 [transition-timing-function:var(--ease-smooth)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "primary" &&
          "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:brightness-110",
        variant === "ghost" &&
          "border border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[var(--shadow-card)]",
        variant === "ink" &&
          "bg-ink text-ink-foreground hover:-translate-y-0.5 hover:brightness-125",
        className,
      )}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </AppLink>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "base",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "base" | "surface" | "ink";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden px-5 py-20 sm:px-8 lg:py-28",
        tone === "surface" && "bg-surface-2",
        tone === "ink" && "ink-panel",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  italic,
  intro,
  invert,
}: {
  eyebrow?: string;
  title: string;
  italic?: string;
  intro?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <Eyebrow className={invert ? "text-ink-foreground/60" : ""}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "mt-5 text-4xl leading-[1.05] font-semibold sm:text-5xl",
          invert && "text-ink-foreground",
        )}
      >
        {title}{" "}
        {italic ? (
          <span className="font-normal italic opacity-90">{italic}</span>
        ) : null}
      </h2>
      {intro ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            invert ? "text-ink-foreground/70" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "surface-card p-6 transition-all duration-500 [transition-timing-function:var(--ease-smooth)]",
        hover && "hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Hairline({ className }: { className?: string }) {
  return <div className={cn("hairline h-px w-full", className)} />;
}
