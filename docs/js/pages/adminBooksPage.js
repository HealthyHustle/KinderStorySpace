// Admin Books Management Component (/admin/books)
const AdminBooksPage = (() => {
  let booksList = [];
  let filterCategory = 'Semua';
  let searchQuery = '';

  async function render() {
    try {
      const data = await API.getBooks();
      booksList = data.books || [];
    } catch (err) {
      console.error('Failed to load books for admin:', err);
    }

    const filtered = getFilteredBooks();

    const bodyHtml = `
      <div class="admin-card-table">
        <div class="admin-card-header">
          <div>
            <h3 class="admin-card-title">Kelola Koleksi Buku Cerita</h3>
            <p style="font-size: 0.88rem; color: var(--color-text-muted);">
              Total ${booksList.length} buku cerita terdaftar dalam sistem
            </p>
          </div>

          <div class="table-controls">
            <!-- Search -->
            <input type="text" class="table-search-input" placeholder="Cari judul / penulis..." oninput="AdminBooksPage.handleSearch(event)" value="${searchQuery}">

            <!-- Category Filter -->
            <select class="table-filter-select" onchange="AdminBooksPage.handleCategoryChange(event)">
              <option value="Semua" ${filterCategory === 'Semua' ? 'selected' : ''}>Semua Kategori</option>
              <option value="Cerita Rakyat" ${filterCategory === 'Cerita Rakyat' ? 'selected' : ''}>Cerita Rakyat</option>
              <option value="Fabel" ${filterCategory === 'Fabel' ? 'selected' : ''}>Fabel</option>
              <option value="Pendidikan" ${filterCategory === 'Pendidikan' ? 'selected' : ''}>Pendidikan</option>
              <option value="Moral" ${filterCategory === 'Moral' ? 'selected' : ''}>Moral</option>
              <option value="Petualangan" ${filterCategory === 'Petualangan' ? 'selected' : ''}>Petualangan</option>
            </select>

            <!-- Add Book Button -->
            <button class="btn btn-primary btn-sm" onclick="AdminBooksPage.openAddModal()">
              <i class="fas fa-plus"></i> Tambah Buku
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table" id="admin-books-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Judul Buku</th>
                <th>Penulis</th>
                <th>Kategori</th>
                <th>Bahasa</th>
                <th>Tanggal Upload</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length ? filtered.map(b => renderBookRow(b)).join('') : `
                <tr>
                  <td colspan="8" style="text-align: center; padding: 40px; color: var(--color-text-muted);">
                    Tidak ada buku yang sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;

    return AdminCommon.renderLayout({
      activeTab: 'books',
      title: 'Kelola Buku Cerita',
      bodyHtml
    });
  }

  function renderBookRow(b) {
    const formattedDate = new Date(b.created_at || Date.now()).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    return `
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
        <td>
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-dark-navy);">
            🇮🇩 ID ${b.title_en ? '| 🇬🇧 EN' : ''}
          </span>
        </td>
        <td>${formattedDate}</td>
        <td>
          <span class="badge ${b.status === 'published' ? 'badge-green' : 'badge-gray'}">
            ${b.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </td>
        <td>
          <div class="table-actions">
            <a href="#/books/${b.id}" target="_blank" class="btn-action btn-action-view" title="Lihat Detail (Buka)">
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
    `;
  }

  function getFilteredBooks() {
    let list = booksList;
    if (filterCategory !== 'Semua') {
      list = list.filter(b => b.category.toLowerCase() === filterCategory.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(b =>
        b.title_id.toLowerCase().includes(q) ||
        (b.title_en && b.title_en.toLowerCase().includes(q)) ||
        b.author.toLowerCase().includes(q)
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
    const tbody = document.querySelector('#admin-books-table tbody');
    if (tbody) {
      const filtered = getFilteredBooks();
      tbody.innerHTML = filtered.length ? filtered.map(b => renderBookRow(b)).join('') : `
        <tr>
          <td colspan="8" style="text-align: center; padding: 40px; color: var(--color-text-muted);">
            Tidak ada buku yang sesuai.
          </td>
        </tr>
      `;
    }
  }

  // Add Book Modal
  function openAddModal() {
    Modal.open({
      title: 'Tambah Buku Cerita Baru',
      contentHtml: renderBookForm(),
      footerHtml: `
        <button class="btn btn-secondary btn-sm" onclick="Modal.close()">Batal</button>
        <button class="btn btn-primary btn-sm" onclick="AdminBooksPage.submitBookForm(null)">Simpan Buku</button>
      `
    });
  }

  // Edit Book Modal
  function openEditModal(bookId) {
    const book = booksList.find(b => b.id === bookId);
    if (!book) return;

    Modal.open({
      title: `Edit Buku: ${book.title_id}`,
      contentHtml: renderBookForm(book),
      footerHtml: `
        <button class="btn btn-secondary btn-sm" onclick="Modal.close()">Batal</button>
        <button class="btn btn-primary btn-sm" onclick="AdminBooksPage.submitBookForm('${book.id}')">Simpan Perubahan</button>
      `
    });
  }

  function renderBookForm(book = null) {
    const b = book || {};
    const firstPage = b.pages && b.pages[0] ? b.pages[0] : {};

    return `
      <form id="admin-book-form" onsubmit="event.preventDefault()">
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Judul Buku (Bahasa Indonesia) *</label>
            <input type="text" id="form-title-id" class="form-input" required value="${b.title_id || ''}" placeholder="contoh: Malin Kundang">
          </div>

          <div class="form-group">
            <label class="form-label">Judul Buku (English)</label>
            <input type="text" id="form-title-en" class="form-input" value="${b.title_en || ''}" placeholder="contoh: Malin Kundang: The Legend">
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Penulis / Sumber *</label>
            <input type="text" id="form-author" class="form-input" required value="${b.author || ''}" placeholder="contoh: Cerita Rakyat Nusantara">
          </div>

          <div class="form-group">
            <label class="form-label">Asal Cerita</label>
            <input type="text" id="form-origin" class="form-input" value="${b.origin || 'Indonesia'}" placeholder="contoh: Sumatera Barat">
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Kategori *</label>
            <select id="form-category" class="form-input">
              <option value="Cerita Rakyat" ${b.category === 'Cerita Rakyat' ? 'selected' : ''}>Cerita Rakyat</option>
              <option value="Fabel" ${b.category === 'Fabel' ? 'selected' : ''}>Fabel</option>
              <option value="Pendidikan" ${b.category === 'Pendidikan' ? 'selected' : ''}>Pendidikan</option>
              <option value="Moral" ${b.category === 'Moral' ? 'selected' : ''}>Moral</option>
              <option value="Petualangan" ${b.category === 'Petualangan' ? 'selected' : ''}>Petualangan</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Usia Rekomendasi</label>
            <input type="text" id="form-age" class="form-input" value="${b.age_range || '4–7 Tahun'}" placeholder="contoh: 4–7 Tahun">
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Cover Buku (Pilih Ilustrasi)</label>
            <select id="form-cover-url" class="form-input">
              <option value="assets/covers/malin_kundang.svg" ${b.cover_url === 'assets/covers/malin_kundang.svg' ? 'selected' : ''}>Malin Kundang (Biru)</option>
              <option value="assets/covers/timun_mas.svg" ${b.cover_url === 'assets/covers/timun_mas.svg' ? 'selected' : ''}>Timun Mas (Emas/Hijau)</option>
              <option value="assets/covers/bawang_merah_putih.svg" ${b.cover_url === 'assets/covers/bawang_merah_putih.svg' ? 'selected' : ''}>Bawang Merah Putih (Pink)</option>
              <option value="assets/covers/kancil_buaya.svg" ${b.cover_url === 'assets/covers/kancil_buaya.svg' ? 'selected' : ''}>Kancil dan Buaya (Kuning)</option>
              <option value="assets/covers/sangkuriang.svg" ${b.cover_url === 'assets/covers/sangkuriang.svg' ? 'selected' : ''}>Sangkuriang (Ungu)</option>
              <option value="assets/covers/lutung_kasarung.svg" ${b.cover_url === 'assets/covers/lutung_kasarung.svg' ? 'selected' : ''}>Lutung Kasarung (Cyan)</option>
              <option value="assets/cover_kelinci.png" ${b.cover_url === 'assets/cover_kelinci.png' ? 'selected' : ''}>Petualangan Kelinci (Art PNG)</option>
              <option value="assets/cover_gajah.png" ${b.cover_url === 'assets/cover_gajah.png' ? 'selected' : ''}>Gajah Baik Hati (Art PNG)</option>
              <option value="assets/cover_burung.png" ${b.cover_url === 'assets/cover_burung.png' ? 'selected' : ''}>Burung Kecil (Art PNG)</option>
              <option value="assets/cover_berbagi.png" ${b.cover_url === 'assets/cover_berbagi.png' ? 'selected' : ''}>Aku Suka Berbagi (Art PNG)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Status Penerbitan</label>
            <select id="form-status" class="form-input">
              <option value="published" ${b.status === 'published' ? 'selected' : ''}>Published (Tampilkan ke Publik)</option>
              <option value="draft" ${b.status === 'draft' ? 'selected' : ''}>Draft (Arsip Internal)</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Sinopsis Indonesia *</label>
          <textarea id="form-desc-id" class="form-textarea" placeholder="Ringkasan cerita dalam Bahasa Indonesia...">${b.description_id || ''}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Sinopsis English</label>
          <textarea id="form-desc-en" class="form-textarea" placeholder="Story synopsis in English...">${b.description_en || ''}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Isi Cerita Bab 1 (Indonesia)</label>
          <textarea id="form-story-id" class="form-textarea" placeholder="Teks lengkap halaman cerita...">${firstPage.text_id || b.description_id || ''}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Isi Cerita Bab 1 (English)</label>
          <textarea id="form-story-en" class="form-textarea" placeholder="Full chapter text in English...">${firstPage.text_en || b.description_en || ''}</textarea>
        </div>
      </form>
    `;
  }

  async function submitBookForm(bookId) {
    const title_id = document.getElementById('form-title-id')?.value;
    const author = document.getElementById('form-author')?.value;

    if (!title_id || !author) {
      Toast.error('Judul buku dan penulis wajib diisi.');
      return;
    }

    const payload = {
      title_id,
      title_en: document.getElementById('form-title-en')?.value || title_id,
      author,
      origin: document.getElementById('form-origin')?.value || 'Indonesia',
      category: document.getElementById('form-category')?.value || 'Cerita Rakyat',
      age_range: document.getElementById('form-age')?.value || '4–7 Tahun',
      cover_url: document.getElementById('form-cover-url')?.value || 'assets/covers/malin_kundang.svg',
      status: document.getElementById('form-status')?.value || 'published',
      description_id: document.getElementById('form-desc-id')?.value || '',
      description_en: document.getElementById('form-desc-en')?.value || '',
      pages: [
        {
          page_number: 1,
          image_url: document.getElementById('form-cover-url')?.value || 'assets/covers/malin_kundang.svg',
          text_id: document.getElementById('form-story-id')?.value || document.getElementById('form-desc-id')?.value || '',
          text_en: document.getElementById('form-story-en')?.value || document.getElementById('form-desc-en')?.value || ''
        }
      ]
    };

    try {
      if (bookId) {
        await API.updateBook(bookId, payload);
        Toast.success('Buku cerita berhasil diperbarui!');
      } else {
        await API.createBook(payload);
        Toast.success('Buku cerita baru berhasil ditambahkan!');
      }

      Modal.close();
      // Reload admin books view
      window.location.hash = '#/admin/books';
      Router.route();
    } catch (err) {
      Toast.error(err.message || 'Gagal menyimpan buku.');
    }
  }

  // Delete Confirmation Modal
  function confirmDelete(bookId, bookTitle) {
    Modal.confirm({
      title: 'Hapus Buku?',
      message: `Apakah Anda yakin ingin menghapus buku <strong>"${bookTitle}"</strong>? Data yang telah dihapus tidak dapat dikembalikan.`,
      confirmText: 'Ya, Hapus',
      cancelText: 'Batal',
      isDanger: true,
      onConfirm: async () => {
        try {
          await API.deleteBook(bookId);
          Toast.success(`Buku "${bookTitle}" berhasil dihapus.`);
          booksList = booksList.filter(b => b.id !== bookId);
          updateTable();
        } catch (err) {
          Toast.error(err.message || 'Gagal menghapus buku.');
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
    submitBookForm,
    confirmDelete
  };
})();
