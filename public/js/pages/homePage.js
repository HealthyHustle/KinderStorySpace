// Home Page Component (Slide 2 - Home / Story Library)
const HomePage = (() => {
  let allBooks = [];
  let allModules = [];
  let activeCategory = 'Semua';
  let searchQuery = '';

  async function render() {
    const lang = window.appLanguage || 'id';

    try {
      const [booksData, modulesData] = await Promise.all([
        API.getBooks(),
        API.getModules()
      ]);
      allBooks = booksData.books || [];
      allModules = modulesData.modules || [];
    } catch (err) {
      console.error('Failed to load home data:', err);
    }

    const t = {
      id: {
        heroBadge: 'DIGITAL STORY & LEARNING SPACE',
        heroTitle1: 'Cerita Kecil,',
        heroTitle2: 'Imajinasi Besar.',
        heroAccent: 'Penuh Nilai Moral & Budi Pekerti ✨',
        heroDesc: 'Temukan berbagai cerita anak dan modul pembelajaran PGPAUD dalam satu ruang digital yang menyenangkan.',
        startReading: 'Mulai Membaca',
        exploreBooks: 'Jelajahi Buku',
        statCard1Num: '50+',
        statCard1Txt: 'Cerita Anak',
        statCard2Txt: 'Belajar Sambil Bercerita ✨',
        selectedTitle: 'Pilihan Cerita Untukmu',
        selectedSubtitle: 'Koleksi mahakarya cerita rakyat nusantara & fabel karakter pilihan editor PGPAUD.',
        popularTitle: 'Cerita Populer Minggu Ini',
        popularSubtitle: 'Temukan petualangan favorit si kecil dengan filter kategori tematik.',
        searchPlaceholder: 'Cari cerita favoritmu (judul, penulis, atau kata kunci)...',
        readNow: 'Baca Sekarang',
        modulesTitle: 'Modul Pembelajaran PGPAUD',
        modulesSubtitle: 'Materi stimulasi 8 dimensi perkembangan holistik integratif anak usia dini.',
        openModule: 'Buka Modul',
        viewAllModules: 'Lihat Seluruh Modul PGPAUD',
        benefitsTitle: 'Belajar Lebih Menyenangkan Lewat Cerita.',
        benefitsSubtitle: 'Dirancang khusus untuk mendukung tumbuh kembang anak dan inspirasi pengajaran guru PAUD.',
        benefit1Title: 'Banyak Cerita',
        benefit1Desc: 'Koleksi cerita edukatif dan menarik untuk anak dengan nilai kearifan lokal.',
        benefit2Title: 'Dua Bahasa',
        benefit2Badge: 'Fitur Unggulan',
        benefit2Desc: 'Baca cerita dalam Bahasa Indonesia maupun English tanpa perlu reload halaman.',
        benefit3Title: 'Modul PGPAUD',
        benefit3Desc: 'Materi pembelajaran terstruktur yang mendukung aktivitas pendidikan anak usia dini.'
      },
      en: {
        heroBadge: 'DIGITAL STORY & LEARNING SPACE',
        heroTitle1: 'Little Stories,',
        heroTitle2: 'Big Imagination.',
        heroAccent: 'Filled with Moral Values & Kindness ✨',
        heroDesc: 'Discover a rich collection of children stories and early childhood learning modules in one delightful digital room.',
        startReading: 'Start Reading',
        exploreBooks: 'Explore Books',
        statCard1Num: '50+',
        statCard1Txt: 'Children Stories',
        statCard2Txt: 'Learning with Stories ✨',
        selectedTitle: 'Curated Stories For You',
        selectedSubtitle: 'Handpicked Indonesian folklore classics and character fables by PGPAUD educators.',
        popularTitle: 'Popular Stories This Week',
        popularSubtitle: 'Find your child’s favorite tale with thematic category filters.',
        searchPlaceholder: 'Search your favorite stories (title, author, or keyword)...',
        readNow: 'Read Now',
        modulesTitle: 'PGPAUD Learning Modules',
        modulesSubtitle: 'Developmental stimulation guides across 8 holistic early childhood dimensions.',
        openModule: 'Open Module',
        viewAllModules: 'View All Learning Modules',
        benefitsTitle: 'More Joyful Learning Through Stories.',
        benefitsSubtitle: 'Thoughtfully designed to nurture imagination, language, and early education.',
        benefit1Title: 'Abundant Stories',
        benefit1Desc: 'Inspiring and educational stories tailored for young minds with cultural richness.',
        benefit2Title: 'Bilingual Support',
        benefit2Badge: 'Most Popular',
        benefit2Desc: 'Read seamlessly in Bahasa Indonesia or English with instant live toggling.',
        benefit3Title: 'PGPAUD Modules',
        benefit3Desc: 'Structured early childhood teaching guidelines supporting everyday classroom activities.'
      }
    }[lang];

    return `
      <div class="home-page-view">
        ${Navbar.render()}

        <!-- ============================================== -->
        <!-- 1. HERO SECTION                                -->
        <!-- ============================================== -->
        <section class="section section-light-blue" style="padding-top: 60px; padding-bottom: 80px; overflow: hidden;">
          <div class="container">
            <div class="grid-2" style="align-items: center; gap: 48px;">
              <!-- LEFT: Typography & CTA Buttons -->
              <div>
                <div class="section-label">
                  <i class="fas fa-sparkles"></i> ${t.heroBadge}
                </div>

                <h1 style="font-size: 3.5rem; line-height: 1.15; margin-bottom: 12px; color: var(--color-dark-navy);">
                  ${t.heroTitle1}<br>
                  <span class="text-primary hand-underline">${t.heroTitle2}</span>
                </h1>

                <!-- Handwritten Accent -->
                <div class="font-handwritten" style="font-size: 1.65rem; color: #D97706; font-weight: 700; margin-bottom: 18px; transform: rotate(-1.5deg);">
                  ${t.heroAccent}
                </div>

                <p style="font-size: 1.15rem; color: var(--color-text-muted); line-height: 1.7; max-width: 500px; margin-bottom: 32px;">
                  ${t.heroDesc}
                </p>

                <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                  <button class="btn btn-primary" onclick="HomePage.scrollToSection('section-selected')">
                    <i class="fas fa-book-open-reader"></i> ${t.startReading}
                  </button>
                  <button class="btn btn-secondary" onclick="HomePage.scrollToSection('section-books')">
                    <i class="fas fa-compass"></i> ${t.exploreBooks}
                  </button>
                </div>
              </div>

              <!-- RIGHT: Child Reading Illustration + Organic Blob + Floating Cards -->
              <div style="position: relative; display: flex; justify-content: center; align-items: center; min-height: 420px;">
                <!-- Organic Shapes -->
                <div class="organic-shape-yellow" style="width: 440px; height: 380px; top: 20px;"></div>
                <div class="organic-shape-blue" style="width: 460px; height: 400px; top: 10px;"></div>

                <!-- Doodles -->
                <div class="doodle doodle-sparkle" style="top: 0; right: 10%; font-size: 2rem;">✨</div>
                <div class="doodle doodle-star" style="top: 15%; left: 5%; font-size: 1.8rem; color: #1687F8;">⭐</div>
                <div class="doodle doodle-cloud" style="bottom: 12%; left: 2%; font-size: 2.4rem;">☁️</div>

                <!-- Child Reading Book Illustration -->
                <img src="/assets/logo_kinder_story_space.jpeg" alt="Kinder Story Space" style="position: relative; z-index: 3; max-width: 380px; max-height: 380px; object-fit: cover; border-radius: 36px; box-shadow: 0 20px 48px rgba(11, 36, 71, 0.16); border: 5px solid #FFFFFF;">

                <!-- Floating Card 1: 50+ Cerita Anak -->
                <div class="floating-card" style="bottom: 24px; left: 10px; z-index: 5;">
                  <div style="width: 46px; height: 46px; border-radius: 12px; background: var(--color-primary-soft); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
                    📚
                  </div>
                  <div>
                    <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-dark-navy); line-height: 1;">${t.statCard1Num}</div>
                    <div style="font-size: 0.82rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">${t.statCard1Txt}</div>
                  </div>
                </div>

                <!-- Floating Card 2: Belajar Sambil Bercerita ✨ -->
                <div class="floating-card" style="top: 28px; right: 0; z-index: 5; animation-delay: -2s;">
                  <div style="width: 42px; height: 42px; border-radius: 12px; background: var(--color-accent-yellow-soft); color: #B45309; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
                    💡
                  </div>
                  <div style="font-weight: 800; font-size: 0.88rem; color: var(--color-dark-navy); line-height: 1.25;">
                    ${t.statCard2Txt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================== -->
        <!-- 2. SECTION — BUKU CERITA PILIHAN (SELECTED)    -->
        <!-- ============================================== -->
        <section id="section-selected" class="section">
          <div class="container">
            <div class="section-header">
              <div class="section-label"><i class="fas fa-crown"></i> SELECTED STORIES</div>
              <h2 class="section-title">${t.selectedTitle}</h2>
              <p class="section-subtitle">${t.selectedSubtitle}</p>
            </div>

            <!-- Horizontal Carousel -->
            <div class="carousel-container">
              <button class="carousel-nav-btn carousel-prev" onclick="HomePage.scrollCarousel('selected-carousel', -320)" aria-label="Sebelumnya">
                <i class="fas fa-chevron-left"></i>
              </button>

              <div class="carousel-track" id="selected-carousel">
                ${allBooks.slice(0, 8).map(book => renderBookCard(book, lang, t.readNow)).join('')}
              </div>

              <button class="carousel-nav-btn carousel-next" onclick="HomePage.scrollCarousel('selected-carousel', 320)" aria-label="Berikutnya">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>

        <!-- ============================================== -->
        <!-- 3. SECTION — CERITA POPULER & SEARCH (CATALOG) -->
        <!-- ============================================== -->
        <section id="section-books" class="section section-soft-gray">
          <div class="container">
            <div class="section-header">
              <div class="section-label"><i class="fas fa-fire"></i> EXPLORE CATALOG</div>
              <h2 class="section-title">${t.popularTitle}</h2>
              <p class="section-subtitle">${t.popularSubtitle}</p>
            </div>

            <!-- Search Input -->
            <div class="search-wrapper">
              <i class="fas fa-search search-icon-inside"></i>
              <input type="text" id="home-search-input" class="search-input" placeholder="${t.searchPlaceholder}" oninput="HomePage.handleSearch(event)" value="${searchQuery}">
            </div>

            <!-- Filter Categories -->
            <div class="filter-tabs">
              ${['Semua', 'Cerita Rakyat', 'Fabel', 'Pendidikan', 'Moral', 'Petualangan'].map(cat => `
                <button class="filter-tab ${activeCategory === cat ? 'active' : ''}" onclick="HomePage.filterCategory('${cat}')">
                  ${cat}
                </button>
              `).join('')}
            </div>

            <!-- Books Grid -->
            <div class="grid-4" id="books-grid">
              ${renderFilteredBooks(lang, t.readNow)}
            </div>
          </div>
        </section>

        <!-- ============================================== -->
        <!-- 4. SECTION — MODUL PEMBELAJARAN PGPAUD         -->
        <!-- ============================================== -->
        <section id="section-modules" class="section">
          <div class="container">
            <div class="section-header">
              <div class="section-label"><i class="fas fa-shapes"></i> PGPAUD CURRICULUM</div>
              <h2 class="section-title">${t.modulesTitle}</h2>
              <p class="section-subtitle">${t.modulesSubtitle}</p>
            </div>

            <div class="grid-3">
              ${allModules.slice(0, 6).map(mod => renderModuleCard(mod, t.openModule)).join('')}
            </div>

            <div style="text-align: center; margin-top: 48px;">
              <a href="#/modules" class="btn btn-secondary" style="padding: 14px 36px;">
                <i class="fas fa-graduation-cap"></i> ${t.viewAllModules}
              </a>
            </div>
          </div>
        </section>

        <!-- ============================================== -->
        <!-- 5. SECTION — MANFAAT (BENEFITS & SERVICES)     -->
        <!-- ============================================== -->
        <section id="section-benefits" class="section section-light-blue">
          <div class="container">
            <div class="section-header">
              <div class="section-label"><i class="fas fa-heart"></i> WHY KINDER STORY SPACE</div>
              <h2 class="section-title">${t.benefitsTitle}</h2>
              <p class="section-subtitle">${t.benefitsSubtitle}</p>
            </div>

            <div class="grid-3">
              <!-- CARD 1: Banyak Cerita -->
              <div class="benefit-card">
                <div class="benefit-icon">📖</div>
                <h3 class="benefit-title">${t.benefit1Title}</h3>
                <p class="benefit-text">${t.benefit1Desc}</p>
              </div>

              <!-- CARD 2: Dua Bahasa (Featured with Yellow Top Accent) -->
              <div class="benefit-card featured-card">
                <div class="featured-top-accent"></div>
                <div class="featured-badge-pill">★ ${t.benefit2Badge}</div>
                <div class="benefit-icon">🌎</div>
                <h3 class="benefit-title">${t.benefit2Title}</h3>
                <p class="benefit-text">${t.benefit2Desc}</p>
              </div>

              <!-- CARD 3: Modul PGPAUD -->
              <div class="benefit-card">
                <div class="benefit-icon">🎓</div>
                <h3 class="benefit-title">${t.benefit3Title}</h3>
                <p class="benefit-text">${t.benefit3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        ${Footer.render()}
      </div>
    `;
  }

  function renderBookCard(book, lang, readNowLabel) {
    const title = lang === 'en' && book.title_en ? book.title_en : book.title_id;
    const synopsis = lang === 'en' && book.description_en ? book.description_en : book.description_id;

    return `
      <div class="carousel-card-item">
        <div class="book-card" onclick="window.location.hash='#/books/${book.id}'">
          <div class="book-cover-wrapper">
            <img src="${book.cover_url}" alt="${title}" class="book-cover-img" onerror="this.src='/assets/cover_bintang.svg'">
            <span class="book-badge">${book.category}</span>
          </div>
          <div class="book-card-body">
            <div class="book-meta">
              <span><i class="fas fa-user-circle"></i> ${book.author}</span>
              <span><i class="fas fa-clock"></i> ${book.read_time || '5 Menit'}</span>
            </div>
            <h3 class="book-title">${title}</h3>
            <p class="book-synopsis">${synopsis}</p>
            <div class="book-card-footer">
              <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">${readNowLabel}</span>
              <div class="book-btn-arrow"><i class="fas fa-arrow-right"></i></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderFilteredBooks(lang, readNowLabel) {
    let list = allBooks;
    if (activeCategory !== 'Semua') {
      list = list.filter(b => b.category.toLowerCase() === activeCategory.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(b =>
        b.title_id.toLowerCase().includes(q) ||
        (b.title_en && b.title_en.toLowerCase().includes(q)) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    }

    if (list.length === 0) {
      return `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: white; border-radius: 20px; border: 1px dashed var(--color-border);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
          <h3 style="color: var(--color-dark-navy);">Cerita tidak ditemukan</h3>
          <p style="color: var(--color-text-muted);">Coba gunakan kata kunci lain atau pilih kategori Semua.</p>
        </div>
      `;
    }

    return list.map(b => `
      <div class="book-card" onclick="window.location.hash='#/books/${b.id}'">
        <div class="book-cover-wrapper">
          <img src="${b.cover_url}" alt="${lang === 'en' ? b.title_en : b.title_id}" class="book-cover-img" onerror="this.src='/assets/cover_bintang.svg'">
          <span class="book-badge">${b.category}</span>
        </div>
        <div class="book-card-body">
          <div class="book-meta">
            <span><i class="fas fa-child"></i> ${b.age_range}</span>
            <span><i class="fas fa-clock"></i> ${b.read_time}</span>
          </div>
          <h3 class="book-title">${lang === 'en' && b.title_en ? b.title_en : b.title_id}</h3>
          <p class="book-synopsis">${lang === 'en' && b.description_en ? b.description_en : b.description_id}</p>
          <div class="book-card-footer">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">${readNowLabel}</span>
            <div class="book-btn-arrow"><i class="fas fa-arrow-right"></i></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderModuleCard(mod, openLabel) {
    return `
      <div class="module-card">
        <div class="module-header-meta">
          <span class="badge badge-primary">${mod.category}</span>
          <span class="badge badge-yellow">Usia ${mod.age_range}</span>
        </div>
        <div class="module-icon-box">
          <img src="${mod.thumbnail}" alt="${mod.title}" onerror="this.src='/assets/cover_bintang.svg'">
        </div>
        <h3 class="module-title">${mod.title}</h3>
        <p class="module-desc">${mod.description}</p>
        <button class="btn btn-secondary btn-sm" onclick="HomePage.openModuleDetail('${mod.id}')">
          <i class="fas fa-folder-open"></i> ${openLabel}
        </button>
      </div>
    `;
  }

  function scrollCarousel(id, offset) {
    const el = document.getElementById(id);
    if (el) el.scrollBy({ left: offset, behavior: 'smooth' });
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function filterCategory(cat) {
    activeCategory = cat;
    // Re-render only books grid & active tab
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      if (tab.innerText.trim() === cat) tab.classList.add('active');
      else tab.classList.remove('active');
    });
    const grid = document.getElementById('books-grid');
    if (grid) {
      grid.innerHTML = renderFilteredBooks(window.appLanguage || 'id', window.appLanguage === 'en' ? 'Read Now' : 'Baca Sekarang');
    }
  }

  function handleSearch(e) {
    searchQuery = e.target.value;
    const grid = document.getElementById('books-grid');
    if (grid) {
      grid.innerHTML = renderFilteredBooks(window.appLanguage || 'id', window.appLanguage === 'en' ? 'Read Now' : 'Baca Sekarang');
    }
  }

  async function openModuleDetail(id) {
    try {
      const mod = await API.getModuleById(id);
      Modal.open({
        title: mod.title,
        contentHtml: `
          <div style="display: flex; gap: 20px; align-items: start; margin-bottom: 20px;">
            <div style="width: 100px; height: 100px; border-radius: 16px; overflow: hidden; flex-shrink: 0; background: var(--color-bg-light);">
              <img src="${mod.thumbnail}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div>
              <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                <span class="badge badge-primary">${mod.category}</span>
                <span class="badge badge-yellow">Usia ${mod.age_range}</span>
              </div>
              <p style="color: var(--color-text-body); line-height: 1.6;">${mod.description}</p>
            </div>
          </div>

          <h4 style="color: var(--color-dark-navy); margin-bottom: 10px; font-size: 1.05rem;">Tujuan Stimulasi Anak:</h4>
          <ul style="padding-left: 20px; margin-bottom: 20px; line-height: 1.6; color: var(--color-text-body);">
            ${(mod.objectives || []).map(o => `<li>${o}</li>`).join('')}
          </ul>
        `,
        footerHtml: `
          <button class="btn btn-secondary btn-sm" onclick="Modal.close()">Tutup</button>
          <a href="/api/modules/${mod.id}/pdf" target="_blank" class="btn btn-primary btn-sm">
            <i class="fas fa-file-pdf"></i> Unduh Modul PDF
          </a>
        `
      });
    } catch (err) {
      Toast.error('Gagal memuat rincian modul.');
    }
  }

  return {
    render,
    scrollCarousel,
    scrollToSection,
    filterCategory,
    handleSearch,
    openModuleDetail
  };
})();
