import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output. Deployed on Netlify (Namecheap DNS -> Netlify).
export default defineConfig({
  site: 'https://mozhaev.pro',
  // Directory output means every page is an index.html inside a folder, and both
  // hosts answer the slashless form with a 301 to the slashed one: Netlify does
  // it for folders, S3-compatible static hosting does the same. So the slashed
  // form is the real URL, and canonicals, hreflang, the sitemap and the internal
  // links all have to use it — otherwise every one of them points at a redirect.
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Inline the stylesheet into every page. Under DPI-based filtering (RU ISPs)
    // the HTML often arrives while a second request for /_astro/*.css is dropped,
    // leaving an unstyled page. One self-contained request removes that failure mode.
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      // Language pairs are declared so the sitemap carries hreflang alternates,
      // matching the <link rel="alternate"> tags on the pages themselves.
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ru: 'ru' },
      },
      // /research/ is an alias of / — keep it out so search engines see one canonical page.
      filter: (page) => !page.endsWith('/research/'),
      // The built-in i18n option only detects a locale from a leading path segment,
      // so the engineering pair (/dev/, /dev/ru/) needs its alternates declared here.
      serialize(item) {
        const DEV = 'https://mozhaev.pro/dev/';
        const DEV_RU = 'https://mozhaev.pro/dev/ru/';
        if (item.url === DEV || item.url === DEV_RU) {
          item.links = [
            { url: DEV, lang: 'en' },
            { url: DEV_RU, lang: 'ru' },
          ];
        }
        return item;
      },
    }),
  ],
});
