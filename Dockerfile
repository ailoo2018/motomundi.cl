# Stage 1: Build
FROM node:20-alpine AS builder

# 1. Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# 2. Copy dependency files first
# If you have a pnpm-workspace.yaml, add it to this list
COPY package.json pnpm-lock.yaml ./

# 3. Install dependencies using pnpm
# --frozen-lockfile ensures the build fails if the lockfile is out of sync
RUN pnpm install --frozen-lockfile --ignore-scripts

# 4. Copy the rest of the source code
COPY . .

RUN pnpm run postinstall

# 5. Build the Nuxt application
RUN pnpm run build

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app

# Copy the standalone output from the builder
COPY --from=builder /app/.output ./.output

ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

# Nuxt 3/4 builds a standalone server in .output
CMD ["node", ".output/server/index.mjs"]
