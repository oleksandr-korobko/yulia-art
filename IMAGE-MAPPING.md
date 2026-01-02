# Image Mapping Guide

Цей документ показує які зображення потрібно завантажити та де вони використовуються в проєкті.

## Статус: Що вже є

✅ **Існує:** `/public/images/hero/main.jpg`

## Зображення які потрібно завантажити

### 1. Hero Section (Головна сторінка)

**Використовується в:** `components/home/Hero.tsx` → `content/pages/home.md`

**Зараз:** `https://images.unsplas.h./photo-1536924940846-227afb31e2a5...` (поламане посилання)

**Потрібно:**
- `/public/images/hero/hero-1.jpg` — головне зображення для hero slider
- `/public/images/hero/hero-2.jpg` — додаткове (опціонально для слайдера)
- `/public/images/hero/hero-3.jpg` — додаткове (опціонально для слайдера)

**Рекомендований розмір:** 1920×1080px або більше
**Формат:** JPG
**Макс. розмір:** 500 KB

---

### 2. Category Preview Images (Превʼю категорій)

**Використовується в:** `components/home/SelectedWorks.tsx` → `content/categories.md`

**Зараз:** Усі — Unsplash placeholders

**Потрібно:**
- `/public/images/categories/installations-preview.jpg`
- `/public/images/categories/sculptures-preview.jpg`
- `/public/images/categories/paintings-preview.jpg`
- `/public/images/categories/ceramics-preview.jpg`
- `/public/images/categories/text-informed-preview.jpg`

**Рекомендований розмір:** 800×800px (квадратні)
**Формат:** JPG
**Макс. розмір:** 300 KB кожне

---

### 3. Profile Photos (Фото художниці)

**Використовується в:** `app/about/page.tsx` і `components/home/ArtistStatement.tsx` → `content/pages/about.md` та `content/pages/artist-statement.md`

**Зараз:** Unsplash placeholders

**Потрібно:**
- `/public/images/profile/artist-portrait.jpg` — офіційне портретне фото для About page
- `/public/images/profile/artist-working.jpg` — фото в процесі роботи для Artist Statement

**Рекомендований розмір:** 800×1000px (портрет)
**Формат:** JPG
**Макс. розмір:** 400 KB

---

### 4. Instagram Grid Photos

**Використовується в:** `app/about/page.tsx` → `content/pages/about.md`

**Зараз:** Усі — Unsplash placeholders

**Потрібно:**
```
/public/images/instagram/instagram-1.jpg  →  Instagram post: DHTyUkXKJk6
/public/images/instagram/instagram-2.jpg  →  Instagram post: DJ_0vD8Kym4
/public/images/instagram/instagram-3.jpg  →  Instagram post: C9WzUXTMVST
/public/images/instagram/instagram-4.jpg  →  Instagram post: DHim6h7tD7G
/public/images/instagram/instagram-5.jpg  →  Instagram post: DHygV96q_HB
/public/images/instagram/instagram-6.jpg  →  Instagram post: DQrU4I9DGi3
/public/images/instagram/instagram-7.jpg  →  Instagram post: DH_rbFqq3yo
/public/images/instagram/instagram-8.jpg  →  Instagram post: DHim6h7tD7G
```

**Рекомендований розмір:** 1080×1080px (квадратні)
**Формат:** JPG
**Макс. розмір:** 300 KB кожне

**Як завантажити з Instagram:**
1. Відкрий пост (напр. `instagram.com/p/DHTyUkXKJk6`)
2. Використай інструмент для скачування (напр. saveinsta.app, downloadgram.com)
3. Збережи з назвою `instagram-1.jpg` і т.д.

---

### 5. Work Images (Зображення робіт)

**Використовується в:** Майбутні сторінки робіт → `content/works/[category]/[work-slug].md`

**Структура для кожної роботи:**
```
/public/images/works/[category]/[work-slug]/
├── cover.jpg    ← Головне зображення (ОБОВ'ЯЗКОВО)
├── 1.jpg        ← Додаткове фото галереї
├── 2.jpg        ← Додаткове фото галереї
└── 3.jpg        ← Додаткове фото галереї
```

**Приклад:**
```
/public/images/works/installations/echoes-of-displacement/
├── cover.jpg
├── 1.jpg
├── 2.jpg
└── 3.jpg
```

**Рекомендовані розміри:**
- `cover.jpg`: 1200×1200px (квадратне) або 1600×1200px
- Галерея: 1600×1200px

**Формат:** JPG
**Макс. розмір:** 500 KB кожне

---

## Процес завантаження

### Для сторінок (hero, profile, instagram, categories):
1. Завантаж фото в відповідну папку в `/public/images/`
2. Перейменуй згідно з таблицею вище
3. Оптимізуй (TinyPNG, Squoosh)
4. Markdown файли вже містять правильні шляхи

### Для робіт:
1. Створи папку: `/public/images/works/[category]/[work-slug]/`
2. Додай `cover.jpg` + пронумеровані фото
3. Створи відповідний markdown файл в `/content/works/[category]/[work-slug].md`
4. Вкажи шляхи в frontmatter markdown файлу

---

## Швидкий чеклист

### Необхідний мінімум для запуску сайту:

- [ ] Hero: `hero-1.jpg`
- [ ] Categories: 5 превʼю (installations, sculptures, paintings, ceramics, text-informed)
- [ ] Profile: `artist-portrait.jpg`
- [ ] Profile: `artist-working.jpg`
- [ ] Instagram: 8 фото (instagram-1.jpg до instagram-8.jpg)
- [ ] Хоча б 1-2 приклади робіт у кожній категорії

### Опціонально:
- [ ] Додаткові hero зображення для слайдера
- [ ] Більше робіт у кожній категорії
- [ ] CV файл: `/public/cv.pdf`

---

## Оптимізація зображень

### Онлайн інструменти:
- **TinyPNG** (tinypng.com) — найкраще стиснення для JPG/PNG
- **Squoosh** (squoosh.app) — гнучкі налаштування
- **ImageOptim** (Mac app) — batch processing

### Цільові показники:
- Hero: < 500 KB
- Categories: < 300 KB
- Profile: < 400 KB
- Instagram: < 300 KB
- Works: < 500 KB

---

## Поточний маппінг компонент → markdown

| Компонент | Зараз (hardcoded) | Буде використовувати |
|-----------|------------------|---------------------|
| `Hero.tsx` | Текст + Unsplash URL | `content/pages/home.md` |
| `SelectedWorks.tsx` | Unsplash URLs | `content/categories.md` |
| `ArtistStatement.tsx` | Текст + Unsplash URL | `content/pages/artist-statement.md` |
| `about/page.tsx` | Текст + Unsplash URLs | `content/pages/about.md` |
| `Footer.tsx` | Хардкод | `content/site-config.md` |
| Works pages | Ще не створені | `content/works/[category]/[slug].md` |

---

## Наступні кроки

Після завантаження зображень потрібно буде:

1. ✅ Реалізувати `lib/content.ts` — markdown reader
2. ✅ Оновити компоненти для читання з markdown замість hardcoded values
3. ✅ Створити сторінки Works (category + detail pages)
4. ✅ Додати реальні дані про роботи
