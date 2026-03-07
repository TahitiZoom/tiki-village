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
ENV HOST=0.0.0.0
ENV NODE_OPTIONS=--dns-result-order=ipv4first

# --- Copy Next.js standalone output ---
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

# --- Copy Payload required files ---
COPY --from=build /app/payload.config.ts ./payload.config.ts
COPY --from=build /app/src ./src

# --- Copy public assets ---
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["node", "server.js", "--port", "3000", "--hostname", "0.0.0.0"]
