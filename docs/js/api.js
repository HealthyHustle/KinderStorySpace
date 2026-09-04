// Centralized API Client for Kinder Story Space
// Supports Dual Mode: Live Express REST API and Standalone/Offline ClientDB (GitHub Pages)
const API = (() => {
  const BASE_URL = '/api';

  // Check if we are running in a static environment (e.g. GitHub Pages or file://)
  const isStaticHost = window.location.hostname.includes('github.io') ||
                       window.location.protocol === 'file:' ||
                       window.location.port === '' && window.location.hostname !== 'localhost';

  let forceStaticMode = isStaticHost;

  function getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('kss_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async function request(endpoint, options = {}) {
    if (forceStaticMode) {
      throw new Error('Running in static mode');
    }

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
      // Fallback to static client db if backend server is not available
      console.warn(`API Error [${endpoint}], falling back to ClientDB:`, err.message);
      forceStaticMode = true;
      throw err;
    }
  }

  return {
    isStaticMode: () => forceStaticMode,

    // Auth
    login: async (credentials) => {
      if (!forceStaticMode) {
        try {
          return await request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.verifyLogin(credentials.email, credentials.password);
    },

    register: async (userData) => {
      if (!forceStaticMode) {
        try {
          return await request('/auth/register', { method: 'POST', body: JSON.stringify(userData) });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.register(userData);
    },

    getMe: async () => {
      if (!forceStaticMode) {
        try {
          return await request('/auth/me', { method: 'GET' });
        } catch {
          // Fall through to ClientDB
        }
      }
      const u = Auth.getUser();
      if (!u) throw new Error('Unauthenticated');
      return { user: u };
    },

    // Books
    getBooks: async (params = {}) => {
      if (!forceStaticMode) {
        try {
          const query = new URLSearchParams(params).toString();
          return await request(`/books${query ? '?' + query : ''}`, { method: 'GET' });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.getBooks(params);
    },

    getBookById: async (id) => {
      if (!forceStaticMode) {
        try {
          return await request(`/books/${id}`, { method: 'GET' });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.getBookById(id);
    },

    createBook: async (data) => {
      if (!forceStaticMode) {
        try {
          return await request('/books', { method: 'POST', body: JSON.stringify(data) });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.createBook(data);
    },

    updateBook: async (id, data) => {
      if (!forceStaticMode) {
        try {
          return await request(`/books/${id}`, { method: 'PUT', body: JSON.stringify(data) });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.updateBook(id, data);
    },

    deleteBook: async (id) => {
      if (!forceStaticMode) {
        try {
          return await request(`/books/${id}`, { method: 'DELETE' });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.deleteBook(id);
    },

    saveProgress: async (id, progressData) => {
      if (!forceStaticMode) {
        try {
          return await request(`/books/${id}/progress`, { method: 'POST', body: JSON.stringify(progressData) });
        } catch {
          // Fall through to ClientDB
        }
      }
      const user = Auth.getUser();
      return ClientDB.saveProgress(user?.id, id, progressData.page, progressData.language);
    },

    getProgress: async (id) => {
      if (!forceStaticMode) {
        try {
          return await request(`/books/${id}/progress`, { method: 'GET' });
        } catch {
          // Fall through to ClientDB
        }
      }
      const user = Auth.getUser();
      return ClientDB.getProgress(user?.id, id);
    },

    // Modules
    getModules: async (params = {}) => {
      if (!forceStaticMode) {
        try {
          const query = new URLSearchParams(params).toString();
          return await request(`/modules${query ? '?' + query : ''}`, { method: 'GET' });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.getModules(params);
    },

    getModuleById: async (id) => {
      if (!forceStaticMode) {
        try {
          return await request(`/modules/${id}`, { method: 'GET' });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.getModuleById(id);
    },

    createModule: async (data) => {
      if (!forceStaticMode) {
        try {
          return await request('/modules', { method: 'POST', body: JSON.stringify(data) });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.createModule(data);
    },

    updateModule: async (id, data) => {
      if (!forceStaticMode) {
        try {
          return await request(`/modules/${id}`, { method: 'PUT', body: JSON.stringify(data) });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.updateModule(id, data);
    },

    deleteModule: async (id) => {
      if (!forceStaticMode) {
        try {
          return await request(`/modules/${id}`, { method: 'DELETE' });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.deleteModule(id);
    },

    // Admin
    getAdminStats: async () => {
      if (!forceStaticMode) {
        try {
          return await request('/admin/stats', { method: 'GET' });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.getAdminStats();
    },

    getAdminUsers: async () => {
      if (!forceStaticMode) {
        try {
          return await request('/admin/users', { method: 'GET' });
        } catch {
          // Fall through to ClientDB
        }
      }
      return ClientDB.getAdminUsers();
    },

    // PDF Handlers (Smart print / download)
    downloadBookPdf: (bookId, lang = 'id') => {
      if (forceStaticMode) {
        ClientDB.printBookPdf(bookId, lang);
      } else {
        window.open(`/api/books/${bookId}/pdf?lang=${lang}`, '_blank');
      }
    },

    downloadModulePdf: (moduleId) => {
      if (forceStaticMode) {
        ClientDB.printModulePdf(moduleId);
      } else {
        window.open(`/api/modules/${moduleId}/pdf`, '_blank');
      }
    }
  };
})();
