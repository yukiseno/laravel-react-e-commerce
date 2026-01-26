# Laravel React E-Commerce

A modern full-stack e-commerce application built with Laravel 11 and React 18. This project demonstrates best practices for building scalable, production-ready web applications with a clean RESTful API backend and a responsive single-page application frontend.

## 🚀 Live Demo

- **Frontend**: https://react-ecommerce-coral-eight.vercel.app
- **Backend API**: https://laravel-backend-api-production.up.railway.app
- **Database**: SQLite

## ✨ Features

- **User Authentication & Authorization** - Secure login and admin management
- **Password Reset** - Email-based password recovery with Mailtrap integration
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
- **Database**: PostgreSQL (Supabase)
- **API**: RESTful API with JSON responses
- **Authentication**: Laravel Sanctum
- **Hosting**: Railway

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Hosting**: Vercel

### Payment & Services

- **Payment**: Stripe
- **Email**: Mailtrap
- **Database**: PostgreSQL (Supabase)

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

After setup completes, install root dependencies:

```bash
npm install
```

### Configure Stripe Keys

After running `npm run setup` and `npm install`, you need to add your Stripe keys for payment processing:

1. **Backend** - Add to `/backend/.env`:

   ```
   STRIPE_SECRET=sk_test_your_stripe_secret_key
   ```

2. **Frontend** - Add to `/frontend/.env`:
   ```
   VITE_STRIPE_KEY=pk_test_your_stripe_public_key
   ```

Get your keys from your [Stripe Dashboard](https://dashboard.stripe.com/).

### Test Credentials

The database is seeded with test accounts for easy setup:

**Admin Account:**

- Email: `admin@email.com`
- Password: `admin1234`

**User Account:**

- Email: `user@test.com`
- Password: `password` (use the password reset feature to change it)

Use these to test the application. **Remember to change these credentials in production!**

## Installation

First, clone the repository:

```bash
git clone https://github.com/yukiseno/laravel-react-e-commerce.git
cd laravel-react-e-commerce
```

### Option 1: Automated Setup (Root Directory)

```bash
npm run setup
npm install
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

This starts both backend and frontend servers concurrently using `concurrently` package.

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
- Follow Laravel and React best practices

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
