# Файли для проекту Yulia Art

## Структура

```
yulia-art-files/
├── lib/                        → скопіювати в yulia-art/lib/
│   ├── types.ts
│   ├── categories.ts
│   └── content.ts
│
├── scripts/                    → скопіювати в yulia-art/scripts/
│   └── fetch-content.ts        ⚠️ ЗАМІНИ YOUR_USERNAME!
│
├── app/                        → скопіювати в yulia-art/app/
│   ├── works/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── not-found.tsx
│   └── layout.example.tsx      → використай як приклад для оновлення layout.tsx
│
├── components/                 → скопіювати в yulia-art/components/
│   └── home/
│       └── FeaturedWorks.tsx
│
├── tailwind.config.ts          → замінити існуючий
├── next.config.ts              → замінити існуючий
├── package-scripts.json        → додати scripts в package.json
├── gitignore-additions.txt     → додати в .gitignore
│
└── content-repo/               → це ОКРЕМИЙ репозиторій yulia-art-content
    ├── works/
    │   ├── the-escape.md
    │   ├── lego-blocks.md
    │   └── red-painting-01.md
    ├── category-order.json
    ├── images/                 → сюди додати фото
    │   └── works/
    └── .github/
        └── workflows/
            └── trigger-deploy.yml
```

## Кроки встановлення

### 1. Встанови залежності (в yulia-art)

```bash
npm install gray-matter remark remark-html
npm install -D tsx @tailwindcss/typography
```

### 2. Скопіюй файли

Скопіюй файли з відповідних папок в проект yulia-art.

### 3. Онови fetch-content.ts

Відкрий `scripts/fetch-content.ts` і заміни:
```
const CONTENT_REPO = 'YOUR_USERNAME/yulia-art-content';
```
на свій GitHub username.

### 4. Онови package.json

Додай scripts з `package-scripts.json` в свій `package.json`.

### 5. Онови .gitignore

Додай вміст `gitignore-additions.txt` в свій `.gitignore`.

### 6. Онови layout.tsx

Використай `layout.example.tsx` як приклад — додай шрифт Cormorant.

### 7. Створи контент-репозиторій

1. Створи новий репо `yulia-art-content` на GitHub
2. Скопіюй туди вміст папки `content-repo/`
3. Налаштуй Vercel Deploy Hook
4. Додай secret `VERCEL_DEPLOY_HOOK` в GitHub

### 8. Тестуй

```bash
npm run fetch-content
npm run dev
```

Відкрий:
- http://localhost:3000/works
- http://localhost:3000/works/installations
- http://localhost:3000/works/the-escape
