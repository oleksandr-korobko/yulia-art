# Покрокова інструкція: Запуск проекту

## Крок 1: Підготовка на твоєму комп'ютері

### 1.1 Створи папку проекту

```bash
# Відкрий термінал і виконай:
mkdir yulia-art
cd yulia-art
```

### 1.2 Скопіюй файли

Завантаж всі файли з цього чату і розклади так:

```
yulia-art/
├── README.md
├── CLAUDE.md
├── content-texts.md
└── tailwind-components/
    ├── Simple_with_social_links.jsx
    ├── Split_with_image.jsx
    ├── Split_with_image_-_marketing.jsx
    ├── Split_with_image_-_page_sections.jsx
    ├── Three-column_with_background_images.jsx
    ├── Two_row_bento_grid.jsx
    ├── Two_row_bento_grid_with_three_column_second_row.tsx
    ├── With_angled_image_on_right.jsx
    ├── With_photo_and_list.jsx
    └── With_testimonial_and_stats.jsx
```

### 1.3 Ініціалізуй Git

```bash
git init
git add .
git commit -m "Initial project setup with specs and components"
```

---

## Крок 2: Відкрий VS Code з Claude Code

### 2.1 Відкрий папку в VS Code

```bash
code .
```

### 2.2 Запусти Claude Code

У VS Code:
1. Відкрий Command Palette: `Cmd+Shift+P` (Mac) або `Ctrl+Shift+P` (Windows)
2. Введи: `Claude: Open`
3. Або використай ярлик якщо налаштований

---

## Крок 3: Перші команди для Claude Code

### 3.1 Ініціалізація проекту

Скопіюй і відправ цю команду:

```
Read README.md and CLAUDE.md first.
Then initialize a new Next.js 14 project with:
- TypeScript
- Tailwind CSS
- App Router
- ESLint

Use these exact commands:
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

After setup, verify the project runs with: npm run dev
```

### 3.2 Перевір що все працює

Після виконання:
1. Відкрий браузер: `http://localhost:3000`
2. Має показати стандартну Next.js сторінку

### 3.3 Базова структура

Наступна команда:

```
Create the base folder structure according to README.md:

1. Create folders:
   - components/layout/
   - components/ui/
   - components/home/
   - components/works/
   - content/works/installations/
   - content/works/sculptures/
   - content/works/paintings/
   - content/works/ceramics/
   - content/works/text-informed/
   - content/pages/
   - lib/
   - public/images/works/

2. Create placeholder files:
   - lib/types.ts (with Work, Category types from README)
   - lib/content.ts (empty, will add markdown reading later)

Commit: "Add project folder structure"
```

---

## Крок 4: Створення Layout

```
Create the base layout with Header and Footer.

Header requirements:
- Artist name: "YULIIA HOLOVATIUK-UNGUREANU" (left side)
- Navigation: HOME | WORKS | ABOUT | CONTACT (right side)
- WORKS has dropdown: Installations, Sculptures, Paintings, Ceramic Works, Text-Informed & Archival Works
- Mobile: hamburger menu
- Style: minimal, like Chiharu Shiota site

Footer requirements:
- Use Simple_with_social_links.jsx as reference
- Only Instagram icon (link: https://www.instagram.com/yuliia_art_uk_ua)
- Copyright text from content-texts.md
- Simple, minimal design

Update app/layout.tsx to include Header and Footer.
Create: components/layout/Header.tsx, Footer.tsx, Navigation.tsx

Commit: "Add Header and Footer components"
```

---

## Крок 5: Домашня сторінка

```
Create the Home page with two sections:

Section 1 - Hero:
- Use Split_with_image_-_marketing.jsx as reference
- Full-width layout
- Left: Artist name + short bio (from content-texts.md)
- Right: Placeholder image (we'll add real one later)
- No buttons, just text

Section 2 - Selected Works:
- Use Three-column_with_background_images.jsx as reference  
- 5 cards for categories (not 3)
- Each card: category image + title + short description
- Categories from README.md Work Categories table
- Links to /works/[category]
- For now use placeholder images

Create: components/home/Hero.tsx, SelectedWorks.tsx
Update: app/page.tsx

Commit: "Add Home page with Hero and Selected Works"
```

---

## Крок 6: Сторінка About

```
Create About page with two parts:

Part 1 - Profile:
- Use Split_with_image.jsx as reference
- Photo on LEFT (Yulia wants mirrored layout)
- Text on RIGHT: full Profile text from content-texts.md
- Add "Artist Statement" section below
- Add "Download CV" button (link to /cv.pdf for now)

Part 2 - Instagram Grid:
- Use Two_row_bento_grid.jsx as reference but simpler
- 8 image placeholders in 4x2 grid
- Each links to Instagram post (URLs in README.md)
- Simple hover effect

Create: app/about/page.tsx
Use content from content-texts.md

Commit: "Add About page"
```

---

## Крок 7: Сторінка Contact

```
Create Contact page:
- Use Split_with_image_-_page_sections.jsx as reference
- Photo on LEFT
- Contact info on RIGHT (no form, just info):
  - Email: ungureanuyuliia@gmail.com
  - Instagram: @yuliia_art_uk_ua (with icon, clickable)
  - Download CV link
- Minimal, clean design like Shiota's contact page

Create: app/contact/page.tsx

Commit: "Add Contact page"
```

---

## Крок 8: Система робіт (Works)

```
Create the Works system:

1. Content types (lib/types.ts):
   - Work interface with all fields from README
   - Category type

2. Content reader (lib/content.ts):
   - Function to read markdown files from content/works/
   - Parse frontmatter
   - Get works by category
   - Get single work by slug

3. Works overview page (app/works/page.tsx):
   - Grid of all categories
   - Same as Selected Works on home but full width

4. Category page (app/works/[category]/page.tsx):
   - Category title + description
   - Grid of works in that category
   - Use Three-column_with_background_images style

5. Single work page (app/works/[category]/[slug]/page.tsx):
   - Large hero image
   - Title, year, materials, dimensions
   - Description text
   - Image gallery (simple grid)
   - Back to category link

Create sample content:
- content/works/installations/the-escape.md (use The_Escape.jpg)

Commit: "Add Works system with content reader"
```

---

## Важливі команди Git

Після кожного етапу:

```bash
git add .
git commit -m "Опис змін"
```

Перед завершенням роботи:

```bash
git push origin main
```

---

## Якщо щось пішло не так

### Проект не запускається

```
Check for errors in terminal.
Fix any TypeScript or ESLint errors.
Run: npm run dev
```

### Стилі не працюють

```
Verify Tailwind is configured correctly in tailwind.config.ts
Check that globals.css has Tailwind directives
```

### Claude Code не розуміє контекст

```
Please read README.md and CLAUDE.md files in the project root.
These contain all project specifications.
```

---

## Фінальний чекліст Phase 1

- [ ] Проект ініціалізовано (Next.js + TS + Tailwind)
- [ ] Структура папок створена
- [ ] Header з навігацією
- [ ] Footer з Instagram
- [ ] Home: Hero секція
- [ ] Home: Selected Works секція
- [ ] About: Profile + Artist Statement
- [ ] About: Instagram grid
- [ ] Contact: Info + photo
- [ ] Works: Overview page
- [ ] Works: Category pages
- [ ] Works: Single work page
- [ ] Markdown content reader
- [ ] Sample content додано
- [ ] Responsive design працює
- [ ] Deployed на Vercel

---

## Контакт для питань

Якщо застряг – повертайся в цей чат з конкретним питанням або помилкою.
