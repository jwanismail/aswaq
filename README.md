# 🏪 Sahibinden Clone - Turkish Marketplace

Modern, responsive ve kullanıcı dostu Türk pazaryeri klonu. React, Node.js ve MongoDB ile geliştirilmiştir.

## ✨ Özellikler

- 🔐 Kullanıcı kayıt/giriş sistemi
- 📱 Responsive tasarım (mobil uyumlu)
- 🚗 Araç ilanları (marka, model, yıl vb.)
- 🏠 Emlak ilanları 
- 🛍️ İkinci el eşya ilanları
- 📸 Çoklu fotoğraf yükleme
- ⭐ Favori ilan sistemi
- 🔍 Gelişmiş arama ve filtreleme
- 💎 İlan promosyon sistemi (öne çıkarma)
- 📊 Kullanıcı profil yönetimi

## 🚀 Canlı Demo

[Buraya tıklayarak canlı demo'yu görebilirsiniz](#)

## 🛠️ Teknolojiler

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router DOM
- Heroicons

### Backend  
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (şifre hashleme)
- CORS

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- MongoDB
- Git

### 1. Repository'yi Klonlayın
\`\`\`bash
git clone https://github.com/yourusername/sahibinden-clone.git
cd sahibinden-clone
\`\`\`

### 2. Dependencies'leri Yükleyin
\`\`\`bash
npm run install-all
\`\`\`

### 3. Environment Variables
\`\`\`bash
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/sahibinden
JWT_SECRET=your-super-secret-key-here
PORT=5000

# Frontend (.env)
VITE_API_URL=http://localhost:5000
\`\`\`

### 4. Uygulamayı Çalıştırın
\`\`\`bash
npm run dev
\`\`\`

## 🌐 Production Deployment

### Vercel ile Deployment

1. **GitHub'a Push Edin**
\`\`\`bash
git add .
git commit -m "Ready for deployment"
git push origin main
\`\`\`

2. **MongoDB Atlas Kurulumu**
   - [MongoDB Atlas](https://cloud.mongodb.com)'a kaydolun
   - Yeni cluster oluşturun
   - Connection string'i alın

3. **Vercel'e Deploy Edin**
   - [Vercel](https://vercel.com)'e kaydolun
   - GitHub repo'nuzu import edin
   - Environment variables'ları ekleyin:
     - \`MONGODB_URI\`: Atlas connection string
     - \`JWT_SECRET\`: Güçlü bir secret key
     - \`FRONTEND_URL\`: Vercel domain'iniz

4. **Deploy!**
   - Vercel otomatik olarak build edip deploy edecek
   - Her commit'te otomatik re-deploy

### Environment Variables (Production)

\`\`\`env
# Backend
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sahibinden
JWT_SECRET=your-super-secure-production-secret
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app

# Frontend (Vercel otomatik ekler)
VITE_API_URL=https://your-app.vercel.app/api
\`\`\`

## 📱 Ekran Görüntüleri

[Buraya ekran görüntüleri eklenecek]

## 🔮 Gelecek Özellikler

- [ ] Real-time mesajlaşma
- [ ] Email bildirimleri
- [ ] Sosyal medya girişi
- [ ] Gelişmiş konum bazlı arama
- [ ] Mobil uygulama (React Native)

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (\`git checkout -b feature/amazing-feature\`)
3. Commit edin (\`git commit -m 'Add amazing feature'\`)
4. Push edin (\`git push origin feature/amazing-feature\`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

⭐ Bu projeyi beğendiyseniz star vermeyi unutmayın! 