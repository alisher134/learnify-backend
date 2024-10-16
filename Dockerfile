# Указываем базовый образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Сборка приложения
RUN npm run build

# Указываем команду для запуска приложения
CMD ["npm", "run", "dev"]

# Экспортируем порт
EXPOSE 4000
