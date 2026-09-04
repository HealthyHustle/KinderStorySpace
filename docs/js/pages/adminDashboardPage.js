// Admin Dashboard Page Component (/admin/dashboard)
const AdminDashboardPage = (() => {
  async function render() {
    let stats = {
      total_books: 8,
      total_users: 4,
      total_modules: 6,
      new_books_count: 5,
      recent_books: []
    };
    let modulesList = [];

    try {
      const [statsData, modulesData] = await Promise.all([
        API.getAdminStats(),
        API.getModules()
      ]);
      stats = statsData || stats;
      modulesList = modulesData.modules || [];
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    }

    const bodyHtml = `
      <!-- Welcome Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
        <div>
          <h1 style="font-size: 1.85rem; color: var(--color-dark-navy); margin-bottom: 4px; font-weight: 800;">
            Selamat Datang, Admin 👋
          </h1>
          <p style="color: var(--color-text-muted); font-size: 0.95rem;">
            Pusat kendali konten buku cerita dan modul pembelajaran anak usia dini PGPAUD.
          </p>
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="AdminBooksPage.openAddModal()">
            <i class="fas fa-plus"></i> Tambah Buku Baru
          </button>
          <button class="btn btn-secondary btn-sm" onclick="AdminModulesPage.openAddModal()">
            <i class="fas fa-folder-plus"></i> Tambah Modul Baru
          </button>
        </div>
      </div>

      <!-- 4 KPI Stat Cards -->
      <div class="admin-stats-grid">
        <!-- TOTAL BUKU -->
        <div class="stat-card">
          <div class="stat-icon-wrap stat-icon-blue">
            <i class="fas fa-book-open"></i>
          </div>
          <div class="stat-info">
            <span class="stat-num">${stats.total_books}</span>
            <span class="stat-title">Total Buku Cerita</span>
          </div>
        </div>

        <!-- TOTAL PENGGUNA -->
        <div class="stat-card">
          <div class="stat-icon-wrap stat-icon-yellow">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-info">
            <span class="stat-num">${stats.total_users}</span>
            <span class="stat-title">Total Pengguna</span>
          </div>
        </div>

        <!-- TOTAL MODUL -->
        <div class="stat-card">
          <div class="stat-icon-wrap stat-icon-green">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <div class="stat-info">
            <span class="stat-num">${stats.total_modules || modulesList.length}</span>
            <span class="stat-title">Total Modul PGPAUD</span>
          </div>
        </div>

        <!-- BUKU TERBARU -->
        <div class="stat-card">
          <div class="stat-icon-wrap stat-icon-purple">
            <i class="fas fa-sparkles"></i>
          </div>
          <div class="stat-info">
            <span class="stat-num">${stats.new_books_count || 5}</span>
            <span class="stat-title">Buku Terbaru</span>
          </div>
        </div>
      </div>

      <!-- SECTION 1: Recent Books Table Overview -->
      <div class="admin-card-table">
        <div class="admin-card-header">
          <h3 class="admin-card-title">
            <i class="fas fa-book text-primary"></i> Koleksi Buku Cerita Terkini
          </h3>
          <div style="display: flex; gap: 8px;">
            <a href="#/admin/books" class="btn btn-secondary btn-sm">Kelola Semua Buku (${stats.total_books}) →</a>
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th style="width: 54px;">Cover</th>
                <th>Judul Buku</th>
                <th>Penulis</th>
                <th>Kategori</th>
                <th>Usia</th>
                <th>Status</th>
                <th style="text-align: center; width: 110px;">Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${(stats.recent_books || []).map(b => `
                <tr>
                  <td>
                    <img src="${b.cover_url}" alt="${b.title_id}" class="table-thumb" onerror="this.src='assets/cover_bintang.svg'">
                  </td>
                  <td class="cell-title">
                    <strong>${b.title_id}</strong>
                    <div class="cell-sub">${b.title_en || '-'}</div>
                  </td>
                  <td>${b.author}</td>
                  <td><span class="badge badge-primary">${b.category}</span></td>
                  <td>${b.age_range}</td>
                  <td>
                    <span class="badge ${b.status === 'published' ? 'badge-green' : 'badge-gray'}">
                      ${b.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div class="table-actions" style="justify-content: center;">
                      <a href="#/books/${b.id}" target="_blank" class="btn-action btn-action-view" title="Buka Detail Buku">
                        <i class="fas fa-eye"></i>
                      </a>
                      <button class="btn-action btn-action-edit" title="Edit Buku" onclick="AdminBooksPage.openEditModal('${b.id}')">
                        <i class="fas fa-pencil"></i>
                      </button>
                      <button class="btn-action btn-action-delete" title="Hapus Buku" onclick="AdminBooksPage.confirmDelete('${b.id}', '${b.title_id.replace(/'/g, "\\'")}')">
                        <i class="fas fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- SECTION 2: Kelola Modul Pembelajaran PGPAUD (Langsung dari Dashboard) -->
      <div class="admin-card-table">
        <div class="admin-card-header">
          <div>
            <h3 class="admin-card-title">
              <i class="fas fa-shapes text-primary"></i> Kelola Modul Pembelajaran PGPAUD
            </h3>
            <p style="font-size: 0.84rem; color: var(--color-text-muted); margin-top: 2px;">
              Daftar modul stimulasi tumbuh kembang anak usia dini (Dapat diedit dan dihapus)
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-primary btn-sm" onclick="AdminModulesPage.openAddModal()">
              <i class="fas fa-plus"></i> Tambah Modul
            </button>
            <a href="#/admin/modules" class="btn btn-secondary btn-sm">Buka Halaman Modul →</a>
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th style="width: 54px;">Thumbnail</th>
                <th>Judul Modul & Deskripsi</th>
                <th>Kategori Dimensi</th>
                <th>Usia AUD</th>
                <th>Status</th>
                <th style="text-align: center; width: 120px;">Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${modulesList.length ? modulesList.slice(0, 8).map(m => `
                <tr>
                  <td>
                    <img src="${m.thumbnail}" alt="${m.title}" class="table-thumb" style="border-radius: 12px; width: 44px; height: 44px; object-fit: cover;" onerror="this.src='assets/cover_bintang.svg'">
                  </td>
                  <td class="cell-title">
                    <strong>${m.title}</strong>
                    <div class="cell-sub" title="${m.description}">${m.description}</div>
                  </td>
                  <td><span class="badge badge-primary">${m.category}</span></td>
                  <td><span class="badge badge-yellow">Usia ${m.age_range}</span></td>
                  <td>
                    <span class="badge ${m.status === 'published' ? 'badge-green' : 'badge-gray'}">
                      ${m.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div class="table-actions" style="justify-content: center;">
                      <a href="/api/modules/${m.id}/pdf" target="_blank" class="btn-action btn-action-view" title="Unduh / Preview PDF Dokumen">
                        <i class="fas fa-file-pdf" style="color: var(--color-danger);"></i>
                      </a>
                      <button class="btn-action btn-action-edit" title="Edit Modul Pembelajaran" onclick="AdminModulesPage.openEditModal('${m.id}')">
                        <i class="fas fa-pencil"></i>
                      </button>
                      <button class="btn-action btn-action-delete" title="Hapus Modul Pembelajaran" onclick="AdminModulesPage.confirmDelete('${m.id}', '${m.title.replace(/'/g, "\\'")}')">
                        <i class="fas fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="6" style="text-align: center; padding: 36px; color: var(--color-text-muted);">
                    Belum ada modul yang terdaftar.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;

    return AdminCommon.renderLayout({
      activeTab: 'dashboard',
      title: 'Dashboard Overview',
      bodyHtml
    });
  }

  return {
    render
  };
})();
