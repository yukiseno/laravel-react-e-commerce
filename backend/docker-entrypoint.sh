#!/bin/bash
set -e

echo "Running Laravel migrations..."
php /app/artisan migrate --force 2>&1 || echo "Migrations failed or already ran"

echo "Starting PHP-FPM and Nginx..."
php-fpm -D
nginx -g 'daemon off;'
