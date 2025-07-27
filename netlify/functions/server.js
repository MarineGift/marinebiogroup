import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Import your existing server routes
const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: process.env.DATABASE_URL ? 'configured' : 'missing'
  });
});

// Database connection test
app.get('/api/db-test', async (req, res) => {
  try {
    // Simple database test query
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ 
        error: 'DATABASE_URL not configured',
        supabase: false,
        env_vars: Object.keys(process.env).filter(k => k.includes('DATABASE'))
      });
    }
    
    // Try to import and test database connection
    const { Pool } = require('pg');
    const pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
    
    const result = await pool.query('SELECT NOW() as current_time, current_database() as db_name');
    pool.end();
    
    res.json({ 
      database: 'connected',
      supabase: true,
      timestamp: result.rows[0].current_time,
      database_name: result.rows[0].db_name,
      url_prefix: process.env.DATABASE_URL.substring(0, 30) + '...'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Database connection failed',
      message: error.message,
      supabase: false,
      env_available: !!process.env.DATABASE_URL
    });
  }
});

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === '1111') {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    res.json({
      success: true,
      token: token,
      user: {
        id: 'admin-1',
        username: 'admin',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }
});

// Gallery endpoint
app.get('/api/gallery', (req, res) => {
  const mockGallery = [
    {
      id: '1',
      title: 'Marine Nano-Fiber Lab',
      description: 'State-of-the-art research facility',
      imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400',
      category: 'Research'
    },
    {
      id: '2', 
      title: 'Ocean Sustainability',
      description: 'Environmental protection initiatives',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      category: 'Environment'
    }
  ];
  
  res.json({ data: mockGallery, total: mockGallery.length });
});

export const handler = serverless(app);