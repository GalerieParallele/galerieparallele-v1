#!/bin/sh

DB_HOST=db
DB_PORT=5432
ATTEMPTS=15
SLEEP=10

echo "Attente de la base de données à $DB_HOST:$DB_PORT..."

i=1
while [ $i -le $ATTEMPTS ]; do
    pg_isready --host=$DB_HOST --port=$DB_PORT --username=$POSTGRES_USER --dbname=$POSTGRES_DB
    if [ $? -eq 0 ]; then
        echo "La base de données est prête !"
        npx prisma migrate deploy
        npm start
        exit 0
    else
        echo "La base de données n'est pas encore prête - en attente..."
        sleep $SLEEP
    fi
    i=$((i + 1))
done

echo "Les tentatives de connexion à la base de données ont échoué après $ATTEMPTS fois."
exit 1
