# Étape 1 : Dépendances
FROM node:alpine AS dependencies

WORKDIR /app
COPY package.json ./
RUN npm install

# Étape 2 : Construction
FROM dependencies AS build

WORKDIR /app
COPY . .

# Install Prisma CLI and copy the /prisma folder
RUN npm install -g prisma
COPY prisma ./prisma

RUN npx prisma generate
RUN npm run build

# Étape 3 : Déploiement
FROM node:alpine AS deploy

WORKDIR /app

ENV NODE_ENV production

# Copiez le dossier node_modules
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
