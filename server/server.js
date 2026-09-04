const express = require('express');
const cors = require('cors');
const path = require('path');

const { router: authRouter } = require('./routes/auth');
const booksRouter = require('./routes/books');
const modulesRouter = require('./routes/modules');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON and form bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/books', booksRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/admin', adminRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: 'Kinder Story Space - PGPAUD',
    time: new Date().toISOString()
  });
});

// Fallback to index.html for SPA hash/history routing
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Terjadi kesalahan internal pada server.',
    details: err.message
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Kinder Story Space Server running at:`);
  console.log(` http://localhost:${PORT}`);
  console.log(`====================================================`);
});
