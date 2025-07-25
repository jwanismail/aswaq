import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  images: string[];
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  isFavorited?: boolean;
}

const Home: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [spotlightListings, setSpotlightListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [spotlightLoading, setSpotlightLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const { user } = useAuth();

  // فئات القائمة اليسرى
  const leftMenuCategories = [
    {
      name: 'عقارات ٣٦٠',
      icon: '🏠',
      color: 'text-yellow-600',
      subcategories: [
        { name: 'سكن', count: '784.960' },
        { name: 'مكان عمل', count: '116.064' },
        { name: 'أرض', count: '324.727' },
        { name: 'مشاريع سكنية', count: '1.324' },
        { name: 'مبنى', count: '10.628' },
        { name: 'ملكية مؤقتة', count: '2.956' },
        { name: 'منشأة سياحية', count: '1.847' }
      ]
    },
    {
      name: 'مركبات',
      icon: '🚗',
      color: 'text-blue-600',
      subcategories: [
        { name: 'سيارات', count: '1.2M' },
        { name: 'دفع رباعي وبيك أب', count: '280K' },
        { name: 'دراجات نارية', count: '95K' },
        { name: 'حافلات صغيرة', count: '45K' },
        { name: 'شاحنات', count: '35K' },
        { name: 'حافلات', count: '8K' }
      ]
    },
    {
      name: 'قطع غيار وإكسسوارات وتعديل',
      icon: '🔧',
      color: 'text-green-600',
      subcategories: [
        { name: 'قطع غيار سيارات', count: '450K' },
        { name: 'قطع غيار دراجات نارية', count: '85K' },
        { name: 'إكسسوارات', count: '120K' },
        { name: 'معدات', count: '95K' },
        { name: 'تعديل', count: '25K' }
      ]
    },
    {
      name: 'تسوق مستعمل وجديد',
      icon: '📱',
      color: 'text-purple-600',
      subcategories: [
        { name: 'حاسوب', count: '180K' },
        { name: 'هاتف محمول', count: '220K' },
        { name: 'تصوير وكاميرا', count: '45K' },
        { name: 'أجهزة كهربائية منزلية', count: '95K' },
        { name: 'إلكترونيات', count: '150K' },
        { name: 'أجهزة بيضاء', count: '85K' }
      ]
    },
    {
      name: 'معدات عمل وصناعة',
      icon: '🏭',
      color: 'text-orange-600',
      subcategories: [
        { name: 'معدات عمل', count: '25K' },
        { name: 'معدات زراعية', count: '15K' },
        { name: 'صناعة', count: '12K' },
        { name: 'كهرباء وطاقة', count: '8K' }
      ]
    },
    {
      name: 'حرفيون وخدمات',
      icon: '🔨',
      color: 'text-indigo-600',
      subcategories: [
        { name: 'ترميم وديكور منزلي', count: '45K' },
        { name: 'نقل', count: '25K' },
        { name: 'تنظيف', count: '18K' },
        { name: 'صحة وجمال', count: '12K' }
      ]
    },
    {
      name: 'مدرسون خصوصيون',
      icon: '📚',
      color: 'text-pink-600',
      subcategories: [
        { name: 'ثانوية', count: '8K' },
        { name: 'جامعة', count: '6K' },
        { name: 'ابتدائية', count: '5K' },
        { name: 'لغة أجنبية', count: '4K' }
      ]
    },
    {
      name: 'إعلانات وظائف',
      icon: '💼',
      color: 'text-gray-600',
      subcategories: [
        { name: 'تقنية معلومات', count: '25K' },
        { name: 'هندسة', count: '18K' },
        { name: 'مبيعات', count: '22K' },
        { name: 'تسويق', count: '15K' }
      ]
    },
    {
      name: 'عالم الحيوانات',
      icon: '🐕',
      color: 'text-green-500',
      subcategories: [
        { name: 'كلب', count: '12K' },
        { name: 'قطة', count: '8K' },
        { name: 'طيور', count: '6K' },
        { name: 'أسماك', count: '3K' }
      ]
    },
    {
      name: 'مجموعات',
      icon: '🏛️',
      color: 'text-yellow-700',
      subcategories: [
        { name: 'تحف', count: '5K' },
        { name: 'أعمال فنية', count: '3K' },
        { name: 'نقود', count: '2K' },
        { name: 'طوابع', count: '1K' }
      ]
    }
  ];

  useEffect(() => {
    fetchListings();
    fetchFeaturedListings();
    fetchSpotlightListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings');
      if (response.ok) {
        const data = await response.json();
        setListings(data);
      }
    } catch (error) {
      console.error('خطأ في تحميل الإعلانات:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedListings = async () => {
    try {
      const response = await fetch('/api/listings/featured');
      if (response.ok) {
        const data = await response.json();
        setFeaturedListings(data);
      }
    } catch (error) {
      console.error('خطأ في تحميل إعلانات الواجهة:', error);
    } finally {
      setFeaturedLoading(false);
    }
  };

  const fetchSpotlightListings = async () => {
    try {
      const response = await fetch('/api/listings/spotlight');
      if (response.ok) {
        const data = await response.json();
        setSpotlightListings(data);
      }
    } catch (error) {
      console.error('خطأ في تحميل الإعلانات المميزة:', error);
    } finally {
      setSpotlightLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-SY').format(price);
  };

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Category Toggle */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-gray-900"
        >
          <Bars3Icon className="h-5 w-5" />
          <span className="font-medium">التصنيفات</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex relative">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Desktop/Mobile Sidebar */}
          <div className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static top-0 right-0 h-full lg:h-auto w-80 bg-white border-r border-gray-200 z-50 lg:z-auto transition-transform duration-300 ease-in-out overflow-y-auto lg:overflow-visible`}>
            {/* Mobile Close Button */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">التصنيفات</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              {/* قائمة الفئات */}
              <div className="space-y-1">
                {leftMenuCategories.map((category, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() => toggleCategory(index)}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center">
                        <span className={`text-lg mr-3 ${category.color}`}>
                          {category.icon}
                        </span>
                        <div className="text-right">
                          <h3 className="text-sm font-medium text-gray-800">
                            {category.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            ({category.subcategories.length} فئة فرعية)
                          </p>
                        </div>
                      </div>
                      {expandedCategories.includes(index) ? (
                        <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    
                    {/* الفئات الفرعية */}
                    {expandedCategories.includes(index) && (
                      <div className="pl-10 pb-2 space-y-1">
                        {category.subcategories.map((sub, subIndex) => (
                          <Link
                            key={subIndex}
                            to={`/?category=${sub.name}`}
                            className="block py-1 px-2 text-xs text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors"
                            onClick={() => setSidebarOpen(false)}
                          >
                            {sub.name} <span className="text-gray-400">({sub.count})</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="flex-1 lg:p-6 p-4">
            {/* Spotlight İlanları */}
            {!spotlightLoading && spotlightListings.length > 0 && (
              <div className="mb-6 lg:mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg lg:text-xl font-bold text-gray-800 flex items-center">
                    <span className="ml-2">إعلانات مميزة</span> 💡
                  </h2>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-1 mb-6">
                  <div className="bg-white rounded-lg p-3 lg:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                      {spotlightListings.map((listing) => (
                        <Link
                          key={listing._id}
                          to={`/listing/${listing._id}`}
                          className="group bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg hover:shadow-lg transition-all duration-200 relative overflow-hidden"
                        >
                          {/* Spotlight Badge */}
                          <div className="absolute top-2 left-2 z-10">
                            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg animate-pulse">
                              💡 مميز
                            </span>
                          </div>
                          
                          <div className="relative overflow-hidden">
                            <img
                              src={listing.images[0] || 'https://via.placeholder.com/300x200'}
                              alt={listing.title}
                              className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            {user && (
                              <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50">
                                <span className="text-gray-400 text-sm">♡</span>
                              </button>
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-orange-600">
                              {listing.title}
                            </h3>
                            <p className="text-orange-600 font-bold text-sm lg:text-base mb-1">
                              {formatPrice(listing.price)} ل.س
                            </p>
                            <p className="text-gray-500 text-xs">{listing.location}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* واجهة الإعلانات */}
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h2 className="text-lg lg:text-xl font-bold text-gray-800">واجهة الصفحة الرئيسية</h2>
              <Link to="/discover" className="text-blue-600 hover:text-blue-700 text-sm">
                عرض الكل
              </Link>
            </div>

            {/* Vitrin Grid */}
            {featuredLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-500">جاري تحميل إعلانات الواجهة...</p>
              </div>
            ) : featuredListings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">لا توجد إعلانات واجهة حاليًا.</p>
                <p className="text-sm">لإظهار إعلانك في الواجهة، يمكنك شراء ترويج من صفحة الملف الشخصي.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
                {featuredListings.map((listing) => (
                  <Link
                    key={listing._id}
                    to={`/listing/${listing._id}`}
                    className="group bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 relative overflow-hidden"
                  >
                    {/* Promosyon Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold">
                        ✨ واجهة
                      </span>
                    </div>
                    
                    <div className="relative overflow-hidden">
                      <img
                        src={listing.images[0] || 'https://via.placeholder.com/300x200'}
                        alt={listing.title}
                        className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {user && (
                        <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50">
                          <span className="text-gray-400 text-sm">♡</span>
                        </button>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600">
                        {listing.title}
                      </h3>
                      <p className="text-orange-600 font-bold text-sm lg:text-base mb-1">
                        {formatPrice(listing.price)} ل.س
                      </p>
                      <p className="text-gray-500 text-xs mb-1">{listing.location}</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(listing.createdAt).toLocaleDateString('ar-SY')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* أحدث الإعلانات */}
            {listings.length > 0 && (
              <div className="mt-8 lg:mt-12">
                <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">أحدث الإعلانات</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
                  {listings.slice(0, 8).map((listing) => (
                    <Link
                      key={listing._id}
                      to={`/listing/${listing._id}`}
                      className="group bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 overflow-hidden"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={listing.images[0] || 'https://via.placeholder.com/300x200'}
                          alt={listing.title}
                          className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        {user && (
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              // Favorilere ekleme fonksiyonu
                            }}
                            className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"
                          >
                            <span className="text-gray-400 text-sm">♡</span>
                          </button>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600">
                          {listing.title}
                        </h3>
                        <p className="text-orange-600 font-bold text-sm lg:text-base mb-1">
                          {formatPrice(listing.price)} ل.س
                        </p>
                        <p className="text-gray-500 text-xs mb-1">{listing.location}</p>
                        <p className="text-gray-400 text-xs">
                          {new Date(listing.createdAt).toLocaleDateString('ar-SY')}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* معلومات إضافية */}
            <div className="mt-6 lg:mt-8 text-center">
              <p className="text-gray-500 text-sm">
                للمزيد من الإعلانات يمكنك إجراء <Link to="/search" className="text-blue-600 hover:underline">بحث مفصل</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 