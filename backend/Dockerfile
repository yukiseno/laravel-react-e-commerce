FROM php:8.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    sqlite3 \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy application files from backend directory
COPY backend/ .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Create storage directories with proper permissions
RUN mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache && \
    chmod -R 777 storage bootstrap/cache

# Generate Laravel app key if not present, and optimize
RUN php /app/artisan key:generate --force || true && \
    php /app/artisan config:cache || true && \
    php /app/artisan route:cache || true && \
    php /app/artisan view:cache || true

# Expose port 8000 (Laravel default)
EXPOSE 8000

# Start PHP development server
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000
