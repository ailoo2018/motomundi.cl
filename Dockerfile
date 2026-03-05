# Stage 1: Build
FROM node:20-alpine AS builder
# Install pnpm in the container
RUN npm install -g pnpm
WORKDIR /app

# Copy pnpm's lockfile specifically
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
