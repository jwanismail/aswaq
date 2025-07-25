import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateListing from './pages/CreateListing';
import CreateListingWizard from './pages/CreateListingWizard';
import EditListing from './pages/EditListing';
import ListingDetail from './pages/ListingDetail';
import Profile from './pages/Profile';
import Discover from './pages/Discover';

// مكون التذييل
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* الشعار والوصف */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-xl font-bold text-aswaq-600">أسواق</div>
              <div className="text-lg text-gray-300">.com</div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              أكبر موقع إعلانات في سوريا. العنوان الصحيح للمعاملات الآمنة للبيع والشراء.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.566-1.35 2.14-2.21z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.463-2.001 4.568C14.568 13.728 13.484 14 12 14s-2.568-.272-3.567-1.272c-1.105-1.105-1.832-2.71-2.001-4.568C6.285 7.171 6 6.343 6 5.5 6 4.119 7.119 3 8.5 3S11 4.119 11 5.5c0 .843-.285 1.671-.432 2.66C11.011 8.434 11.487 8.5 12 8.5s.989-.066 1.432-.34C13.285 7.171 13 6.343 13 5.5 13 4.119 14.119 3 15.5 3S18 4.119 18 5.5c0 .843-.285 1.671-.432 2.66z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* التصنيفات */}
          <div>
            <h3 className="font-bold text-white mb-4">التصنيفات</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">عقارات</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">مركبات</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">قطع غيار</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">مستعمل</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">معدات عمل</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">حرفيون</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">إعلانات وظائف</a></li>
            </ul>
          </div>

          {/* الخدمات */}
          <div>
            <h3 className="font-bold text-white mb-4">الخدمات</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">تجارة إلكترونية آمنة</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">أموالك في أمان</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">فحص المركبات</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">استشاري عقارات</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">افتح متجراً</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">إعلان بانر</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
            </ul>
          </div>

          {/* مؤسسي */}
          <div>
            <h3 className="font-bold text-white mb-4">مؤسسي</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">عنا</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">وظائف</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">غرفة الصحافة</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">مدونة</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">أعلن معنا</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">اتصل بنا</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">خريطة الموقع</a></li>
            </ul>
          </div>

          {/* المساعدة */}
          <div>
            <h3 className="font-bold text-white mb-4">المساعدة</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">كيف أنشر إعلاناً؟</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">نصائح الأمان</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">الاحتيال</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">شروط الاستخدام</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">قوانين الإعلانات</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">دليل المساعدة والعمليات</a></li>
            </ul>
          </div>
        </div>

        {/* التطبيقات المحمولة */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="font-bold text-white mb-2">تطبيقاتنا المحمولة</h4>
              <div className="flex space-x-4">
                <a href="#" className="inline-block">
                  <img src="https://via.placeholder.com/120x40/000000/ffffff?text=App+Store" alt="App Store" className="h-10" />
                </a>
                <a href="#" className="inline-block">
                  <img src="https://via.placeholder.com/120x40/000000/ffffff?text=Google+Play" alt="Google Play" className="h-10" />
                </a>
                <a href="#" className="inline-block">
                  <img src="https://via.placeholder.com/120x40/000000/ffffff?text=AppGallery" alt="AppGallery" className="h-10" />
                </a>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <p>© 2025 أسواق للتكنولوجيا والتجارة م.م.</p>
              <p className="mt-1">جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs text-gray-500">
            <div className="mb-4 md:mb-0">
              <p>
                جزء من الإعلانات المسجلة في أسواق الخاصة بمستشاري العقارات 
                هي بيانات اختبار تم إنشاؤها في إطار الهندسة المرجعية لقطاع الإسكان.
              </p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span>محمي بـ SSL</span>
              <span>•</span>
              <span>HTTPS</span>
              <span>•</span>
              <span>دفع آمن</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // عرض شاشة التحميل عند تحميل الصفحة
    setIsLoading(true);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // عرض المحتوى بانتقال سلس
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <AuthProvider>
      <Router>
        {/* شاشة التحميل */}
        {isLoading && (
          <LoadingScreen 
            onComplete={handleLoadingComplete}
            duration={3000}
          />
        )}
        
        {/* المحتوى الرئيسي */}
        <div className={`min-h-screen bg-gray-50 transition-opacity duration-700 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/create-listing-wizard" element={<CreateListingWizard />} />
              <Route path="/edit-listing/:id" element={<EditListing />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 