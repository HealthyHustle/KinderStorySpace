// Admin PGPAUD Modules Management Component (/admin/modules)
const AdminModulesPage = (() => {
  let modulesList = [];
  let filterCategory = 'Semua';
  let searchQuery = '';

  async function render() {
    try {
      const data = await API.getModules();
      modulesList = data.modules || [];
    } catch (err) {
      console.error('Failed to load modules:', err);
    }

    const filtered = getFilteredModules();

    const bodyHtml = `
      <div class="admin-card-table">
        <div class="admin-card-header">
          <div>
            <h3 class="admin-card-title">
              <i class="fas fa-shapes text-primary"></i> Kelola Modul Pembelajaran PGPAUD
            </h3>
            <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-top: 2px;">
              Total ${modulesList.length} modul kurikulum aktif terdaftar dalam sistem
            </p>
          </div>

          <div class="table-controls">
            <!-- Search Input -->
            <input type="text" class="table-search-input" placeholder="Cari judul / kategori modul..." oninput="AdminModulesPage.handleSearch(event)" value="${searchQuery}">

            <!-- Category Filter Dropdown -->
            <select class="table-filter-select" onchange="AdminModulesPage.handleCategoryChange(event)">
              <option value="Semua" ${filterCategory === 'Semua' ? 'selected' : ''}>Semua Kategori</option>
              <option value="Bahasa & Literasi" ${filterCategory === 'Bahasa & Literasi' ? 'selected' : ''}>Bahasa & Literasi</option>
              <option value="Kognitif" ${filterCategory === 'Kognitif' ? 'selected' : ''}>Kognitif</option>
              <option value="Sosial Emosional" ${filterCategory === 'Sosial Emosional' ? 'selected' : ''}>Sosial Emosional</option>
              <option value="Motorik" ${filterCategory === 'Motorik' ? 'selected' : ''}>Motorik</option>
              <option value="Pengenalan Lingkungan" ${filterCategory === 'Pengenalan Lingkungan' ? 'selected' : ''}>Pengenalan Lingkungan</option>
              <option value="Numerasi Dasar" ${filterCategory === 'Numerasi Dasar' ? 'selected' : ''}>Numerasi Dasar</option>
            </select>

            <!-- Add Button -->
            <button class="btn btn-primary btn-sm" onclick="AdminModulesPage.openAddModal()">
              <i class="fas fa-plus"></i> Tambah Modul Baru
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table" id="admin-modules-table">
            <thead>
              <tr>
                <th style="width: 60px;">Thumbnail</th>
                <th>Judul Modul & Deskripsi</th>
                <th>Kategori Dimensi</th>
                <th>Usia AUD</th>
                <th>Status</th>
                <th style="text-align: center; width: 120px;">Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length ? filtered.map(m => renderModuleRow(m)).join('') : `
                <tr>
                  <td colspan="6" style="text-align: center; padding: 40px; color: var(--color-text-muted);">
                    Tidak ada modul pembelajaran yang cocok dengan filter.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;

    return AdminCommon.renderLayout({
      activeTab: 'modules',
      title: 'Kelola Modul PGPAUD',
      bodyHtml
    });
  }

  function renderModuleRow(m) {
    return `
      <tr>
        <td>
          <img src="${m.thumbnail}" alt="${m.title}" class="table-thumb" style="border-radius: 12px; width: 44px; height: 44px; object-fit: cover;" onerror="this.src='/assets/cover_bintang.svg'">
        </td>
        <td class="cell-title">
          <strong>${m.title}</strong>
          <div class="cell-sub" title="${m.description}">${m.description}</div>
        </td>
        <td>
          <span class="badge badge-primary">${m.category}</span>
        </td>
        <td>
          <span class="badge badge-yellow">Usia ${m.age_range}</span>
        </td>
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
    `;
  }

  function getFilteredModules() {
    let list = modulesList;
    if (filterCategory !== 'Semua') {
      list = list.filter(m => m.category.toLowerCase().includes(filterCategory.toLowerCase()));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    }
    return list;
  }

  function handleSearch(e) {
    searchQuery = e.target.value;
    updateTable();
  }

  function handleCategoryChange(e) {
    filterCategory = e.target.value;
    updateTable();
  }

  function updateTable() {
    const tbody = document.querySelector('#admin-modules-table tbody');
    if (tbody) {
      const filtered = getFilteredModules();
      tbody.innerHTML = filtered.length ? filtered.map(m => renderModuleRow(m)).join('') : `
        <tr>
          <td colspan="6" style="text-align: center; padding: 40px; color: var(--color-text-muted);">
            Tidak ada modul pembelajaran yang cocok.
          </td>
        </tr>
      `;
    }
  }

  function openAddModal() {
    Modal.open({
      title: 'Tambah Modul Pembelajaran Baru',
      contentHtml: renderModuleForm(),
      footerHtml: `
        <button class="btn btn-secondary btn-sm" onclick="Modal.close()">Batal</button>
        <button class="btn btn-primary btn-sm" onclick="AdminModulesPage.submitModuleForm(null)">Simpan Modul</button>
      `
    });
  }

  function openEditModal(moduleId) {
    const mod = modulesList.find(m => m.id === moduleId);
    if (!mod) return;

    Modal.open({
      title: `Edit Modul: ${mod.title}`,
      contentHtml: renderModuleForm(mod),
      footerHtml: `
        <button class="btn btn-secondary btn-sm" onclick="Modal.close()">Batal</button>
        <button class="btn btn-primary btn-sm" onclick="AdminModulesPage.submitModuleForm('${mod.id}')">Simpan Perubahan</button>
      `
    });
  }

  function renderModuleForm(mod = null) {
    const m = mod || {};
    const objectivesText = m.objectives && Array.isArray(m.objectives) ? m.objectives.join('\n') : '';

    return `
      <form id="admin-module-form" onsubmit="event.preventDefault()">
        <div class="form-group">
          <label class="form-label">Judul Modul Pembelajaran *</label>
          <input type="text" id="mod-title" class="form-input" required value="${m.title || ''}" placeholder="contoh: Mengenal Warna di Sekitar Kita">
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Kategori Dimensi *</label>
            <select id="mod-category" class="form-input">
              <option value="Bahasa & Literasi" ${m.category === 'Bahasa & Literasi' ? 'selected' : ''}>Bahasa & Literasi</option>
              <option value="Kognitif" ${m.category === 'Kognitif' ? 'selected' : ''}>Kognitif</option>
              <option value="Sosial Emosional" ${m.category === 'Sosial Emosional' ? 'selected' : ''}>Sosial Emosional</option>
              <option value="Seni & Kreativitas" ${m.category === 'Seni & Kreativitas' ? 'selected' : ''}>Seni & Kreativitas</option>
              <option value="Nilai Agama & Moral" ${m.category === 'Nilai Agama & Moral' ? 'selected' : ''}>Nilai Agama & Moral</option>
              <option value="Motorik" ${m.category === 'Motorik' ? 'selected' : ''}>Motorik</option>
              <option value="Pengenalan Lingkungan" ${m.category === 'Pengenalan Lingkungan' ? 'selected' : ''}>Pengenalan Lingkungan</option>
              <option value="Numerasi Dasar" ${m.category === 'Numerasi Dasar' ? 'selected' : ''}>Numerasi Dasar</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Rekomendasi Usia AUD</label>
            <input type="text" id="mod-age" class="form-input" value="${m.age_range || '4–5 Tahun'}" placeholder="contoh: 4–5 Tahun">
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Pilih Thumbnail Modul</label>
            <select id="mod-thumb" class="form-input">
              <option value="/assets/modules/modul_kognitif.svg" ${m.thumbnail === '/assets/modules/modul_kognitif.svg' ? 'selected' : ''}>Kognitif & Warna (Pink)</option>
              <option value="/assets/modules/modul_bahasa.svg" ${m.thumbnail === '/assets/modules/modul_bahasa.svg' ? 'selected' : ''}>Bahasa & Huruf (Biru)</option>
              <option value="/assets/modules/modul_sosial.svg" ${m.thumbnail === '/assets/modules/modul_sosial.svg' ? 'selected' : ''}>Sosial & Empati (Oranye)</option>
              <option value="/assets/modules/modul_motorik.svg" ${m.thumbnail === '/assets/modules/modul_motorik.svg' ? 'selected' : ''}>Fisik Motorik (Hijau)</option>
              <option value="/assets/modules/modul_lingkungan.svg" ${m.thumbnail === '/assets/modules/modul_lingkungan.svg' ? 'selected' : ''}>Lingkungan Alam (Cyan)</option>
              <option value="/assets/modules/modul_numerasi.svg" ${m.thumbnail === '/assets/modules/modul_numerasi.svg' ? 'selected' : ''}>Numerasi Angka (Ungu)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Status Penerbitan</label>
            <select id="mod-status" class="form-input">
              <option value="published" ${m.status === 'published' ? 'selected' : ''}>Published (Tampilkan ke Pengguna)</option>
              <option value="draft" ${m.status === 'draft' ? 'selected' : ''}>Draft (Arsip Guru)</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Deskripsi Aktivitas Pembelajaran</label>
          <textarea id="mod-desc" class="form-textarea" placeholder="Tuliskan tujuan dan ringkasan kegiatan stimulasi...">${m.description || ''}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Tujuan Pembelajaran Stimulasi (1 per baris)</label>
          <textarea id="mod-objectives" class="form-textarea" style="min-height: 80px;" placeholder="Anak mampu membedakan warna primer&#10;Melatih konsentrasi visual&#10;Mengelompokkan mainan">${objectivesText}</textarea>
        </div>
      </form>
    `;
  }

  async function submitModuleForm(moduleId) {
    const title = document.getElementById('mod-title')?.value;
    const category = document.getElementById('mod-category')?.value;

    if (!title || !category) {
      Toast.error('Judul modul dan kategori wajib diisi.');
      return;
    }

    const objectivesRaw = document.getElementById('mod-objectives')?.value || '';
    const objectives = objectivesRaw
      .split('\n')
      .map(o => o.trim())
      .filter(o => o.length > 0);

    const payload = {
      title,
      category,
      age_range: document.getElementById('mod-age')?.value || '4–5 Tahun',
      thumbnail: document.getElementById('mod-thumb')?.value || '/assets/modules/modul_kognitif.svg',
      status: document.getElementById('mod-status')?.value || 'published',
      description: document.getElementById('mod-desc')?.value || '',
      objectives: objectives.length ? objectives : ['Mendukung stimulasi tumbuh kembang holistik AUD']
    };

    try {
      if (moduleId) {
        const res = await API.updateModule(moduleId, payload);
        Toast.success('Modul pembelajaran berhasil diperbarui!');
        const idx = modulesList.findIndex(m => m.id === moduleId);
        if (idx !== -1) modulesList[idx] = res.module;
      } else {
        const res = await API.createModule(payload);
        Toast.success('Modul pembelajaran baru berhasil ditambahkan!');
        modulesList.unshift(res.module);
      }

      Modal.close();
      updateTable();

      // If on admin dashboard, refresh dashboard too if needed
      if (window.location.hash === '#/admin/dashboard' || window.location.hash === '#/admin') {
        Router.route();
      }
    } catch (err) {
      Toast.error(err.message || 'Gagal menyimpan modul.');
    }
  }

  function confirmDelete(modId, modTitle) {
    Modal.confirm({
      title: 'Hapus Modul Pembelajaran?',
      message: `Apakah Anda yakin ingin menghapus modul <strong>"${modTitle}"</strong>? Data yang dihapus tidak dapat dikembalikan.`,
      confirmText: 'Ya, Hapus',
      cancelText: 'Batal',
      isDanger: true,
      onConfirm: async () => {
        try {
          await API.deleteModule(modId);
          Toast.success(`Modul "${modTitle}" berhasil dihapus.`);
          modulesList = modulesList.filter(m => m.id !== modId);
          updateTable();

          if (window.location.hash === '#/admin/dashboard' || window.location.hash === '#/admin') {
            Router.route();
          }
        } catch (err) {
          Toast.error(err.message || 'Gagal menghapus modul.');
        }
      }
    });
  }

  return {
    render,
    handleSearch,
    handleCategoryChange,
    openAddModal,
    openEditModal,
    submitModuleForm,
    confirmDelete
  };
})();
