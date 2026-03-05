# ---- Base image ----
FROM node:20-slim AS base
WORKDIR /app

# ---- Install dependencies ----
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install --production=false

# ---- Build ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Production image ----
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app ./

EXPOSE 3000
CMD ["node", ".next/standalone/server.js"]

