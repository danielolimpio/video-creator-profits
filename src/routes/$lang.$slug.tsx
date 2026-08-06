import { createFileRoute, notFound } from "@tanstack/react-router";
import { getDict } from "@/content";
import { DEFAULT_LOCALE, LOCALES, slugToKey, type Locale, type PageKey } from "@/content/types";
import { buildHead, breadcrumbLd, faqLd, howToLd, pathFor } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AppLink } from "@/components/site/AppLink";
import {
  CtaSection,
  FaqSection,
  HowSection,
  PayoutsSection,
} from "@/components/site/Sections";
import { Card, Cta, Section, SectionTitle } from "@/components/site/Bits";

function localeFrom(lang: string): Locale {
  return (LOCALES.includes(lang as Locale) ? lang : DEFAULT_LOCALE) as Locale;
}

export const Route = createFileRoute("/$lang/$slug")({
  beforeLoad: ({ params }) => {
    if (!LOCALES.includes(params.lang as Locale)) throw notFound();
    if (!slugToKey(params.lang as Locale, params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const locale = localeFrom(params.lang);
    const t = getDict(locale);
    const key = slugToKey(locale, params.slug);
    if (!key) return {};

    const legalKeys: PageKey[] = ["privacy", "terms", "cookies"];
    const meta = legalKeys.includes(key)
      ? t.legal[key as "privacy" | "terms" | "cookies"].meta
      : t.meta[key as "how" | "earnings" | "faq"];

    const jsonLd: unknown[] = [
      breadcrumbLd([
        { name: t.breadcrumbHome, path: pathFor(locale) },
        { name: meta.title.split("|")[0]!.trim(), path: pathFor(locale, key) },
      ]),
    ];
    if (key === "faq") jsonLd.push(faqLd(t.faqSection.items));
    if (key === "how") jsonLd.push(howToLd(t.howPage.title, t.how.steps));

    return buildHead({
      locale,
      page: key,
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
      jsonLd,
    });
  },
  component: SlugPage,
});

function SlugPage() {
  const { lang, slug } = Route.useParams();
  const locale = localeFrom(lang);
  const t = getDict(locale);
  const key = slugToKey(locale, slug);
  if (!key) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader locale={locale} page={key} />
      <main className="flex-1">
        {key === "how" ? <HowPage /> : null}
        {key === "earnings" ? <EarningsPage /> : null}
        {key === "faq" ? <FaqPage /> : null}
        {(key === "privacy" || key === "terms" || key === "cookies") ? (
          <LegalView pageKey={key} />
        ) : null}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );

  function Breadcrumb({ label }: { label: string }) {
    return (
      <nav aria-label="breadcrumb" className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8">
        <ol className="flex items-center gap-2 text-xs text-muted-foreground">
          <li>
            <AppLink to={pathFor(locale)} className="transition-colors hover:text-foreground">
              {t.breadcrumbHome}
            </AppLink>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground">{label}</li>
        </ol>
      </nav>
    );
  }

  function PageHero({
    title,
    italic,
    intro,
  }: {
    title: string;
    italic: string;
    intro: string;
  }) {
    return (
      <div className="hero-bg border-b border-border px-5 pb-14 sm:px-8">
        <div className="mx-auto w-full max-w-6xl pt-10">
          <h1 className="max-w-3xl text-4xl leading-[1.02] font-semibold sm:text-6xl">
            {title} <span className="font-normal italic">{italic}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">{intro}</p>
        </div>
      </div>
    );
  }

  function HowPage() {
    return (
      <>
        <Breadcrumb label={t.nav.how} />
        <PageHero title={t.howPage.title} italic={t.howPage.titleItalic} intro={t.howPage.intro} />
        <HowSection t={t} locale={locale} />
        <PayoutsSection t={t} />
        <CtaSection t={t} locale={locale} />
      </>
    );
  }

  function FaqPage() {
    return (
      <>
        <Breadcrumb label={t.nav.faq} />
        <PageHero title={t.faqPage.title} italic={t.faqPage.titleItalic} intro={t.faqPage.intro} />
        <FaqSection t={t} />
        <CtaSection t={t} locale={locale} />
      </>
    );
  }

  function EarningsPage() {
    const e = t.earningsPage;
    return (
      <>
        <Breadcrumb label={t.nav.earnings} />
        <PageHero title={e.title} italic={e.titleItalic} intro={e.intro} />
        <Section>
          <div className="grid gap-4 sm:grid-cols-2">
            {e.blocks.map((b) => (
              <Card key={b.heading}>
                <h2 className="text-lg font-semibold tracking-tight">{b.heading}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </Card>
            ))}
          </div>
        </Section>
        <Section tone="surface">
          <SectionTitle title={e.tableTitle} />
          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/60">
                  {e.tableCols.map((c) => (
                    <th key={c} className="eyebrow px-5 py-3">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {e.table.map((row) => (
                  <tr key={row.type} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 font-medium">{row.type}</td>
                    <td className="px-5 py-4 font-semibold text-primary">{row.rate}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <Cta to={pathFor(locale, "how")}>{e.cta}</Cta>
          </div>
        </Section>
        <FaqSection t={t} />
        <CtaSection t={t} locale={locale} />
      </>
    );
  }

  function LegalView({ pageKey }: { pageKey: "privacy" | "terms" | "cookies" }) {
    const page = t.legal[pageKey];
    return (
      <>
        <Breadcrumb label={page.title} />
        <PageHero title={page.title} italic="" intro={page.intro} />
        <Section>
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-2">
                <p className="eyebrow">{page.updated}</p>
                {page.sections.map((s) => (
                  <p key={s.heading} className="text-xs text-muted-foreground">
                    {s.heading}
                  </p>
                ))}
              </div>
            </aside>
            <div className="space-y-4">
              {page.sections.map((s) => (
                <Card key={s.heading} hover={false}>
                  <h2 className="text-lg font-semibold tracking-tight">{s.heading}</h2>
                  <div className="mt-3 space-y-3">
                    {s.body.map((p) => (
                      <p key={p} className="text-sm leading-relaxed text-muted-foreground">
                        {p}
                      </p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      </>
    );
  }
}
