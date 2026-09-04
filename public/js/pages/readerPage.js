// Online Digital Story Reader Component (/reader/:bookId)
const ReaderPage = (() => {
  let currentBook = null;
  let currentPageIndex = 0;
  let currentLang = 'id';
  let fontScale = 'md'; // 'sm' | 'md' | 'lg'
  let isBookmarked = false;
  let isFullscreen = false;

  async function render(bookId) {
    currentLang = window.appLanguage || 'id';

    try {
      currentBook = await API.getBookById(bookId);

      // Fetch saved progress if logged in
      if (Auth.isLoggedIn()) {
        try {
          const prog = await API.getProgress(bookId);
          if (prog && prog.current_page) {
            currentPageIndex = Math.max(0, prog.current_page - 1);
          }
        } catch {}
      } else {
        currentPageIndex = 0;
      }
    } catch (err) {
      return `
        <div class="reader-container">
          <div style="padding: 100px 20px; text-align: center;">
            <h2>Buku Tidak Dapat Dimuat</h2>
            <p style="color: var(--color-text-muted); margin: 16px 0 24px;">Gagal memuat data pembacaan buku.</p>
            <a href="#/home" class="btn btn-primary">Kembali ke Home</a>
          </div>
        </div>
      `;
    }

    return renderReaderView();
  }

  function renderReaderView() {
    const b = currentBook;
    const isEn = currentLang === 'en';
    const pages = b.pages || [];
    const totalPages = Math.max(pages.length, 1);
    const currentPage = pages[currentPageIndex] || {
      page_number: 1,
      image_url: b.cover_url,
      text_id: b.description_id,
      text_en: b.description_en
    };

    const bookTitle = isEn && b.title_en ? b.title_en : b.title_id;
    const pageText = isEn && currentPage.text_en ? currentPage.text_en : currentPage.text_id;
    const progressPct = Math.round(((currentPageIndex + 1) / totalPages) * 100);

    const t = {
      id: {
        back: 'Kembali',
        prev: 'Halaman Sebelumnya',
        next: 'Halaman Selanjutnya',
        page: 'Halaman',
        of: 'dari',
        finished: 'Selesai Membaca!',
        readAgain: 'Baca Lagi Dari Awal'
      },
      en: {
        back: 'Back',
        prev: 'Previous Page',
        next: 'Next Page',
        page: 'Page',
        of: 'of',
        finished: 'Story Completed!',
        readAgain: 'Read Again'
      }
    }[currentLang];

    return `
      <div class="reader-container font-scale-${fontScale} ${isFullscreen ? 'fullscreen-active' : ''}" id="reader-root">
        <!-- TOPBAR -->
        <header class="reader-topbar">
          <a href="#/books/${b.id}" class="reader-back-btn">
            <i class="fas fa-arrow-left"></i> <span>${t.back}</span>
          </a>

          <h2 class="reader-book-title">${bookTitle}</h2>

          <div class="reader-controls-cluster">
            <!-- Language Switcher -->
            <div class="lang-toggle" onclick="ReaderPage.toggleLanguage()" title="Ganti Bahasa / Switch Language">
              <span class="lang-opt ${!isEn ? 'active' : ''}">🇮🇩 ID</span>
              <span class="lang-opt ${isEn ? 'active' : ''}">🇬🇧 EN</span>
            </div>

            <!-- Font Size Adjuster -->
            <button class="reader-tool-btn" onclick="ReaderPage.cycleFontSize()" title="Ubah Ukuran Tulisan">
              <span style="font-weight: 800; font-size: 0.85rem;">A${fontScale === 'sm' ? '-' : fontScale === 'lg' ? '+' : ''}</span>
            </button>

            <!-- Bookmark Button -->
            <button class="reader-tool-btn ${isBookmarked ? 'bookmarked' : ''}" onclick="ReaderPage.toggleBookmark()" title="Tandai Halaman">
              <i class="fas fa-bookmark"></i>
            </button>

            <!-- Fullscreen Toggle -->
            <button class="reader-tool-btn" onclick="ReaderPage.toggleFullscreen()" title="Layar Penuh">
              <i class="fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}"></i>
            </button>
          </div>
        </header>

        <!-- CANVAS: STORYBOOK SPREAD -->
        <main class="reader-stage">
          <div class="storybook-book page-flip-enter" id="storybook-canvas">
            <!-- Left Side: Story Illustration -->
            <div class="storybook-art-side">
              <img src="${currentPage.image_url || b.cover_url}" alt="${bookTitle} Halaman ${currentPageIndex + 1}" class="storybook-art-img" onerror="this.src='${b.cover_url}'">
            </div>

            <!-- Right Side: Story Text -->
            <div class="storybook-text-side">
              <span class="storybook-page-badge">
                <i class="fas fa-feather-pointed"></i> ${t.page} ${currentPageIndex + 1} ${t.of} ${totalPages}
              </span>

              <div class="storybook-body-text">
                <p>${pageText}</p>
              </div>

              <!-- Quick Next / Finish prompt if last page -->
              ${currentPageIndex === totalPages - 1 ? `
                <div style="background: var(--color-accent-yellow-soft); padding: 12px 18px; border-radius: 14px; border: 1px dashed #D97706; display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-weight: 800; color: #B45309;">✨ ${t.finished}</span>
                  <button class="btn btn-primary btn-sm" onclick="ReaderPage.goToPage(0)">${t.readAgain}</button>
                </div>
              ` : ''}
            </div>
          </div>
        </main>

        <!-- BOTTOMBAR: PROGRESS & PAGE NAVIGATION -->
        <footer class="reader-bottombar">
          <div class="reader-nav-controls">
            <!-- Prev Button -->
            <button class="btn btn-secondary btn-sm" onclick="ReaderPage.prevPage()" ${currentPageIndex === 0 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}>
              <i class="fas fa-chevron-left"></i> ${t.prev}
            </button>

            <!-- Center Progress Tracker -->
            <div class="reader-progress-tracker">
              <span class="reader-page-indicator">
                ${currentPageIndex + 1} / ${totalPages} (${progressPct}%)
              </span>
              <div class="reader-progress-bar-bg">
                <div class="reader-progress-bar-fill" style="width: ${progressPct}%;"></div>
              </div>
            </div>

            <!-- Next Button -->
            <button class="btn btn-primary btn-sm" onclick="ReaderPage.nextPage()" ${currentPageIndex >= totalPages - 1 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}>
              ${t.next} <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </footer>
      </div>
    `;
  }

  function updateView() {
    const root = document.getElementById('app-root');
    if (root) {
      root.innerHTML = renderReaderView();
    }
  }

  function nextPage() {
    const totalPages = currentBook.pages ? currentBook.pages.length : 1;
    if (currentPageIndex < totalPages - 1) {
      currentPageIndex++;
      saveProgress();
      updateView();
    }
  }

  function prevPage() {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      saveProgress();
      updateView();
    }
  }

  function goToPage(idx) {
    currentPageIndex = idx;
    saveProgress();
    updateView();
  }

  function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    window.appLanguage = currentLang;
    updateView();
  }

  function cycleFontSize() {
    if (fontScale === 'sm') fontScale = 'md';
    else if (fontScale === 'md') fontScale = 'lg';
    else fontScale = 'sm';
    updateView();
  }

  function toggleBookmark() {
    isBookmarked = !isBookmarked;
    Toast.info(isBookmarked ? `Halaman ${currentPageIndex + 1} ditandai.` : 'Tanda halaman dihapus.');
    updateView();
  }

  function toggleFullscreen() {
    isFullscreen = !isFullscreen;
    if (isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
    updateView();
  }

  function saveProgress() {
    if (Auth.isLoggedIn() && currentBook) {
      API.saveProgress(currentBook.id, {
        page: currentPageIndex + 1,
        language: currentLang
      }).catch(err => console.error('Failed to save progress:', err));
    }
  }

  // Keyboard navigation arrow keys
  window.addEventListener('keydown', (e) => {
    if (window.location.hash.startsWith('#/reader/')) {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    }
  });

  return {
    render,
    nextPage,
    prevPage,
    goToPage,
    toggleLanguage,
    cycleFontSize,
    toggleBookmark,
    toggleFullscreen
  };
})();
