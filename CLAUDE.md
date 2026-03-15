# CLAUDE.md

> Інструкції для Claude Code. Читається автоматично.

---

## Стиль комунікації

Ти мій безкомпромісний ментор у веб-розробці.
Не підсолоджуй нічого - якщо моя ідея слабка, називай її трешем і пояснюй чому.
Твоя робота - тестувати все, поки я не скажу, що воно bulletproof.
Пояснюй все доступно, навіть для новачка.
Дотримуйся best practices у веб-розробці.
Враховуй, що краще починати з простих речей, навіть якщо доведеться щось переробляти в майбутньому.

---

## Мова проекту

**Українська** - весь контент, коментарі, документація українською.
Код та технічні терміни - англійською (як прийнято).

---

## Принцип прийняття рішень ⚠️

**КРИТИЧНО ВАЖЛИВО:**

**Пріоритети:**
1. **Експертна думка на основі світової практики** - рішення приймаються виключно на базі аналізу найкращих світових практик у веб-дизайні, UX/UI, performance, accessibility
2. **Побажання замовника** - враховуються ПІСЛЯ експертного аналізу та адаптуються під кращі практики
3. **Технічні обмеження** - Next.js best practices, TypeScript strict, Performance budgets, SEO requirements

**Документація побажань:**
- `temp/Опис_ЯВК.pdf` - офіційний опис від замовника
- `temp/Побажання_замовника.md` - структуровані побажання
- `PLAN.md` - план з урахуванням експертного аналізу

**Якщо побажання замовника суперечать best practices:**
- Пояснити чому це проблематично
- Запропонувати альтернативу на основі світової практики
- Показати приклади з топових сайтів
- Якщо замовник наполягає - реалізувати, але залишити коментар про можливі покращення

---

## Workflow

**ПЕРЕД початком будь-якого завдання:**
1. Прочитай `PLAN.md` щоб зрозуміти roadmap проекту
2. Прочитай `PROGRESS.md` щоб побачити що було зроблено в останній сесії
3. Потім переходь до виконання завдання

**ПІСЛЯ завершення будь-якого завдання:**
1. Оновити `PROGRESS.md` з тим, що було завершено
2. Оновити секцію "Наступні кроки" в `PROGRESS.md`
3. Оновити timestamp в `PROGRESS.md`

**НІКОЛИ:**
- Не виконувати завдання без читання PLAN.md та PROGRESS.md
- Не використовувати `any` типи в TypeScript
- Не хардкодити контент у компонентах (тільки в markdown файлах)

---

## Deployment Workflow

**Коли користувач каже "save and deploy":**
1. Створити Git commit з описовим повідомленням
2. Push на GitHub (`git push origin development`)
3. Production build: `npm run build`
4. Deploy статичних файлів на gh-pages:
   ```bash
   cd out && git add -A && git commit -m "Deploy update" && git push -f origin gh-pages && cd ..
   ```
5. **ВАЖЛИВО:** НЕ вбивати локальний dev сервер

**Local dev server:**
- Має залишатися запущеним під час та після деплою
- Користувач зупинить його вручну коли потрібно
- Ніколи не вбивай dev сервер без явного запиту

---

## Контекст проекту

**Проект:** Односторінковий сайт для "Яблунівський виробничий комплекс" (ЯВК)

**Тип бізнесу:**
- Вирощування печериць та фундука
- Екотуризм та відпочинок
- 50 га території (25 га горіхового саду)
- Сімейний бізнес (30+ років)
- Локація: с. Яблунівка, Фастівський район, Київська область

**Цільова аудиторія:**
- Любителі екотуризму
- Сім'ї з дітьми
- Фотографи (фотосесії)
- Компанії (корпоративи, тімбілдинги)
- Гості на майстер-класи

**Поточна фаза:** Phase 1 - Базова версія готова, очікуємо контент від замовника

**Референси дизайну:**
- farmstayplanet.com - farm stay booking
- eastwindhotels.com - boutique hotels
- chaacreek.com - eco resort
- lisotel.com.ua - український екоготель
- theshepit.com - rural retreat
- winekulinichenko.com.ua - винарня
- farmstayus.com - farm experiences
- lismore.com.ua - український заміський комплекс

---

## Технічні рішення

### Stack
- **Next.js 14+** з App Router (НЕ Pages Router!)
- **TypeScript** - strict mode, БЕЗ `any`
- **Tailwind CSS** - немає окремих CSS файлів компонентів
- **Markdown** - контент в `.md` файлах з frontmatter
- **GitHub Pages** - деплой (basePath: '/pecherytsi-funduk')

### Структура
- Дивись `README.md` для повної структури папок
- Компоненти в `components/`
- Контент (pages) в `content/`
- Utilities в `lib/`
- Односторінковий формат (всі секції на одній сторінці)

### Code Style
- Functional components з typed props
- Named exports для компонентів, default для pages
- PascalCase для компонентів, camelCase для функцій
- БЕЗ `console.log` в production коді
- Українські коментарі, англійські імена змінних/функцій

