# Multi-tenant School ERP

A modern, robust, and scalable School Enterprise Resource Planning (ERP) system designed to streamline educational administration. Built with the latest **Laravel** and **React** technologies, this application offers a seamless single-page application (SPA) experience for managing students, teachers, courses, and enrollments.

## 🚀 Features

- **👨‍🏫 Teacher Management**: Complete onboard and management system for faculty members.
- **👨‍🎓 Student Information System**: Track student details, admission status, and academic progress.
- **📚 Course Management**: Create, update, and organize educational courses and curriculums.
- **📝 Enrollment Handling**: Efficiently manage student enrollments into specific courses.
- **📊 Interactive Dashboard**: Real-time analytics and overview of institutional data.
- **🔐 Secure Authentication**: Robust user authentication and authorization using Laravel Fortify.
- **🎨 Modern UI/UX**: Beautiful, responsive interface built with Tailwind CSS 4 and Radix UI components.

## 🛠️ Tech Stack

### Backend
- **Framework**: [Laravel 12](https://laravel.com)
- **Language**: PHP 8.2+
- **Authentication**: Laravel Fortify

### Frontend
- **Framework**: [React 19](https://react.dev)
- **Bridge**: [Inertia.js](https://inertiajs.com) (SPA architecture)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Components**: [Radix UI](https://www.radix-ui.com), [Lucide React](https://lucide.dev)
- **Bundler**: [Vite](https://vitejs.dev)
- **Animation**: Framer Motion

## 📂 Project Structure

```
├── app/                  # Laravel Application Core (Controllers, Models)
├── resources/
│   ├── js/
│   │   ├── components/   # Reusable React UI Components
│   │   ├── layouts/      # Page Layouts (Auth, Dashboard, etc.)
│   │   ├── pages/        # Inertia.js Pages (Views)
│   │   ├── hooks/        # Custom React Hooks
│   │   └── lib/          # Utilities
│   └── css/              # Global Styles
├── routes/               # Web & API Routes
└── public/               # Static Assets
```

## ⚡ Getting Started

### Prerequisites

Ensure you have the following installed:
- [PHP 8.2+](https://www.php.net/downloads)
- [Composer](https://getcomposer.org/)
- [Node.js & npm](https://nodejs.org/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://your-repo-url.git
   cd Multi-tenant-School-ERP
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   Copy the example environment file and configure your database settings.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Update `DB_DATABASE`, `DB_USERNAME`, etc., in your `.env` file.*

5. **Run Migrations**
   Set up your database tables.
   ```bash
   php artisan migrate
   ```

6. **Start the Development Server**
   Run the following command to start both the Laravel server and Vite development server concurrently:
   ```bash
   npm run dev
   ```

   Access the application at `http://localhost:8000`.

## 🧪 Running Tests

To run the server-side tests:
```bash
php artisan test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
