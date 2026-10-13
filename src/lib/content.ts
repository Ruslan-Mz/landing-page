// ============================================================
// Single source of truth. Two faces × two locales.
// No rates anywhere — engineering shows "available", never pricing.
// ============================================================

export type Locale = 'en' | 'ru';
export type Face = 'research' | 'engineering';

export interface Card { idx?: string; h: string; p: string }
export interface Fact { yr: string; t: string }
export interface ContactKey { email?: string; orcid?: string; scholar?: string; github?: string; linkedin?: string; telegram?: string }

export interface FaceLocale {
  htmlTitle: string;
  metaDesc: string;
  eyebrow: string;      // may contain <b>
  name: string;
  lede: string;         // may contain <span class="pop/ind">
  sub: string;
  contactsLabel: string;
  secHead: string;      // may contain <span>
  cards: Card[];
  bgHead: string;
  bgLead: string;
  facts: Fact[];
  languages?: string;        // rendered under the timeline, not inside it
  processHead?: string;  // "How I work" — engineering only
  process?: Card[];      // 3 short points, client-benefit framing
  avail?: string;        // engineering CTA badge (no rate)
  colophon: string;     // the quiet colophon line
  crossLabel: string;   // link text to the other face
}

// ---- contacts, per face AND per locale ------------------------
// Language is the best signal for who is reading, so contacts vary by locale:
// RU pages show the Russian Telegram, EN pages the Latvian one.
// Any field can differ per locale — not just Telegram.
export const CONTACTS: Record<Face, Record<Locale, ContactKey>> = {
  research: {
    en: {
      email:    'ruslan@mozhaev.pro',
      orcid:    'https://orcid.org/0009-0008-7325-6820',
      telegram: 'https://t.me/mozhaevruslan',   // Latvian — international/EU
    },
    ru: {
      email:    'ruslan@mozhaev.pro',
      orcid:    'https://orcid.org/0009-0008-7325-6820',
      telegram: 'https://t.me/ruslanmozhaev',   // Russian
    },
  },
  engineering: {
    en: {
      email:    'ruslan@mozhaev.pro',
      // github:   'https://github.com/Ruslan-Mz',   // hidden until public repos exist
      linkedin: 'https://www.linkedin.com/in/ruslanmozhaev',
      telegram: 'https://t.me/mozhaevruslan',   // Latvian
    },
    ru: {
      email:    'ruslan@mozhaev.pro',
      // github:   'https://github.com/Ruslan-Mz',   // hidden until public repos exist
      linkedin: 'https://www.linkedin.com/in/ruslanmozhaev',
      telegram: 'https://t.me/ruslanmozhaev',   // Russian — RF clients
    },
  },
};

// order in which contacts render; email is primary
export const CONTACT_ORDER: Array<{ key: keyof ContactKey; label: string; primary?: boolean }> = [
  { key: 'email', label: 'Email', primary: true },
  { key: 'orcid', label: 'ORCID' },
  { key: 'scholar', label: 'Google Scholar' },
  { key: 'github', label: 'GitHub' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'telegram', label: 'Telegram' },
];

