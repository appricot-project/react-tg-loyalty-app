# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Базовый слой с зависимостями
# ---------------------------------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------------------------------------------------------------------------
# Dev-режим: Vite dev-сервер с HMR (docker compose --profile dev up)
# ---------------------------------------------------------------------------
FROM node:22-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]

# ---------------------------------------------------------------------------
# Сборка production-бандла
# ---------------------------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

# Vite подставляет VITE_*-переменные на этапе сборки, поэтому они приходят как ARG
ARG VITE_API_BASE_URL=""
ARG VITE_API_URL=""
ARG VITE_DEMO_MODE="true"
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_API_URL=$VITE_API_URL \
    VITE_DEMO_MODE=$VITE_DEMO_MODE

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------------------------------------------------------------------------
# Production: раздача статики через nginx
# ---------------------------------------------------------------------------
FROM nginx:1.27-alpine AS prod
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html/rect-tg-loyalty-app
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/rect-tg-loyalty-app/ >/dev/null 2>&1 || exit 1
CMD ["nginx", "-g", "daemon off;"]
