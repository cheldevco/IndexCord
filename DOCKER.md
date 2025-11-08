# Docker Guide для IndexCord

## Быстрый старт

### Production

1. Соберите и запустите контейнеры:
```bash
docker-compose up -d --build
```

2. Приложение будет доступно:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

3. Остановите контейнеры:
```bash
docker-compose down
```

### Development

1. Запустите в режиме разработки:
```bash
docker-compose -f docker-compose.dev.yml up
```

2. Изменения в коде будут автоматически применяться благодаря volume mounts.

## Структура Docker файлов

### Dockerfile.backend
- Отдельный контейнер для backend
- Использует Node.js 18 Alpine
- Порт: 5000

### Dockerfile.frontend
- Multi-stage build для frontend
- Собирает React приложение
- Использует Nginx для статики
- Порт: 3000
- Проксирует API запросы на backend

### Dockerfile.dev
- Для разработки
- Включает все зависимости
- Hot reload через volume mounts

### docker-compose.yml
Production конфигурация:
- `backend` - Backend сервис
- `frontend` - Frontend сервис с Nginx
- Общая сеть для коммуникации

### docker-compose.dev.yml
Development конфигурация:
- Один контейнер для всего приложения
- Volume mounts для hot reload
- Все порты проброшены

## Переменные окружения

Создайте `.env` файл:
```env
JWT_SECRET=your-secret-key-change-in-production
```

Или передайте через docker-compose:
```yaml
environment:
  - JWT_SECRET=${JWT_SECRET}
```

## Полезные команды

### Просмотр логов
```bash
# Все сервисы
docker-compose logs -f

# Только backend
docker-compose logs -f backend

# Только frontend
docker-compose logs -f frontend
```

### Пересборка после изменений
```bash
docker-compose up -d --build
```

### Очистка
```bash
# Остановить и удалить контейнеры
docker-compose down

# Удалить также volumes
docker-compose down -v

# Удалить образы
docker-compose down --rmi all
```

### Вход в контейнер
```bash
# Backend
docker-compose exec backend sh

# Frontend
docker-compose exec frontend sh
```

## Troubleshooting

### Порт уже занят
Измените порты в `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Вместо 3000:3000
```

### Проблемы с правами
На Linux может потребоваться:
```bash
sudo docker-compose up
```

### Очистка Docker
```bash
# Удалить неиспользуемые образы
docker image prune -a

# Удалить все неиспользуемые ресурсы
docker system prune -a
```

## Production рекомендации

1. Используйте `.env` файл для секретов
2. Настройте reverse proxy (nginx/traefik) перед контейнерами
3. Используйте volumes для персистентных данных
4. Настройте health checks
5. Используйте docker secrets для чувствительных данных
6. Настройте логирование
7. Используйте multi-stage builds для уменьшения размера образов

