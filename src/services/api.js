const API_BASE_URL = '/api/v1';

// Custom Error Classes
export class ApiError extends Error {
  constructor(message, status, code, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

export class NetworkError extends Error {
  constructor(message = 'خطا در اتصال به سرور') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends ApiError {
  constructor(message = 'لطفاً وارد شوید') {
    super(message, 401, 'UNAUTHENTICATED');
    this.name = 'AuthenticationError';
  }
}

export class ValidationError extends ApiError {
  constructor(message, errors = {}) {
    super(message, 422, 'VALIDATION_ERROR', errors);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'موردی یافت نشد') {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
    this.maxRetries = 2;
    this.retryDelay = 1000;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Retry logic for failed requests
  async withRetry(fn, retries = this.maxRetries) {
    for (let i = 0; i <= retries; i++) {
      try {
        return await fn();
      } catch (error) {
        // Don't retry on auth, validation, or not found errors
        if (error instanceof AuthenticationError || 
            error instanceof ValidationError || 
            error instanceof NotFoundError) {
          throw error;
        }
        
        // Last attempt, throw the error
        if (i === retries) {
          throw error;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * (i + 1)));
      }
    }
  }

  // Parse error response and throw appropriate error
  handleErrorResponse(response, data) {
    const message = data?.message || 'خطایی رخ داده است';
    
    switch (response.status) {
      case 401:
        this.clearToken();
        throw new AuthenticationError(message);
      case 403:
        throw new ApiError(message, 403, 'FORBIDDEN');
      case 404:
        throw new NotFoundError(message);
      case 422:
        throw new ValidationError(message, data?.errors || {});
      case 429:
        throw new ApiError('تعداد درخواست‌ها بیش از حد مجاز است', 429, 'RATE_LIMITED');
      case 500:
      case 502:
      case 503:
        throw new ApiError('خطای سرور - لطفاً بعداً تلاش کنید', response.status, 'SERVER_ERROR');
      default:
        throw new ApiError(message, response.status, 'UNKNOWN_ERROR', data);
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const makeRequest = async () => {
      let response;
      try {
        // 1. Auto-configure headers
        const headers = {
          'Accept': 'application/json',
          ...options.headers, // Preserve any custom headers passed
        };

        // Add Authorization token if available
        if (this.token) {
          headers['Authorization'] = `Bearer ${this.token}`;
        }

        // 2. Smart Body Handling
        // If it's FormData (file upload), DO NOT set Content-Type (browser does it with boundary)
        // If it's JSON/Object, set Content-Type to application/json and stringify
        if (options.body && !(options.body instanceof FormData)) {
          headers['Content-Type'] = 'application/json';
          
          if (typeof options.body === 'object') {
            options.body = JSON.stringify(options.body);
          }
        }

        // 3. Execute Fetch
        response = await fetch(url, {
          ...options,
          headers,
        });

        // 4. Parse Response (check Content-Type header)
        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.error("Server returned HTML instead of JSON:", text.substring(0, 500)); // Log first 500 chars
            throw new Error("Server Error: Received HTML response. Check console for details.");
        }

        // 5. Handle Errors (Standardize Laravel 422/500 errors)
        if (!response.ok) {
          const error = new Error(data?.message || `HTTP Error: ${response.status}`);
          error.status = response.status;
          // Capture Laravel validation errors (key-value pairs)
          error.errors = data?.errors || {}; 
          throw error;
        }

        return data;

      } catch (error) {
        console.error('API Request Failed:', error);
        throw error;
      }
    };

    // Use retry for GET requests only
    if (!options.method || options.method === 'GET') {
      return this.withRetry(makeRequest);
    }
    
    return makeRequest();
  }

  // Auth
  async login(email, password) {
    const data = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async logout() {
    await this.request('/admin/logout', { method: 'POST' });
    this.clearToken();
  }

  async getMe() {
    return this.request('/admin/me');
  }

  // Dashboard
  async getDashboard() {
    return this.request('/admin/dashboard');
  }

  async getDashboardStats() {
    return this.request('/admin/dashboard/stats');
  }

  // Services
  async getServices() {
    return this.request('/services');
  }

  async getService(slug) {
    return this.request(`/services/${slug}`);
  }

  async createService(data) {
    // Handle file uploads with FormData
    const formData = new FormData();
    
    // Append all text fields
    Object.keys(data).forEach(key => {
      if (key !== 'image' && key !== 'gallery') {
        if (typeof data[key] === 'object' && data[key] !== null) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    
    // Handle single image file
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (data.image && typeof data.image === 'string') {
      formData.append('image', data.image);
    }
    
    // Handle gallery files array
    if (Array.isArray(data.gallery)) {
      data.gallery.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`gallery[${index}]`, file);
        } else if (typeof file === 'string') {
          formData.append(`gallery[${index}]`, file);
        }
      });
    }

    const url = `${this.baseUrl}/admin/services`;
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const responseData = await response.json();
    if (!response.ok) {
      this.handleErrorResponse(response, responseData);
      throw new ApiError('خطا در ایجاد سرویس', response.status);
    }
    
    return responseData;
  }

  async updateService(id, data) {
    // Handle file uploads with FormData
    const formData = new FormData();
    
    // Append all text fields
    Object.keys(data).forEach(key => {
      if (key !== 'image' && key !== 'gallery') {
        if (typeof data[key] === 'object' && data[key] !== null) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    
    // Handle single image file
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (data.image && typeof data.image === 'string') {
      formData.append('image', data.image);
    }
    
    // Handle gallery files array
    if (Array.isArray(data.gallery)) {
      data.gallery.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`gallery[${index}]`, file);
        } else if (typeof file === 'string') {
          formData.append(`gallery[${index}]`, file);
        }
      });
    }

    // Add method spoofing for FormData (browsers don't support PUT with multipart/form-data)
    formData.append('_method', 'PUT');

    const url = `${this.baseUrl}/admin/services/${id}`;
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST', // Use POST with _method: PUT for FormData
      headers,
      body: formData,
    });

    const responseData = await response.json();
    if (!response.ok) {
      this.handleErrorResponse(response, responseData);
      throw new ApiError('خطا در بروزرسانی سرویس', response.status);
    }
    
    return responseData;
  }

