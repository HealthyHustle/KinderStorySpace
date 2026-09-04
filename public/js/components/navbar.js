// Navigation Bar Component
const Navbar = (() => {
  function render() {
    const user = Auth.getUser();
    const currentLang = window.appLanguage || 'id';

    const t = {
      id: {
        home: 'Home',
        books: 'Buku Cerita',
        modules: 'Modul Pembelajaran',
        about: 'Tentang Kami',
        profile: 'Profil',
        adminPanel: 'Admin Dashboard',
        logout: 'Keluar',
        signIn: 'Masuk'
      },
      en: {
        home: 'Home',
        books: 'Story Books',
        modules: 'Learning Modules',
        about: 'About Us',
        profile: 'Profile',
        adminPanel: 'Admin Dashboard',
        logout: 'Sign Out',
        signIn: 'Sign In'
      }
    }[currentLang];

    const currentHash = window.location.hash || '#/home';

    return `
      <nav class="navbar" id="app-navbar">
        <div class="container navbar-inner">
          <!-- Brand Logo -->
          <a href="#/home" class="nav-brand">
            <div class="brand-icon" style="overflow: hidden; padding: 0; background: transparent; box-shadow: none;">
              <img src="/assets/logo_kinder_story_space.jpeg" alt="Kinder Story Space Logo" style="width: 44px; height: 44px; border-radius: 12px; object-fit: cover; box-shadow: 0 4px 12px rgba(22, 135, 248, 0.2);">
            </div>
            <div class="brand-text">
              <div class="brand-title">Kinder <span>Story</span> Space</div>
              <div class="brand-sub">Digital Story & Learning</div>
            </div>
          </a>

          <!-- Menu Links -->
          <ul class="nav-menu" id="nav-menu">
            <li><a href="#/home" class="nav-link ${currentHash === '#/home' ? 'active' : ''}">${t.home}</a></li>
            <li><a href="#/home#section-books" class="nav-link ${currentHash.includes('books') ? 'active' : ''}">${t.books}</a></li>
            <li><a href="#/modules" class="nav-link ${currentHash === '#/modules' ? 'active' : ''}">${t.modules}</a></li>
            <li><a href="#/home#section-benefits" class="nav-link">${t.about}</a></li>
            ${Auth.isAdmin() ? `<li><a href="#/admin/dashboard" class="nav-link" style="color: var(--color-primary); font-weight: 800;"><i class="fas fa-shield-halved"></i> ${t.adminPanel}</a></li>` : ''}
          </ul>

          <!-- Actions -->
          <div class="nav-actions">
            <!-- Language Switcher -->
            <div class="lang-toggle" onclick="App.toggleLanguage()" title="Ganti Bahasa / Switch Language">
              <span class="lang-opt ${currentLang === 'id' ? 'active' : ''}">🇮🇩 ID</span>
              <span class="lang-opt ${currentLang === 'en' ? 'active' : ''}">🇬🇧 EN</span>
            </div>

            <!-- Search Icon -->
            <button class="btn-nav-search" onclick="Navbar.focusSearch()" title="Cari Cerita">
              <i class="fas fa-search"></i>
            </button>

            <!-- User Session / Profile -->
            ${user ? `
              <div class="user-profile-menu">
                <button class="user-avatar-btn" id="user-menu-btn" onclick="Navbar.toggleDropdown(event)">
                  <div class="avatar-img">${(user.name || 'U').charAt(0).toUpperCase()}</div>
                  <span class="avatar-name">${user.name.split(' ')[0]}</span>
                  <i class="fas fa-chevron-down" style="font-size: 0.75rem; color: var(--color-text-muted);"></i>
                </button>
                <div class="profile-dropdown" id="profile-dropdown">
                  <div style="padding: 10px 18px 6px;">
                    <div style="font-weight: 800; font-size: 0.95rem; color: var(--color-dark-navy);">${user.name}</div>
                    <div style="font-size: 0.78rem; color: var(--color-text-muted);">${user.email}</div>
                    <span class="badge ${user.role === 'admin' ? 'badge-yellow' : 'badge-primary'}" style="margin-top: 6px;">
                      ${user.role === 'admin' ? 'Administrator' : 'Anggota PGPAUD'}
                    </span>
                  </div>
                  <div class="dropdown-divider"></div>
                  ${user.role === 'admin' ? `
                    <div class="dropdown-item" onclick="window.location.hash='#/admin/dashboard'">
                      <i class="fas fa-gauge-high text-primary"></i> ${t.adminPanel}
                    </div>
                  ` : ''}
                  <div class="dropdown-item" onclick="Navbar.showProfileInfo()">
                    <i class="fas fa-user-circle text-primary"></i> ${t.profile}
                  </div>
                  <div class="dropdown-divider"></div>
                  <div class="dropdown-item" style="color: var(--color-danger);" onclick="Auth.logout()">
                    <i class="fas fa-sign-out-alt"></i> ${t.logout}
                  </div>
                </div>
              </div>
            ` : `
              <a href="#/login" class="btn btn-primary btn-sm">${t.signIn}</a>
            `}

            <!-- Mobile Menu Trigger -->
            <button class="mobile-toggle" onclick="Navbar.toggleMobileMenu()">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
    `;
  }

  function toggleDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) dropdown.classList.toggle('show');
  }

  function toggleMobileMenu() {
    const menu = document.getElementById('nav-menu');
    if (menu) menu.classList.toggle('open');
  }

  function focusSearch() {
    if (window.location.hash !== '#/home') {
      window.location.hash = '#/home';
      setTimeout(() => {
        const search = document.getElementById('home-search-input');
        if (search) search.focus();
      }, 300);
    } else {
      const search = document.getElementById('home-search-input');
      if (search) {
        search.scrollIntoView({ behavior: 'smooth', block: 'center' });
        search.focus();
      }
    }
  }

  function showProfileInfo() {
    const user = Auth.getUser();
    if (!user) return;
    Modal.open({
      title: 'Profil Pengguna',
      contentHtml: `
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 800; margin: 0 auto 12px;">
            ${(user.name || 'U').charAt(0).toUpperCase()}
          </div>
          <h3 style="color: var(--color-dark-navy); font-size: 1.3rem;">${user.name}</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem;">${user.email}</p>
          <span class="badge ${user.role === 'admin' ? 'badge-yellow' : 'badge-primary'}" style="margin-top: 8px;">
            ${user.role === 'admin' ? 'Administrator' : 'Siswa / Pendidik PAUD'}
          </span>
        </div>
        <div style="background: var(--color-soft-gray); border-radius: 14px; padding: 18px; border: 1px solid var(--color-border);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--color-text-muted); font-size: 0.9rem;">Buku Selesai Dibaca:</span>
            <strong style="color: var(--color-dark-navy);">${user.books_read || 0} Buku</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--color-text-muted); font-size: 0.9rem;">Status Akun:</span>
            <strong style="color: var(--color-success);"><i class="fas fa-check-circle"></i> Terverifikasi</strong>
          </div>
        </div>
      `,
      footerHtml: `
        <button class="btn btn-secondary btn-sm" onclick="Modal.close()">Tutup</button>
      `
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown && dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  });

  return {
    render,
    toggleDropdown,
    toggleMobileMenu,
    focusSearch,
    showProfileInfo
  };
})();
