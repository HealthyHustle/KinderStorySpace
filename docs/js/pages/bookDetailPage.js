// Book Detail Page Component (/books/:id)
const BookDetailPage = (() => {
  let currentBook = null;
  let currentLang = 'id';

  async function render(bookId) {
    currentLang = window.appLanguage || 'id';
    const cleanId = (bookId || '').split('?')[0];

    try {
      currentBook = await API.getBookById(cleanId);
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
        status: 'Status Akses',
        slidesTitle: 'DAFTAR SLIDE BUKU CERITA',
        slidesSubtitle: 'Jelajahi dan buka langsung halaman/slide cerita interaktif:',
        openSlide: 'Buka Slide',
        startFromSlide1: 'Mulai Dari Slide 1'
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
        status: 'Access Status',
        slidesTitle: 'STORYBOOK SLIDES LIST',
        slidesSubtitle: 'Explore and open interactive story slides directly:',
        openSlide: 'Open Slide',
        startFromSlide1: 'Start From Slide 1'
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
                <a href="#/reader/${b.id}?page=1" class="btn btn-primary" style="padding: 16px 36px; font-size: 1.05rem;">
                  <i class="fas fa-book-open"></i> ${t.startReading}
                </a>

                <button onclick="API.downloadBookPdf('${b.id}', '${currentLang}')" class="btn btn-secondary" style="padding: 16px 32px; font-size: 1.05rem; cursor: pointer; border: 1px solid var(--color-border); border-radius: 14px;">
                  <i class="fas fa-file-pdf" style="color: var(--color-danger);"></i> ${t.downloadPdf}
                </button>
              </div>
            </div>
          </div>

          <!-- DAFTAR SLIDE BUKU CERITA (LENGKAP SEMUA SCENE) -->
          <div class="book-slides-section" style="margin-top: 48px; padding-top: 36px; border-top: 2px dashed var(--color-border, #CBD5E1);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
              <div>
                <span class="badge badge-primary" style="font-size: 0.8rem; margin-bottom: 6px;">
                  <i class="fas fa-layer-group"></i> ${t.slidesTitle}
                </span>
                <h2 style="font-size: 1.75rem; color: var(--color-dark-navy, #0B2447); margin: 0; font-weight: 800;">
                  Isi Cerita Tiap Slide (${(b.pages || []).length} Slide)
                </h2>
                <p style="color: var(--color-text-muted, #64748B); margin: 4px 0 0; font-size: 0.95rem;">
                  ${t.slidesSubtitle}
                </p>
              </div>
              <a href="#/reader/${b.id}?page=1" class="btn btn-primary btn-sm" style="padding: 10px 22px;">
                <i class="fas fa-book-open"></i> ${t.startFromSlide1}
              </a>
            </div>

            <div class="slides-preview-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 22px;">
              ${(b.pages || []).map((p, idx) => `
                <div class="slide-preview-card" style="background: white; border: 1.5px solid var(--color-border, #E2E8F0); border-radius: 20px; overflow: hidden; box-shadow: 0 4px 16px rgba(11,36,71,0.06); display: flex; flex-direction: column; transition: all 0.25s ease;" onmouseover="this.style.transform='translateY(-4px)'; this.style.borderColor='var(--color-primary, #1687F8)';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='#E2E8F0';">
                  <div style="height: 180px; background: #EEF7FF; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                    <img src="${p.image_url || b.cover_url}" alt="Slide ${idx + 1}" style="width: 100%; height: 100%; object-fit: contain; padding: 10px;">
                    <span style="position: absolute; top: 12px; left: 12px; background: rgba(11, 36, 71, 0.88); color: white; padding: 4px 12px; border-radius: 9999px; font-size: 0.78rem; font-weight: 800;">
                      Slide ${idx + 1}
                    </span>
                  </div>
                  <div style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between;">
                    <div>
                      <h4 style="font-size: 1.12rem; font-weight: 800; color: var(--color-dark-navy, #0B2447); margin-bottom: 8px;">
                        ${isEn && p.title_en ? p.title_en : (p.title_id || `Halaman ${idx + 1}`)}
                      </h4>
                      <p style="font-size: 0.95rem; color: #334155; line-height: 1.6; margin: 0;">
                        ${isEn && p.text_en ? p.text_en : p.text_id}
                      </p>
                    </div>
                    <a href="#/reader/${b.id}?page=${idx + 1}" class="btn btn-secondary btn-sm" style="margin-top: 18px; text-align: center; justify-content: center; width: 100%;">
                      <i class="fas fa-play"></i> ${t.openSlide} ${idx + 1}
                    </a>
                  </div>
                </div>
              `).join('')}
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
