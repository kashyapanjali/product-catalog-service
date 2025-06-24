# Stage 1: Build dependencies
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .

# Stage 2: Production image
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
RUN apk add --no-cache curl
EXPOSE 3000

# Healthcheck for container monitoring
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:3000/health || exit 1

CMD ["node", "index.js"] 