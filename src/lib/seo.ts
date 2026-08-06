import { SITE_URL, LOCALES, SLUGS, HTML_LANG, type Locale, type PageKey } from "@/content/types";

export function pathFor(locale: Locale, page?: PageKey) {
  return page ? `/${locale}/${SLUGS[locale][page]}` : `/${locale}`;
}

export function absolute(path: string) {
  return `${SITE_URL}${path}`;
}

interface HeadArgs {
  locale: Locale;
  page?: PageKey;
  title: string;
  description: string;
  keywords?: string;
  jsonLd?: unknown[];
}

export function buildHead({ locale, page, title, description, keywords, jsonLd }: HeadArgs) {
  const url = absolute(pathFor(locale, page));
  const meta = [
    { title },
    { name: "description", content: description },
    ...(keywords ? [{ name: "keywords", content: keywords }] : []),
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: "Crowtado" },
    { property: "og:locale", content: HTML_LANG[locale].replace("-", "_") },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  const links = [
    { rel: "canonical", href: url },
    ...LOCALES.map((l) => ({
      rel: "alternate",
      hrefLang: HTML_LANG[l],
      href: absolute(pathFor(l, page)),
    })),
    { rel: "alternate", hrefLang: "x-default", href: absolute(pathFor("pt", page)) },
  ];

  const scripts = jsonLd?.length
    ? jsonLd.map((data) => ({
        type: "application/ld+json",
        children: JSON.stringify(data),
      }))
    : undefined;

  return { meta, links, scripts };
}

export function organizationLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Crowtado",
    url: absolute(pathFor(locale)),
    logo: absolute("/favicon.ico"),
    sameAs: ["https://www.crowtado.com"],
    description:
      "Crowtado paga colaboradores para gravar clipes de voz, vídeos e fotos pelo celular, com pagamento em dólares.",
  };
}

export function websiteLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Crowtado",
    url: absolute(pathFor(locale)),
    inLanguage: HTML_LANG[locale],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToLd(name: string, steps: { title: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.text,
    })),
  };
}
