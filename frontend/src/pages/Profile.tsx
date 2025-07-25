import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

interface Listing {
  _id: string;
  title: string;
  price: number;
  location: string;
  images: string[];
  createdAt: string;
  mainCategory?: string;
  featured?: boolean;
  featuredUntil?: string;
  promotionType?: string;
}

const tabTitles: Record<string, string> = {
  summary: 'ملخص خاص بي',
  listings: 'إعلاناتي',
  favorites: 'المفضلة',
  favorites2: 'المفضلة',
  messages: 'رسائلي',
  purchases: 'عمليات الشراء',
  sales: 'عمليات البيع',
  account: 'حسابي',
};

const Profile = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  
  // Route'a göre default tab belirle
  let defaultTab = 'summary';
  if (location.pathname === '/favorites') {
    defaultTab = 'favorites';
  } else if (location.pathname === '/messages') {
    defaultTab = 'messages';
  }
  
  const tab = params.get('tab') || defaultTab;
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: 'أحمد', text: 'مرحباً، هل إعلانك ما زال للبيع؟' },
    { id: 2, from: 'أنت', text: 'نعم، للبيع.' },
    { id: 3, from: 'أحمد', text: 'هل يمكن التفاوض على السعر؟' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [favoriteListings, setFavoriteListings] = useState<Listing[]>([]);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [promotionLoading, setPromotionLoading] = useState(false);

  const tabs = [
    { id: 'summary', label: 'ملخص خاص بي', icon: '👤' },
    { id: 'listings', label: 'إعلاناتي', icon: '📋' },
    { id: 'favorites', label: 'المفضلة', icon: '❤️' },
    { id: 'messages', label: 'رسائلي', icon: '💬' },
    { id: 'purchases', label: 'عمليات الشراء', icon: '🛍️' },
    { id: 'sales', label: 'عمليات البيع', icon: '💰' },
    { id: 'account', label: 'حسابي', icon: '⚙️' },
  ];

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
      return;
    }
  }, [token, user, navigate]);

  useEffect(() => {
    const fetchUserListings = async () => {
      if (tab === 'listings' && token) {
        try {
          setLoading(true);
          setError('');
          const response = await fetch('http://localhost:5000/api/users/me/listings', {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'حدث خطأ أثناء تحميل الإعلانات');
          }
          
          const data = await response.json();
          setListings(Array.isArray(data) ? data : []);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'حدث خطأ أثناء تحميل الإعلانات');
          setListings([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserListings();
  }, [tab, token]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (tab === 'favorites' && token) {
        try {
          setLoading(true);
          setError('');
          const response = await fetch('http://localhost:5000/api/users/favorites', {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'حدث خطأ أثناء تحميل المفضلة');
          }
          
          const data = await response.json();
          setFavoriteListings(Array.isArray(data) ? data : []);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'حدث خطأ أثناء تحميل المفضلة');
          setFavoriteListings([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [tab, token]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newId = Math.max(...messages.map(m => m.id)) + 1;
      setMessages([...messages, { id: newId, from: 'أنت', text: newMessage }]);
      setNewMessage('');
    }
  };

  const handlePromoteClick = (listing: Listing) => {
    setSelectedListing(listing);
    setShowPromotionModal(true);
  };

  const handlePromotePurchase = async (promotionType: string, duration: number) => {
    if (!selectedListing || !token) return;
    
    setPromotionLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/listings/${selectedListing._id}/promote`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ promotionType, duration })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`تم شراء الترويج بنجاح! تم دفع ${data.cost} ليرة سورية.`);
        setShowPromotionModal(false);
        setSelectedListing(null);
        
        // إعادة تحميل الإعلانات
        const updatedResponse = await fetch('http://localhost:5000/api/users/me/listings', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setListings(Array.isArray(updatedData) ? updatedData : []);
        }
      } else {
        alert(data.message || 'حدث خطأ أثناء شراء الترويج');
      }
    } catch (err) {
      alert('خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
    } finally {
      setPromotionLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">{tabTitles[tab] || 'الملف الشخصي'}</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static top-0 right-0 h-full w-64 bg-white shadow-lg z-50 lg:z-auto transition-transform duration-300 ease-in-out overflow-y-auto lg:overflow-visible`}>
          {/* Mobile Close Button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">القائمة</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {tabs.map((navTab) => (
              <Link
                key={navTab.id}
                to={`/profile?tab=${navTab.id}`}
                className={`flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition-colors ${
                  tab === navTab.id
                    ? 'bg-orange-50 text-orange-600 border-r-4 border-orange-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-lg">{navTab.icon}</span>
                <span className="font-medium">{navTab.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:mr-4 p-4 lg:p-6">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{tabTitles[tab] || 'الملف الشخصي'}</h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
              {error}
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            {tab === 'summary' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  </div>
                  {user.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                      <p className="text-gray-900 font-medium">{user.phone}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ التسجيل</label>
                    <p className="text-gray-900 font-medium">{dayjs(user.createdAt).format('DD MMMM YYYY')}</p>
                  </div>
                </div>
              </div>
            )}

            {tab === 'listings' && (
              <div>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">جاري تحميل إعلاناتك...</p>
                  </div>
                ) : listings.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📋</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد إعلانات</h3>
                    <p className="text-gray-600 mb-6">لم تقم بإنشاء أي إعلانات بعد</p>
                    <Link
                      to="/create-listing-wizard"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                    >
                      إنشاء إعلان جديد
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {listings.map((listing) => (
                      <div key={listing._id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow relative">
                        <Link to={`/listing/${listing._id}`} className="block">
                          <img
                            src={listing.images[0] || 'https://via.placeholder.com/400x300'}
                            alt={listing.title}
                            className="w-full h-32 sm:h-36 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{listing.title}</h3>
                          <p className="text-orange-600 font-bold text-lg mb-1">{listing.price.toLocaleString('ar-SY')} ل.س</p>
                          <p className="text-gray-600 text-sm">{listing.location}</p>
                        </Link>
                        
                        {/* Promotion Status */}
                        {listing.featured && (
                          <div className="mt-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              ✨ {listing.promotionType?.toUpperCase()} - نشط
                            </span>
                            {listing.featuredUntil && (
                              <p className="text-xs text-gray-500 mt-1">
                                النهاية: {new Date(listing.featuredUntil).toLocaleDateString('ar-SY')}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Link
                            to={`/edit-listing/${listing._id}`}
                            className="flex-1 min-w-0 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs text-center"
                          >
                            تحرير
                          </Link>
                          
                          {!listing.featured && (
                            <button
                              onClick={() => handlePromoteClick(listing)}
                              className="flex-1 min-w-0 px-3 py-1.5 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-xs"
                            >
                              ⭐ إبراز
                            </button>
                          )}
                          
                          <button
                            onClick={async () => {
                              if (window.confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
                                try {
                                  await fetch(`http://localhost:5000/api/listings/${listing._id}`, {
                                    method: 'DELETE',
                                    headers: { Authorization: `Bearer ${token}` },
                                  });
                                  setListings(listings.filter(l => l._id !== listing._id));
                                } catch {
                                  alert('فشلت عملية الحذف.');
                                }
                              }
                            }}
                            className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'favorites' && (
              <div>
                {favoriteListings.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">❤️</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مفضلات</h3>
                    <p className="text-gray-600">لم تقم بإضافة أي إعلانات للمفضلة بعد</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {favoriteListings.map((listing) => (
                      <Link
                        key={listing._id}
                        to={`/listing/${listing._id}`}
                        className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow block"
                      >
                        <img
                          src={listing.images[0] || 'https://via.placeholder.com/400x300'}
                          alt={listing.title}
                          className="w-full h-32 sm:h-36 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{listing.title}</h3>
                        <p className="text-orange-600 font-bold text-lg mb-1">{listing.price.toLocaleString('ar-SY')} ل.س</p>
                        <p className="text-gray-600 text-sm">{listing.location}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'messages' && (
              <div className="max-w-2xl mx-auto">
                <div className="h-64 sm:h-80 overflow-y-auto bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.from === 'أنت' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.from === 'أنت'
                              ? 'bg-orange-600 text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}
                        >
                          <p className="text-sm font-medium mb-1">{msg.from}</p>
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-right"
                    placeholder="اكتب رسالة..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    dir="rtl"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    إرسال
                  </button>
                </form>
              </div>
            )}

            {tab === 'purchases' && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🛍️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عمليات شراء</h3>
                <p className="text-gray-600">عمليات الشراء ستظهر هنا</p>
              </div>
            )}

            {tab === 'sales' && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">💰</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عمليات بيع</h3>
                <p className="text-gray-600">عمليات البيع ستظهر هنا</p>
              </div>
            )}

            {tab === 'account' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  </div>
                  {user.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                      <p className="text-gray-900 font-medium">{user.phone}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ التسجيل</label>
                    <p className="text-gray-900 font-medium">{dayjs(user.createdAt).format('DD MMMM YYYY')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
        
      {/* Promotion Modal */}
      {showPromotionModal && selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">أبرز إعلانك</h3>
                <button
                  onClick={() => {
                    setShowPromotionModal(false);
                    setSelectedListing(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">{selectedListing.title}</h4>
                <p className="text-orange-600 font-bold">{selectedListing.price.toLocaleString('ar-SY')} ليرة سورية</p>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:border-orange-500 cursor-pointer transition-colors"
                     onClick={() => handlePromotePurchase('vitrin', 7)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-gray-800">✨ واجهة</h5>
                      <p className="text-sm text-gray-600">يظهر في منطقة الواجهة بالصفحة الرئيسية</p>
                      <p className="text-xs text-gray-500 mt-1">لمدة 7 أيام</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">25 ليرة سورية</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:border-orange-500 cursor-pointer transition-colors"
                     onClick={() => handlePromotePurchase('kesfet', 7)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-gray-800">🔍 استكشف</h5>
                      <p className="text-sm text-gray-600">يتم إبرازه في صفحة الاستكشاف</p>
                      <p className="text-xs text-gray-500 mt-1">لمدة 7 أيام</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">50 ليرة سورية</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:border-orange-500 cursor-pointer transition-colors"
                     onClick={() => handlePromotePurchase('spotlight', 7)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-gray-800">💡 بقعة ضوء</h5>
                      <p className="text-sm text-gray-600">يظهر في الأعلى في جميع الصفحات</p>
                      <p className="text-xs text-gray-500 mt-1">لمدة 7 أيام</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">100 ليرة سورية</p>
                    </div>
                  </div>
                </div>
              </div>

              {promotionLoading && (
                <div className="mt-4 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto mb-2"></div>
                  <p className="text-gray-600">جاري تنفيذ العملية...</p>
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  بعد شراء الترويج سيبدأ إعلانك بالظهور في المنطقة المختارة.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 