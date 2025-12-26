# -------------------------
# Base (compartilhada entre os stages)
# -------------------------
FROM node:22-slim AS base

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# -------------------------
# Stage 1: deps (instala dependências com npm)
# -------------------------
FROM base AS deps
RUN apt-get update && apt-get install -y openssl --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci

# -------------------------
# Stage 2: build (gera o .next standalone)
# -------------------------
FROM base AS builder
RUN apt-get update && apt-get install -y openssl --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# -------------------------
# Stage 3: runner (imagem final, enxuta)
# -------------------------
FROM base AS runner
RUN apt-get update && apt-get install -y openssl curl --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -r nodejs && useradd -r -g nodejs nodejs
USER nodejs
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]