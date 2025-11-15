# Production build for Express/TypeScript backend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Production runtime
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built JavaScript from builder stage
COPY --from=builder /app/dist ./dist

# Copy source files (for models, interfaces, etc. that might be needed at runtime)
COPY --from=builder /app/src/data ./src/data

EXPOSE 3000

# Use node to run the compiled JavaScript
CMD ["node", "dist/app.js"]

