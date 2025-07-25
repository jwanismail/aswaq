import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  mainCategory?: string;
  location: string;
  images: string[];
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    memberSince?: string;
  };
  createdAt: string;
  details?: {
    [key: string]: any;
  };
}

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('تفاصيل الإعلان');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { user } = useAuth();

  // بيانات إعلان تجريبية (ستأتي من API حقيقي)
  const mockListing: Listing = {
    _id: '1',
    title: 'أرض للبيع مع إطلالة رائعة على البحر',
    description: `السعر صالح لمدة 8 أشهر تقريباً، تم وضعه بشكل مناسب نظراً لضيق السوق، إذا انخفضت أسعار الفوائد سترتفع الأسعار للعلم، القيمة الحقيقية للأرض 30 مليون ويمكن فتح الباب عادة

ملاحظة: إذا كنت تريد قطعة أصغر يمكنني بيعها بمساحة 1.333,82م2 بسند منفصل

الأرض مرخصة للبناء وتبعد 2 كم بالضبط عن المركز، لا توجد تكاليف نقل تراب، الجدران مبنية جاهزة وتسلم كأرض فارغة جاهزة، من يراها عن قرب يفهم الفرق عن المثيلات لأن القطع السفلية والمحيطة ليس لها ترخيص بناء، الطرف المقابل للطريق هو قرية النلية، لأنها فريدة من نوعها بين المثيلات في موقع أخضر دائم وبإطلالة على البحر، أرض ستبقى قيمتها ولها مياه جارية من الجانبين - لا يمكن فهم قيمة هذه الأرض من خلال الإنترنت، تعال وانظر إليها في المكان

إذا كان الغرض سكني يمكن بناء 3 فيلات، وإذا كان لفندق بنغلات يمكن وضع 5 بنغلات بحديقة واسعة، هذا حسب الاختيار`,
    price: 25550000,
    category: 'عقارات',
    location: 'دمشق / المزة / حي المزة',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop'
    ],
    user: {
      _id: '1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '0 (932) 432 76 87',
      memberSince: 'أكتوبر 2021'
    },
    createdAt: '2025-01-17T10:00:00Z',
    details: {
      رقم_الإعلان: '1252736959',
      تاريخ_الإعلان: '17 يونيو 2025',
      نوع_العقار: 'أرض للبيع',
      وضع_التراخيص: 'سكني',
      المساحة_م2: '2.500',
      سعر_المتر: '10.220',
      رقم_الحوض: 'غير محدد',
      رقم_القطعة: 'غير محدد',
      رقم_الخارطة: 'غير محدد',
      معامل_البناء: 'غير محدد',
      ارتفاع_البناء: 'غير محدد',
      مناسب_للقرض: 'نعم',
      وضع_السند: 'سند منفصل',
      من_المالك: 'نعم',
      مقايضة: 'لا',
      // خصائص فئة العقارات
      كهرباء: true,
      ماء: true,
      هاتف: true,
      غاز_طبيعي: true,
      دراسة_تربة: true,
      طريق_مفتوح: true,
      قطعة_زاوية: true
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // أولاً جرب جلب البيانات من API الحقيقي
        const response = await fetch(`http://localhost:5000/api/listings/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log('البيانات القادمة من API:', data);
          
          // تحويل بيانات API إلى تنسيق الواجهة الأمامية
          const formattedListing = {
            ...data,
            category: data.mainCategory || data.category || 'عام',
            details: {
              رقم_الإعلان: data._id.slice(-8).toUpperCase(),
              تاريخ_الإعلان: new Date(data.createdAt).toLocaleDateString('ar-SY'),
              ...data.details,
              // تخطيط خاص لبيانات المركبات
              ...(data.vehicleDetails && {
                vehicleDetails: {
                  نوع_المركبة: data.subCategory,
                  الماركة: data.vehicleDetails.brand,
                  السلسلة: data.vehicleDetails.series,
                  الموديل: data.vehicleDetails.model,
                  السنة: data.vehicleDetails.year,
                  نوع_الوقود: data.vehicleDetails.fuel,
                  ناقل_الحركة: data.vehicleDetails.transmission,
                  الكيلومترات: data.vehicleDetails.mileage,
                  نوع_الهيكل: data.vehicleDetails.bodyType,
                  اللون: data.vehicleDetails.color,
                  حالة_الأضرار: data.vehicleDetails.damageRecord,
                  مقايضة: data.vehicleDetails.exchange === 'نعم'
                }
              }),
              // تخطيط خاص لبيانات العقارات
              ...(data.propertyDetails && {
                propertyDetails: {
                  نوع_العقار: data.propertyDetails.نوع_العقار || data.propertyDetails.propertyType,
                  نوع_الإعلان: data.propertyDetails.نوع_الإعلان || data.propertyDetails.listingType,
                  المساحة: data.propertyDetails.المساحة || data.propertyDetails.area,
                  عدد_الغرف: data.propertyDetails.عدد_الغرف || data.propertyDetails.roomCount,
                  عمر_البناء: data.propertyDetails.عمر_البناء || data.propertyDetails.buildingAge,
                  الطابق: data.propertyDetails.الطابق || data.propertyDetails.floor,
                  عدد_الطوابق: data.propertyDetails.عدد_الطوابق || data.propertyDetails.totalFloors,
                  التدفئة: data.propertyDetails.التدفئة || data.propertyDetails.heating,
                  مفروش: data.propertyDetails.مفروش || data.propertyDetails.furnished,
                  شرفة: data.propertyDetails.شرفة || data.propertyDetails.balcony,
                  مصعد: data.propertyDetails.مصعد || data.propertyDetails.elevator,
                  موقف_سيارات: data.propertyDetails.موقف_سيارات || data.propertyDetails.parking
                }
              }),
              // تخطيط خاص لبيانات المستعمل
              ...(data.usedItemDetails && {
                usedItemDetails: {
                  الفئة_الرئيسية: data.usedItemDetails.الفئة_الرئيسية || data.usedItemDetails.mainCategory,
                  الفئة_الفرعية: data.usedItemDetails.الفئة_الفرعية || data.usedItemDetails.subCategory,
                  حالة_المنتج: data.usedItemDetails.حالة_المنتج || data.usedItemDetails.itemCondition,
                  العلامة_التجارية: data.usedItemDetails.العلامة_التجارية || data.usedItemDetails.brand,
                  الموديل: data.usedItemDetails.الموديل || data.usedItemDetails.model,
                  الشحن_متاح: data.usedItemDetails.الشحن_متاح || data.usedItemDetails.shippingAvailable,
                  الضمان: data.usedItemDetails.الضمان || data.usedItemDetails.warrantyStatus,
                  إمكانية_المقايضة: data.usedItemDetails.إمكانية_المقايضة || data.usedItemDetails.exchangePossible
                }
              })
            }
          };
          
          setListing(formattedListing);
        } else {
          // إذا لم تأت البيانات من API استخدم البيانات التجريبية
          console.log('لا يمكن الحصول على البيانات من API، استخدام البيانات التجريبية');
          setListing(mockListing);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات الإعلان:', error);
        // في حالة الخطأ استخدم البيانات التجريبية
        setListing(mockListing);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">لم يتم العثور على الإعلان</h1>
          <Link to="/" className="text-orange-500 hover:underline">
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-SY').format(price);
  };

  const tabs = ['تفاصيل الإعلان', 'الموقع ومنظر الشارع'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* مسار التنقل */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex text-sm text-gray-600" dir="rtl">
            <Link to="/" className="hover:text-orange-500">الصفحة الرئيسية</Link>
            <span className="mx-2">‹</span>
            <Link to="/?category=عقارات" className="hover:text-orange-500">عقارات</Link>
            <span className="mx-2">‹</span>
            <Link to="/?category=أرض" className="hover:text-orange-500">أرض</Link>
            <span className="mx-2">‹</span>
            <Link to="/?category=للبيع" className="hover:text-orange-500">للبيع</Link>
            <span className="mx-2">‹</span>
            <Link to="/?location=دمشق" className="hover:text-orange-500">دمشق</Link>
            <span className="mx-2">‹</span>
            <Link to="/?location=المزة" className="hover:text-orange-500">المزة</Link>
            <span className="mx-2">‹</span>
            <span className="text-gray-400">حي المزة</span>
          </nav>
          
          <div className="flex items-center justify-between mt-4" dir="rtl">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/favorites" className="text-blue-600 hover:underline text-sm">
                إعلاناتي المفضلة
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/personalized" className="text-blue-600 hover:underline text-sm">
                إعلانات مخصصة لك
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-2">
            {/* صور الإعلان */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative">
                <img
                  src={listing.images[selectedImageIndex]}
                  alt={listing.title}
                  className="w-full h-96 object-cover"
                />
                <button className="absolute top-4 left-4 bg-white bg-opacity-75 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-opacity-100 transition-colors">
                  ⭐ أضف للمفضلة
                  </button>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {selectedImageIndex + 1} / {listing.images.length}
                </div>
              </div>
              
              {/* صور مصغرة */}
              <div className="p-4">
                <div className="flex space-x-2 space-x-reverse overflow-x-auto">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-orange-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
              </div>
              </div>
            </div>

            {/* معلومات الإعلان */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4" dir="rtl">
                <div>
                  <span className="text-gray-600">رقم الإعلان: <span className="text-red-600">#{listing.details?.رقم_الإعلان}</span></span>
                  <span className="text-gray-600 mr-4">تاريخ الإعلان: {listing.details?.تاريخ_الإعلان}</span>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {formatPrice(listing.price)} ل.س
                    </div>
                  <div className="text-sm text-gray-500">
                    {listing.details?.سعر_المتر && `${listing.details.سعر_المتر} ل.س / م²`}
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-3">{listing.title}</h1>
              
              <div className="flex items-center text-gray-600 text-sm mb-4" dir="rtl">
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 9v8h4v-6h6v6h4V9l-7-7z"/>
                </svg>
                {listing.location}
                  </div>
                  
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-orange-800 mb-2">معلومات مهمة</h3>
                <p className="text-orange-700 text-sm">
                  #{listing.details?.رقم_الإعلان}
                </p>
            </div>

              {/* التبويبات */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8 space-x-reverse" dir="rtl">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                </nav>
              </div>

              {/* محتوى التبويبات */}
              {activeTab === 'تفاصيل الإعلان' && (
                <div className="space-y-6">
                  {/* الوصف */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">الوصف</h3>
                    <div className="text-gray-700 leading-relaxed" dir="rtl">
                      {showFullDescription || listing.description.length <= 300 ? (
                        <p className="whitespace-pre-line">{listing.description}</p>
                      ) : (
                        <>
                          <p className="whitespace-pre-line">
                            {listing.description.substring(0, 300)}...
                          </p>
                          <button
                            onClick={() => setShowFullDescription(true)}
                            className="text-orange-600 hover:text-orange-700 font-medium mt-2"
                          >
                            اقرأ المزيد
                          </button>
                        </>
                        )}
                      </div>
                    </div>

                  {/* الخصائص */}
                  {listing.details && (listing.category === 'عقارات' || listing.category === 'املاك') && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">خصائص العقار</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* خصائص متوفرة */}
                        {listing.details.كهرباء && (
                          <div className="flex items-center">
                            <span className="text-green-500 ml-2">✓</span>
                            <span className="text-sm">كهرباء</span>
                                </div>
                              )}
                        {listing.details.ماء && (
                          <div className="flex items-center">
                            <span className="text-green-500 ml-2">✓</span>
                            <span className="text-sm">ماء</span>
                                </div>
                              )}
                        {listing.details.غاز_طبيعي && (
                          <div className="flex items-center">
                            <span className="text-green-500 ml-2">✓</span>
                            <span className="text-sm">غاز طبيعي</span>
                                </div>
                              )}
                        {listing.details.طريق_مفتوح && (
                          <div className="flex items-center">
                            <span className="text-green-500 ml-2">✓</span>
                            <span className="text-sm">طريق مفتوح</span>
                                </div>
                              )}
                        {listing.details.قطعة_زاوية && (
                          <div className="flex items-center">
                            <span className="text-green-500 ml-2">✓</span>
                            <span className="text-sm">قطعة زاوية</span>
                                </div>
                              )}
                      </div>
                                </div>
                              )}

                  {/* خصائص المركبة */}
                  {(listing.details?.vehicleDetails || (listing.category === 'مركبات' || listing.mainCategory === 'مركبات' || listing.category === 'vasita' || listing.mainCategory === 'vasita')) && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">تفاصيل المركبة</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" dir="rtl">
                          {(listing.details?.vehicleDetails?.الماركة || listing.details?.vehicleDetails?.brand) && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.vehicleDetails.الماركة || listing.details.vehicleDetails.brand}</span>
                              <span className="text-gray-600">الماركة:</span>
                                </div>
                              )}
                          {(listing.details?.vehicleDetails?.السلسلة || listing.details?.vehicleDetails?.series) && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.vehicleDetails.السلسلة || listing.details.vehicleDetails.series}</span>
                              <span className="text-gray-600">السلسلة:</span>
                                </div>
                              )}
                          {(listing.details?.vehicleDetails?.الموديل || listing.details?.vehicleDetails?.model) && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.vehicleDetails.الموديل || listing.details.vehicleDetails.model}</span>
                              <span className="text-gray-600">الموديل:</span>
                                </div>
                              )}
                          {(listing.details?.vehicleDetails?.السنة || listing.details?.vehicleDetails?.year) && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.vehicleDetails.السنة || listing.details.vehicleDetails.year}</span>
                              <span className="text-gray-600">سنة الصنع:</span>
                                </div>
                              )}
                          {(listing.details?.vehicleDetails?.نوع_الوقود || listing.details?.vehicleDetails?.fuel) && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.vehicleDetails.نوع_الوقود || listing.details.vehicleDetails.fuel}</span>
                              <span className="text-gray-600">نوع الوقود:</span>
                                </div>
                              )}
                          {(listing.details?.vehicleDetails?.ناقل_الحركة || listing.details?.vehicleDetails?.transmission) && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.vehicleDetails.ناقل_الحركة || listing.details.vehicleDetails.transmission}</span>
                              <span className="text-gray-600">ناقل الحركة:</span>
                                </div>
                              )}
                          {(listing.details?.vehicleDetails?.الكيلومترات || listing.details?.vehicleDetails?.mileage) && (
                            <div className="flex justify-between">
                              <span className="font-medium">{new Intl.NumberFormat('ar-SY').format(listing.details.vehicleDetails.الكيلومترات || listing.details.vehicleDetails.mileage)} كم</span>
                              <span className="text-gray-600">الكيلومترات:</span>
                                </div>
                              )}
                          {(listing.details?.vehicleDetails?.نوع_الهيكل || listing.details?.vehicleDetails?.bodyType) && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.vehicleDetails.نوع_الهيكل || listing.details.vehicleDetails.bodyType}</span>
                              <span className="text-gray-600">نوع الهيكل:</span>
                                </div>
                              )}
                          {(listing.details?.vehicleDetails?.اللون || listing.details?.vehicleDetails?.color) && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.vehicleDetails.اللون || listing.details.vehicleDetails.color}</span>
                              <span className="text-gray-600">اللون:</span>
                                </div>
                              )}
                          {(listing.details?.vehicleDetails?.حالة_الأضرار || listing.details?.vehicleDetails?.damageRecord) && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.vehicleDetails.حالة_الأضرار || listing.details.vehicleDetails.damageRecord}</span>
                              <span className="text-gray-600">حالة الأضرار:</span>
                                </div>
                              )}
                          {(listing.details?.vehicleDetails?.مقايضة !== undefined || listing.details?.vehicleDetails?.exchange !== undefined) && (
                            <div className="flex justify-between">
                              <span className="font-medium">
                                {listing.details.vehicleDetails.مقايضة !== undefined 
                                  ? (listing.details.vehicleDetails.مقايضة ? 'مقبول' : 'غير مقبول')
                                  : (listing.details.vehicleDetails.exchange === 'نعم' || listing.details.vehicleDetails.exchange === 'yes' ? 'مقبول' : 'غير مقبول')
                                }
                              </span>
                              <span className="text-gray-600">التبديل:</span>
                                </div>
                              )}
                            </div>
                          </div>
                                </div>
                              )}

                  {/* تفاصيل المركبة */}
                  {listing.details?.vehicleDetails && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                      <h3 className="font-bold text-lg mb-4">مواصفات المركبة</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(listing.details.vehicleDetails).map(([key, value]) => {
                          if (typeof value === 'boolean') {
                            value = value ? 'نعم' : 'لا';
                          }
                          return (
                            <div key={key} className="flex justify-between items-center border-b pb-2">
                              <span className="text-gray-600 font-medium">{key}:</span>
                              <span className="text-gray-900">{value?.toString() || '-'}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* تفاصيل العقار */}
                  {listing.details?.propertyDetails && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                      <h3 className="font-bold text-lg mb-4">مواصفات العقار</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(listing.details.propertyDetails).map(([key, value]) => {
                          if (typeof value === 'boolean') {
                            value = value ? 'نعم' : 'لا';
                          }
                          return (
                            <div key={key} className="flex justify-between items-center border-b pb-2">
                              <span className="text-gray-600 font-medium">{key}:</span>
                              <span className="text-gray-900">{value?.toString() || '-'}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* تفاصيل المستعمل */}
                  {listing.details?.usedItemDetails && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                      <h3 className="font-bold text-lg mb-4">مواصفات المنتج</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(listing.details.usedItemDetails).map(([key, value]) => {
                          if (typeof value === 'boolean') {
                            value = value ? 'نعم' : 'لا';
                          }
                          return (
                            <div key={key} className="flex justify-between items-center border-b pb-2">
                              <span className="text-gray-600 font-medium">{key}:</span>
                              <span className="text-gray-900">{value?.toString() || '-'}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* تفاصيل تقنية للعقارات */}
                  {listing.details && (listing.category === 'عقارات' || listing.category === 'املاك') && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">التفاصيل التقنية</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" dir="rtl">
                          {listing.details?.نوع_العقار && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.نوع_العقار}</span>
                              <span className="text-gray-600">نوع العقار:</span>
                                </div>
                              )}
                          {listing.details?.المساحة_م2 && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.المساحة_م2} م²</span>
                              <span className="text-gray-600">المساحة:</span>
                                </div>
                              )}
                          {listing.details?.وضع_التراخيص && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.وضع_التراخيص}</span>
                              <span className="text-gray-600">وضع التراخيص:</span>
                            </div>
                          )}
                          {listing.details?.وضع_السند && (
                            <div className="flex justify-between">
                              <span className="font-medium">{listing.details.وضع_السند}</span>
                              <span className="text-gray-600">وضع السند:</span>
                            </div>
                      )}
                        </div>
                    </div>
                    </div>
                  )}
                  </div>
                )}

              {activeTab === 'الموقع ومنظر الشارع' && (
                <div className="space-y-6">
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <span className="text-gray-500">خريطة الموقع ستظهر هنا</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <span className="text-gray-500">منظر الشارع سيظهر هنا</span>
                    </div>
                  </div>
                )}
              </div>

            {/* بلاغ عن الإعلان */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <button className="flex items-center text-red-600 hover:text-red-700 text-sm">
                🚨 لديّ شكوى حول هذا الإعلان
              </button>
            </div>
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6">
            {/* معلومات البائع */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات البائع</h3>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {listing.user.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-800">{listing.user.name}</div>
                  <div className="text-sm text-gray-500">عضو منذ {listing.user.memberSince}</div>
                </div>
                  </div>

              {listing.user.phone && (
                <div className="mb-4 space-y-2">
                  {/* WhatsApp butonu */}
                  <button 
                    onClick={() => {
                      // Telefon numarasını temizle ve WhatsApp formatına çevir
                      const cleanPhone = listing.user.phone?.replace(/\D/g, '') || '';
                      const whatsappPhone = cleanPhone.startsWith('0') ? `963${cleanPhone.slice(1)}` : cleanPhone;
                      const message = `مرحباً، أنا مهتم بالإعلان: ${listing.title} - رقم الإعلان: ${listing.details?.رقم_الإعلان}`;
                      window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    💬 WhatsApp {listing.user.phone}
                  </button>
                  
                  {/* زر الاتصال */}
                  <button 
                    onClick={() => {
                      const cleanPhone = listing.user.phone?.replace(/\D/g, '') || '';
                      window.open(`tel:${cleanPhone}`, '_self');
                    }}
                    className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
                  >
                    📞 اتصل {listing.user.phone}
                  </button>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <button className="w-full text-right p-2 hover:bg-gray-50 rounded transition-colors" dir="rtl">
                  💬 أرسل رسالة
                </button>
                <button className="w-full text-right p-2 hover:bg-gray-50 rounded transition-colors" dir="rtl">
                  ⭐ إعلانات أخرى لهذا البائع
                </button>
                <button className="w-full text-right p-2 hover:bg-gray-50 rounded transition-colors" dir="rtl">
                  📋 تقييمات وتعليقات
                </button>
              </div>
            </div>

            {/* أدوات الإعلان */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">أدوات الإعلان</h3>
              
              <div className="space-y-3">
                <button className="w-full text-right p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" dir="rtl">
                  🔗 شارك الإعلان
                </button>
                <button className="w-full text-right p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" dir="rtl">
                  📊 إحصائيات الإعلان
                </button>
                <button className="w-full text-right p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" dir="rtl">
                  💰 احسب القرض
                  </button>
              </div>
            </div>

            {/* إعلانات مشابهة */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">إعلانات مشابهة</h3>
              
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="flex">
                      <img 
                        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=80&fit=crop" 
                        alt="إعلان مشابه" 
                        className="w-16 h-12 object-cover rounded ml-3"
                      />
                      <div className="flex-1" dir="rtl">
                        <h4 className="text-sm font-medium text-gray-800 mb-1">أرض للبيع في منطقة مميزة</h4>
                        <p className="text-xs text-gray-500 mb-1">دمشق / المزة</p>
                        <p className="text-sm font-bold text-orange-600">15,000,000 ل.س</p>
                      </div>
                    </div>
              </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium">
                عرض المزيد من الإعلانات المشابهة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail; 