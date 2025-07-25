import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MagnifyingGlassIcon, SparklesIcon, HeartIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  promotionType?: string;
  featured?: boolean;
  featuredUntil?: string;
}

const Discover: React.FC = () => {
  const [discoverListings, setDiscoverListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchDiscoverListings();
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const fetchDiscoverListings = async () => {
    try {
      const response = await fetch(`${API_URL}/api/listings/discover`);
      const data = await response.json();
      setDiscoverListings(data);
    } catch (error) {
      console.error('Error fetching discover listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (e: React.MouseEvent, listingId: string) => {
    e.preventDefault();
    const newFavorites = favorites.includes(listingId)
      ? favorites.filter(id => id !== listingId)
      : [...favorites, listingId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-SY').format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
              <MagnifyingGlassIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              استكشف الإعلانات المميزة
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              اكتشف أفضل العروض والإعلانات المختارة بعناية. نعرض هنا فقط الإعلانات عالية الجودة.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3">
                <SparklesIcon className="w-5 h-5 text-yellow-300 mr-2" />
                <span className="text-white font-medium text-sm sm:text-base">إعلانات مختارة بعناية</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3">
                <HeartIcon className="w-5 h-5 text-red-300 mr-2" />
                <span className="text-white font-medium text-sm sm:text-base">جودة مضمونة</span>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-16 sm:h-20 lg:h-24">
            <path fill="#F9FAFB" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Filter and Sort Options - Mobile Responsive */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
              جميع الفئات
            </button>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200">
              السعر الأقل
            </button>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200">
              الأحدث
            </button>
          </div>
          <p className="text-sm text-gray-600">
            عرض {discoverListings.length} إعلان مميز
          </p>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MagnifyingGlassIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 text-sm sm:text-base">جاري تحميل الإعلانات المميزة...</p>
          </div>
        ) : discoverListings.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full mb-4 sm:mb-6">
              <MagnifyingGlassIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              لا توجد إعلانات مميزة حالياً
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
              كن أول من يضع إعلانه في قسم الاستكشاف واحصل على أفضل النتائج
            </p>
            <Link
              to="/profile?tab=listings"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              ابدأ الترويج الآن
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {discoverListings.map((listing) => (
              <Link
                key={listing._id}
                to={`/listing/${listing._id}`}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  {/* Promotion Badge - Sadece ücretli promosyon satın almış ilanlar için */}
                  {listing.featured && listing.featuredUntil && new Date(listing.featuredUntil) > new Date() && listing.promotionType === 'kesfet' && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center">
                        <SparklesIcon className="w-3.5 h-3.5 mr-1" />
                        مميز
                      </div>
                    </div>
                  )}
                  
                  {/* Yeni İlan Badge - Ücretsiz 24 saatlik gösterim için */}
                  {listing.featured && listing.featuredUntil && new Date(listing.featuredUntil) > new Date() && listing.promotionType === 'kesfet_free' && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center">
                        <SparklesIcon className="w-3.5 h-3.5 mr-1" />
                        جديد
                      </div>
                    </div>
                  )}
                  
                  {/* Favorite Button */}
                  {user && (
                    <button 
                      onClick={(e) => toggleFavorite(e, listing._id)}
                      className="absolute top-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 group/fav"
                    >
                      {favorites.includes(listing._id) ? (
                        <HeartSolidIcon className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5 text-gray-600 group-hover/fav:text-red-500 transition-colors" />
                      )}
                    </button>
                  )}
                  
                  {/* Image */}
                  <img
                    src={listing.images[0] || 'https://via.placeholder.com/400x300'}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Image Count */}
                  {listing.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      {listing.images.length}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {listing.title}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex items-baseline mb-3">
                    <p className="text-xl sm:text-2xl font-bold text-purple-600">
                      {formatPrice(listing.price)}
                    </p>
                    <span className="text-sm text-purple-600 mr-1">ل.س</span>
                  </div>
                  
                  {/* Location and Date */}
                  <div className="space-y-1.5">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPinIcon className="w-4 h-4 ml-1 flex-shrink-0" />
                      <span className="truncate">{listing.location}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                      <CalendarIcon className="w-3.5 h-3.5 ml-1 flex-shrink-0" />
                      <span>{new Date(listing.createdAt).toLocaleDateString('ar-SY')}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-purple-100">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 sm:mb-6">
                <SparklesIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                اجعل إعلانك مميزاً
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
                احصل على 10 أضعاف المشاهدات عندما تضع إعلانك في قسم الاستكشاف. إعلانك سيظهر في أعلى نتائج البحث وفي الصفحة الرئيسية.
              </p>
              
              {/* Pricing Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-purple-300 transition-colors">
                  <h4 className="font-bold text-lg mb-2">أسبوع واحد</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-1">50,000</p>
                  <p className="text-sm text-gray-500">ليرة سورية</p>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-purple-500 relative transform sm:scale-105 shadow-lg">
                  <div className="absolute -top-3 right-1/2 transform translate-x-1/2 bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
                    الأكثر شيوعاً
                  </div>
                  <h4 className="font-bold text-lg mb-2">أسبوعان</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-1">90,000</p>
                  <p className="text-sm text-gray-500">ليرة سورية</p>
                  <p className="text-xs text-green-600 mt-2">وفر 10,000 ل.س</p>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-purple-300 transition-colors">
                  <h4 className="font-bold text-lg mb-2">شهر كامل</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-1">150,000</p>
                  <p className="text-sm text-gray-500">ليرة سورية</p>
                  <p className="text-xs text-green-600 mt-2">وفر 50,000 ل.س</p>
                </div>
              </div>
              
              <Link
                to="/profile?tab=listings"
                className="inline-flex items-center px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
              >
                ابدأ الترويج الآن
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover; 