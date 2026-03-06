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
# Copy only the standalone output (includes server.js + minimal node_modules)
COPY --from=build /app/.next/standalone ./
# Copy static assets
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js", "--port", "3000", "--hostname", "0.0.0.0"]

