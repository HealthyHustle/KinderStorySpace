const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAdmin } = require('./auth');
const { generateModulePdf } = require('../pdfService');

// GET /api/modules
router.get('/', (req, res) => {
  const { category, search } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (search) filter.search = search;

  const modules = db.getModules(filter);
  res.json({
    total: modules.length,
    modules
  });
});

// GET /api/modules/:id
router.get('/:id', (req, res) => {
  const mod = db.getModuleById(req.params.id);
  if (!mod) {
    return res.status(404).json({ error: 'Modul PGPAUD tidak ditemukan.' });
  }
  res.json(mod);
});

// POST /api/modules (Admin only)
router.post('/', requireAdmin, (req, res) => {
  const { title, category, age_range, description, thumbnail, status, objectives } = req.body;

  if (!title || !category) {
    return res.status(400).json({ error: 'Judul modul dan kategori wajib diisi.' });
  }

  const newMod = db.createModule({
    title,
    category,
    age_range: age_range || '4–5 Tahun',
    description: description || '',
    thumbnail: thumbnail || '/assets/modules/modul_kognitif.svg',
    status: status || 'published',
    objectives: objectives || ['Stimulasi kecerdasan majemuk AUD']
  });

  res.status(201).json({
    message: 'Modul pembelajaran berhasil ditambahkan!',
    module: newMod
  });
});

// PUT /api/modules/:id (Admin only)
router.put('/:id', requireAdmin, (req, res) => {
  const existing = db.getModuleById(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Modul tidak ditemukan.' });
  }

  const updated = db.updateModule(req.params.id, req.body);
  res.json({
    message: 'Modul pembelajaran berhasil diperbarui.',
    module: updated
  });
});

// DELETE /api/modules/:id (Admin only)
router.delete('/:id', requireAdmin, (req, res) => {
  const success = db.deleteModule(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Modul tidak ditemukan.' });
  }
  res.json({ message: 'Modul berhasil dihapus.' });
});

// GET /api/modules/:id/pdf
router.get('/:id/pdf', (req, res) => {
  const mod = db.getModuleById(req.params.id);
  if (!mod) {
    return res.status(404).json({ error: 'Modul tidak ditemukan.' });
  }

  const cleanTitle = (mod.title || 'modul_pgpaud').toLowerCase().replace(/[^a-z0-9]/g, '_');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="kinderstory_${cleanTitle}.pdf"`);

  try {
    generateModulePdf(mod, res);
  } catch (err) {
    console.error('Error generating module PDF:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Gagal membuat dokumen modul PDF.' });
    }
  }
});

module.exports = router;
