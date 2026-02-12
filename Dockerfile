# --- Stage 1: Build ---
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files specifically to cache dependencies
COPY package*.json ./

# Install ALL dependencies (including devDependencies for nest build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# --- Stage 2: Production Run ---
FROM node:22-alpine

WORKDIR /app

# Set env to production
ENV NODE_ENV=production

# Copy only package files
COPY package*.json ./

# Install only PRODUCTION dependencies (much smaller)
RUN npm ci --only=production && npm cache clean --force

# Copy compiled code from builder
COPY --from=builder /app/dist ./dist

# Start the app
CMD ["node", "dist/main"]