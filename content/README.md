# Content Directory

Ця папка містить весь контент сайту в форматі Markdown з YAML frontmatter.

## Структура

```
content/
├── README.md                    # Цей файл
├── site-config.md               # Глобальні налаштування сайту
├── categories.md                # Конфігурація категорій робіт
├── pages/                       # Контент для сторінок
│   ├── home.md                  # Hero секція головної сторінки
│   ├── artist-statement.md      # Artist Statement
│   └── about.md                 # About page з Instagram
└── works/                       # Markdown файли робіт
    ├── installations/
    │   └── example-installation.md
    ├── sculptures/
    │   └── example-sculpture.md
    ├── paintings/
    │   └── example-painting.md
    ├── ceramics/
    │   └── example-ceramic.md
    └── text-informed/
        └── example-text-work.md
```

## Створені файли

### Сторінки (pages/)

#### `home.md`
Контент для Hero секції головної сторінки:
- Artist name
- Tagline/bio
- Hero image path

#### `artist-statement.md`
Artist Statement:
- Три параграфи про практику
- Фото художниці в процесі роботи

#### `about.md`
About page:
- Повна біографія (5 параграфів)
- Профільне фото
- 8 Instagram постів з ID та шляхами до зображень

### Конфігурація

#### `site-config.md`
Глобальні налаштування:
- Site metadata (title, description)
- Контактна інформація
- Social media links
- Copyright

#### `categories.md`
Всі 5 категорій робіт з:
- Display names
- Descriptions
- Preview image paths

### Роботи (works/)

Приклади markdown файлів для кожної категорії показують структуру:
- YAML frontmatter з метаданими
- Опис роботи в markdown body
- Шляхи до зображень

## Формат Work Markdown файлу

```markdown
---
title: "Назва роботи"
year: 2024
category: "installations"
materials: "Матеріали"
dimensions: "Розміри"
featured: true
coverImage: "/images/works/installations/work-slug/cover.jpg"
images:
  - "/images/works/installations/work-slug/1.jpg"
  - "/images/works/installations/work-slug/2.jpg"
order: 1
---

Опис роботи тут...

Може містити декілька параграфів.
```

## Наступні кроки

1. **Завантажити зображення** — див. `/IMAGE-MAPPING.md`
2. **Створити реальні роботи** — замінити example файли реальними
3. **Реалізувати markdown reader** — `lib/content.ts`
4. **Оновити компоненти** — читати з markdown замість hardcoded values

## Використання шляхів до зображень

Всі шляхи до зображень в frontmatter повинні починатись з `/images/` і вказувати на файли в `/public/images/`.

**Приклад:**
```yaml
coverImage: "/images/works/installations/my-work/cover.jpg"
```

Відповідний файл: `/public/images/works/installations/my-work/cover.jpg`

## Правила іменування

### Файли робіт:
- **Назва файлу:** `work-slug.md` (kebab-case, англійською)
- **Папка зображень:** `/public/images/works/[category]/work-slug/`

### Приклад:
- Markdown: `content/works/installations/echoes-of-displacement.md`
- Зображення: `public/images/works/installations/echoes-of-displacement/cover.jpg`
- URL роботи: `/works/installations/echoes-of-displacement`

## Категорії

- `installations` — Installations
- `sculptures` — Sculptures
- `paintings` — Paintings
- `ceramics` — Ceramic Works
- `text-informed` — Text-Informed & Archival Works
