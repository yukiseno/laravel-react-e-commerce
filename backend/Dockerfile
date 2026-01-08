FROM php:8.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    nginx \
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

# Create nginx config
RUN mkdir -p /etc/nginx/conf.d && printf 'server {\n    listen 0.0.0.0:8080;\n    server_name _;\n    root /app/public;\n    index index.php;\n\n    location / {\n        try_files $uri $uri/ /index.php?$query_string;\n    }\n\n    location ~ \.php$ {\n        fastcgi_pass 127.0.0.1:9000;\n        fastcgi_index index.php;\n        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;\n        include fastcgi_params;\n    }\n\n    location ~ /\.ht {\n        deny all;\n    }\n}\n' > /etc/nginx/conf.d/default.conf

# Create startup script
RUN mkdir -p /usr/local/bin && printf '#!/bin/bash\nset -e\n\necho "Starting PHP-FPM..."\nphp-fpm -D\n\necho "Running Laravel migrations..."\nphp /app/artisan migrate --force 2>&1 || true\n\necho "Starting Nginx..."\nexec nginx -g "daemon off;"\n' > /usr/local/bin/docker-entrypoint.sh && chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
