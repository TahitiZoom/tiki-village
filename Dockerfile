FROM node:20-slim AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install --production=false

FROM base AS build
WORKDIR /app

ENV PAYLOAD_CONFIG_PATH=./payload.config.ts

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
ENV PAYLOAD_CONFIG_PATH=./payload.config.ts
ENV NODE_OPTIONS=--dns-result-order=ipv4first

RUN mkdir -p /app/media

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

COPY --from=build /app/.payload ./.payload
COPY --from=build /app/payload.config.ts ./payload.config.ts

COPY --from=build /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
