// PGPAUD Learning Modules Catalog Component (/modules)
const ModulesPage = (() => {
  let allModules = [];
  let selectedCategory = 'Semua';
  let searchQuery = '';

  const categories = [
    'Semua',
    'Bahasa & Literasi',
    'Kognitif',
    'Sosial Emosional',
    'Motorik',
    'Pengenalan Lingkungan',
    'Numerasi Dasar'
  ];

  async function render() {
    try {
      const data = await API.getModules();
      allModules = data.modules || [];
    } catch (err) {
      console.error('Failed to load modules:', err);
    }

    return `
      <div>
        ${Navbar.render()}

        <!-- Header Section -->
        <section class="section section-light-blue" style="padding: 60px 0;">
          <div class="container" style="text-align: center;">
            <div class="section-label"><i class="fas fa-shapes"></i> MODUL KURIKULUM PGPAUD</div>
            <h1 style="font-size: 2.8rem; margin-bottom: 12px; color: var(--color-dark-navy);">
              Modul Pembelajaran <span class="text-primary">Anak Usia Dini</span>
            </h1>
            <p style="color: var(--color-text-muted); font-size: 1.1rem; max-width: 620px; margin: 0 auto;">
              Panduan aktivitas stimulasi belajar anak usia 3 hingga 6 tahun yang mengintegrasikan literasi cerita, kreativitas, dan karakter budi pekerti.
            </p>
          </div>
        </section>

        <!-- Catalog Section -->
        <section class="section">
          <div class="container">
            <!-- Search & Filter Controls -->
            <div class="search-wrapper">
              <i class="fas fa-search search-icon-inside"></i>
              <input type="text" class="search-input" placeholder="Cari materi modul (contoh: warna, huruf, gerak)..." oninput="ModulesPage.handleSearch(event)" value="${searchQuery}">
            </div>

            <div class="filter-tabs">
              ${categories.map(cat => `
                <button class="filter-tab ${selectedCategory === cat ? 'active' : ''}" onclick="ModulesPage.filterCategory('${cat}')">
                  ${cat}
                </button>
              `).join('')}
            </div>

            <!-- Modules Grid -->
            <div class="grid-3" id="modules-catalog-grid">
              ${renderFilteredModules()}
            </div>
          </div>
        </section>

        ${Footer.render()}
      </div>
    `;
  }

  function renderFilteredModules() {
    let list = allModules;
    if (selectedCategory !== 'Semua') {
      list = list.filter(m => m.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    }

    if (list.length === 0) {
      return `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: white; border-radius: 20px; border: 1px dashed var(--color-border);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">📁</div>
          <h3 style="color: var(--color-dark-navy);">Tidak ada modul yang cocok</h3>
          <p style="color: var(--color-text-muted);">Coba gunakan filter lain atau telusuri semua modul pembelajaran.</p>
        </div>
      `;
    }

    return list.map(m => `
      <div class="module-card">
        <div class="module-header-meta">
          <span class="badge badge-primary">${m.category}</span>
          <span class="badge badge-yellow">Usia ${m.age_range}</span>
        </div>

        <div class="module-icon-box">
          <img src="${m.thumbnail}" alt="${m.title}" onerror="this.src='/assets/cover_bintang.svg'">
        </div>

        <h3 class="module-title">${m.title}</h3>
        <p class="module-desc">${m.description}</p>

        <div style="display: flex; gap: 10px; margin-top: auto;">
          <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="HomePage.openModuleDetail('${m.id}')">
            <i class="fas fa-eye"></i> Rincian
          </button>
          <a href="/api/modules/${m.id}/pdf" target="_blank" class="btn btn-primary btn-sm" style="flex: 1;">
            <i class="fas fa-file-pdf"></i> Unduh PDF
          </a>
        </div>
      </div>
    `).join('');
  }

  function filterCategory(cat) {
    selectedCategory = cat;
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      if (tab.innerText.trim() === cat) tab.classList.add('active');
      else tab.classList.remove('active');
    });
    const grid = document.getElementById('modules-catalog-grid');
    if (grid) grid.innerHTML = renderFilteredModules();
  }

  function handleSearch(e) {
    searchQuery = e.target.value;
    const grid = document.getElementById('modules-catalog-grid');
    if (grid) grid.innerHTML = renderFilteredModules();
  }

  return {
    render,
    filterCategory,
    handleSearch
  };
})();