// ---- content ----------------------------------------------
export const CONTENT: Record<Face, Record<Locale, FaceLocale>> = {
  research: {
    en: {
      htmlTitle: 'Ruslan Mozhaev — AI for healthy longevity',
      metaDesc: 'AI for healthy longevity — from population patterns to the individual: an evidence map of cognitive longevity and multi-agent, continual-learning systems for healthspan.',
      eyebrow: 'AI · HEALTHSPAN · <b>MULTI-AGENT SYSTEMS</b>',
      name: 'Ruslan&nbsp;Mozhaev',
      lede: 'AI for healthy longevity — from <span class="pop">population patterns</span> to <span class="ind">the individual</span>.',
      sub: 'Independent researcher. I map what the evidence on cognitive and healthy ageing actually supports, and work towards AI that can carry it from population averages to a single person. The AI side goes back to my 2009 PhD research on multi-agent self-learning systems.',
      contactsLabel: 'Contact',
      secHead: 'RESEARCH <span>/ what I work on</span>',
      cards: [
        { idx: '01', h: 'An evidence map of cognitive longevity', p: 'Fourteen interacting systems — sleep, vascular health, learning, social ties and more — with every link graded by the strength of its evidence. The map keeps apart three things that are usually blurred: no data, no effect at adequate power, and an effect only under certain conditions.' },
        { idx: '02', h: 'From population to the individual', p: 'A group average can show no effect while some individuals respond strongly, and a group effect can rest on a few strong responders. Such processes are generally non-ergodic: what holds for a population does not transfer to one person by default, so the bridge between the two levels has to be modelled rather than assumed. This is the question the AI work is built around.' },
        { idx: '03', h: 'Multi-agent, continual learning', p: 'Architectures that keep learning from one person without forgetting what they know about everyone else — the engineering side of that bridge.' },
      ],
      bgHead: 'BACKGROUND <span>/ the long way here</span>',
      bgLead: 'The thread starts in 2009 with PhD research on multi-agent self-learning systems and runs alongside twenty years of building production software.',
      facts: [
        { yr: '2006→', t: '<b>Twenty years of production software</b> — enterprise and mobile systems, lately AI integration.' },
        { yr: '2007', t: '<b>Master of Engineering in Computer Systems</b>, Riga Technical University — specialising in artificial intelligence and system analysis.' },
        { yr: '2009–10', t: 'PhD research on holistic multi-agent self-learning systems under Prof. Jānis Grundspenkis.' },
        { yr: 'today', t: 'An evidence map of cognitive longevity, and the population → individual question that the AI work will build on.' },
      ],
      languages: 'Working languages: English, Russian and Latvian. German and Italian at a basic level.',
      colophon: 'Set in Cormorant Garamond & PT Serif.',
      crossLabel: 'engineering',
    },
    ru: {
      htmlTitle: 'Ruslan Mozhaev — ИИ для здорового долголетия',
      metaDesc: 'ИИ для здорового долголетия — от популяционных закономерностей к индивидуальному пути: карта доказательности когнитивного долголетия и многоагентные системы непрерывного обучения.',
      eyebrow: 'ИИ · ЗДОРОВОЕ ДОЛГОЛЕТИЕ · <b>МНОГОАГЕНТНЫЕ СИСТЕМЫ</b>',
      name: 'Ruslan&nbsp;Mozhaev',
      lede: 'ИИ для здорового долголетия — от <span class="pop">популяционных закономерностей</span> к <span class="ind">индивидуальному пути</span>.',
      sub: 'Независимый исследователь. Систематизирую, что на самом деле подтверждают данные о когнитивном и здоровом старении; цель — ИИ, способный переносить это знание от средних по популяции к конкретному человеку. ИИ-часть идёт от PhD-исследования 2009 года по многоагентным самообучающимся системам.',
      contactsLabel: 'Контакты',
      secHead: 'ИССЛЕДОВАНИЯ <span>/ чем занимаюсь</span>',
      cards: [
        { idx: '01', h: 'Карта доказательности когнитивного долголетия', p: 'Четырнадцать взаимосвязанных систем — сон, сосудистое здоровье, обучение, социальные связи и другие, — и у каждой связи оценена сила доказательств. Карта различает то, что обычно смешивают: данных нет, эффекта нет при достаточной мощности, эффект есть лишь при определённых условиях.' },
        { idx: '02', h: 'От популяции к индивиду', p: 'Среднее по группе может не показывать эффекта, хотя у части людей он выражен сильно, а групповой эффект может держаться на немногих сильно откликнувшихся. Такие процессы в общем случае неэргодичны: то, что верно для популяции, не переносится на конкретного человека автоматически, поэтому мост между уровнями нужно моделировать, а не предполагать. Вокруг этого вопроса строится ИИ-часть работы.' },
        { idx: '03', h: 'Многоагентность и непрерывное обучение', p: 'Архитектуры, которые дообучаются на данных одного человека, не забывая то, что знают обо всех, — инженерная сторона этого моста.' },
      ],
      bgHead: 'БЭКГРАУНД <span>/ долгий путь сюда</span>',
      bgLead: 'Нить начинается в 2009-м с PhD-исследования многоагентных самообучающихся систем и идёт параллельно с двадцатью годами создания продакшн-систем.',
      facts: [
        { yr: '2006→', t: '<b>Двадцать лет продакшн-разработки</b> — корпоративные и мобильные системы, в последние годы интеграция ИИ.' },
        { yr: '2007', t: '<b>Магистр инженерных наук в области компьютерных систем</b>, Рижский технический университет — специализация: искусственный интеллект и системный анализ.' },
        { yr: '2009–10', t: 'PhD-исследование по холистическим многоагентным самообучающимся системам под руководством проф. Яниса Грундспенкиса.' },
        { yr: 'сейчас', t: 'Карта доказательности когнитивного долголетия и вопрос «популяция → индивид», на котором будет строиться ИИ-часть работы.' },
      ],
      languages: 'Рабочие языки — английский, русский и латышский. Немецкий и итальянский на базовом уровне.',
      colophon: 'Набрано Cormorant Garamond и PT Serif.',
      crossLabel: 'разработка',
    },
  },

  engineering: {
    en: {
      htmlTitle: 'Ruslan Mozhaev — Senior Mobile / Full-Stack Developer',
      metaDesc: 'Senior mobile and full-stack developer, lead developer. React Native, native iOS and Android, Node.js/TypeScript, GraphQL, Azure and Oracle Cloud, LLM integration, development with coding agents. 20 years in software, 15 of them in mobile.',
      eyebrow: 'MOBILE · FULL-STACK · <b>AI-ASSISTED DELIVERY</b>',
      name: 'Ruslan&nbsp;Mozhaev',
      lede: 'I take products from an idea to the stores — and keep them running in production for years.',
      sub: 'Senior mobile and full-stack developer, lead developer of a team of 4–5. 20 years in software development, 15 of them in mobile — most of it under NDA, so I am happy to go through the work in a call.',
      contactsLabel: 'Contact',
      secHead: 'WHAT I DO <span>/ end-to-end</span>',
      cards: [
        { h: 'Mobile', p: 'React Native for iOS and Android, native code where the platform needs it — before React Native I wrote native iOS (Swift, Objective-C) and Android (Kotlin, Java). Offline-first apps with data synchronisation. From analysis and UI/UX to the stores, accessibility included.' },
        { h: 'Backend & cloud', p: 'Node.js / TypeScript, GraphQL, REST, serverless on Azure Functions. Cosmos DB, Oracle Database, auth with Auth0. Moving projects between clouds — Azure to Oracle Cloud.' },
        { h: 'AI', p: 'LLMs in real products — chatbots, AI features, voice and image recognition — in apps running in production, not in demos.' },
      ],
      bgHead: 'TRACK RECORD <span>/ twenty years</span>',
      bgLead: 'I have taken products from the first analysis to the stores many times, in different industries. The current one has been in production for more than five years.',
      facts: [
        { yr: '2006', t: 'Started at <b>Accenture</b> — .NET and J2EE enterprise development, later responsible for delivering whole work packages.' },
        { yr: '2011', t: '<b>Mobile</b> — first my own iOS game, from 2012 enterprise mobile at Ideaport Riga for Nordic clients: industrial equipment, smart home, construction, insurance.' },
        { yr: '2020→', t: '<b>Lead developer</b> on an enterprise mobile app (React Native) — architecture, a team of 4–5, migration to a new stack, offline-first. Now in its third iteration.' },
        { yr: '2023–24', t: '<b>Co-founded</b> a product with a strong focus on accessibility. The whole technical side was mine.' },
        { yr: 'now', t: '<b>AI</b> — LLM features in production and development with coding agents, which I also bring to the team. Working on my own products in parallel. Open to freelance and contract work.' },
      ],
      avail: 'Available for projects',
      processHead: 'HOW I WORK <span>/ what it looks like from your side</span>',
      process: [
        { h: 'First — what is actually needed', p: 'A task usually comes as “we want roughly this, and it should work well”. I go through it with you first: real scenarios, what counts as done. In nearly twenty years of consulting, first at Accenture and then at Ideaport Riga, I have worked across different industries: telecom, insurance, industrial equipment, smart home, construction. Getting into a new domain takes me weeks, not months.' },
        { h: 'Decisions are written down', p: 'Bigger architecture decisions get a short record: the problem, the options, what was chosen and why. When a decision changes, a new record replaces the old one — nothing gets lost and a year later it is clear why the system is built this way.' },
        { h: 'I answer for the code, agents help write it', p: 'Architecture, review and acceptance are mine: I write the instructions for coding agents, review their plans and code, and check the result on the device — functionality, usability, how it looks. Good design and usability I do not delegate.' },
      ],
      languages: 'Working languages: English, Russian and Latvian. German and Italian at a basic level.',
      colophon: 'Set in Cormorant Garamond & PT Serif.',
      crossLabel: 'research',
    },
    ru: {
      htmlTitle: 'Ruslan Mozhaev — Senior Mobile / Full-Stack разработчик',
      metaDesc: 'Senior mobile и full-stack разработчик, lead developer. React Native, нативные iOS и Android, Node.js/TypeScript, GraphQL, Azure и Oracle Cloud, интеграция LLM, разработка с ИИ-агентами. 20 лет в разработке, 15 из них в мобильной.',
      eyebrow: 'MOBILE · FULL-STACK · <b>РАЗРАБОТКА С ИИ-АГЕНТАМИ</b>',
      name: 'Ruslan&nbsp;Mozhaev',
      lede: 'Довожу продукты от идеи до сторов — и годами веду их в продакшене.',
      sub: 'Senior mobile и full-stack разработчик, lead developer команды из 4–5 человек. 20 лет в разработке, 15 из них в мобильной — большая часть под NDA, поэтому готов разобрать реальные задачи в разговоре.',
      contactsLabel: 'Контакты',
      secHead: 'ЧТО ДЕЛАЮ <span>/ под ключ</span>',
      cards: [
        { h: 'Мобильная разработка', p: 'React Native под iOS и Android, нативный код там, где это нужно платформе — до React Native писал нативно под iOS (Swift, Objective-C) и Android (Kotlin, Java). Offline-first приложения с синхронизацией данных. От анализа и UI/UX до публикации в сторах, с доступностью.' },
        { h: 'Бэкенд и облако', p: 'Node.js / TypeScript, GraphQL, REST, serverless на Azure Functions. Cosmos DB, Oracle Database, авторизация через Auth0. Перенос проектов между облаками — Azure → Oracle Cloud.' },
        { h: 'ИИ', p: 'LLM в реальных продуктах — чат-боты, AI-функционал, распознавание голоса и изображений — в приложениях, работающих в продакшене, а не в демо.' },
      ],
      bgHead: 'ОПЫТ <span>/ двадцать лет</span>',
      bgLead: 'Много раз вёл продукты от первого анализа до публикации в сторах, в разных индустриях. Текущий — уже больше пяти лет в продакшене.',
      facts: [
        { yr: '2006', t: 'Старт в <b>Accenture</b> — корпоративная разработка на .NET и J2EE, затем отвечал за поставку целых пакетов работ.' },
        { yr: '2011', t: '<b>Мобильная разработка</b> — сначала своя iOS-игра, с 2012 корпоративные мобильные проекты в Ideaport Riga для скандинавских заказчиков: промышленное оборудование, умный дом, строительство, страхование.' },
        { yr: '2020→', t: '<b>Lead developer</b> корпоративного мобильного приложения (React Native) — архитектура, команда 4–5 человек, миграция на новый стек, offline-first. Сейчас третья итерация.' },
        { yr: '2023–24', t: '<b>Со-основатель</b> продукта с упором на доступность (accessibility). Вся техническая часть на мне.' },
        { yr: 'сейчас', t: '<b>ИИ</b> — LLM-функции в продакшене и разработка с ИИ-агентами, которую внедряю и в команде. Параллельно работаю над своими продуктами. Открыт к проектной работе.' },
      ],
      avail: 'Открыт к проектам',
      processHead: 'КАК Я РАБОТАЮ <span>/ что видно с вашей стороны</span>',
      process: [
        { h: 'Сначала — что реально нужно', p: 'Задача обычно приходит как «хотим, чтобы было примерно так и хорошо работало». Сначала разбираю её с вами: реальные сценарии, что считать готовым. За почти двадцать лет в консалтинге — сначала в Accenture, затем в Ideaport Riga — я работал в разных индустриях: телеком, страхование, промышленное оборудование, умный дом, строительство. Поэтому в новую предметную область вхожу за недели, а не за месяцы.' },
        { h: 'Решения записываются', p: 'Крупные архитектурные решения оформляются коротко: какая задача, какие были варианты, что выбрано и почему. Если решение меняется, пишется новая запись вместо старой — ничего не теряется, и через год понятно, почему система устроена именно так.' },
        { h: 'За код отвечаю я, агенты помогают его писать', p: 'Архитектура, ревью и приёмка — за мной: пишу инструкции для ИИ-агентов, провожу ревью их планов и кода и проверяю результат на устройстве — функциональность, удобство, внешний вид. Хороший дизайн и удобство я не делегирую.' },
      ],
      languages: 'Рабочие языки — английский, русский и латышский. Немецкий и итальянский на базовом уровне.',
      colophon: 'Набрано Cormorant Garamond и PT Serif.',
      crossLabel: 'исследования',
    },
  },
};
