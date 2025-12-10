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

## Installation

### Backend Setup

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

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file (if needed)
cp .env.example .env
```

## Running the Application

### Start Backend Server

```bash
cd backend
php artisan serve
```

The API will be available at `http://localhost:8000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Run Both Simultaneously (Optional)

From the root directory:

```bash
# Terminal 1
cd backend && php artisan serve

# Terminal 2
cd frontend && npm run dev
```

## Available Scripts

### Backend

- `php artisan serve` - Start development server
- `php artisan migrate` - Run database migrations
- `php artisan db:seed` - Seed the database
- `php artisan tinker` - Interactive PHP shell

### Frontend

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
