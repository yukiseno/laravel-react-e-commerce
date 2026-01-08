# Laravel React E-Commerce API

Backend API for the Laravel React E-Commerce application, built with Laravel 11 and deployed on Fly.io.

## Live Demo

-   **API URL**: https://backend-laravel-api.fly.dev
-   **Frontend**: Deployed on Vercel (React)

## Local Development

### Prerequisites

-   PHP 8.3+
-   Composer
-   Node.js 18+ (for asset building)
-   SQLite3 (for development database)

### Setup

1. **Clone and install dependencies**

    ```bash
    cd backend
    composer install
    npm install
    ```

2. **Setup environment**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

3. **Setup database**

    ```bash
    php artisan migrate:fresh --seed
    ```

4. **Build assets**

    ```bash
    npm run build
    ```

5. **Start development server**
    ```bash
    php artisan serve
    ```

## Production Deployment

### Fly.io Deployment

The backend is automatically deployed to Fly.io on every push to `main` branch via GitHub Actions.

**Manual deployment:**

```bash
flyctl deploy --config fly.toml
```

**Environment:**

-   Database: SQLite (free tier) or PostgreSQL (upgrade)
-   Region: Sydney, Australia
-   Machine: shared-cpu-1x with 1GB RAM

### Setting Production Environment Variables

```bash
flyctl secrets set --config fly.toml \
  APP_ENV=production \
  APP_DEBUG=false \
  APP_URL=https://backend-laravel-api.fly.dev \
  APP_KEY=<your-app-key>
```

## Database

### Development

-   **Type**: SQLite
-   **File**: `database/database.sqlite`

### Production

-   **Type**: PostgreSQL (recommended)
-   Configure in `.env.production`:
    ```
    DB_CONNECTION=pgsql
    DB_HOST=your_postgres_host
    DB_PORT=5432
    DB_DATABASE=your_database
    DB_USERNAME=your_user
    DB_PASSWORD=your_password
    ```

## API Endpoints

See [API documentation](./API.md) for available endpoints.

## Docker

Build and run locally with Docker:

```bash
docker build -t laravel-api .
docker run -p 8080:8080 laravel-api
```

## Technologies

-   Laravel 11
-   PHP 8.3-FPM
-   Nginx
-   SQLite (dev) / PostgreSQL (production)
-   Composer
-   Node.js (asset building)

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