  async deleteService(id) {
    return this.request(`/admin/services/${id}`, { method: 'DELETE' });
  }

  // Portfolios
  async getPortfolios(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/portfolios${query ? `?${query}` : ''}`);
  }

  async getPortfolio(slug) {
    return this.request(`/portfolios/${slug}`);
  }

  async createPortfolio(data) {
    // Handle file uploads with FormData
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (key !== 'image' && key !== 'gallery') {
        if (typeof data[key] === 'object' && data[key] !== null) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    
    // Handle single image file
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (data.image && typeof data.image === 'string') {
      formData.append('image', data.image);
    }
    
    // Handle gallery files array
    if (Array.isArray(data.gallery)) {
      data.gallery.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`gallery[${index}]`, file);
        } else if (typeof file === 'string') {
          formData.append(`gallery[${index}]`, file);
        }
      });
    }

    const url = `${this.baseUrl}/admin/portfolios`;
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const responseData = await response.json();
    if (!response.ok) {
      this.handleErrorResponse(response, responseData);
      throw new ApiError('خطا در ایجاد نمونه کار', response.status);
    }
    
    return responseData;
  }

  async updatePortfolio(id, data) {
    // Handle file uploads with FormData
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (key !== 'image' && key !== 'gallery') {
        if (typeof data[key] === 'object' && data[key] !== null) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    
    // Handle single image file
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (data.image && typeof data.image === 'string') {
      formData.append('image', data.image);
    }
    
    // Handle gallery files array
    if (Array.isArray(data.gallery)) {
      data.gallery.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`gallery[${index}]`, file);
        } else if (typeof file === 'string') {
          formData.append(`gallery[${index}]`, file);
        }
      });
    }

    // Add method spoofing for FormData (browsers don't support PUT with multipart/form-data)
    formData.append('_method', 'PUT');

    const url = `${this.baseUrl}/admin/portfolios/${id}`;
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST', // Use POST with _method: PUT for FormData
      headers,
      body: formData,
    });

    const responseData = await response.json();
    if (!response.ok) {
      this.handleErrorResponse(response, responseData);
      throw new ApiError('خطا در بروزرسانی نمونه کار', response.status);
    }
    
    return responseData;
  }

  async deletePortfolio(id) {
    return this.request(`/admin/portfolios/${id}`, { method: 'DELETE' });
  }

  // Industries
  async getIndustries() {
    return this.request('/industries');
  }

  async getIndustry(slug) {
    return this.request(`/industries/${slug}`);
  }

  async createIndustry(data) {
    return this.request('/admin/industries', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateIndustry(id, data) {
    return this.request(`/admin/industries/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteIndustry(id) {
    return this.request(`/admin/industries/${id}`, { method: 'DELETE' });
  }

  // Blog
  async getBlogPosts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/admin/blog${query ? `?${query}` : ''}`);
  }

  async getPublicBlogPosts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/blog${query ? `?${query}` : ''}`);
  }

  async getBlogPost(slug) {
    return this.request(`/blog/${slug}`);
  }

  async createBlogPost(data) {
    // Check if data contains files (FormData)
    if (data instanceof FormData) {
      const url = `${this.baseUrl}/admin/blog`;
      const headers = {};
      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: data,
      });

      const responseData = await response.json();
      if (!response.ok) {
        this.handleErrorResponse(response, responseData);
        throw new ApiError('خطا در ایجاد مقاله', response.status);
      }
      
      return responseData;
    } else {
      // Regular JSON request
      return this.request('/admin/blog', { method: 'POST', body: JSON.stringify(data) });
    }
  }

  async updateBlogPost(id, data) {
    // Check if data contains files (FormData)
    if (data instanceof FormData) {
      // Add method spoofing for FormData (browsers don't support PUT with multipart/form-data)
      data.append('_method', 'PUT');

      const url = `${this.baseUrl}/admin/blog/${id}`;
      const headers = {};
      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        method: 'POST', // Use POST with _method: PUT for FormData
        headers,
        body: data,
      });

      const responseData = await response.json();
      if (!response.ok) {
        this.handleErrorResponse(response, responseData);
        throw new ApiError('خطا در بروزرسانی مقاله', response.status);
      }
      
      return responseData;
    } else {
      // Regular JSON request
      return this.request(`/admin/blog/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    }
  }

  async deleteBlogPost(id) {
    return this.request(`/admin/blog/${id}`, { method: 'DELETE' });
  }

  // Blog Categories
  async getBlogCategories() {
    return this.request('/blog/categories');
  }

  async createBlogCategory(data) {
    return this.request('/admin/blog/categories', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateBlogCategory(id, data) {
    return this.request(`/admin/blog/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteBlogCategory(id) {
    return this.request(`/admin/blog/categories/${id}`, { method: 'DELETE' });
  }

  // Blog Tags
  async getBlogTags() {
    return this.request('/blog/tags');
  }

  async createBlogTag(data) {
    return this.request('/admin/blog/tags', { method: 'POST', body: JSON.stringify(data) });
  }

  // Blog Images
  async uploadBlogImage(file, postId = null, altText = '', title = '', caption = '') {
    const formData = new FormData();
    formData.append('file', file);
    if (postId) formData.append('blog_post_id', postId);
    if (altText) formData.append('alt_text', altText);
    if (title) formData.append('title', title);
    if (caption) formData.append('caption', caption);

    const url = `${this.baseUrl}/admin/blog/images`;
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'خطا در آپلود تصویر');
    }
    return data;
  }

  async getBlogPostImages(postId) {
    return this.request(`/admin/blog/${postId}/images`);
  }

  async updateBlogImage(imageId, data) {
    return this.request(`/admin/blog/images/${imageId}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteBlogImage(imageId) {
    return this.request(`/admin/blog/images/${imageId}`, { method: 'DELETE' });
  }

  // Blog Engagement
  async incrementBlogViews(postId) {
    return this.request(`/blog/${postId}/view`, { method: 'POST' });
  }

  async toggleBlogLike(postId) {
    return this.request(`/blog/${postId}/like`, { method: 'POST' });
  }

  async getRelatedPosts(postId) {
    return this.request(`/blog/${postId}/related`);
  }

  async getBlogSeoData(slug) {
    return this.request(`/blog/${slug}/seo`);
  }

  // Clients
  async getClients() {
    return this.request('/clients');
  }

  async createClient(data) {
    return this.request('/admin/clients', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateClient(id, data) {
    return this.request(`/admin/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteClient(id) {
    return this.request(`/admin/clients/${id}`, { method: 'DELETE' });
  }

  // Packages
  async getPackages() {
    return this.request('/packages');
  }

  async createPackage(data) {
    return this.request('/admin/packages', { method: 'POST', body: JSON.stringify(data) });
  }

  async updatePackage(id, data) {
    return this.request(`/admin/packages/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deletePackage(id) {
    return this.request(`/admin/packages/${id}`, { method: 'DELETE' });
  }

  // Testimonials
  async getTestimonials() {
    return this.request('/testimonials');
  }

  async createTestimonial(data) {
    return this.request('/admin/testimonials', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateTestimonial(id, data) {
    return this.request(`/admin/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteTestimonial(id) {
    return this.request(`/admin/testimonials/${id}`, { method: 'DELETE' });
  }

  // Contact
  async submitContact(data) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getContacts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/admin/contacts${query ? `?${query}` : ''}`);
  }

  async getContact(id) {
    return this.request(`/admin/contacts/${id}`);
  }

  async updateContact(id, data) {
    return this.request(`/admin/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Site Settings
  async getSettings(group = null) {
    const query = group ? `?group=${group}` : '';
    return this.request(`/settings${query}`);
  }

  async getSetting(key) {
    return this.request(`/settings/${key}`);
  }

  async updateSettings(settings) {
    return this.request('/admin/settings/bulk', {
      method: 'POST',
      body: JSON.stringify({ settings }),
    });
  }

  async updateSetting(key, value, type = 'text', group = 'general') {
    return this.request(`/admin/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value, type, group }),
    });
  }

  // Reels
  async getReels(type = null) {
    const query = type ? `?type=${type}` : '';
    return this.request(`/reels${query}`);
  }

  async createReel(data) {
    return this.request('/admin/reels', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateReel(id, data) {
    return this.request(`/admin/reels/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteReel(id) {
    return this.request(`/admin/reels/${id}`, { method: 'DELETE' });
  }

  // Home Cards
  async getHomeCards(section = null) {
    const query = section ? `?section=${section}` : '';
    return this.request(`/home-cards${query}`);
  }

  // Web Projects
  async getWebProjects(type = null) {
    const query = type && type !== 'all' ? `?type=${type}` : '';
    return this.request(`/web-projects${query}`);
  }

  async getWebProject(slug) {
    return this.request(`/web-projects/${slug}`);
  }

  async getWebProjectTypes() {
    return this.request('/web-projects/types');
  }

  async createWebProject(data) {
    // Handle file uploads with FormData
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (key !== 'image' && key !== 'gallery') {
        if (typeof data[key] === 'object' && data[key] !== null) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    
    // Handle single image file
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (data.image && typeof data.image === 'string') {
      formData.append('image', data.image);
    }
    
    // Handle gallery files array
    if (Array.isArray(data.gallery)) {
      data.gallery.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`gallery[${index}]`, file);
        } else if (typeof file === 'string') {
          formData.append(`gallery[${index}]`, file);
        }
      });
    }

    const url = `${this.baseUrl}/admin/web-projects`;
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const responseData = await response.json();
    if (!response.ok) {
      this.handleErrorResponse(response, responseData);
      throw new ApiError('خطا در ایجاد پروژه وب', response.status);
    }
    
    return responseData;
  }

  async updateWebProject(id, data) {
    // Handle file uploads with FormData
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (key !== 'image' && key !== 'gallery') {
        if (typeof data[key] === 'object' && data[key] !== null) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    
    // Handle single image file
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (data.image && typeof data.image === 'string') {
      formData.append('image', data.image);
    }
    
    // Handle gallery files array
    if (Array.isArray(data.gallery)) {
      data.gallery.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`gallery[${index}]`, file);
        } else if (typeof file === 'string') {
          formData.append(`gallery[${index}]`, file);
        }
      });
    }

    const url = `${this.baseUrl}/admin/web-projects/${id}`;
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: formData,
    });

    const responseData = await response.json();
    if (!response.ok) {
      this.handleErrorResponse(response, responseData);
      throw new ApiError('خطا در بروزرسانی پروژه وب', response.status);
    }
    
    return responseData;
  }

  async deleteWebProject(id) {
    return this.request(`/admin/web-projects/${id}`, { method: 'DELETE' });
  }

  async createHomeCard(data) {
    return this.request('/admin/home-cards', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateHomeCard(id, data) {
    return this.request(`/admin/home-cards/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteHomeCard(id) {
    return this.request(`/admin/home-cards/${id}`, { method: 'DELETE' });
  }

  // File Upload
  async uploadFile(file, folder = 'uploads') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const url = `${this.baseUrl}/admin/files/upload`;
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'خطا در آپلود فایل');
    }
    return data;
  }

  async uploadVideo(file, type = 'vertical', folder = 'videos') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('type', type);

    const url = `${this.baseUrl}/admin/files/upload-video`;
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'خطا در آپلود ویدیو');
    }
    return data;
  }
}

export const api = new ApiService();
export default api;
