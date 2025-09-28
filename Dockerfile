# Étape unique : juste Nginx
FROM nginx:alpine

# Supprimer site par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copier le dist déjà buildé (présent dans ton repo)
COPY dist/ /usr/share/nginx/html

# Config custom pour Vue Router en mode history
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
