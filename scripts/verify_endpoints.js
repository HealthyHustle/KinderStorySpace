async function fullSystemCheck() {
  const base = 'http://localhost:3000';
  const urlsToCheck = [
    '/',
    '/css/theme.css',
    '/css/components.css',
    '/css/auth.css',
    '/css/reader.css',
    '/css/admin.css',
    '/js/api.js',
    '/js/auth.js',
    '/js/components/toast.js',
    '/js/components/modal.js',
    '/js/components/navbar.js',
    '/js/components/footer.js',
    '/js/pages/authPage.js',
    '/js/pages/homePage.js',
    '/js/pages/bookDetailPage.js',
    '/js/pages/readerPage.js',
    '/js/pages/modulesPage.js',
    '/js/pages/adminCommon.js',
    '/js/pages/adminDashboardPage.js',
    '/js/pages/adminBooksPage.js',
    '/js/pages/adminModulesPage.js',
    '/js/pages/adminUsersPage.js',
    '/js/router.js',
    '/js/app.js',
    '/assets/reading_kids.png',
    '/assets/covers/malin_kundang.svg',
    '/assets/covers/timun_mas.svg',
    '/assets/covers/bawang_merah_putih.svg',
    '/assets/covers/kancil_buaya.svg',
    '/assets/covers/sangkuriang.svg',
    '/assets/covers/lutung_kasarung.svg',
    '/assets/cover_kelinci.png',
    '/assets/cover_gajah.png',
    '/assets/modules/modul_kognitif.svg',
    '/assets/modules/modul_bahasa.svg',
    '/api/health',
    '/api/books',
    '/api/modules',
    '/api/books/book-malin-kundang/pdf?lang=id',
    '/api/modules/mod-01/pdf'
  ];

  console.log(`Checking ${urlsToCheck.length} static and dynamic endpoints...`);
  let passed = 0;
  let failed = 0;

  for (const u of urlsToCheck) {
    try {
      const res = await fetch(`${base}${u}`);
      if (res.ok) {
        passed++;
      } else {
        console.error(`FAILED: ${u} returned status ${res.status}`);
        failed++;
      }
    } catch (err) {
      console.error(`ERROR fetching ${u}:`, err.message);
      failed++;
    }
  }

  console.log(`\nEndpoint Validation Result: ${passed}/${urlsToCheck.length} PASSED (${failed} failed).`);
}

fullSystemCheck();
