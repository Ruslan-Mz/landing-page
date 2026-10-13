import type { Face, Locale } from './content';

// Canonical path for a given face+locale. Trailing slashes are deliberate and
// must stay: both hosts 301 the slashless form, so these are the real URLs
// (see trailingSlash in astro.config.mjs).
export function pathFor(face: Face, locale: Locale): string {
  if (face === 'research') return locale === 'en' ? '/' : '/ru/';
  return locale === 'en' ? '/dev/' : '/dev/ru/';
}

// hreflang alternates for the language pair of a face.
export function altsFor(face: Face): Record<Locale, string> {
  return { en: pathFor(face, 'en'), ru: pathFor(face, 'ru') };
}

// The other face, same language where possible — keeps language across the jump.
export function crossFor(face: Face, locale: Locale): { href: string; face: Face } {
  const other: Face = face === 'research' ? 'engineering' : 'research';
  return { href: pathFor(other, locale), face: other };
}

// Absolute URL from a site-root path. The root keeps its slash: bare
// 'https://mozhaev.pro' as a canonical would also be a redirect.
export function abs(site: URL | undefined, p: string): string {
  const base = site ? site.origin : 'https://mozhaev.pro';
  return base + p;
}
