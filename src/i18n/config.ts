export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Build a path for the given locale.
 * Italian (default) lives at the root with no prefix; English under `/en`.
 * `path` must start with `/` (use `/` for the home page).
 */
export function localizedPath(lang: Locale, path: string): string {
  if (lang === defaultLocale) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/** Strip any leading locale segment, returning the canonical (Italian) path. */
export function stripLocale(path: string): string {
  const stripped = path.replace(/^\/(it|en)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

/** Minimal interpolation: replaces `{name}` placeholders with values. */
export function t(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}
