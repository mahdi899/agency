# راهنمای ارتقاء امنیت Authentication

## وضعیت فعلی
- توکن در `localStorage` ذخیره می‌شود
- توکن در هدر `Authorization: Bearer` ارسال می‌شود

## مشکلات امنیتی فعلی
1. **XSS Vulnerability**: اگر حمله XSS رخ دهد، مهاجم می‌تواند توکن را از localStorage بخواند
2. **Token Exposure**: توکن در JavaScript قابل دسترسی است

## راه‌حل پیشنهادی: HttpOnly Cookies

### تغییرات Backend (Laravel)

#### 1. تنظیمات CORS و Cookie
```php
// config/cors.php
'supports_credentials' => true,

// config/session.php
'same_site' => 'lax',
'secure' => env('SESSION_SECURE_COOKIE', true),
```

#### 2. تغییر AuthController
```php
// app/Http/Controllers/Api/AuthController.php

public function login(Request $request)
{
    // ... validation and authentication logic ...
    
    $token = $user->createToken('auth_token')->plainTextToken;
    
    // Set HttpOnly cookie instead of returning token
    $cookie = cookie(
        'auth_token',
        $token,
        60 * 24 * 7, // 7 days
        '/',
        null,
        true, // secure (HTTPS only)
        true, // httpOnly
        false,
        'Lax'
    );
    
    return response()->json([
        'success' => true,
        'user' => $user,
    ])->withCookie($cookie);
}

public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();
    
    $cookie = cookie()->forget('auth_token');
    
    return response()->json([
        'success' => true,
        'message' => 'Logged out successfully'
    ])->withCookie($cookie);
}
```

#### 3. Middleware برای خواندن توکن از Cookie
```php
// app/Http/Middleware/AuthenticateFromCookie.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthenticateFromCookie
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->bearerToken() && $request->cookie('auth_token')) {
            $request->headers->set('Authorization', 'Bearer ' . $request->cookie('auth_token'));
        }
        
        return $next($request);
    }
}
```

#### 4. ثبت Middleware
```php
// bootstrap/app.php or app/Http/Kernel.php
// Add to api middleware group
```

### تغییرات Frontend

#### 1. تغییر API Service
```javascript
// src/services/api.js

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
    // Remove token from localStorage management
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    // Remove Authorization header - cookie will be sent automatically
    
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Important: include cookies
    });

    // ... rest of the code
  }

  async login(email, password) {
    const data = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    // No need to store token - it's in HttpOnly cookie
    return data;
  }

  async logout() {
    await this.request('/admin/logout', { 
      method: 'POST',
      credentials: 'include',
    });
    // Cookie will be cleared by server
  }
}
```

#### 2. تغییر تمام fetch calls
اضافه کردن `credentials: 'include'` به تمام درخواست‌ها

### مراحل پیاده‌سازی

1. **Backend First**:
   - ایجاد middleware جدید
   - تغییر AuthController
   - تنظیمات CORS

2. **Frontend**:
   - حذف مدیریت localStorage
   - اضافه کردن credentials: 'include'

3. **Testing**:
   - تست login/logout
   - تست دسترسی به صفحات admin
   - تست refresh صفحه

### نکات مهم

- در محیط development، `secure: false` قرار دهید
- CORS باید درست تنظیم شود
- SameSite باید 'Lax' یا 'Strict' باشد
- برای cross-origin requests، SameSite='None' و Secure=true لازم است

### Rollback Plan

اگر مشکلی پیش آمد:
1. Middleware را غیرفعال کنید
2. توکن را دوباره در response برگردانید
3. Frontend را به حالت قبل برگردانید
