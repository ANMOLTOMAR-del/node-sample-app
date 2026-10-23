require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Node app is running on AWS!',
    environment: NODE_ENV,
    version: '1.0.0'
  });
});

// Health check (Load Balancer / monitoring ke liye)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Sample API
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Priya' }
  ]);
});

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  res.status(201).json({ id: Date.now(), name });
});

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT} (${NODE_ENV})`);
});

// Graceful shutdown (PM2 / Docker / ECS ke liye)
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  server.close(() => process.exit(0));
});
