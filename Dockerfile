# Étape 1 : build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# Étape 2 : Nginx pour servir l'app
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
