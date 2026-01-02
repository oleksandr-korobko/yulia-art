# Git Workflow

Цей проєкт використовує two-branch workflow для розробки.

## Branches

### `master` (Production)
- **Призначення:** Production-ready код
- **Deployment:** Автоматично деплоїться на Vercel Production
- **Захист:** Тільки через Pull Requests з `development`
- **URL:** https://yulia-art.vercel.app

### `development` (Development)
- **Призначення:** Активна розробка
- **Deployment:** Автоматично деплоїться на Vercel Preview
- **Робоча гілка:** Основна гілка для розробки
- **URL:** Preview URL від Vercel

## Workflow

### Щоденна розробка

1. **Переконайся що на development:**
   ```bash
   git checkout development
   git pull origin development
   ```

2. **Роби зміни:**
   ```bash
   # Edit files
   git add .
   git commit -m "Your commit message"
   ```

3. **Push в development:**
   ```bash
   git push origin development
   ```
   → Vercel автоматично створить preview deployment

### Випуск в Production

1. **Переконайся що development готовий:**
   ```bash
   git checkout development
   git status
   # Test preview deployment
   ```

2. **Створи Pull Request:**
   ```bash
   gh pr create --base master --head development --title "Release: [опис змін]" --body "## Changes\n- Feature 1\n- Feature 2"
   ```

3. **Merge PR:**
   - Review changes на GitHub
   - Merge pull request
   → Vercel автоматично деплоїть на production

### Швидкий hotfix на production

Якщо потрібно терміново виправити щось на production:

```bash
# Створи hotfix branch з master
git checkout master
git pull origin master
git checkout -b hotfix/fix-description

# Fix the issue
git add .
git commit -m "Hotfix: fix description"
git push origin hotfix/fix-description

# Create PR to master
gh pr create --base master --head hotfix/fix-description

# After merge, sync development
git checkout development
git merge master
git push origin development
```

## Commands Reference

### Перевірити поточну гілку
```bash
git branch
```

### Переключитись на гілку
```bash
git checkout development    # Switch to development
git checkout master         # Switch to master
```

### Синхронізувати з GitHub
```bash
git pull origin development  # Get latest changes
```

### Створити коміт
```bash
git add .                              # Stage all changes
git commit -m "Description of changes" # Commit
git push origin development            # Push to GitHub
```

### Подивитись статус
```bash
git status                  # Current changes
git log --oneline -5        # Recent commits
git diff                    # See changes
```

## GitHub Repository

**URL:** https://github.com/oleksandr-korobko/yulia-art

## Vercel Integration

- **Production:** https://yulia-art.vercel.app (from `master`)
- **Preview:** Automatic preview URLs (from `development`)
- **Dashboard:** https://vercel.com/oleksandrs-projects-7e418822/yulia-art

## Tips

- 💡 Завжди працюй в `development` гілці
- 💡 `master` оновлюй тільки через Pull Requests
- 💡 Кожен push в `development` → автоматичний preview deployment
- 💡 Merge в `master` → автоматичний production deployment
- 💡 Пиши зрозумілі commit messages
