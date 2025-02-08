# Stage 1: Build Stage
FROM oven/bun:latest AS build

ARG NUXT_UI_PRO_LICENSE
ARG TURBO_TEAM
ARG TURBO_TOKEN

ENV NUXT_UI_PRO_LICENSE=$NUXT_UI_PRO_LICENSE
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
