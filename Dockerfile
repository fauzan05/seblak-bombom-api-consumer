# Gunakan image Node.js versi terbaru
FROM node:20.18.1-alpine3.19 as build-stage

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh file proyek
COPY . .

# Expose port 9000
EXPOSE 9000

# Jalankan server development Vue.js
CMD ["npx", "vite"]
