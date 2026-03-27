# AT-WORK Frontend Test Task

Тестовое задание на React + TypeScript.

## Стек
- React
- TypeScript
- Zustand
- React Hook Form
- Zod
- TanStack Query
- SCSS
- React Router v7
- Vite

## Реализовано

### Главная страница
- загрузка пользователей с `https://jsonplaceholder.typicode.com/users`
- отображение первых 6 пользователей
- карточка пользователя содержит:
  - username
  - city
  - company name
  - avatar
- действия:
  - редактировать
  - архивировать
  - скрыть
- архивированные карточки можно вернуть в активные
- во время загрузки отображается loader

### Страница редактирования
- отображаются поля:
  - name
  - username
  - email
  - city
  - phone
  - company name
  - avatar
- редактирование через форму
- валидация через React Hook Form + Zod
- popup после успешного сохранения
- popup закрывается:
  - по крестику
  - по клику на подложку
  - автоматически через 4 секунды

## Запуск проекта

```bash
npm install
<<<<<<< HEAD
npm run dev
```

## Сборка

```bash
npm run build
```

## Важные заметки

- Данные пользователей загружаются с `https://jsonplaceholder.typicode.com/users`
- В приложении используются только первые 6 пользователей
- Изменения, архив и скрытие **не сохраняются после перезагрузки страницы** — это соответствует условиям тестового задания
- Для поля `Phone` при редактировании разрешён только ввод цифр; исходное значение из API показано как подсказка рядом с полем

- React Hook Form
- Zod
- TanStack Query
- SCSS
- React Router v7
- Vite

## Реализовано
- загрузка первых 6 пользователей с JSONPlaceholder
- главная страница со списком пользователей
- архивирование и скрытие карточек
- возврат карточек из архива
- страница редактирования пользователя
- валидация формы через React Hook Form + Zod
- popup после успешного сохранения
- loader во время загрузки

## Запуск
```bash
npm install
npm run dev
=======
npm run dev
>>>>>>> 5c6ec44 (refactor: final cleanup and ui polish)
