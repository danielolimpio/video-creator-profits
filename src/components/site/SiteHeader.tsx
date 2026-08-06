import { useRouterState } from "@tanstack/react-router";
import { AppLink } from "./AppLink";
import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { LOCALES, SLUGS, type Locale, type PageKey } from "@/content/types";
import { getDict } from "@/content";
import { pathFor } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Cta } from "./Bits";

function Wordmark({ locale }: { locale: Locale }) {
  return (
    <AppLink to={pathFor(locale)} className="flex items-center gap-2.5">
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink">
        <span className="h-2 w-2 rounded-full bg-primary" />
      </span>
      <span className="text-lg font-semibold tracking-tight">Crowtado</span>
    </AppLink>
  );
}

export function SiteHeader({ locale, page }: { locale: Locale; page?: PageKey }) {
  const t = getDict(locale);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const items: { key: PageKey; label: string }[] = [
    { key: "how", label: t.nav.how },
    { key: "earnings", label: t.nav.earnings },
    { key: "faq", label: t.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Wordmark locale={locale} />

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/70 p-1 md:flex">
          {items.map((item) => {
            const to = pathFor(locale, item.key);
            const active = pathname === to;
            return (
              <AppLink
                key={item.key}
                to={to}
                          className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300",
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </AppLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              onBlur={() => window.setTimeout(() => setLangOpen(false), 150)}
              aria-label={t.nav.language}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              {locale.toUpperCase()}
            </button>
            {langOpen ? (
              <div className="surface-card absolute right-0 mt-2 w-40 overflow-hidden p-1">
                {LOCALES.map((l) => (
                  <AppLink
                    key={l}
                    to={page ? `/${l}/${SLUGS[l][page]}` : `/${l}`}
                                  className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-colors",
                      l === locale
                        ? "bg-secondary font-medium text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    {getDict(l).langName}
                  </AppLink>
                ))}
              </div>
            ) : null}
          </div>

          <Cta to={pathFor(locale, "earnings")} className="hidden px-5 py-2 sm:inline-flex">
            {t.nav.start}
          </Cta>

          <button
            type="button"
            aria-label={t.nav.menu}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <AppLink
                key={item.key}
                to={pathFor(locale, item.key)}
                          onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </AppLink>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
            {LOCALES.map((l) => (
              <AppLink
                key={l}
                to={page ? `/${l}/${SLUGS[l][page]}` : `/${l}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium",
                  l === locale
                    ? "border-foreground/20 bg-secondary text-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                {getDict(l).langName}
              </AppLink>
            ))}
          </div>
          <Cta
            to={pathFor(locale, "earnings")}
            className="mt-4 w-full"
          >
            {t.nav.start}
          </Cta>
        </div>
      ) : null}
    </header>
  );
}
