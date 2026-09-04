// Book Detail Page Component (/books/:id)
const BookDetailPage = (() => {
  let currentBook = null;
  let currentLang = 'id';

  async function render(bookId) {
    currentLang = window.appLanguage || 'id';

    try {
      currentBook = await API.getBookById(bookId);
    } catch (err) {
      return `
        <div>
          ${Navbar.render()}
          <div class="container" style="padding: 100px 0; text-align: center;">
            <h2>Buku Tidak Ditemukan</h2>
            <p style="color: var(--color-text-muted); margin-bottom: 24px;">Buku yang Anda cari mungkin telah dipindahkan atau dihapus.</p>
            <a href="#/home" class="btn btn-primary">Kembali ke Home</a>
          </div>
          ${Footer.render()}
        </div>
      `;
    }

    return renderContent();
  }

  function renderContent() {
    const b = currentBook;
    const isEn = currentLang === 'en';

    const title = isEn && b.title_en ? b.title_en : b.title_id;
    const synopsis = isEn && b.description_en ? b.description_en : b.description_id;

    const t = {
      id: {
        back: 'Kembali ke Katalog',
        author: 'Penulis / Karya',
        origin: 'Asal Cerita',
        category: 'Kategori',
        age: 'Usia Rekomendasi',
        readTime: 'Estimasi Baca',
        aboutStory: 'Tentang Cerita',
        startReading: 'Mulai Membaca',
        downloadPdf: 'Download PDF',
        pagesCount: 'Jumlah Halaman',
        status: 'Status Akses'
      },
      en: {
        back: 'Back to Catalog',
        author: 'Author / Origin',
        origin: 'Origin',
        category: 'Category',
        age: 'Recommended Age',
        readTime: 'Reading Time',
        aboutStory: 'About The Story',
        startReading: 'Start Reading',
        downloadPdf: 'Download PDF',
        pagesCount: 'Total Pages',
        status: 'Access Status'
      }
    }[currentLang];

    return `
      <div>
        ${Navbar.render()}

        <div class="container book-detail-wrapper">
          <!-- Back Link & Bilingual Selector Row -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px;">
            <a href="#/home#section-books" class="btn btn-secondary btn-sm">
              <i class="fas fa-arrow-left"></i> ${t.back}
            </a>

            <!-- Language Switcher in Book Detail -->
            <div class="lang-toggle" onclick="BookDetailPage.toggleLanguage()" title="Ganti Bahasa Cerita">
              <span class="lang-opt ${!isEn ? 'active' : ''}">🇮🇩 Indonesia</span>
              <span class="lang-opt ${isEn ? 'active' : ''}">🇬🇧 English</span>
            </div>
          </div>

          <div class="book-detail-grid">
            <!-- LEFT: Big Book Cover -->
            <div class="book-detail-cover-card">
              <img src="${b.cover_url}" alt="${title}" class="book-detail-cover-img" onerror="this.src='assets/cover_bintang.svg'">
            </div>

            <!-- RIGHT: Details, Synopsis & Action Buttons -->
            <div class="book-detail-content">
              <div class="book-detail-header-row">
                <span class="badge badge-primary" style="font-size: 0.85rem; padding: 6px 16px;">
                  ${b.category}
                </span>
                <span class="badge badge-yellow">
                  <i class="fas fa-shield-halved"></i> Edisi PGPAUD
                </span>
              </div>

              <h1 class="book-detail-title" id="book-title-display">${title}</h1>

              <!-- Metadata Specs Strip -->
              <div class="book-specs-strip">
                <div class="spec-item">
                  <span class="spec-label">${t.author}</span>
                  <span class="spec-val">${b.author}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">${t.origin}</span>
                  <span class="spec-val">${b.origin}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">${t.age}</span>
                  <span class="spec-val">${b.age_range}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">${t.readTime}</span>
                  <span class="spec-val">${b.read_time || '5 Menit'}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">${t.pagesCount}</span>
                  <span class="spec-val">${b.pages ? b.pages.length : 1} Halaman</span>
                </div>
              </div>

              <!-- About Story Section -->
              <div class="book-synopsis-box">
                <h3 class="synopsis-title">${t.aboutStory}</h3>
                <p class="synopsis-text" id="book-synopsis-display">${synopsis}</p>
              </div>

              <!-- Two Main Buttons -->
              <div class="book-action-buttons">
                <a href="#/reader/${b.id}" class="btn btn-primary" style="padding: 16px 36px; font-size: 1.05rem;">
                  <i class="fas fa-book-open"></i> ${t.startReading}
                </a>

                <button onclick="API.downloadBookPdf('${b.id}', '${currentLang}')" class="btn btn-secondary" style="padding: 16px 32px; font-size: 1.05rem; cursor: pointer; border: 1px solid var(--color-border); border-radius: 14px;">
                  <i class="fas fa-file-pdf" style="color: var(--color-danger);"></i> ${t.downloadPdf}
                </button>
              </div>
            </div>
          </div>
        </div>

        ${Footer.render()}
      </div>
    `;
  }

  function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    window.appLanguage = currentLang;

    // Update dynamically without full page reload
    const root = document.getElementById('app-root');
    if (root) {
      root.innerHTML = renderContent();
    }
  }

  return {
    render,
    toggleLanguage
  };
})();
