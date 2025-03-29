# Base image for building the application
FROM node:18-alpine AS builder

# Author information
LABEL author="https://github.com/sisuad"
LABEL version="1.0.0"

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

# Version information
LABEL version="1.0.0"

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV production

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]