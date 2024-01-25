# Étape 1 : Construction et dépendances
FROM node:alpine AS builder
WORKDIR /app

# Installer les dépendances, inclure Prisma CLI uniquement si nécessaire pour la génération
COPY package.json package-lock.json ./
RUN npm install --omit=dev && npm install prisma --save-dev

# Copier les fichiers nécessaires et construire
COPY . .
COPY prisma ./prisma
RUN chmod +x ./wait-for-db.sh
RUN npx prisma generate && npm run build

# Nettoyage pour réduire la taille de l'image
RUN npm prune --production

# Étape 2 : Déploiement
FROM node:alpine AS deploy
WORKDIR /app
ENV NODE_ENV=production

# Copier l'application construite et les dépendances de production
COPY --from=builder /app ./

# Installer les outils clients de PostgreSQL sans cache pour réduire la taille de l'image
RUN apk add --no-cache postgresql-client

EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]
