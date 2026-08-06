import { useState } from "react";
import { Check, Play, Wallet, ShieldCheck, Clock, Banknote } from "lucide-react";
import type { Dict, Locale } from "@/content/types";
import { pathFor } from "@/lib/seo";
import { Badge, Card, Cta, Eyebrow, Hairline, Section, SectionTitle } from "./Bits";

const BARS = [
  18, 42, 30, 58, 26, 70, 38, 52, 22, 64, 34, 48, 28, 74, 40, 20, 56, 32, 66, 24, 46, 36, 60, 30,
  50, 26, 68, 38, 44, 22,
];

export function Hero({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <section className="hero-bg relative overflow-hidden border-b border-border px-5 pt-16 pb-14 sm:px-8 lg:pt-24 lg:pb-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-rise">
          <Badge tone="primary">◆ {t.hero.badge}</Badge>
          <h1 className="mt-6 text-5xl leading-[0.98] font-semibold sm:text-6xl lg:text-7xl">
            {t.hero.titleA} <span className="font-normal italic">{t.hero.titleItalic}</span>{" "}
            {t.hero.titleB}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            {t.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Cta to={pathFor(locale, "earnings")}>{t.hero.ctaPrimary}</Cta>
            <Cta to={pathFor(locale, "how")} variant="ghost">
              {t.hero.ctaSecondary}
            </Cta>
          </div>
          <p className="mt-8 max-w-md border-l-2 border-primary pl-4 text-xs leading-relaxed text-muted-foreground">
            {t.hero.note}
          </p>
        </div>

        <div className="animate-fade flex justify-center lg:justify-end">
          <PhoneMock t={t} />
        </div>
      </div>
    </section>
  );
}

function PhoneMock({ t }: { t: Dict }) {
  const p = t.hero.phone;
  return (
    <div className="relative w-[310px] rounded-[2.6rem] border border-border bg-ink p-2.5 shadow-[var(--shadow-lift)]">
      <div className="absolute top-3 left-1/2 h-1.5 w-20 -translate-x-1/2 rounded-full bg-white/20" />
      <div className="overflow-hidden rounded-[2.1rem] bg-background p-4 pt-8">
        <p className="text-lg font-semibold tracking-tight">{p.greeting}</p>

        <div className="surface-card mt-4 p-4">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-medium text-primary">{p.card1.tag}</span>
            <span className="text-xs font-semibold">{p.card1.rate}</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold tracking-tight">{p.card1.title}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">{p.card1.sub}</p>
          <div className="mt-3 flex h-14 items-end gap-[3px]">
            {BARS.map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 rounded-sm bg-primary/70"
              />
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {p.rows.map((row) => (
            <div
              key={row.title}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2.5"
            >
              <div>
                <p className="text-xs font-semibold tracking-tight">{row.title}</p>
                <p className="text-[10px] text-muted-foreground">{row.sub}</p>
              </div>
              <span className="text-xs font-semibold">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="ink-panel mt-3 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-ink-foreground/55">{p.balanceLabel}</span>
            <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold tracking-widest text-primary-foreground">
              {p.paidTag}
            </span>
          </div>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-ink-foreground">
            {p.balance}
          </p>
          <p className="mt-1 text-[10px] text-ink-foreground/55">{p.balanceNote}</p>
        </div>
      </div>
    </div>
  );
}

export function StatsBar({ t }: { t: Dict }) {
  return (
    <div className="border-b border-border bg-surface-2">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-5 sm:px-8 md:grid-cols-4">
        {t.stats.map((s) => (
          <div key={s.label} className="px-2 py-7 text-center md:text-left">
            <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HowSection({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <Section id="how">
      <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionTitle
            eyebrow={t.how.eyebrow}
            title={t.how.title}
            italic={t.how.titleItalic}
            intro={t.how.intro}
          />
          <ol className="mt-10 space-y-8">
            {t.how.steps.map((step) => (
              <li key={step.n} className="grid grid-cols-[auto_1fr] gap-5">
                <span className="font-mono text-xs text-primary">{step.n}</span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Cta to={pathFor(locale, "how")}>{t.how.cta}</Cta>
          </div>
        </div>

        <div className="space-y-4">
          <div className="ink-panel rounded-3xl p-6 shadow-[var(--shadow-lift)]">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-ink-foreground/55">{t.how.panel.label}</span>
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-primary-foreground">
                {t.hero.phone.paidTag}
              </span>
            </div>
            <p className="eyebrow mt-5 text-ink-foreground/55">{t.how.panel.balanceLabel}</p>
            <p className="text-4xl font-semibold tracking-tight text-ink-foreground">
              {t.how.panel.balance}
            </p>
            <p className="mt-1 text-xs text-ink-foreground/55">{t.how.panel.note}</p>
            <div className="mt-6 space-y-2.5">
              {t.how.panel.lines.map((l) => (
                <div key={l.label} className="flex items-center justify-between text-xs">
                  <span className="text-ink-foreground/65">{l.label}</span>
                  <span className="font-semibold text-ink-foreground">{l.value}</span>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-tight">{t.how.panel.fieldTitle}</p>
              <span className="eyebrow">◆ 2026</span>
            </div>
            <Hairline className="my-4" />
            <div className="space-y-2.5">
              {t.how.panel.fields.map((f) => (
                <div key={f.label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="font-semibold">{f.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="eyebrow">{t.how.panel.timerLabel}</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-2xl font-semibold tracking-tight">{t.how.panel.timerValue}</p>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-widest text-primary">
                {t.how.panel.timerTag}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

export function WorkSection({ t, locale }: { t: Dict; locale: Locale }) {
  const [active, setActive] = useState(t.work.tabs[0]!.id);
  const tab = t.work.tabs.find((x) => x.id === active) ?? t.work.tabs[0]!;

  return (
    <Section tone="surface">
      <SectionTitle
        eyebrow={t.work.eyebrow}
        title={t.work.title}
        italic={t.work.titleItalic}
        intro={t.work.intro}
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {t.work.tabs.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setActive(x.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
              x.id === active
                ? "border-transparent bg-ink text-ink-foreground shadow-[var(--shadow-card)]"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card hover={false} className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="eyebrow">{t.work.playerLabel}</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t.work.playerTag}
            </span>
          </div>
          <p className="mt-2 font-mono text-sm">{t.work.playerFile}</p>
          <div className="mt-6 flex h-32 items-end gap-[3px]">
            {BARS.concat(BARS.slice(0, 14)).map((h, i) => (
              <span
                key={i}
                style={{ height: `${h + (i % 5) * 4}%` }}
                className={`flex-1 rounded-sm ${i % 3 === 0 ? "bg-primary" : "bg-primary/35"}`}
              />
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-secondary/60 px-4 py-3">
            <Play className="h-4 w-4 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed italic text-muted-foreground">
              {t.work.playerQuote}
            </p>
          </div>
        </Card>

        <Card hover={false}>
          <Eyebrow>◆ {tab.label}</Eyebrow>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">{tab.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tab.desc}</p>
          <Hairline className="my-5" />
          <div className="flex flex-wrap gap-2">
            {tab.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Cta to={pathFor(locale, "earnings")}>{t.work.ctaPrimary}</Cta>
            <Cta to={pathFor(locale, "how")} variant="ghost">
              {t.work.ctaSecondary}
            </Cta>
          </div>
        </Card>
      </div>
    </Section>
  );
}

const PAYOUT_ICONS = [Banknote, Wallet, ShieldCheck, Clock];

export function PayoutsSection({ t }: { t: Dict }) {
  return (
    <Section>
      <SectionTitle
        eyebrow={t.payouts.eyebrow}
        title={t.payouts.title}
        italic={t.payouts.titleItalic}
        intro={t.payouts.intro}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.payouts.cards.map((c, i) => {
          const Icon = PAYOUT_ICONS[i % PAYOUT_ICONS.length]!;
          return (
            <Card key={c.title}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </span>
              <h3 className="mt-4 text-sm font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.text}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

export function FaqSection({ t }: { t: Dict }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section tone="surface">
      <SectionTitle
        eyebrow={t.faqSection.eyebrow}
        title={t.faqSection.title}
        italic={t.faqSection.titleItalic}
      />
      <div className="mt-10 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
        {t.faqSection.items.map((item, i) => (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-secondary/50"
            >
              <span className="text-sm font-semibold tracking-tight">{item.q}</span>
              <span
                className={`shrink-0 text-lg text-primary transition-transform duration-300 ${
                  open === i ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 [transition-timing-function:var(--ease-smooth)] ${
                open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function CtaSection({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <Section tone="ink" className="text-center">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80"
        style={{ backgroundImage: "var(--gradient-glow)", opacity: 0.35 }}
      />
      <div className="relative mx-auto max-w-2xl">
        <Badge tone="ink">◆ {t.cta.badge}</Badge>
        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-ink-foreground sm:text-6xl">
          {t.cta.title} <span className="font-normal italic">{t.cta.titleItalic}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink-foreground/65">
          {t.cta.sub}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Cta to={pathFor(locale, "earnings")}>{t.cta.primary}</Cta>
          <Cta
            to={pathFor(locale, "how")}
            variant="ink"
            className="border border-white/15 bg-white/10"
          >
            {t.cta.secondary}
          </Cta>
        </div>
        <ul className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-3 text-left">
          {t.cta.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-xs text-ink-foreground/75">
              <Check className="h-3.5 w-3.5 text-primary" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
