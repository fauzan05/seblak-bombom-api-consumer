# Base image pakai node-alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Salin file dependency dan install dulu (agar cache efektif)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Salin semua source code
COPY . .

# Expose port default Nuxt
EXPOSE 3000

# Jalankan Nuxt di mode production
RUN npm run build

CMD ["npm", "run", "dev"]
