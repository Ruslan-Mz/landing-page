# mozhaev.pro

Personal site of Ruslan Mozhaev — senior mobile and full-stack developer, and an independent researcher in AI for healthy longevity.

**Live:** [mozhaev.pro](https://mozhaev.pro/) (research) · [mozhaev.pro/dev/](https://mozhaev.pro/dev/) (engineering)

A small static site, built with more care than its size suggests. Two things here may be worth a look beyond the pages themselves: how it is kept reachable from a network that filters foreign hosting, and how changes to it are reviewed by AI agents that did not write them.

> Working notes, agent rules and review lenses are written in Russian. This file is the English overview.

## Two faces, two languages

One person, two audiences. Researchers and clients need different first screens, titles and link previews, so each face is a real page with its own URL and metadata rather than a toggle on one page.

| URL | Face | Language |
|---|---|---|
| `/` | research | en |
| `/ru/` | research | ru |
| `/dev/` | engineering | en |
| `/dev/ru/` | engineering | ru |
| `/research/` | alias of `/`, canonical → `/` | en |

Everything shares one layout (`src/components/FacePage.astro`) and one typed content source (`src/lib/content.ts`); every path comes from `pathFor()` in `src/lib/routes.ts`, so canonicals, `hreflang`, the sitemap and the language switch cannot drift apart. Contacts are set per face *and* language: Russian pages show a Russian Telegram account, English pages a Latvian one.

## Built to load anywhere

Part of the audience is in Russia, where some ISPs filter the IP ranges of Western hosting. The failure observed was partial, which is worse than total: the HTML arrived and the request for the stylesheet did not, leaving an unstyled page. The site is built around that:

- **No third-party requests at runtime.** No CDNs, analytics or embeds. Fonts are self-hosted through `@fontsource` — using the aggregate files (`400.css`), because only those carry `unicode-range`; the per-subset files collide when Latin and Cyrillic are both loaded.
- **The stylesheet is inlined** into every page (`inlineStylesheets: 'always'`), so one successful request is a complete page.
- **Almost no JavaScript:** a canvas on the research page and Astro's view transitions. Nothing else runs before the first click.
- **Trailing slashes everywhere** (`trailingSlash: 'always'`): both hosts answer a slashless URL with a 301, so every canonical and internal link points at the real address rather than a redirect.

Typography carries the identity — Cormorant Garamond for the name, PT Serif for text, JetBrains Mono for labels, all with Cyrillic — and the layout is held still on purpose: the header height, the face switch width and the hero alignment are fixed so the name does not move between languages or faces. A print stylesheet turns `/dev/` saved as PDF into a plain CV-style document.

## Dual hosting — in progress

```
                     ┌─ visitors in Russia ──→ S3-compatible bucket, Russian provider
mozhaev.pro ── GeoDNS┤
                     └─ everyone else ───────→ Netlify
```

The deploy workflow (`.github/workflows/deploy.yml`) is written; the hosts, geo-DNS and secrets are being set up. Each host is switched on by its own repository variable, so until then the workflow is only a build check. What it already guarantees:

- **One build, two hosts.** Both deploy jobs take the same `dist` artifact, so the hosts cannot serve different versions.
- **No half-updated host.** The S3 upload adds new hashed assets first, then swaps the HTML over, and only then prunes what the new build no longer uses. A running deploy is never cancelled mid-way.
- **A loud check afterwards** that every enabled origin answers with the real page. It runs from GitHub's runners outside Russia, so it proves the origins are up, not that Russia can reach them — that needs monitoring from inside.

Details and the list of secrets: [`DEPLOY-dual.md`](DEPLOY-dual.md) (Russian).

## AI-assisted review

Code here is often written with coding agents. The author of a change — human or agent — is the worst reviewer of it, so review is done by agents that start from nothing:

- **`/review-pr`** (`.claude/skills/review-pr/`) conducts. It checks out the pull request into a separate worktree, builds it once, and starts reviewers in parallel. It never reviews code itself and never fixes anything.
- **`pr-reviewer`** looks through one or more **lenses**: `content` (is every claim about the person true?), `i18n-seo` (addresses, languages, what search engines and link previews get), `build-ui` (page weight, layout stability, fonts, print) and `deploy` (two hosts, ordering, caching, certificates). A finding counts only with a `path:line`, quoted evidence and a concrete failure scenario; the reviewer must first try to refute it.
- **`review-verifier`**, in `deep` mode, assumes every finding is wrong and tries to disprove it against the code, the build and the rules. A false finding costs the owner more than a missed one.
- **A source of truth for facts.** [`docs/facts.md`](docs/facts.md) lists what is verified about the person — years, roles, degree, what is done and what is only a direction. Text that claims more than this file is a finding.
- **Rules and guard rails.** [`CLAUDE.md`](CLAUDE.md) holds the hard rules; `.claude/settings.json` denies agents destructive git commands, reading `.env`, and any manual deploy.
- **Lenses get sharper over time.** Each lens ends with "Seen in this repository": defects that once slipped through and how to look for them.

The setup is adapted from a private project.

## Running locally

Yarn 4, pinned through `packageManager`; Node 22+.

```bash
corepack enable
yarn install
yarn dev      # http://localhost:4321
yarn build    # → dist/
```

## Map

| Path | What |
|---|---|
| `src/lib/content.ts` | all text and contacts, two faces × two languages |
| `src/lib/routes.ts` | every URL on the site |
| `src/components/` | page parts; `FacePage.astro` assembles a face |
| `src/styles/` | design tokens and the global stylesheet, including print |
| `astro.config.mjs` | trailing slashes, inlined CSS, sitemap with language pairs |
| `.github/workflows/deploy.yml` | one build, two hosts |
| `.claude/` | review skill, agents, lenses, permissions |
| `docs/` | verified facts, working notes in Russian |
