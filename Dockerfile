FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --fetch-retry-mintimeout 20000 --fetch-retry-maxtimeout 120000 --fetch-retries 5
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
RUN mkdir -p /app/data
EXPOSE 3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
