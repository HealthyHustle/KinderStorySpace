// Footer Component
const Footer = (() => {
  function render() {
    const currentLang = window.appLanguage || 'id';

    const t = {
      id: {
        tagline: 'Ruang kecil untuk cerita, belajar, dan imajinasi besar.',
        explore: 'EXPLORE',
        home: 'Home',
        books: 'Buku Cerita',
        modules: 'Modul PGPAUD',
        about: 'Tentang Kami',
        resources: 'RESOURCES',
        faq: 'Tanya Jawab (FAQ)',
        guide: 'Panduan Guru & Ortu',
        contact: 'Kontak & Dukungan',
        followUs: 'FOLLOW US',
        affiliation: 'Universitas Pendidikan Indonesia – Kampus Cibiru.',
        rights: 'Hak Cipta Dilindungi.'
      },
      en: {
        tagline: 'A gentle space for stories, joyful learning, and great imagination.',
        explore: 'EXPLORE',
        home: 'Home',
        books: 'Story Books',
        modules: 'PGPAUD Modules',
        about: 'About Us',
        resources: 'RESOURCES',
        faq: 'FAQ',
        guide: 'Educator & Parent Guide',
        contact: 'Contact & Support',
        followUs: 'FOLLOW US',
        affiliation: 'Universitas Pendidikan Indonesia – Kampus Cibiru.',
        rights: 'All Rights Reserved.'
      }
    }[currentLang];

    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <!-- Brand Column -->
            <div>
              <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
                <img src="/assets/logo_kinder_story_space.jpeg" alt="Kinder Story Space Logo" style="width: 46px; height: 46px; border-radius: 14px; object-fit: cover; box-shadow: 0 4px 14px rgba(0,0,0,0.2);">
                <div class="footer-brand-title" style="margin-bottom: 0;">Kinder <span>Story</span> Space</div>
              </div>
              <p class="footer-tagline">${t.tagline}</p>
              <div class="footer-social-row">
                <a href="https://instagram.com" target="_blank" class="footer-social-btn" aria-label="Instagram">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="https://youtube.com" target="_blank" class="footer-social-btn" aria-label="YouTube">
                  <i class="fab fa-youtube"></i>
                </a>
                <a href="mailto:info@kinderstoryspace.com" class="footer-social-btn" aria-label="Email">
                  <i class="fas fa-envelope"></i>
                </a>
              </div>
            </div>

            <!-- Explore Links -->
            <div>
              <div class="footer-col-title">${t.explore}</div>
              <ul class="footer-links">
                <li><a href="#/home" class="footer-link">${t.home}</a></li>
                <li><a href="#/home#section-books" class="footer-link">${t.books}</a></li>
                <li><a href="#/modules" class="footer-link">${t.modules}</a></li>
                <li><a href="#/home#section-benefits" class="footer-link">${t.about}</a></li>
              </ul>
            </div>

            <!-- Resources Links -->
            <div>
              <div class="footer-col-title">${t.resources}</div>
              <ul class="footer-links">
                <li><a href="javascript:void(0)" onclick="Footer.showFaqModal()" class="footer-link">${t.faq}</a></li>
                <li><a href="javascript:void(0)" onclick="Footer.showGuideModal()" class="footer-link">${t.guide}</a></li>
                <li><a href="javascript:void(0)" onclick="Footer.showContactModal()" class="footer-link">${t.contact}</a></li>
              </ul>
            </div>

            <!-- Follow Us & Location -->
            <div>
              <div class="footer-col-title">${t.followUs}</div>
              <p style="color: #94A3B8; font-size: 0.9rem; line-height: 1.6; margin-bottom: 14px;">
                Terhubung bersama komunitas pendidikan anak usia dini untuk masa depan generasi cemerlang.
              </p>
              <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.08); padding: 8px 14px; border-radius: var(--radius-md); font-size: 0.82rem; color: #CBD5E1;">
                <i class="fas fa-graduation-cap" style="color: var(--color-accent-yellow);"></i> UPI Kampus Cibiru
              </div>
            </div>
          </div>

          <!-- Bottom Attribution -->
          <div class="footer-bottom">
            <div>© 2026 <strong>Kinder Story Space</strong>. ${t.rights}</div>
            <div>${t.affiliation}</div>
          </div>
        </div>
      </footer>
    `;
  }

  function showFaqModal() {
    Modal.open({
      title: 'Tanya Jawab (FAQ)',
      contentHtml: `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <strong style="color: var(--color-dark-navy);">1. Apakah platform ini gratis?</strong>
            <p style="color: var(--color-text-muted); margin-top: 4px; font-size: 0.92rem;">Ya, seluruh buku cerita anak dan modul pembelajaran PGPAUD dapat diakses dan dibaca secara bebas oleh pendidik, orang tua, dan anak-anak.</p>
          </div>
          <div>
            <strong style="color: var(--color-dark-navy);">2. Bagaimana cara mengunduh PDF cerita?</strong>
            <p style="color: var(--color-text-muted); margin-top: 4px; font-size: 0.92rem;">Pada halaman detail buku, klik tombol "Download PDF". File dokumen resmi siap cetak akan langsung diunduh ke perangkat Anda.</p>
          </div>
          <div>
            <strong style="color: var(--color-dark-navy);">3. Apakah tersedia dalam dua bahasa?</strong>
            <p style="color: var(--color-text-muted); margin-top: 4px; font-size: 0.92rem;">Tentu! Anda dapat mengganti bahasa ke Bahasa Indonesia maupun English langsung dari navbar atau di dalam reader buku tanpa harus reload halaman.</p>
          </div>
        </div>
      `
    });
  }

  function showGuideModal() {
    Modal.open({
      title: 'Panduan Pembacaan & Stimulasi AUD',
      contentHtml: `
        <div style="line-height: 1.7; color: var(--color-text-body);">
          <h4 style="color: var(--color-primary); margin-bottom: 8px;">Tips Membacakan Cerita untuk Anak Usia Dini:</h4>
          <ul style="padding-left: 20px; margin-bottom: 16px;">
            <li>Gunakan variasi intonasi suara dan mimik ekspresi wajah yang ramah.</li>
            <li>Ajak anak mengamati ilustrasi visual dan menebak kelanjutan cerita.</li>
            <li>Ajukan pertanyaan terbuka seperti: <em>"Menurutmu, mengapa kelinci suka berbagi apel?"</em></li>
            <li>Kaitkan pesan moral cerita dengan aktivitas sehari-hari anak di rumah atau di sekolah.</li>
          </ul>
        </div>
      `
    });
  }

  function showContactModal() {
    Modal.open({
      title: 'Kontak & Dukungan PGPAUD',
      contentHtml: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 12px;">Kinder Story Space dikembangkan dalam rangka riset dan inovasi pembelajaran digital PGPAUD Universitas Pendidikan Indonesia – Kampus Cibiru.</p>
          <div style="background: var(--color-soft-gray); padding: 14px; border-radius: 12px;">
            <p><strong>Alamat:</strong> Jl. Raya Cibiru No. 15, Bandung, Jawa Barat</p>
            <p><strong>Email:</strong> pgpaud@upi.edu | admin@kinderstoryspace.com</p>
          </div>
        </div>
      `
    });
  }

  return {
    render,
    showFaqModal,
    showGuideModal,
    showContactModal
  };
})();
