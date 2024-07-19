#!/bin/sh

# Wait for PostgreSQL to be available
until nc -z -v -w30 db 5432
do
  echo "Waiting for database connection..."
  sleep 5
done

echo "Database is up, running Prisma generate..."
npx prisma generate

# Run the original CMD
exec "$@"
