# آژانس خلاق - بک‌اند API

## راه‌اندازی

### پیش‌نیازها
- PHP 8.2+
- Composer
- MySQL (XAMPP)

### نصب

1. **ایجاد دیتابیس در phpMyAdmin:**
   ```
   نام دیتابیس: agency_db
   Collation: utf8mb4_unicode_ci
   ```

2. **تنظیم فایل .env:**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=agency_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```

3. **اجرای migration و seeder:**
   ```bash
   php artisan migrate:fresh
   php artisan db:seed --class=AdminSeeder
   ```

4. **اجرای سرور:**
   ```bash
   php artisan serve
   ```

### اطلاعات ورود ادمین
- **ایمیل:** admin@agency.ir
- **رمز عبور:** admin123

### API Endpoints

#### عمومی (بدون احراز هویت)
- `GET /api/v1/services` - لیست خدمات
- `GET /api/v1/portfolios` - لیست نمونه کارها
- `GET /api/v1/industries` - لیست صنایع
- `GET /api/v1/blog` - لیست مقالات
- `GET /api/v1/clients` - لیست مشتریان
- `GET /api/v1/packages` - لیست پکیج‌ها
- `GET /api/v1/testimonials` - لیست نظرات
- `POST /api/v1/contact` - ارسال فرم تماس
- `POST /api/v1/login` - ورود

#### مدیریتی (نیاز به توکن)
- `GET /api/v1/admin/dashboard` - داشبورد
- `POST/PUT/DELETE /api/v1/admin/services` - مدیریت خدمات
- `POST/PUT/DELETE /api/v1/admin/portfolios` - مدیریت نمونه کارها
- `GET/PATCH/DELETE /api/v1/admin/contacts` - مدیریت پیام‌ها

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
