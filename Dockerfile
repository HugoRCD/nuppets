# Stage 1: Build Stage
FROM oven/bun:latest AS build

RUN apt-get update && apt-get install -y \
    python3 \
    python-is-python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

ARG NUXT_UI_PRO_LICENSE
ARG DATABASE_URL
ARG TURBO_TEAM
ARG TURBO_TOKEN

ENV NUXT_UI_PRO_LICENSE=$NUXT_UI_PRO_LICENSE
ENV DATABASE_URL=$DATABASE_URL
ENV TURBO_TEAM=$TURBO_TEAM
ENV TURBO_TOKEN=$TURBO_TOKEN
ENV NITRO_PRESET=bun

WORKDIR /app

COPY package.json ./
COPY bun.lock ./

COPY . .

RUN bun install

RUN bun run build

# Stage 2: Final Stage
FROM oven/bun:latest AS final

WORKDIR /app

COPY --from=build /app/.output .output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
