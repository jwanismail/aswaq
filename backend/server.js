const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://your-app.vercel.app'] 
    : ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Fotoğraflar için body limit artırıldı
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Statik dosyaları sun
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aswaq')
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// Routes
const listingRoutes = require('./routes/listings');
const userRoutes = require('./routes/users');

app.use('/api/listings', listingRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
}); 