# Multi-stage build для production
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package.json файлы
COPY package*.json ./
COPY client/package*.json ./client/

# Устанавливаем зависимости
RUN npm install
RUN cd client && npm install

# Копируем исходный код
COPY . .

# Собираем frontend
WORKDIR /app/client
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Копируем только необходимые файлы
COPY package*.json ./
RUN npm install --production

# Копируем backend код
COPY server ./server

# Копируем собранный frontend
COPY --from=builder /app/client/build ./client/build

# Устанавливаем serve для статики
RUN npm install -g serve

# Открываем порты
EXPOSE 5000 3000

# Запускаем backend и frontend
CMD ["sh", "-c", "node server/index.js & serve -s client/build -l 3000"]

