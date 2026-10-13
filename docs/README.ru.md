# mozhaev.pro — рабочие заметки

Английское описание для GitHub — в корневом [`README.md`](../README.md).

Двойная визитка на **Astro** (статика, ноль JS по умолчанию). Одно лицо —
исследователь, второе — инженер; общий бумажно-чернильный каркас, единый источник
контента, per-page SEO/OG. Деплой — GitHub Actions на два хостинга (см. `DEPLOY-dual.md`).

## Маршруты

| URL              | Лицо         | Язык | Заметка                                   |
|------------------|--------------|------|-------------------------------------------|
| `/`              | research     | EN   | канонический корень                       |
| `/research/`     | research     | EN   | стабильный алиас для рассылки, `canonical → /` |
| `/ru/`           | research     | RU   |                                           |
| `/dev/`          | engineering  | EN   | дефолт инженерного лица                    |
| `/dev/ru/`       | engineering  | RU   |                                           |

Слеш на конце — часть адреса (`trailingSlash: 'always'`). Оба хостинга отдают
301 с бесслешной формы на слешевую, поэтому canonical, `hreflang`, sitemap и
внутренние ссылки обязаны вести на слешевую — иначе каждый из них указывает на
редирект. Пути собраны в `src/lib/routes.ts`; руками URL нигде не писать.

Языковые пары связаны `hreflang`. Переключатель языка и кросс-ссылка между лицами
сохраняют язык при переходе. Ставок нет нигде: инженерное лицо показывает
«Открыт к проектам», без почасовой.

## Запуск

Пакетный менеджер — **Yarn 4**, версия закреплена полем `packageManager`
в `package.json`; `corepack enable` поставит именно её. Требуется Node 22+
(Node 20 вышел из поддержки в апреле 2026-го).

```bash
corepack enable
yarn install
yarn dev      # http://localhost:4321
yarn build    # -> dist/
yarn preview  # предпросмотр собранного
```

## Деплой

Деплоит **только GitHub Actions** (`.github/workflows/deploy.yml`): одна сборка
уезжает на оба origin'а — Netlify и российский S3. Подробности и секреты —
в `DEPLOY-dual.md`.

Git-интеграцию Netlify (Import from Git) включать **не нужно**: тогда каждый push
собирается дважды — у Netlify и в Actions, — и два деплоя гонятся за одним
сайтом. Если она уже включена, в Netlify → Site configuration → Build & deploy
выключить автосборку (Stop builds), сайт продолжит обновляться из Actions.

`netlify.toml` остаётся источником заголовков и правил кэширования для
Netlify-origin'а; его `command`/`publish` используются только при сборке
на стороне Netlify.

## Где что править

- **Тексты, контакты** — `src/lib/content.ts` (единственный источник правды,
  типизирован). Контакты заданы на пару «лицо × язык»: на RU-страницах
  российский Telegram `@ruslanmozhaev`, на EN — латвийский `@mozhaevruslan`.
  Факты о Руслане сверяются с `docs/facts.md`, правила для агентов — `CLAUDE.md`.
- **Палитра, шрифты, шкала** — `src/styles/tokens.css`.
  Cormorant Garamond — только имя; PT Serif — весь остальной текст; JetBrains Mono — метки.
  Обе антиквы с кириллицей, поэтому RU и EN выглядят одинаково.
- **Каркас страницы** — `src/components/FacePage.astro` (собирает оба лица).
- **Монограмма** — `src/components/Chop.astro` (чернильный чоп, инлайн-SVG,
  красится через `currentColor`), стоит в центре подвала. Favicon —
  `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`.
- **OG-превью** — `public/og/{research,research-ru,dev,dev-ru}.png` (1200×630).
- **Портрет** — `src/assets/portrait.png`, отдаётся через `astro:assets` (AVIF, адаптивные размеры).

## SEO, шрифты, печать

- **Шрифты — self-hosted** через `@fontsource` (импорты в `src/layouts/BaseLayout.astro`).
  Используются агрегированные файлы (`400.css`, `500.css`), потому что только у них
  есть `unicode-range`: браузер качает латиницу или кириллицу по факту нужды.
  Пер-сабсетные файлы (`latin-400.css`) использовать нельзя — там `unicode-range` нет
  и объявления перекрывают друг друга. Внешних запросов у сайта нет вообще.
- **sitemap** — `@astrojs/sitemap`, языковые пары проставляются автоматически;
  пара `/dev` ↔ `/dev/ru` дописана вручную в `serialize` (встроенная i18n видит
  локаль только в первом сегменте пути). `/research` исключён как алиас.
- **robots.txt** — `public/robots.txt`, ссылается на карту сайта.
- **404** — `src/pages/404.astro` собирается в `dist/404.html`. Netlify
  подхватывает его сам; в российском бакете его нужно указать страницей ошибки.
  Страница двуязычная и помечена `noindex` (без canonical, `hreflang` и JSON-LD).
- **JSON-LD** — `src/components/Schema.astro`, `schema.org/Person`. `sameAs`
  связывает mozhaev.pro, ORCID, GitHub и LinkedIn в одну сущность; `jobTitle`
  и `knowsAbout` различаются по лицу и языку.
- **Печать** — слой `@layer print` в конце `global.css`. Скрывает навигацию,
  canvas и портрет, разворачивает в одну колонку, дописывает адреса ссылок.
  `/dev`, сохранённый в PDF, выглядит как резюме (что он умещается на одну страницу, не проверялось).

## Возможные улучшения на потом

- Генерация OG на лету (satori) вместо статичных PNG.
