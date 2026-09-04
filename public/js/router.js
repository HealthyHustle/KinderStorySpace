// Client-side Hash Router with Protected Route Authorization
const Router = (() => {
  async function route() {
    const hash = window.location.hash || '#/login';
    const root = document.getElementById('app-root');
    if (!root) return;

    // Check Authentication
    const loggedIn = Auth.isLoggedIn();
    const isAdmin = Auth.isAdmin();

    // 1. Unauthenticated users can only see login or register
    if (!loggedIn) {
      if (hash === '#/register') {
        root.innerHTML = AuthPage.render('register');
        return;
      }
      // Force redirect to login
      if (hash !== '#/login') {
        window.location.hash = '#/login';
        return;
      }
      root.innerHTML = AuthPage.render('login');
      return;
    }

    // 2. If logged in, prevent showing login/register page
    if (hash === '#/login' || hash === '#/register') {
      if (isAdmin) {
        window.location.hash = '#/admin/dashboard';
      } else {
        window.location.hash = '#/home';
      }
      return;
    }

    // 3. Admin Protected Routes Guard
    if (hash.startsWith('#/admin')) {
      if (!isAdmin) {
        Toast.error('Akses ditolak: Anda tidak memiliki izin Administrator.');
        window.location.hash = '#/home';
        return;
      }

      if (hash === '#/admin' || hash === '#/admin/dashboard') {
        root.innerHTML = await AdminDashboardPage.render();
      } else if (hash === '#/admin/books') {
        root.innerHTML = await AdminBooksPage.render();
      } else if (hash === '#/admin/modules') {
        root.innerHTML = await AdminModulesPage.render();
      } else if (hash === '#/admin/users') {
        root.innerHTML = await AdminUsersPage.render();
      } else {
        window.location.hash = '#/admin/dashboard';
      }
      return;
    }

    // 4. Public User Routes
    if (hash === '#/home' || hash === '') {
      root.innerHTML = await HomePage.render();
    } else if (hash.startsWith('#/books/')) {
      const bookId = hash.replace('#/books/', '');
      root.innerHTML = await BookDetailPage.render(bookId);
    } else if (hash.startsWith('#/reader/')) {
      const bookId = hash.replace('#/reader/', '');
      root.innerHTML = await ReaderPage.render(bookId);
    } else if (hash === '#/modules') {
      root.innerHTML = await ModulesPage.render();
    } else {
      window.location.hash = '#/home';
    }

    window.scrollTo(0, 0);
  }

  function init() {
    window.addEventListener('hashchange', route);
    route();
  }

  return {
    init,
    route
  };
})();
