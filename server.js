import express from 'express';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { MongoClient, ServerApiVersion } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5500;

// Gzip Compression for Fast Loading & Core Web Vitals
app.use(compression());

// Force HTTPS in Production Environments
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect(301, `https://${req.hostname}${req.url}`);
  }
  next();
});

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

app.use(cors());
app.use(express.json());

// Browser Asset Caching (30 Days for media/fonts, 0 Days for HTML)
app.use(express.static(path.join(__dirname, '.'), {
  maxAge: '7d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    } else if (filePath.match(/\.(png|jpg|jpeg|svg|webp|woff2|mp4)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
    }
  }
}));

// ==================== MONGODB ATLAS CONFIGURATION ====================
const MONGO_URI = process.env.MONGO_URI;

const client = MONGO_URI ? new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}) : null;

let db;

async function connectToDatabase() {
  if (!client) {
    console.warn("MONGO_URI is not configured; database persistence is disabled.");
    return;
  }

  try {
    await client.connect();
    db = client.db('companyDB');
    console.log("Connected successfully to MongoDB Atlas: companyDB");
  } catch (err) {
    console.error("MongoDB Atlas connection error:", err.message);
  }
}

connectToDatabase();

// ==================== INQUIRIES API ENDPOINT ====================
app.post('/api/inquiries', async (req, res) => {
  try {
    const { fullName, email, phone, company, service, message, source } = req.body;
    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide full name, email, and message.' });
    }

    const doc = {
      fullName,
      email,
      phone: phone || '',
      company: company || '',
      service: service || 'General Inquiry',
      message,
      source: source || 'Web Form',
      createdAt: new Date()
    };

    if (db) {
      await db.collection('inquiries').insertOne(doc);
      console.log("Inquiry saved to MongoDB Atlas:", fullName);
    } else {
      console.log("Database disconnected. Local payload:", doc);
    }

    return res.status(200).json({ success: true, message: 'Inquiry saved successfully.' });
  } catch (error) {
    console.error("API Error saving inquiry:", error);
    return res.status(500).json({ success: false, message: 'Server processing error.' });
  }
});

// ==================== CLEAN SPA STATIC ROUTES ====================
const ROUTES = ['/', '/products', '/services', '/about', '/contact'];
ROUTES.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
});

app.listen(PORT, () => {
  console.log(`ONSK Server running on http://localhost:${PORT}`);
});