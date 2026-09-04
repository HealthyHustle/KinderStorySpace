// Authentication State & Session Manager
const Auth = (() => {
  const TOKEN_KEY = 'kss_token';
  const USER_KEY = 'kss_user';

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function getUser() {
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function setSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  function isLoggedIn() {
    return !!getToken() && !!getUser();
  }

  function isAdmin() {
    const user = getUser();
    return user && user.role === 'admin';
  }

  async function login(email, password) {
    const res = await API.login({ email, password });
    setSession(res.token, res.user);
    return res.user;
  }

  async function register(userData) {
    const res = await API.register(userData);
    setSession(res.token, res.user);
    return res.user;
  }

  function logout() {
    clearSession();
    window.location.hash = '#/login';
    window.location.reload();
  }

  return {
    getToken,
    getUser,
    setSession,
    clearSession,
    isLoggedIn,
    isAdmin,
    login,
    register,
    logout
  };
})();
