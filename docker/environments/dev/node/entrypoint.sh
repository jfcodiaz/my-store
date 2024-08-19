#!/bin/bash

sudo service postgresql start

echo $POSTGRES_DB
if [ ! -f /var/lib/postgresql/.initialized ]; then
    echo "Running database initialization..."
    # init user and db
    psql -U postgres -c "CREATE DATABASE $DB_NAME"
    psql -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD'"
    psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER"

    # -- Conceder acceso a todo el esquema 'public'

    psql -U postgres -q -d $DB_NAME -c "GRANT ALL ON SCHEMA public TO $DB_USER"
    psql -U postgres -q -d $DB_NAME -c "GRANT USAGE ON SCHEMA public TO $DB_USER"
    psql -U postgres -q -d $DB_NAME -c "GRANT CREATE ON SCHEMA public TO $DB_USER"
    psql -U postgres -q -d $DB_NAME -c "GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO $DB_USER"
    psql -U postgres -q -d $DB_NAME -c "GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO $DB_USER"

    # Revertir pg_hba.conf para usar autenticación segura
    echo "Reverting pg_hba.conf to use secure authentication..."
    sudo sed -i "s/trust/md5/g" /etc/postgresql/*/main/pg_hba.conf
    sudo sed -i "s/trust/scram-sha-256/g" /etc/postgresql/*/main/pg_hba.conf

    # Allow remote connections
    sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/*/main/postgresql.conf
    sudo sed -i "/^# IPv4 local connections:/a host    all             all             0.0.0.0/0            md5" /etc/postgresql/*/main/pg_hba.conf

    sudo service postgresql restart
    npm run migrations:run
    npm run seed:all

    sudo touch /var/lib/postgresql/.initialized
fi

# sudo sed -i '/user ALL=(ALL) NOPASSWD: ALL/d' /etc/sudoers

tail -f /dev/null