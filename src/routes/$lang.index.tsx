import { createFileRoute } from "@tanstack/react-router";
import { getDict } from "@/content";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/content/types";
import { buildHead, organizationLd, websiteLd, faqLd, howToLd, pathFor } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  CtaSection,
  FaqSection,
  Hero,
  HowSection,
  PayoutsSection,
  StatsBar,
  WorkSection,
} from "@/components/site/Sections";

function localeFrom(lang: string): Locale {
  return (LOCALES.includes(lang as Locale) ? lang : DEFAULT_LOCALE) as Locale;
}

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const locale = localeFrom(params.lang);
    const t = getDict(locale);
    return buildHead({
      locale,
      title: t.meta.home.title,
      description: t.meta.home.description,
      keywords: t.meta.home.keywords,
      jsonLd: [
        organizationLd(locale),
        websiteLd(locale),
        howToLd(t.how.title, t.how.steps),
        faqLd(t.faqSection.items),
      ],
    });
  },
  component: HomePage,
});

function HomePage() {
  const { lang } = Route.useParams();
  const locale = localeFrom(lang);
  const t = getDict(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader locale={locale} />
      <main className="flex-1">
        <Hero t={t} locale={locale} />
        <StatsBar t={t} />
        <HowSection t={t} locale={locale} />
        <WorkSection t={t} locale={locale} />
        <PayoutsSection t={t} />
        <FaqSection t={t} />
        <CtaSection t={t} locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      <link rel="preload" as="fetch" href={pathFor(locale, "earnings")} />
    </div>
  );
}
