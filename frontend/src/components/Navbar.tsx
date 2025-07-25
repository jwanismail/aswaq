import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, ChevronDownIcon, UserIcon, HeartIcon, ChatBubbleLeftIcon, PlusIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Menü dışına tıklanınca kapansın
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* Üst Bar */}
      <div className="bg-aswaq-600 border-b border-aswaq-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-10 md:h-12 text-xs md:text-sm">
            <div className="flex items-center space-x-2 md:space-x-6 space-x-reverse">
              <span className="text-white font-medium hidden sm:block">أسواق - منصة التسوق الآمنة في سوريا</span>
              <span className="text-white font-medium sm:hidden">أسواق</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4 space-x-reverse">
              {token && user ? (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen((v) => !v)}
                    className="flex items-center space-x-1 space-x-reverse text-white hover:text-aswaq-100 transition-colors"
                  >
                    <UserIcon className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:block">{user.name}</span>
                    <span className="sm:hidden text-xs">الحساب</span>
                    <ChevronDownIcon className={`h-2 w-2 md:h-3 md:w-3 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {menuOpen && (
                    <div ref={menuRef} className="absolute left-0 mt-2 w-40 md:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <Link to="/profile?tab=summary" className="block px-3 md:px-4 py-2 text-xs md:text-sm hover:bg-gray-50 text-gray-700" onClick={() => setMenuOpen(false)}>حسابي</Link>
                      <Link to="/profile?tab=listings" className="block px-3 md:px-4 py-2 text-xs md:text-sm hover:bg-gray-50 text-gray-700" onClick={() => setMenuOpen(false)}>إعلاناتي</Link>
                      <Link to="/profile?tab=favorites" className="block px-3 md:px-4 py-2 text-xs md:text-sm hover:bg-gray-50 text-gray-700" onClick={() => setMenuOpen(false)}>المفضلة</Link>
                      <Link to="/profile?tab=messages" className="block px-3 md:px-4 py-2 text-xs md:text-sm hover:bg-gray-50 text-gray-700" onClick={() => setMenuOpen(false)}>رسائلي</Link>
                      <div className="border-t border-gray-200">
                        <button onClick={handleLogout} className="w-full text-right px-3 md:px-4 py-2 text-xs md:text-sm hover:bg-gray-50 text-red-600">تسجيل الخروج</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2 md:space-x-4 space-x-reverse">
                  <Link to="/login" className="text-white hover:text-aswaq-100 transition-colors text-xs md:text-sm">دخول</Link>
                  <Link to="/register" className="text-white hover:text-aswaq-100 transition-colors text-xs md:text-sm hidden sm:block">إنشاء حساب</Link>
                </div>
              )}
              <span className="text-aswaq-200 hidden sm:block">|</span>
              <span className="text-white hover:text-aswaq-100 cursor-pointer transition-colors text-xs md:text-sm hidden md:block">المساعدة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ana Navbar */}
      <nav className="bg-aswaq-500 shadow-lg border-b border-aswaq-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-xl md:text-2xl font-bold text-white">أسواق</div>
            </Link>

            {/* Desktop Arama */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="flex w-full">
                <button className="px-4 md:px-6 py-2 bg-aswaq-secondary-500 text-white rounded-l-md hover:bg-aswaq-secondary-600 focus:outline-none focus:ring-2 focus:ring-white transition-colors shadow-sm">
                  <MagnifyingGlassIcon className="h-4 w-4 md:h-5 md:w-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="ابحث بالكلمة أو رقم الإعلان أو اسم المتجر"
                    className="w-full px-3 md:px-4 py-2 border border-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-sm text-right text-sm md:text-base"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Sağ Menü */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 space-x-reverse">
              <Link to="/discover" className="flex items-center space-x-1 space-x-reverse text-aswaq-800 hover:text-aswaq-900 transition-colors">
                <span className="hidden lg:block font-medium text-sm">استكشف</span>
                <span className="text-base lg:text-lg">🔍</span>
              </Link>
              <Link to="/favorites" className="flex items-center space-x-1 space-x-reverse text-aswaq-800 hover:text-aswaq-900 transition-colors">
                <span className="hidden lg:block font-medium text-sm">المفضلة</span>
                <HeartIcon className="h-4 w-4 lg:h-5 lg:w-5" />
              </Link>
              <Link to="/messages" className="flex items-center space-x-1 space-x-reverse text-aswaq-800 hover:text-aswaq-900 transition-colors">
                <span className="hidden lg:block font-medium text-sm">الرسائل</span>
                <ChatBubbleLeftIcon className="h-4 w-4 lg:h-5 lg:w-5" />
              </Link>
              <Link 
                to="/create-listing-wizard" 
                className="flex items-center space-x-1 lg:space-x-2 space-x-reverse bg-white text-aswaq-600 px-2 lg:px-4 py-1.5 lg:py-2 rounded-md hover:bg-gray-50 font-semibold shadow-md transition-colors border border-white text-xs lg:text-sm"
              >
                <span className="hidden lg:block">أضف إعلان مجاني</span>
                <span className="lg:hidden">إعلان</span>
                <PlusIcon className="h-3 w-3 lg:h-4 lg:w-4" />
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center space-x-2 space-x-reverse">
              {/* Mobile Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-white hover:text-aswaq-100 transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              
              {/* Mobile Add Listing */}
              <Link 
                to="/create-listing-wizard" 
                className="p-2 bg-white text-aswaq-600 rounded-md hover:bg-gray-50 transition-colors"
              >
                <PlusIcon className="h-4 w-4" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:text-aswaq-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="md:hidden pb-4">
              <div className="flex">
                <button className="px-4 py-2 bg-aswaq-secondary-500 text-white rounded-l-md hover:bg-aswaq-secondary-600 focus:outline-none transition-colors">
                  <MagnifyingGlassIcon className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  placeholder="ابحث..."
                  className="flex-1 px-3 py-2 border border-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-white text-right text-sm"
                  dir="rtl"
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Desktop Kategori Menüsü */}
      <div className="hidden md:block bg-aswaq-400 border-b border-aswaq-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4 lg:space-x-8 space-x-reverse h-10 lg:h-12 text-xs lg:text-sm justify-start overflow-x-auto">
            <Link to="/?category=emlak" className="text-aswaq-800 hover:text-aswaq-900 font-medium transition-colors whitespace-nowrap">عقارات</Link>
            <Link to="/?category=vasita" className="text-aswaq-800 hover:text-aswaq-900 font-medium transition-colors whitespace-nowrap">مركبات</Link>
            <Link to="/?category=yedek-parca" className="text-aswaq-800 hover:text-aswaq-900 font-medium transition-colors whitespace-nowrap">قطع غيار</Link>
            <Link to="/?category=ikinci-el" className="text-aswaq-800 hover:text-aswaq-900 font-medium transition-colors whitespace-nowrap">تسوق مستعمل</Link>
            <Link to="/?category=is-makineleri" className="text-aswaq-800 hover:text-aswaq-900 font-medium transition-colors whitespace-nowrap">معدات عمل</Link>
            <Link to="/?category=ustalar" className="text-aswaq-800 hover:text-aswaq-900 font-medium transition-colors whitespace-nowrap">حرفيون</Link>
            <Link to="/?category=ozel-ders" className="text-aswaq-800 hover:text-aswaq-900 font-medium transition-colors whitespace-nowrap">دروس خصوصية</Link>
            <Link to="/?category=is-ilanlari" className="text-aswaq-800 hover:text-aswaq-900 font-medium transition-colors whitespace-nowrap">وظائف</Link>
            <Link to="/?category=yardimci" className="text-aswaq-800 hover:text-aswaq-900 font-medium transition-colors whitespace-nowrap">مساعدين</Link>
            <Link to="/?category=hayvanlar" className="text-aswaq-800 hover:text-aswaq-900 font-medium transition-colors whitespace-nowrap">حيوانات</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">القائمة</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Quick Actions */}
              <div className="space-y-2">
                <Link 
                  to="/discover" 
                  className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-lg">🔍</span>
                  <span className="font-medium">استكشف</span>
                </Link>
                <Link 
                  to="/favorites" 
                  className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HeartIcon className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">المفضلة</span>
                </Link>
                <Link 
                  to="/messages" 
                  className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ChatBubbleLeftIcon className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">الرسائل</span>
                </Link>
              </div>

              {/* Categories */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">الفئات</h3>
                <div className="space-y-1">
                  <Link to="/?category=emlak" className="block p-2 text-sm hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>عقارات</Link>
                  <Link to="/?category=vasita" className="block p-2 text-sm hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>مركبات</Link>
                  <Link to="/?category=yedek-parca" className="block p-2 text-sm hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>قطع غيار وإكسسوارات</Link>
                  <Link to="/?category=ikinci-el" className="block p-2 text-sm hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>تسوق مستعمل وجديد</Link>
                  <Link to="/?category=is-makineleri" className="block p-2 text-sm hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>معدات عمل وصناعة</Link>
                  <Link to="/?category=ustalar" className="block p-2 text-sm hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>حرفيون وخدمات</Link>
                  <Link to="/?category=ozel-ders" className="block p-2 text-sm hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>دروس خصوصية</Link>
                  <Link to="/?category=is-ilanlari" className="block p-2 text-sm hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>إعلانات وظائف</Link>
                  <Link to="/?category=yardimci" className="block p-2 text-sm hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>باحثون عن مساعدين</Link>
                  <Link to="/?category=hayvanlar" className="block p-2 text-sm hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>عالم الحيوانات</Link>
                </div>
              </div>

              {/* Auth Links for mobile */}
              {!token && (
                <div className="border-t pt-4 space-y-2">
                  <Link 
                    to="/login" 
                    className="block w-full text-center bg-aswaq-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-aswaq-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    تسجيل الدخول
                  </Link>
                  <Link 
                    to="/register" 
                    className="block w-full text-center border border-aswaq-600 text-aswaq-600 py-2 px-4 rounded-lg font-medium hover:bg-aswaq-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    إنشاء حساب
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 