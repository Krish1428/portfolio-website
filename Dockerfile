# Stage 1: Build frontend
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
# Install only production dependencies (since tsx/typescript are now in dependencies, they're included)
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY server.ts ./
COPY contacts.json ./

# Railway injects its own PORT variable, but defaults to 3001 if local
ENV PORT=3001
EXPOSE 3001

CMD ["npm", "run", "start"]
