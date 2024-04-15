# Étape 1 : Dépendances
FROM node:alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
# Installez uniquement les dépendances de production
RUN npm ci --only=production

# Étape 2 : Construction
FROM node:alpine AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# Exécutez Prisma generate sans installation globale
COPY prisma ./prisma
RUN npx prisma generate
# Construisez l'application
RUN npm run build

# Supprimez les dépendances de développement inutiles après la construction
# Ceci est utile si le processus de construction installe des dépendances de développement
RUN npm prune --production

# Étape 3 : Déploiement
FROM node:alpine AS deploy
WORKDIR /app
ENV NODE_ENV production

# Installez les outils clients de PostgreSQL si absolument nécessaire
RUN apk add --no-cache postgresql-client

# Copiez uniquement les fichiers nécessaires à l'exécution de l'application
COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
# Si wait-for-db.sh est nécessaire pour le démarrage de l'app, incluez-le également
COPY --from=build /app/wait-for-db.sh ./wait-for-db.sh
RUN chmod +x ./wait-for-db.sh

EXPOSE 3000
CMD ["npm", "start"]
