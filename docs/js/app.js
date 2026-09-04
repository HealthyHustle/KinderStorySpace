// Kinder Story Space - Main Application Script
const App = (() => {
  window.appLanguage = localStorage.getItem('kss_lang') || 'id';

  async function init() {
    console.log('✨ Initializing Kinder Story Space Platform...');

    // If token exists, verify with backend
    if (Auth.getToken()) {
      try {
        const res = await API.getMe();
        if (res && res.user) {
          Auth.setSession(Auth.getToken(), res.user);
        }
      } catch (err) {
        console.warn('Session expired or invalid, clearing:', err.message);
        Auth.clearSession();
      }
    }

    // Initialize Router
    Router.init();
  }

  function toggleLanguage() {
    window.appLanguage = window.appLanguage === 'id' ? 'en' : 'id';
    localStorage.setItem('kss_lang', window.appLanguage);
    Toast.info(window.appLanguage === 'en' ? 'Switched to English' : 'Beralih ke Bahasa Indonesia');
    Router.route();
  }

  return {
    init,
    toggleLanguage
  };
})();

// Bootstrap when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
