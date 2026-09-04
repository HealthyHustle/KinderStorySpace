// Common Admin Layout Shell & Sidebar
const AdminCommon = (() => {
  function renderLayout({ activeTab, title, bodyHtml }) {
    const user = Auth.getUser();

    return `
      <div class="admin-layout">
        <!-- Sidebar Navigation -->
        <aside class="admin-sidebar" id="admin-sidebar">
          <div class="admin-sidebar-header">
            <a href="#/home" style="display: flex; align-items: center; gap: 10px;">
              <img src="assets/logo_kinder_story_space.jpeg" alt="Kinder Story Space Logo" style="width: 42px; height: 42px; border-radius: 12px; object-fit: cover; box-shadow: 0 4px 12px rgba(22, 135, 248, 0.2);">
              <div>
                <div style="font-weight: 800; font-size: 1.1rem; color: var(--color-dark-navy); line-height: 1.1;">Kinder Story</div>
                <div class="admin-badge-tag">ADMIN PANEL</div>
              </div>
            </a>
          </div>

          <ul class="admin-nav">
            <li class="admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}" onclick="window.location.hash='#/admin/dashboard'">
              <i class="fas fa-gauge-high"></i> <span>Dashboard</span>
            </li>
            <li class="admin-nav-item ${activeTab === 'books' ? 'active' : ''}" onclick="window.location.hash='#/admin/books'">
              <i class="fas fa-book"></i> <span>Kelola Buku</span>
            </li>
            <li class="admin-nav-item ${activeTab === 'add-book' ? 'active' : ''}" onclick="AdminBooksPage.openAddModal()">
              <i class="fas fa-circle-plus"></i> <span>Tambah Buku</span>
            </li>
            <li class="admin-nav-item ${activeTab === 'modules' ? 'active' : ''}" onclick="window.location.hash='#/admin/modules'">
              <i class="fas fa-shapes"></i> <span>Modul PGPAUD</span>
            </li>
            <li class="admin-nav-item ${activeTab === 'users' ? 'active' : ''}" onclick="window.location.hash='#/admin/users'">
              <i class="fas fa-users"></i> <span>Pengguna</span>
            </li>
            <li class="admin-nav-item" onclick="AdminCommon.showStatsModal()">
              <i class="fas fa-chart-pie"></i> <span>Statistik</span>
            </li>
            <li class="admin-nav-item" onclick="AdminCommon.showSettingsModal()">
              <i class="fas fa-gear"></i> <span>Pengaturan</span>
            </li>
          </ul>

          <div class="admin-sidebar-footer">
            <a href="#/home" class="btn btn-secondary btn-sm" style="width: 100%; margin-bottom: 8px;">
              <i class="fas fa-globe"></i> Lihat Website
            </a>
            <button class="btn btn-sm" style="width: 100%; background: #FEE2E2; color: var(--color-danger); border: none;" onclick="Auth.logout()">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </aside>

        <!-- Main Workspace -->
        <div class="admin-main">
          <!-- Topbar -->
          <header class="admin-topbar">
            <div style="display: flex; align-items: center; gap: 16px;">
              <button class="admin-mobile-toggle" onclick="AdminCommon.toggleSidebar()">
                <i class="fas fa-bars"></i>
              </button>
              <h2 class="admin-topbar-title">${title}</h2>
            </div>

            <div class="admin-topbar-right">
              <div style="display: flex; align-items: center; gap: 10px; background: var(--color-soft-gray); padding: 6px 14px; border-radius: var(--radius-pill); border: 1px solid var(--color-border);">
                <div class="avatar-img" style="width: 32px; height: 32px; font-size: 0.8rem;">A</div>
                <span style="font-size: 0.88rem; font-weight: 700; color: var(--color-dark-navy);">${user ? user.name : 'Administrator'}</span>
                <span class="badge badge-yellow" style="font-size: 0.65rem;">ADMIN</span>
              </div>
            </div>
          </header>

          <!-- Content Area -->
          <main class="admin-content-area">
            ${bodyHtml}
          </main>
        </div>
      </div>
    `;
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) sidebar.classList.toggle('drawer-open');
  }

  function showStatsModal() {
    Modal.open({
      title: 'Statistik Platform PGPAUD',
      contentHtml: `
        <p style="color: var(--color-text-muted); margin-bottom: 16px;">Statistik performa kunjungan dan pembacaan cerita anak real-time.</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div style="background: var(--color-bg-light); padding: 14px; border-radius: 12px; text-align: center;">
            <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary);">98.4%</div>
            <div style="font-size: 0.8rem; color: var(--color-text-muted);">Tingkat Penyelesaian Baca</div>
          </div>
          <div style="background: var(--color-accent-yellow-soft); padding: 14px; border-radius: 12px; text-align: center;">
            <div style="font-size: 1.5rem; font-weight: 900; color: #B45309;">4.9 / 5.0</div>
            <div style="font-size: 0.8rem; color: var(--color-text-muted);">Kepuasan Guru & Ortu</div>
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); text-align: center;">Data disinkronkan langsung dengan basis data PGPAUD UPI Cibiru.</p>
      `
    });
  }

  function showSettingsModal() {
    Modal.open({
      title: 'Pengaturan Platform',
      contentHtml: `
        <div style="line-height: 1.8;">
          <div class="form-group">
            <label class="form-label">Nama Platform</label>
            <input type="text" class="form-input" value="Kinder Story Space" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">Afiliasi Institusi</label>
            <input type="text" class="form-input" value="Universitas Pendidikan Indonesia – Kampus Cibiru" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">Bahasa Default</label>
            <input type="text" class="form-input" value="Bahasa Indonesia & English" readonly>
          </div>
        </div>
      `,
      footerHtml: `
        <button class="btn btn-primary btn-sm" onclick="Modal.close()">Simpan Pengaturan</button>
      `
    });
  }

  return {
    renderLayout,
    toggleSidebar,
    showStatsModal,
    showSettingsModal
  };
})();
