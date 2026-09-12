/* ------------------------------------------------------------------
  КАК ЗАГРУЗИТЬ СВОИ РИЛСЫ И ВИДЕО:
  ------------------------------------------------------------------
  1. Положите свои видео-файлы в папку public/assets/
     Например: public/assets/work1.mp4, public/assets/work2.mp4
  2. Если хотите заменить фон hero — положите hero-reel.mp4 и hero-poster.jpg в public/
  3. Чтобы изменить ссылки на видео или названия работ —
     отредактируйте массив WORKS ниже.

  ОПТИМИЗАЦИЯ ДЛЯ ТЕЛЕФОНА:
  В сетке и бегущей ленте видео используются как маленькие превью, поэтому
  для каждого видео из WORKS дополнительно нужен облегчённый файл
  `<имя>-preview.mp4` (без звука, уменьшенное разрешение) — он подключается
  в карточках вместо оригинала. Полное качество (src) загружается только
  при открытии видео в полноэкранном лайтбоксе. Создать такой файл можно
  одной командой (нужен ffmpeg):

    ffmpeg -i work1.mp4 -vf "scale=480:-2" -c:v libx264 -crf 30 \
      -preset veryfast -an -movflags +faststart work1-preview.mp4

  Для горизонтальных видео используйте scale=640:-2. Если файл превью не
  создан, просто укажите preview такой же, как src.
  ------------------------------------------------------------------ */

export const CONTACT = {
  telegram: "https://t.me/samirrcc",
  github: "",
};

/* Пустая строка = файлы берутся из public/ (для загрузки на хостинг) */
const MEDIA_BASE = "";

export const MEDIA = {
  heroVideo: `${MEDIA_BASE}/hero-reel.mp4`,
  heroPoster: `${MEDIA_BASE}/hero-poster.jpg`,
  avatar: `${MEDIA_BASE}/avatar.webp`,
};

export const SITE = {
  name: "SamirTOcreator",
  role: "Video Editor — Reels & Longform",
  headline: "Монтаж, который удерживает внимание и продаёт",
  description:
    "Создание визуального контента высшего уровня для брендов и авторов.",
};

export const NAV_LINKS = [
  { label: "Работы", href: "#work" },
  { label: "Схема", href: "#workflow" },
  { label: "Обо мне", href: "#about" },
] as const;



export const MARQUEE_ITEMS = [
  "Retention Editing",
  "Sound Design",
  "Color Grading",
  "Viral Motion",
] as const;

export type WorkCategory = "reels" | "horizontal";

export interface Work {
  id: string;
  title: string;
  category: WorkCategory;
  categoryLabel: string;
  /** Полное качество — используется в лайтбоксе при открытии видео */
  src: string;
  /** Лёгкая уменьшенная версия без звука — для карточек и бегущей ленты */
  preview: string;
}

/* =====================================================================
  ЗДЕСЬ НАСТРАИВАЮТСЯ ВАШИ РИЛСЫ И ВИДЕО
  ===================================================================== */
export const WORKS: Work[] = [
  /* --- Reels / вертикальные --- */
  {
    id: "work1",
    title: "Говорящая голова",
    category: "reels",
    categoryLabel: "Reels",
    src: `${MEDIA_BASE}/assets/work1.mp4`,
    preview: `${MEDIA_BASE}/assets/work1-preview.mp4`,
  },
  {
    id: "work2",
    title: "Экспертный Reels",
    category: "reels",
    categoryLabel: "Reels",
    src: `${MEDIA_BASE}/assets/work2.mp4`,
    preview: `${MEDIA_BASE}/assets/work2-preview.mp4`,
  },
  {
    id: "work3",
    title: "Динамичная нарезка",
    category: "reels",
    categoryLabel: "Reels",
    src: `${MEDIA_BASE}/assets/work3.mp4`,
    preview: `${MEDIA_BASE}/assets/work3-preview.mp4`,
  },
  /* --- Горизонтальные --- */
  {
    id: "workhr1",
    title: "Говорящая голова",
    category: "horizontal",
    categoryLabel: "Горизонтальное",
    src: `${MEDIA_BASE}/assets/workhr1.mp4`,
    preview: `${MEDIA_BASE}/assets/workhr1-preview.mp4`,
  },
  {
    id: "workhr2",
    title: "Кейс подкаст для DMC tv",
    category: "horizontal",
    categoryLabel: "Горизонтальное",
    src: `${MEDIA_BASE}/assets/workhr2.mp4`,
    preview: `${MEDIA_BASE}/assets/workhr2-preview.mp4`,
  },
  {
    id: "workhr3",
    title: "Говорящая голова",
    category: "horizontal",
    categoryLabel: "Горизонтальное",
    src: `${MEDIA_BASE}/assets/workhr3.mp4`,
    preview: `${MEDIA_BASE}/assets/workhr3-preview.mp4`,
  },
];

export const STEPS = [
  {
    id: "01",
    title: "ТЗ и Исходники",
    text: "Обсуждаем задачу, подбираем референсы, вы скидываете материал.",
  },
  {
    id: "02",
    title: "Черновой монтаж",
    text: "Собираю структуру, убираю паузы, утверждаем общую динамику видео.",
  },
  {
    id: "03",
    title: "Монтаж и эффекты",
    text: "Делаю цветокоррекцию, накладываю эффекты, саунд-дизайн и субтитры.",
  },
  {
    id: "04",
    title: "Финальный рендер",
    text: "Выдаю готовый ролик с высоким удержанием в максимальном качестве.",
  },
] as const;

export const TOOLS = [
  { name: "Adobe Premiere Pro", icon: "clapperboard" },
  { name: "After Effects", icon: "sparkles" },
  { name: "CapCut Pro", icon: "scissors" },
] as const;

export const SKILLS = [
  "Premiere Pro",
  "After Effects",
  "CapCut Pro",
  "Sound Design",
  "Motion Graphics",
  "Retention Монтаж",
] as const;

export const ABOUT = {
  name: "Самир",
  status: "Доступен для проектов",
  heading: "Мой подход",
  headingAccent: "к работе",
  bio: "Я специализируюсь на создании динамичного контента высшего уровня. Моя цель — выдать мощный саунд-дизайн, сочную графику и удержание, которое заставит зрителя досмотреть ролик до самого конца.",
};

export const FAQ = [
  {
    q: "Каковы реальные сроки монтажа?",
    a: "Обычно создание Reels или Shorts занимает от 24 до 48 часов. На полноценные горизонтальные видео или подкасты уходит от 3 до 5 дней, в зависимости от объёма исходников.",
  },
  {
    q: "Входят ли правки в стоимость?",
    a: "Да, в стоимость видео входит 2 круга бесплатных аргументированных правок. Я всегда на связи, чтобы довести ролик до идеала.",
  },
  {
    q: "Что нужно для старта?",
    a: "Достаточно написать мне в Telegram, скинуть примеры (референсы) того, что вам нравится, и ссылку на папку с вашими исходниками в Telegram.",
  },
] as const;
