# Étape 1 : Dépendances
FROM node:alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Étape 2 : Construction
FROM node:alpine AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# Inclure le script ici
COPY wait-for-db.sh ./wait-for-db.sh
RUN chmod +x ./wait-for-db.sh
RUN npm install -g prisma
COPY prisma ./prisma
RUN npx prisma generate
RUN npm run build

# Étape 3 : Déploiement
FROM node:alpine AS deploy
WORKDIR /app
ENV NODE_ENV production
# Assurez-vous de copier le script de l'étape de construction à l'étape de déploiement
COPY --from=build /app ./

# Installez les outils clients de PostgreSQL
RUN apk add --no-cache postgresql-client

# Copiez également le script ici
COPY --from=build /app/wait-for-db.sh ./wait-for-db.sh
EXPOSE 3000
ENV PORT 3000
CMD ["npm", "start"]