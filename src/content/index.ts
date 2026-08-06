import { pt } from "./pt";
import { en } from "./en";
import { es } from "./es";
import type { Dict } from "./types";
import type { Locale } from "./types";

export const DICTS: Record<Locale, Dict> = { pt, en, es };

export function getDict(locale: Locale): Dict {
  return DICTS[locale];
}

export * from "./types";
