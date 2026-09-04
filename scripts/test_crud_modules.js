async function testModulesCRUD() {
  const base = 'http://localhost:3000';

  console.log('1. Logging in as Admin...');
  const adminRes = await fetch(`${base}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@kinderstoryspace.com', password: 'admin123' })
  }).then(r => r.json());

  if (!adminRes.token) {
    throw new Error('Admin login failed: ' + JSON.stringify(adminRes));
  }
  const token = adminRes.token;
  console.log('   Admin login OK.');

  console.log('2. Fetching initial modules list...');
  const initList = await fetch(`${base}/api/modules`).then(r => r.json());
  const initialCount = initList.total;
  console.log(`   Initial total modules: ${initialCount}`);

  console.log('3. Creating new test module via POST /api/modules...');
  const createRes = await fetch(`${base}/api/modules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: 'Modul Uji Coba CRUD PGPAUD',
      category: 'Kognitif',
      age_range: '4–5 Tahun',
      description: 'Deskripsi modul pembelajaran uji coba otomatis',
      thumbnail: '/assets/modules/modul_kognitif.svg',
      status: 'published',
      objectives: ['Stimulasi berpikir logis', 'Eksplorasi sensorik AUD']
    })
  }).then(r => r.json());

  const createdId = createRes.module && createRes.module.id;
  console.log('   Created module ID:', createdId);
  if (!createdId) throw new Error('Failed to create module: ' + JSON.stringify(createRes));

  console.log('4. Editing module via PUT /api/modules/' + createdId + '...');
  const updateRes = await fetch(`${base}/api/modules/${createdId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: 'Modul Uji Coba CRUD (Updated)',
      description: 'Deskripsi yang sudah berhasil diedit oleh admin',
      status: 'draft'
    })
  }).then(r => r.json());

  console.log('   Update result title:', updateRes.module.title, 'Status:', updateRes.module.status);

  console.log('5. Verifying single module GET...');
  const getSingle = await fetch(`${base}/api/modules/${createdId}`).then(r => r.json());
  if (getSingle.title !== 'Modul Uji Coba CRUD (Updated)') {
    throw new Error('Update verification failed!');
  }
  console.log('   Single module get verified OK.');

  console.log('6. Deleting module via DELETE /api/modules/' + createdId + '...');
  const delRes = await fetch(`${base}/api/modules/${createdId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(r => r.json());
  console.log('   Delete response:', delRes.message);

  console.log('7. Verifying deletion...');
  const afterDelList = await fetch(`${base}/api/modules`).then(r => r.json());
  console.log(`   Modules count after deletion: ${afterDelList.total} (should equal initial: ${initialCount})`);
  if (afterDelList.total !== initialCount) {
    throw new Error('Count mismatch after deletion!');
  }

  console.log('8. Verifying PDF generation for existing module...');
  const existingMod = afterDelList.modules[0];
  const pdfRes = await fetch(`${base}/api/modules/${existingMod.id}/pdf`);
  console.log('   Module PDF status:', pdfRes.status, 'Content-Type:', pdfRes.headers.get('content-type'));
  if (pdfRes.status !== 200 || !pdfRes.headers.get('content-type').includes('application/pdf')) {
    throw new Error('Module PDF generation failed!');
  }

  console.log('\n>>> ALL MODULES CRUD & PDF TESTS PASSED 100%! <<<\n');
}

testModulesCRUD().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
