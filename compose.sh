#! /bin/bash

if [ -z "$1" ]; then
    echo "You need to use \"dev\" or \"prod\" as an argument"
    exit
fi

if [ ! -f .env ]; then
    UUID=$(cat /proc/sys/kernel/random/uuid)
    cp .env.model .env
    sed -i "s/PGPASSWORD =/PGPASSWORD = $UUID/" .env
    sed -i "s/PGUSER =/PGUSER = $UUID/" .env
    sed -i "s/POSTGRES_PASSWORD =/POSTGRES_PASSWORD = $UUID/" .env
fi

if [[ "$1" == "dev" ]]; then
    npm run build
    docker compose -f docker-compose.yaml -f docker-compose.override.yaml --env-file .env up -d --build
fi

if [[ "$1" == "prod" ]]; then
    docker compose -f docker-compose.prod.yaml --env-file .env up -d
fi
