import { AppLink } from "./AppLink";
import { getDict } from "@/content";
import { LOCALES, SLUGS, type Locale } from "@/content/types";
import { pathFor } from "@/lib/seo";

const CITIES = [
  "Lagos",
  "Hyderabad",
  "São Paulo",
  "Manila",
  "Casablanca",
  "Karachi",
  "Bogotá",
  "Hanoi",
  "Nairobi",
  "Dhaka",
  "Kyiv",
  "Lima",
];

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <footer className="border-t border-border bg-surface-2">
      <div className="overflow-hidden border-b border-border/70 py-3">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...CITIES, ...CITIES].map((city, i) => (
            <span key={`${city}-${i}`} className="eyebrow">
              ◆ {city}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="font-semibold tracking-tight">Crowtado</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.footer.about}</p>
          <div className="mt-5 flex gap-2">
            {LOCALES.map((l) => (
              <AppLink
                key={l}
                to={pathFor(l)}
                          className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
              >
                {l.toUpperCase()}
              </AppLink>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{t.footer.colWork}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <FooterLink to={pathFor(locale, "how")}>{t.nav.how}</FooterLink>
            </li>
            <li>
              <FooterLink to={pathFor(locale, "earnings")}>{t.nav.earnings}</FooterLink>
            </li>
            <li>
              <FooterLink to={pathFor(locale, "faq")}>{t.nav.faq}</FooterLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">{t.footer.colCompany}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <FooterLink to={pathFor(locale)}>{t.breadcrumbHome}</FooterLink>
            </li>
            <li>
              <FooterLink to={pathFor(locale, "earnings")}>{t.cta.primary}</FooterLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">{t.footer.colLegal}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <FooterLink to={pathFor(locale, "privacy")}>{t.legal.privacy.title}</FooterLink>
            </li>
            <li>
              <FooterLink to={pathFor(locale, "terms")}>{t.legal.terms.title}</FooterLink>
            </li>
            <li>
              <FooterLink to={pathFor(locale, "cookies")}>{t.legal.cookies.title}</FooterLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Crowtado. {t.footer.rights}</p>
          <p>{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <AppLink
      to={to}
      className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
    >
      {children}
    </AppLink>
  );
}

export const _slugs = SLUGS;
