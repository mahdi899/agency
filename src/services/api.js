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
        response = await fetch(url, {
          ...options,
          headers,
        });
      } catch {
        throw new NetworkError();
      }

      let data;
      try {
        data = await response.json();
      } catch {
        if (!response.ok) {
          throw new ApiError('پاسخ نامعتبر از سرور', response.status, 'INVALID_RESPONSE');
        }
        data = { success: true };
      }

      if (!response.ok) {
        this.handleErrorResponse(response, data);
      }

      return data;
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
    return this.request('/admin/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id, data) {
    return this.request(`/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
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
    return this.request('/admin/portfolios', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePortfolio(id, data) {
    return this.request(`/admin/portfolios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
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
    return this.request('/admin/blog', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateBlogPost(id, data) {
    return this.request(`/admin/blog/${id}`, { method: 'PUT', body: JSON.stringify(data) });
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
    return this.request('/admin/web-projects', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateWebProject(id, data) {
    return this.request(`/admin/web-projects/${id}`, { method: 'PUT', body: JSON.stringify(data) });
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
