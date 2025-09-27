#!/bin/bash
set -e  # stop le script si une commande échoue

cd /srv/hima

echo "Pull des dernières sources..."
git pull origin master

# Stoppe tous les conteneurs actifs si existants
running_containers=$(docker ps -q)
if [ -n "$running_containers" ]; then
    echo "Arrêt des conteneurs en cours..."
    docker stop $running_containers
else
    echo "Aucun conteneur actif."
fi

# Nettoyage Docker safe
echo "Nettoyage des containers, images, volumes et réseaux inutilisés..."
docker system prune -f --volumes

# Relance les services
echo "Démarrage des conteneurs avec docker-compose..."
docker compose up -d vue-prod caddy

echo "Déploiement terminé !"
