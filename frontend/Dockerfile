# Використовуємо офіційний Node.js образ
FROM node:18-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо всі файли frontend
COPY . .

# Встановлюємо serve глобально
RUN npm install -g serve

# Відкриваємо порт 3000
EXPOSE 3000

# Запускаємо serve для статичних файлів
CMD ["serve", "-s", ".", "-l", "3000"]