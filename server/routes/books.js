const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken, requireAdmin } = require('./auth');
const { generateBookPdf } = require('../pdfService');

// GET /api/books
router.get('/', (req, res) => {
  const { category, search, status } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (search) filter.search = search;
  if (status) filter.status = status;

  const books = db.getBooks(filter);
  res.json({
    total: books.length,
    books
  });
});

// GET /api/books/:id
router.get('/:id', (req, res) => {
  const book = db.getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Buku cerita tidak ditemukan.' });
  }
  res.json(book);
});

// POST /api/books (Admin only)
router.post('/', requireAdmin, (req, res) => {
  const {
    title_id,
    title_en,
    author,
    origin,
    category,
    age_range,
    read_time,
    cover_url,
    description_id,
    description_en,
    status,
    pages
  } = req.body;

  if (!title_id || !author) {
    return res.status(400).json({ error: 'Judul buku dan penulis wajib diisi.' });
  }

  const newBook = db.createBook({
    title_id,
    title_en: title_en || title_id,
    author,
    origin: origin || 'Indonesia',
    category: category || 'Cerita Rakyat',
    age_range: age_range || '4–7 Tahun',
    read_time: read_time || '5 Menit',
    cover_url: cover_url || '/assets/cover_bintang.svg',
    description_id: description_id || '',
    description_en: description_en || '',
    status: status || 'published',
    pages: pages && pages.length ? pages : [
      {
        page_number: 1,
        image_url: cover_url || '/assets/cover_bintang.svg',
        text_id: description_id || 'Kisah yang menyenangkan untuk dibaca bersama anak.',
        text_en: description_en || 'A wonderful story to read together with children.'
      }
    ]
  });

  res.status(201).json({
    message: 'Buku cerita berhasil ditambahkan!',
    book: newBook
  });
});

// PUT /api/books/:id (Admin only)
router.put('/:id', requireAdmin, (req, res) => {
  const existing = db.getBookById(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Buku cerita tidak ditemukan.' });
  }

  const updated = db.updateBook(req.params.id, req.body);
  res.json({
    message: 'Buku cerita berhasil diperbarui.',
    book: updated
  });
});

// DELETE /api/books/:id (Admin only)
router.delete('/:id', requireAdmin, (req, res) => {
  const success = db.deleteBook(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Buku cerita tidak ditemukan.' });
  }
  res.json({ message: 'Buku cerita berhasil dihapus.' });
});

// GET /api/books/:id/pdf
router.get('/:id/pdf', (req, res) => {
  const book = db.getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Buku tidak ditemukan.' });
  }

  const lang = req.query.lang || 'id';
  const cleanTitle = (book.title_id || 'buku_cerita').toLowerCase().replace(/[^a-z0-9]/g, '_');
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="kinderstory_${cleanTitle}_${lang}.pdf"`);

  try {
    generateBookPdf(book, lang, res);
  } catch (err) {
    console.error('Error generating PDF:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Gagal membuat dokumen PDF.' });
    }
  }
});

// POST /api/books/:id/progress
router.post('/:id/progress', authenticateToken, (req, res) => {
  const { page, language } = req.body;
  const progress = db.saveReadingProgress(req.user.id, req.params.id, page || 1, language || 'id');
  res.json({
    message: 'Progres membaca berhasil disimpan.',
    progress
  });
});

// GET /api/books/:id/progress
router.get('/:id/progress', authenticateToken, (req, res) => {
  const progress = db.getReadingProgress(req.user.id, req.params.id);
  res.json(progress || { current_page: 1, progress_pct: 0 });
});

module.exports = router;
