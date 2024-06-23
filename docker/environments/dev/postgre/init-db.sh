#!/bin/bash
set -e

# Crear bases de datos
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname=postgres <<-EOSQL
    CREATE DATABASE $POSTGRES_DB_TEST;
EOSQL
