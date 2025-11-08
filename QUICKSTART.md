# Быстрый старт IndexCord

## Установка

1. Установите зависимости для backend:
```bash
npm install
```

2. Установите зависимости для frontend:
```bash
cd client
npm install
cd ..
```

Или установите все сразу:
```bash
npm run install-all
```

## Запуск

Запустите приложение в режиме разработки (одновременно backend и frontend):
```bash
npm run dev
```

Приложение будет доступно:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Первый вход

Вы можете:
1. Зарегистрировать новый аккаунт через форму регистрации
2. Использовать тестовый аккаунт:
   - Username: `admin`
   - Password: `admin`

## Возможности

- ✅ Регистрация и вход пользователей
- ✅ Создание серверов
- ✅ Создание каналов в серверах
- ✅ Отправка сообщений в реальном времени
- ✅ Современный интерфейс в стиле Discord

## Структура проекта

- `server/` - Backend (Node.js + Express + Socket.io)
- `client/` - Frontend (React + TypeScript + Tailwind CSS)

## Примечания

- Данные хранятся в памяти и будут потеряны при перезапуске сервера
- Для production рекомендуется использовать базу данных
- Измените JWT_SECRET в production окружении

