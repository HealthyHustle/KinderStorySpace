const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'kinder_story_space_secret_key_2026';

// Middleware to verify token and extract user
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Akses ditolak: Token autentikasi tidak ditemukan.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Sesi kedaluwarsa atau token tidak valid.' });
    }
    const user = db.getUserById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan di sistem.' });
    }
    req.user = user;
    next();
  });
}

// Middleware to require admin role
function requireAdmin(req, res, next) {
  authenticateToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Akses terlarang: Memerlukan hak akses Administrator.' });
    }
  });
}

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password wajib diisi.' });
  }

  const user = db.getUserByEmail(email.trim());
  if (!user) {
    return res.status(401).json({ error: 'Email atau password tidak sesuai.' });
  }

  const isMatch = bcrypt.compareSync(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Email atau password tidak sesuai.' });
  }

  // Update last active
  db.updateUser(user.id, { last_active: new Date().toISOString() });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    message: 'Login berhasil.',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      books_read: user.books_read || 0
    }
  });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nama, email, dan password wajib diisi.' });
  }

  if (confirmPassword && password !== confirmPassword) {
    return res.status(400).json({ error: 'Konfirmasi password tidak cocok.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password minimal 6 karakter.' });
  }

  const existing = db.getUserByEmail(email.trim());
  if (existing) {
    return res.status(409).json({ error: 'Email ini sudah terdaftar. Silakan gunakan email lain atau masuk.' });
  }

  const password_hash = bcrypt.hashSync(password, 10);
  // Auto-detect role: email admin@kinderstoryspace.com gets admin, others get user
  const role = email.trim().toLowerCase() === 'admin@kinderstoryspace.com' ? 'admin' : 'user';

  const newUser = db.createUser({
    name: name.trim(),
    email: email.trim(),
    password_hash,
    role
  });

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    message: 'Pendaftaran akun berhasil.',
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      books_read: 0
    }
  });
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      books_read: req.user.books_read || 0,
      created_at: req.user.created_at
    }
  });
});

module.exports = {
  router,
  authenticateToken,
  requireAdmin
};
