# Laravel React E-Commerce

A full-stack e-commerce application built with Laravel and React to learn modern web development practices.

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
- **Language**: PHP
- **Database**: MySQL/PostgreSQL (configurable)
- **API**: RESTful API

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router
- **Styling**: CSS/Tailwind (configurable)

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

[Add API documentation here as you develop endpoints]

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to your fork
5. Create a pull request

## License

MIT License - feel free to use this project for learning purposes.

## Notes

This is a learning project to understand:
- Full-stack web development
- Laravel REST API development
- React component architecture
- Frontend-backend integration
- Database design and migrations
