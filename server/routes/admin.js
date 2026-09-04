const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAdmin } = require('./auth');

// GET /api/admin/stats (Admin only)
router.get('/stats', requireAdmin, (req, res) => {
  const stats = db.getStats();
  res.json(stats);
});

// GET /api/admin/users (Admin only)
router.get('/users', requireAdmin, (req, res) => {
  const users = db.getUsers().map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    created_at: u.created_at,
    last_active: u.last_active,
    books_read: u.books_read || 0,
    status: u.status || 'active'
  }));

  const activeUsers = users.filter(u => u.status === 'active').length;
  res.json({
    total: users.length,
    active_count: activeUsers,
    new_count: users.filter(u => new Date(u.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
    users
  });
});

module.exports = router;