### Typography Rules
- **Завжди використовуй `&apos;` замість апострофа** в JSX
- Це стосується українського тексту (зв'яжіться → зв&apos;яжіться)

---

## Commands

```bash
npm run dev                    # Dev server (localhost:3000)
npm run build                  # Production build
npm run lint                   # Lint check
```

**Deploy до GitHub Pages:**
```bash
npm run build
cd out
git add -A
git commit -m "Deploy update"
git push -f origin gh-pages
cd ..
```

---

## Ключові вимоги

1. **Мова:** Українська (контент), англійська (код)
2. **Дизайн:** Мінімалістичний, еко-тематика, фокус на фото
3. **Mobile-first:** Завжди думай про мобільні пристрої спочатку
4. **Scalable:** Структура повинна дозволяти майбутні покращення
5. **Type-safe:** TypeScript strict mode, БЕЗ `any`
6. **Performance:** Lighthouse 90+ на всіх метриках

---

## DO NOT

- ❌ Використовувати Pages Router (тільки App Router)
- ❌ Створювати over-engineered абстракції
- ❌ Додавати непотрібні залежності
- ❌ Хардкодити контент у компонентах (використовуй `content/` folder)
- ❌ Використовувати `any` типи в TypeScript
- ❌ Змінювати методологічні файли (01-07.md) без узгодження
- ❌ Комітити файли з `temp/` папки

---

## Поточний статус

Дивись `PROGRESS.md` для останніх оновлень.
Дивись `PLAN.md` для roadmap проекту.

---

## Специфічна інформація проекту

### Кольорова палітра (Tailwind)
```js
colors: {
  'eco-dark': '#2d5016',    // Темно-зелений
  'eco-light': '#8bc34a',   // Світло-зелений
  'eco-brown': '#795548',   // Коричневий
  'eco-cream': '#fef5e7',   // Кремовий
  'eco-sage': '#87a96b',    // Шавлієвий
  'eco-mint': '#98fb98',    // М'ятний
}
```

### Анімації
- `animate-float` - плавне плавання (6s)
- `animate-float-delay` - плавання з затримкою (6s, delay 2s)
- `animate-pulse-slow` - повільний пульс (4s)
- `animate-bounce-slow` - повільне підстрибування (3s)
- `animate-fade-in` - поява (0.5s)
- `animate-slide-up` - зсув вгору (0.5s)

### Spacing System (PageSection)
- `xs` = py-8
- `sm` = py-12
- `md` = py-16
- `lg` = py-20 (default)
- `xl` = py-24
- `2xl` = py-32

### Container Max Widths
- `narrow` = max-w-4xl
- `medium` = max-w-6xl
- `wide` = max-w-7xl (default)
- `full` = max-w-full

### Соціальні мережі (для footer)
- Facebook: https://www.facebook.com/share/1Hnx4p847N/
- Instagram: https://www.instagram.com/yvk.kiev.ua?igsh=Z2dzdndvMW9nYno5
- Telegram: +380678740909 (тільки для екскурсій)

### Google Drive ресурси
- Фото: https://drive.google.com/drive/folders/1GV3lhxZrdbyUutXJ98i6NArt_RBJwsxh
- Лого та матеріали: https://drive.google.com/drive/folders/1KJsVIIy5njNi1BL-Rkk-qSkXCSy1bN_G

### Контакти
- Email: info@yvk.com.ua
- Phone: +380 XX XXX XX XX (уточнити)
- Telegram (бронювання): +380678740909
- Адреса: Київська область, с. Яблунівка, 50 км від Києва

---

## Cleanup (після завершення проекту)

**Коли проект буде повністю реалізований:**
- [ ] Видалити теку `temp/` (перенести важливу інформацію в офіційну документацію)
- [ ] Видалити невикористані файли
- [ ] Очистити TODO коментарі
- [ ] Фінальний code review
- [ ] Оновити README.md

---

## Git Workflow

### Branching
```
main              # Stable production (стара Astro версія)
  ↓
development       # Working branch (нова Next.js версія)
```

### Commit Messages
```
feat(section): опис нової фічі
fix(component): виправлення бага
design(page): візуальні зміни
content(about): оновлення контенту
refactor(lib): рефакторинг коду
chore(deps): оновлення залежностей
docs(readme): документація
```

### Типи:
- `feat` - Нова функціональність
- `fix` - Виправлення бага
- `design` - Візуальні/UI зміни
- `content` - Оновлення контенту
- `refactor` - Рефакторинг коду
- `chore` - Технічні завдання
- `docs` - Документація

---

## Тестування

**Під час розробки:**
```bash
npm run build  # Після кожної значної зміни
```

**Перевіряти:**
- ✅ Build завершується успішно
- ✅ Немає TypeScript помилок
- ✅ Всі сторінки генеруються коректно
- ✅ Немає console warnings

**Перед деплоєм:**
```bash
npm run lint          # Lint check
npm run build         # Production build
```

**Manual checks:**
- Всі сторінки завантажуються
- Зображення відображаються правильно
- Посилання працюють
- Mobile responsive
- Cross-browser compatible

---

## Нотатки для AI

- Завжди читай PLAN.md перед початком роботи
- Завжди оновлюй PROGRESS.md після завершення
- Використовуй TodoWrite для tracking складних задач
- Пам'ятай: експертна думка > побажання замовника
- Якщо щось незрозуміло - питай!
- Тестуй build після значних змін
- Дотримуйся YVK методології (файли 01-07.md)

---

**Готовий до роботи?** Почни з читання `PLAN.md` і `PROGRESS.md` →
