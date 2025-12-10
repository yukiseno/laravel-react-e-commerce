# Laravel React E-Commerce

A modern full-stack e-commerce application built with Laravel 11 and React 18. This project demonstrates best practices for building scalable, production-ready web applications with a clean RESTful API backend and a responsive single-page application frontend.

## ✨ Features

- **User Authentication & Authorization** - Secure login and admin management
- **Product Management** - Browse, filter, and manage products with images
- **Shopping Cart** - Add/remove items with real-time updates
- **Order Processing** - Complete order management system
- **Admin Dashboard** - Manage products, orders, and users
- **Product Reviews & Ratings** - User feedback system
- **Product Variants** - Support for colors and sizes
- **Coupon System** - Discount codes management
- **Responsive Design** - Mobile-friendly interface

## Project Structure

```
laravel-react-e-commerce/
├── backend/           # Laravel REST API
├── frontend/          # React + Vite SPA
├── .gitignore        # Git ignore rules for the entire project
└── README.md         # This file
```

## Tech Stack

### Backend

- **Framework**: Laravel 11
- **Language**: PHP 8.2+
- **Database**: MySQL/PostgreSQL
- **API**: RESTful API with JSON responses
- **Authentication**: Laravel Sanctum

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context API

## Prerequisites

- PHP 8.2+
- Node.js 18+
- npm or yarn
- Composer
- MySQL/PostgreSQL (or SQLite for development)

## Quick Setup (Recommended)

Run the complete setup with one command from the root directory:

```bash
npm run setup
```

This will:

1. Install backend dependencies
2. Setup backend environment (.env, key generation)
3. Run database migrations and seeders
4. Install frontend dependencies
5. Setup frontend environment (.env)

## Installation

### Option 1: Automated Setup (Root Directory)

```bash
npm run setup
```

### Option 2: Manual Setup

#### Backend Setup

```bash
cd backend

# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# (Optional) Seed database
php artisan db:seed
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

## Running the Application

### Option 1: Run Both Simultaneously (Recommended)

From the root directory:

```bash
npm run dev
```

This starts both the backend and frontend servers concurrently.

### Option 2: Run Separately

#### Start Backend Server

```bash
cd backend
php artisan serve
```

The API will be available at `http://localhost:8000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Available Scripts

### Root Directory Scripts

- `npm run setup` - Complete setup (install all dependencies and run migrations)
- `npm run dev` - Start both backend and frontend servers concurrently
- `npm run build` - Build both backend and frontend for production

### Backend Scripts

- `php artisan serve` - Start development server
- `php artisan migrate` - Run database migrations
- `php artisan db:seed` - Seed the database
- `php artisan tinker` - Interactive PHP shell

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Development Guidelines

- Backend API endpoints: `/api/*`
- Frontend components in `/frontend/src/components`
- Create feature branches for new development
- Follow Laravel and React best practices

## API Documentation

[API documentation available in `/backend/CLAUDE.md` or visit the project wiki](./backend/CLAUDE.md)

## Deployment & Production Guidelines

### Backend Deployment

1. **Environment Setup**

   ```bash
   # Set production environment variables in .env
   APP_ENV=production
   APP_DEBUG=false
   DB_HOST=your_production_db_host
   DB_DATABASE=your_production_db
   STRIPE_SECRET_KEY=your_live_stripe_key
   ```

2. **Pre-Deployment**

   ```bash
   cd backend

   # Install dependencies
   composer install --no-dev --optimize-autoloader

   # Run migrations
   php artisan migrate --force

   # Cache configuration
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

3. **Web Server Configuration**
   - Use Nginx or Apache with PHP-FPM
   - Point document root to `/public` directory
   - Enable HTTPS/SSL certificates
   - Set proper file permissions:
     ```bash
     chmod -R 755 storage
     chmod -R 755 bootstrap/cache
     ```

### Frontend Deployment

1. **Build for Production**

   ```bash
   cd frontend

   # Set production API endpoint in .env
   VITE_API_BASE_URL=https://your-api.com
   VITE_STRIPE_KEY=your_live_stripe_key

   # Build
   npm run build
   ```

2. **Deployment**

   - Deploy the `dist/` folder to your web server
   - Use a CDN for static assets (optional but recommended)
   - Enable gzip compression
   - Set proper cache headers for production

3. **Hosting Options**
   - Vercel, Netlify, GitHub Pages
   - AWS S3 + CloudFront
   - Traditional web hosting with Node.js or static hosting

### Environment Variables Checklist

**Backend (.env)**

- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://your-domain.com`
- `DB_*` (production database credentials)
- `STRIPE_SECRET_KEY=sk_live_xxx`
- `SANCTUM_STATEFUL_DOMAINS=your-domain.com`

**Frontend (.env)**

- `VITE_API_BASE_URL=https://your-api.com`
- `VITE_STRIPE_KEY=pk_live_xxx`

### Security Considerations

- ✅ Keep `.env` files out of version control (use `.env.example`)
- ✅ Use HTTPS/SSL for all communications
- ✅ Validate and sanitize all user inputs
- ✅ Keep dependencies updated regularly
- ✅ Use environment-specific configurations
- ✅ Enable CORS properly for frontend domain
- ✅ Use strong database passwords
- ✅ Monitor and log errors in production

### Monitoring & Maintenance

- Monitor API response times and errors
- Set up automated backups for database
- Log all transactions and user activities
- Monitor server resource usage (CPU, memory, disk)
- Keep framework and dependencies updated

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Author

Created by [Yuki Seno](https://github.com/yukiseno)

## Acknowledgments

- Laravel Documentation
- React Documentation
- Vite Guide
- Community feedback and contributions
- Frontend-backend integration
- Database design and migrations
