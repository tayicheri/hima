# Étape 1 : build
FROM node:20-alpine AS build
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les deps
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copier le reste du code
COPY . .

# Construire l'app Vue
RUN npm run build

# Étape 2 : Nginx pour servir l'app
FROM nginx:stable-alpine

# Nettoyer l'ancienne page d'accueil par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copier le build généré depuis l'étape 1
COPY --from=build /app/dist /usr/share/nginx/html

# Config spéciale SPA (routes Vue.js)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
