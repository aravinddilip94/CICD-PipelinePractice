# Stage 1: Build React app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install bash (some scripts require it)
RUN apk add --no-cache bash

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all source files
COPY . .

# Ensure Vite executable permissions
RUN chmod +x node_modules/.bin/vite

# Build the app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
