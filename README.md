# Projet de développement web (Alternance)

## Mise en place d'un site vitrine dynamique et d'une api permettant de communiquer avec de futur services externes.

### Installer le projet

```bash
npm install
```

```bash
docker compose up -d
```

```bash
npm run dev
```

### Les variables d'environnement

```dotenv
ENV="production"
JWT="JWT_TOKEN"
BREVO_API_KEY=BREVO_API_KEY

DATABASE_URL=postgres://user:PASSWORD@localhost:5432/gp_database

POSTGRES_PASSWORD=PASSWORD
POSTGRES_USER=user
POSTGRES_DB=gp_database
```
