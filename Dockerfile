# Étape 1 : Build
FROM node:20-alpine AS build
WORKDIR /app

# Copier les manifests
COPY package*.json ./

# Installer toutes les dépendances (y compris dev)
RUN npm install --frozen-lockfile --include=dev

# Copier le reste du code
COPY . .

# Compiler l’app (vue-tsc sera dispo)
RUN npm run build

# Étape 2 : Nginx pour servir l’app
FROM nginx:stable-alpine

# Supprimer le contenu par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copier uniquement le build final
COPY --from=build /app/dist /usr/share/nginx/html

# Config SPA (important pour Vue Router en mode history)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
