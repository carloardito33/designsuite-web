import type { Locale } from "./config";
import { it } from "./dictionaries/it";
import { en } from "./dictionaries/en";

const dictionaries = { it, en } as const;

export type Dictionary = typeof it;

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang] as unknown as Dictionary;
}
