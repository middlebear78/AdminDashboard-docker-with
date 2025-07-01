#!/bin/sh

echo "⏳ Waiting for MySQL at $MYSQL_HOST:$MYSQL_PORT..."

# Keep trying to connect until success
while ! mysqladmin ping -h"$MYSQL_HOST" -P"$MYSQL_PORT" --silent; do
    sleep 1
done

echo "✅ MySQL is up – starting Django server"
exec "$@"
