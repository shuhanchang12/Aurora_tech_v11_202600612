#!/bin/bash
set -e

echo "Starting deployment of AuroraTech Data Infrastructure..."

# Ensure we are in the docker directory
cd "$(dirname "$0")/../docker"

echo "Running Docker Compose up (detached mode)..."
docker-compose up -d

echo "Waiting for PostgreSQL to be ready..."
until docker exec auroratech-postgres pg_isready -U admin; do
  echo "Waiting for postgres..."
  sleep 2
done

echo "Network and Volumes initialized successfully."
echo "Deployment complete! PgAdmin is running on localhost:5050, Grafana on localhost:3000."
