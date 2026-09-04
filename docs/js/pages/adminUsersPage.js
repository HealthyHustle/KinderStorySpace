// Admin Users Management Component (/admin/users)
const AdminUsersPage = (() => {
  let usersList = [];
  let searchQuery = '';

  async function render() {
    let stats = { total: 0, active_count: 0, new_count: 0, users: [] };

    try {
      stats = await API.getAdminUsers();
      usersList = stats.users || [];
    } catch (err) {
      console.error('Failed to load admin users:', err);
    }

    const filtered = getFilteredUsers();

    const bodyHtml = `
      <!-- User Summary Stats -->
      <div class="admin-stats-grid" style="margin-bottom: 28px;">
        <div class="stat-card">
          <div class="stat-icon-wrap stat-icon-blue">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-info">
            <span class="stat-num">${stats.total || usersList.length}</span>
            <span class="stat-title">Total Pengguna</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap stat-icon-green">
            <i class="fas fa-user-check"></i>
          </div>
          <div class="stat-info">
            <span class="stat-num">${stats.active_count || usersList.length}</span>
            <span class="stat-title">Pengguna Aktif</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap stat-icon-yellow">
            <i class="fas fa-user-plus"></i>
          </div>
          <div class="stat-info">
            <span class="stat-num">${stats.new_count || 1}</span>
            <span class="stat-title">Pengguna Baru (Bulan Ini)</span>
          </div>
        </div>
      </div>

      <!-- Users Table Card -->
      <div class="admin-card-table">
        <div class="admin-card-header">
          <div>
            <h3 class="admin-card-title">Daftar Pengguna Platform</h3>
            <p style="font-size: 0.88rem; color: var(--color-text-muted);">
              Daftar akun pendidik, mahasiswa PGPAUD, dan pengguna terdaftar
            </p>
          </div>

          <div class="table-controls">
            <input type="text" class="table-search-input" placeholder="Cari nama / email pengguna..." oninput="AdminUsersPage.handleSearch(event)" value="${searchQuery}">
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table" id="admin-users-table">
            <thead>
              <tr>
                <th>Pengguna</th>
                <th>Email</th>
                <th>Role</th>
                <th>Tanggal Bergabung</th>
                <th>Aktivitas Terakhir</th>
                <th>Buku Dibaca</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length ? filtered.map(u => renderUserRow(u)).join('') : `
                <tr>
                  <td colspan="7" style="text-align: center; padding: 40px; color: var(--color-text-muted);">
                    Tidak ada pengguna yang cocok dengan pencarian.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;

    return AdminCommon.renderLayout({
      activeTab: 'users',
      title: 'Manajemen Pengguna',
      bodyHtml
    });
  }

  function renderUserRow(u) {
    const joined = new Date(u.created_at || Date.now()).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const lastActive = new Date(u.last_active || Date.now()).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="avatar-img" style="width: 36px; height: 36px; background: ${u.role === 'admin' ? 'var(--color-accent-yellow)' : 'var(--color-primary)'}; color: ${u.role === 'admin' ? '#B45309' : '#FFF'};">
              ${(u.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <strong style="color: var(--color-dark-navy);">${u.name}</strong>
            </div>
          </div>
        </td>
        <td>${u.email}</td>
        <td>
          <span class="badge ${u.role === 'admin' ? 'badge-yellow' : 'badge-primary'}">
            ${u.role === 'admin' ? 'Administrator' : 'User'}
          </span>
        </td>
        <td>${joined}</td>
        <td style="font-size: 0.85rem; color: var(--color-text-muted);">${lastActive}</td>
        <td>
          <strong>${u.books_read || 0}</strong> Buku
        </td>
        <td>
          <span class="badge badge-green">
            <i class="fas fa-circle" style="font-size: 0.5rem;"></i> Aktif
          </span>
        </td>
      </tr>
    `;
  }

  function getFilteredUsers() {
    if (!searchQuery.trim()) return usersList;
    const q = searchQuery.toLowerCase().trim();
    return usersList.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }

  function handleSearch(e) {
    searchQuery = e.target.value;
    const tbody = document.querySelector('#admin-users-table tbody');
    if (tbody) {
      const filtered = getFilteredUsers();
      tbody.innerHTML = filtered.length ? filtered.map(u => renderUserRow(u)).join('') : `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px; color: var(--color-text-muted);">
            Tidak ada pengguna yang cocok.
          </td>
        </tr>
      `;
    }
  }

  return {
    render,
    handleSearch
  };
})();
