export type Locale = "pt" | "en" | "es";

export const LOCALES: Locale[] = ["pt", "en", "es"];
export const DEFAULT_LOCALE: Locale = "pt";
export const SITE_URL = "https://www.crowtado.com.br";

export const HTML_LANG: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export type PageKey = "how" | "earnings" | "faq" | "privacy" | "terms" | "cookies";

export const SLUGS: Record<Locale, Record<PageKey, string>> = {
  pt: {
    how: "como-funciona",
    earnings: "ganhar-dinheiro-gravando-videos",
    faq: "perguntas-frequentes",
    privacy: "politica-de-privacidade",
    terms: "termos-de-uso",
    cookies: "politica-de-cookies",
  },
  en: {
    how: "how-it-works",
    earnings: "make-money-recording-videos",
    faq: "faq",
    privacy: "privacy-policy",
    terms: "terms-of-service",
    cookies: "cookie-policy",
  },
  es: {
    how: "como-funciona",
    earnings: "ganar-dinero-grabando-videos",
    faq: "preguntas-frecuentes",
    privacy: "politica-de-privacidad",
    terms: "terminos-de-uso",
    cookies: "politica-de-cookies",
  },
};

export function slugToKey(locale: Locale, slug: string): PageKey | null {
  const map = SLUGS[locale];
  const found = (Object.keys(map) as PageKey[]).find((k) => map[k] === slug);
  return found ?? null;
}

export interface Meta {
  title: string;
  description: string;
  keywords: string;
}

export interface Step {
  n: string;
  title: string;
  text: string;
}

export interface Tab {
  id: string;
  label: string;
  title: string;
  desc: string;
  tags: string[];
}

export interface Faq {
  q: string;
  a: string;
}

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalPage {
  meta: Meta;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export interface Dict {
  langName: string;
  nav: {
    how: string;
    earnings: string;
    faq: string;
    login: string;
    start: string;
    menu: string;
    language: string;
  };
  meta: {
    home: Meta;
    how: Meta;
    earnings: Meta;
    faq: Meta;
  };
  hero: {
    badge: string;
    titleA: string;
    titleItalic: string;
    titleB: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
    phone: {
      greeting: string;
      card1: { tag: string; title: string; sub: string; rate: string };
      rows: { title: string; sub: string; value: string }[];
      balanceLabel: string;
      balance: string;
      balanceNote: string;
      paidTag: string;
    };
  };
  stats: { value: string; label: string }[];
  how: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    intro: string;
    steps: Step[];
    cta: string;
    panel: {
      label: string;
      balanceLabel: string;
      balance: string;
      note: string;
      lines: { label: string; value: string }[];
      fieldTitle: string;
      fields: { label: string; value: string }[];
      timerLabel: string;
      timerValue: string;
      timerTag: string;
    };
  };
  work: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    intro: string;
    tabs: Tab[];
    ctaPrimary: string;
    ctaSecondary: string;
    playerLabel: string;
    playerFile: string;
    playerTag: string;
    playerQuote: string;
  };
  payouts: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    intro: string;
    cards: { title: string; text: string }[];
  };
  faqSection: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    items: Faq[];
  };
  cta: {
    badge: string;
    title: string;
    titleItalic: string;
    sub: string;
    primary: string;
    secondary: string;
    bullets: string[];
  };
  footer: {
    about: string;
    colWork: string;
    colCompany: string;
    colLegal: string;
    links: { work: string[]; company: string[] };
    rights: string;
    madeIn: string;
  };
  earningsPage: {
    title: string;
    titleItalic: string;
    intro: string;
    blocks: { heading: string; text: string }[];
    tableTitle: string;
    table: { type: string; rate: string; time: string }[];
    tableCols: [string, string, string];
    cta: string;
  };
  howPage: {
    title: string;
    titleItalic: string;
    intro: string;
  };
  faqPage: {
    title: string;
    titleItalic: string;
    intro: string;
  };
  legal: {
    privacy: LegalPage;
    terms: LegalPage;
    cookies: LegalPage;
  };
  breadcrumbHome: string;
}
