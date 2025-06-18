# dockerfile untuk local
# FROM node:20-alpine

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install

# COPY . .

# EXPOSE 3000
# CMD ["npm", "run", "dev"]
# Dockerfile untuk production
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
