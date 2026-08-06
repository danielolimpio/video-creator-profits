import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { LOCALES, SLUGS, SITE_URL, type PageKey } from "@/content/types";

const PAGES: PageKey[] = ["how", "earnings", "faq", "privacy", "terms", "cookies"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: { path: string; priority: string; changefreq: string }[] = [];
        for (const locale of LOCALES) {
          entries.push({ path: `/${locale}`, priority: "1.0", changefreq: "weekly" });
          for (const page of PAGES) {
            const legal = ["privacy", "terms", "cookies"].includes(page);
            entries.push({
              path: `/${locale}/${SLUGS[locale][page]}`,
              priority: legal ? "0.3" : "0.8",
              changefreq: legal ? "yearly" : "weekly",
            });
          }
        }

        const urls = entries.map((e) => {
          const alternates = LOCALES.map((l) => {
            const suffix = e.path.split("/").slice(2).join("/");
            const key = suffix
              ? PAGES.find((p) => SLUGS[e.path.split("/")[1] as (typeof LOCALES)[number]][p] === suffix)
              : undefined;
            const href = key ? `${SITE_URL}/${l}/${SLUGS[l][key]}` : `${SITE_URL}/${l}`;
            return `    <xhtml:link rel="alternate" hreflang="${l === "pt" ? "pt-BR" : l}" href="${href}"/>`;
          }).join("\n");
          return [
            "  <url>",
            `    <loc>${SITE_URL}${e.path}</loc>`,
            alternates,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            "  </url>",
          ].join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
