// Centralized API Client for Kinder Story Space
const API = (() => {
  const BASE_URL = '/api';

  function getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('kss_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
      headers: getHeaders(),
      ...options
    };

    try {
      const res = await fetch(url, config);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat memproses permintaan.');
      }
      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err.message);
      throw err;
    }
  }

  return {
    get: (endpoint) => request(endpoint, { method: 'GET' }),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),

    // Auth
    login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    getMe: () => request('/auth/me', { method: 'GET' }),

    // Books
    getBooks: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/books${query ? '?' + query : ''}`, { method: 'GET' });
    },
    getBookById: (id) => request(`/books/${id}`, { method: 'GET' }),
    createBook: (data) => request('/books', { method: 'POST', body: JSON.stringify(data) }),
    updateBook: (id, data) => request(`/books/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteBook: (id) => request(`/books/${id}`, { method: 'DELETE' }),
    saveProgress: (id, progressData) => request(`/books/${id}/progress`, { method: 'POST', body: JSON.stringify(progressData) }),
    getProgress: (id) => request(`/books/${id}/progress`, { method: 'GET' }),

    // Modules
    getModules: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/modules${query ? '?' + query : ''}`, { method: 'GET' });
    },
    getModuleById: (id) => request(`/modules/${id}`, { method: 'GET' }),
    createModule: (data) => request('/modules', { method: 'POST', body: JSON.stringify(data) }),
    updateModule: (id, data) => request(`/modules/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteModule: (id) => request(`/modules/${id}`, { method: 'DELETE' }),

    // Admin
    getAdminStats: () => request('/admin/stats', { method: 'GET' }),
    getAdminUsers: () => request('/admin/users', { method: 'GET' })
  };
})();
