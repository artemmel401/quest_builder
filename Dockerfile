FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm i

# Финальный образ
COPY . .
RUN npm run build

# Финальный образ
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Копируем только необходимое
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules


EXPOSE 3000
CMD ["npm", "start"]