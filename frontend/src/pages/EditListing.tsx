import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, PhotoIcon, XMarkIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';

// بيانات محلية سورية
const provinces = ['دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'دير الزور', 'الرقة', 'إدلب', 'درعا', 'السويداء', 'القنيطرة', 'طرطوس', 'القامشلي'];
const brands = [
  'تويوتا', 'رينو', 'فولكس واجن', 'فورد', 'فيات', 'هيونداي', 'بيجو', 'أوبل', 'هوندا', 'سيتروين',
  'بي إم دبليو', 'مرسيدس بنز', 'نيسان', 'كيا', 'داسيا', 'سكودا', 'سيات', 'أودي', 'مازدا', 'ميتسوبيشي',
  'سوزوكي', 'فولفو', 'شيفروليت', 'ميني', 'بورش', 'لاند روفر', 'جيب', 'لكزس', 'جاكوار', 'سوبارو',
  'تيسلا', 'ألفا روميو', 'تشيري', 'بي واي دي', 'جيلي', 'سمارت', 'ايسوزو', 'انفينيتي'
];
const series: Record<string, string[]> = {
  'تويوتا': ['كورولا', 'أوريس', 'ياريس', 'أفينسيس', 'كامري', 'راف4', 'هايلكس', 'سي-اتش آر', 'لاند كروزر', 'بريوس'],
  'رينو': ['كليو', 'ميجان', 'سيمبول', 'فلوانس', 'تاليسمان', 'كابتور', 'كادجار', 'كوليوس'],
  'فولكس واجن': ['جولف', 'باسات', 'بولو', 'جيتا', 'تيجوان', 'توران', 'كادي', 'ترانسبورتر'],
  'فورد': ['فوكوس', 'فييستا', 'مونديو', 'كوجا', 'سي-ماكس', 'بي-ماكس', 'إس-ماكس', 'جالاكسي'],
  'فيات': ['إيجيا', 'لينيا', 'بونتو', '500', 'باندا', 'دوبلو', 'فيورينو'],
  'هيونداي': ['i20', 'i30', 'أكسنت', 'إيلانترا', 'توكسون', 'سانتا في', 'كونا'],
  'بيجو': ['208', '308', '3008', '2008', '301', '508', '5008'],
  'أوبل': ['أسترا', 'كورسا', 'إنسيجنيا', 'موكا', 'زافيرا', 'فيكترا'],
  'هوندا': ['سيفيك', 'أكورد', 'جاز', 'سي آر-في', 'اتش آر-في'],
  'سيتروين': ['سي3', 'سي4', 'سي5', 'سي-إليزيه', 'برلينجو'],
  'بي إم دبليو': ['الفئة الأولى', 'الفئة الثانية', 'الفئة الثالثة', 'الفئة الرابعة', 'الفئة الخامسة', 'X1', 'X2', 'X3', 'X4', 'X5'],
  'مرسيدس بنز': ['الفئة أ', 'الفئة ب', 'الفئة سي', 'الفئة إي', 'الفئة إس', 'CLA', 'GLA', 'GLC', 'GLE'],
  'نيسان': ['قاشقاي', 'جوك', 'ميكرا', 'إكس-تريل', 'نوت', 'نافارا'],
  'كيا': ['سيد', 'ريو', 'سبورتاج', 'بيكانتو', 'سيراتو', 'سورنتو'],
  'داسيا': ['ساندرو', 'دستر', 'لوجان', 'لودجي'],
  'سكودا': ['أوكتافيا', 'سوبرب', 'فابيا', 'رابيد', 'سكالا'],
  'سيات': ['إيبيزا', 'ليون', 'أتيكا', 'أرونا', 'توليدو'],
  'أودي': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7'],
  'مازدا': ['2', '3', '6', 'CX-3', 'CX-5', 'CX-30'],
  'ميتسوبيشي': ['لانسر', 'ASX', 'أوتلاندر', 'إكليبس كروس'],
  'سوزوكي': ['سويفت', 'فيتارا', 'SX4', 'بالينو', 'جيمني'],
  'فولفو': ['S40', 'S60', 'S80', 'S90', 'V40', 'V60', 'XC40', 'XC60', 'XC90'],
  'شيفروليت': ['أفيو', 'كروز', 'كابتيفا', 'سبارك'],
  'ميني': ['كوبر', 'كنتريمان', 'كلوبمان'],
  'بورش': ['911', 'كايين', 'باناميرا', 'ماكان'],
  'لاند روفر': ['ديسكفري', 'رينج روفر', 'رينج روفر إيفوك', 'ديفندر'],
  'جيب': ['رينيجيد', 'كومباس', 'شيروكي', 'جراند شيروكي', 'رانجلر'],
  'لكزس': ['IS', 'GS', 'LS', 'NX', 'RX', 'UX'],
  'جاكوار': ['XE', 'XF', 'XJ', 'F-Pace', 'E-Pace'],
  'سوبارو': ['إمبريزا', 'فورستر', 'XV', 'أوتباك'],
  'تيسلا': ['موديل S', 'موديل 3', 'موديل X', 'موديل Y'],
};
const models: Record<string, string[]> = {
  'كورولا': ['1.4 ديزل', '1.6 بنزين', '1.33 بنزين', 'هايبرد'],
  'أوريس': ['1.33 بنزين', '1.4 ديزل', 'هايبرد'],
  'ياريس': ['1.0 بنزين', '1.33 بنزين', 'هايبرد'],
  'كليو': ['سيدان', 'هاتشباك', 'سبورت'],
  'ميجان': ['سيدان', 'هاتشباك', 'كوبيه'],
  'جولف': ['عادي', 'GTI', 'R'],
  'باسات': ['عادي', 'GTE'],
  'فوكوس': ['عادي', 'ST'],
  'فييستا': ['عادي', 'ST'],
  'إيجيا': ['1.3 ديزل', '1.4 بنزين', '1.6 ديزل'],
  'i20': ['1.2 بنزين', '1.4 ديزل', '1.0 تيربو'],
  '208': ['عادي', 'GT'],
  'أسترا': ['1.4 تيربو', '1.6 ديزل', '1.3 ديزل'],
  'سيفيك': ['1.6 بنزين', '1.5 تيربو', 'Eco', 'RS'],
  'كورسا': ['1.2 بنزين', '1.4 بنزين', '1.3 ديزل'],
  'سي3': ['1.2 بنزين', '1.6 ديزل'],
  'الفئة الثالثة': ['320i', '318i', '330i', '320d'],
  'الفئة أ': ['A180', 'A200', 'A250'],
  'قاشقاي': ['1.2 تيربو', '1.5 ديزل', '1.6 ديزل'],
  'سيد': ['1.6 ديزل', '1.4 بنزين'],
  'ساندرو': ['ستيب واي', 'عادي'],
  'أوكتافيا': ['1.6 ديزل', '1.0 تيربو', '1.5 تيربو'],
  'إيبيزا': ['1.0 تيربو', '1.6 ديزل'],
  'A3': ['سبورتباك', 'سيدان', 'كابريو'],
  '3': ['بنزين', 'ديزل'],
  'لانسر': ['عادي', 'مكثف'],
  'سويفت': ['1.2 بنزين', '1.0 تيربو'],
  'S60': ['T4', 'D4'],
  '911': ['كاريرا', 'تيربو', 'GT3'],
  'IS': ['200t', '300h'],
  'XE': ['2.0d', '2.0t'],
  'ديسكفري': ['سبورت', 'SE'],
  'أفيو': ['1.2 بنزين', '1.4 بنزين'],
  'إمبريزا': ['1.6i', '2.0i'],
  'كوبر': ['S', 'D'],
  'موديل S': ['المدى الطويل', 'بلايد'],
};
const years = Array.from({ length: 35 }, (_, i) => `${2024 - i}`);
const fuelTypes = ['بنزين', 'ديزل', 'غاز', 'بنزين وغاز', 'كهربائي', 'هايبرد'];
const gearTypes = ['يدوي', 'أوتوماتيك', 'نصف أوتوماتيك'];
const bodyTypes = ['سيدان', 'هاتشباك', 'SUV', 'كوبيه', 'كابريو', 'MPV', 'بيك أب', 'أخرى'];
const colors = ['أبيض', 'أسود', 'رمادي', 'أحمر', 'أزرق', 'أخضر', 'أصفر', 'بني', 'أخرى'];

const initialState = {
  province: '',
  brand: '',
  series: '',
  model: '',
  year: '',
  fuel: '',
  gear: '',
  km: '',
  body: '',
  color: '',
  price: '',
  description: '',
  images: [] as string[],
};

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/listings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setForm({
          province: data.province || '',
          brand: data.brand || '',
          series: data.series || '',
          model: data.model || '',
          year: data.year || '',
          fuel: data.fuel || '',
          gear: data.gear || '',
          km: data.km || '',
          body: data.body || '',
          color: data.color || '',
          price: data.price || '',
          description: data.description || '',
          images: data.images || [],
        });
        setPreviewUrl(data.images || []);
        setLoading(false);
      } catch {
        setError('لا يمكن الحصول على معلومات الإعلان.');
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  // Component unmount olduğunda blob URL'leri temizle
  useEffect(() => {
    return () => {
      previewUrl.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'brand') setForm(f => ({ ...f, series: '', model: '' }));
    if (e.target.name === 'series') setForm(f => ({ ...f, model: '' }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + previewUrl.length > 5) {
      setError('يمكنك رفع 5 صور كحد أقصى');
      return;
    }

    setUploadingImages(true);
    const newImages: string[] = [];
    const newPreviews: string[] = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setError('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
        continue;
      }

      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      
      newImages.push(base64);
      newPreviews.push(URL.createObjectURL(file));
    }

    setForm({ ...form, images: [...form.images, ...newImages] });
    setPreviewUrl([...previewUrl, ...newPreviews]);
    setUploadingImages(false);
  };

  const removeImage = (index: number) => {
    const newImages = form.images.filter((_, i) => i !== index);
    const newPreviews = previewUrl.filter((_, i) => i !== index);
    
    if (previewUrl[index].startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl[index]);
    }
    
    setForm({ ...form, images: newImages });
    setPreviewUrl(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/listings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      
      if (!res.ok) throw new Error('فشل التحديث');
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/profile?tab=listings');
      }, 1500);
    } catch {
      setError('فشل في تحديث الإعلان. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <PhotoIcon className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
          </div>
        </div>
        <p className="text-gray-600 mt-4 text-sm sm:text-base">جاري تحميل بيانات الإعلان...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/profile?tab=listings')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 ml-2" />
            <span className="text-sm sm:text-base">العودة إلى إعلاناتي</span>
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">تعديل الإعلان</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">قم بتحديث معلومات إعلانك لجذب المزيد من المشترين</p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Status Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <ExclamationCircleIcon className="w-5 h-5 text-red-500 mt-0.5 ml-3 flex-shrink-0" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 ml-3 flex-shrink-0" />
                <p className="text-green-800 text-sm">تم تحديث الإعلان بنجاح! جاري التوجيه...</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">المعلومات الأساسية</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      المحافظة <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="province"
                      value={form.province}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                    >
                      <option value="">اختر المحافظة</option>
                      {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الماركة <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="brand"
                      value={form.brand}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                    >
                      <option value="">اختر الماركة</option>
                      {brands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      السلسلة <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="series"
                      value={form.series}
                      onChange={handleChange}
                      required
                      disabled={!form.brand}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                    >
                      <option value="">اختر السلسلة</option>
                      {form.brand && series[form.brand]?.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الموديل <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="model"
                      value={form.model}
                      onChange={handleChange}
                      required
                      disabled={!form.series}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                    >
                      <option value="">اختر الموديل</option>
                      {form.series && models[form.series]?.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Vehicle Details Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">تفاصيل المركبة</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      السنة <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                    >
                      <option value="">اختر السنة</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع الوقود <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="fuel"
                      value={form.fuel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                    >
                      <option value="">اختر نوع الوقود</option>
                      {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ناقل الحركة <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gear"
                      value={form.gear}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                    >
                      <option value="">اختر ناقل الحركة</option>
                      {gearTypes.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الكيلومترات <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="km"
                      value={form.km}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="مثال: 50000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع الهيكل <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="body"
                      value={form.body}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                    >
                      <option value="">اختر نوع الهيكل</option>
                      {bodyTypes.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اللون <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="color"
                      value={form.color}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                    >
                      <option value="">اختر اللون</option>
                      {colors.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Price and Description Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">السعر والوصف</h2>
                <div className="space-y-4 sm:space-y-6">
                  <div className="max-w-xs">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      السعر (ل.س) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 pl-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder="0"
                      />
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        ل.س
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الوصف <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                      placeholder="اكتب وصفاً مفصلاً للمركبة..."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {form.description.length}/1000 حرف
                    </p>
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">الصور</h2>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={uploadingImages || previewUrl.length >= 5}
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <CloudArrowUpIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm sm:text-base text-gray-600 mb-1">
                        {uploadingImages ? 'جاري رفع الصور...' : 'اضغط لرفع الصور أو اسحبها هنا'}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        PNG, JPG, GIF - حد أقصى 5 ميجابايت لكل صورة
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {previewUrl.length}/5 صور
                      </p>
                    </label>
                  </div>

                  {previewUrl.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                      {previewUrl.map((url, index) => (
                        <div key={index} className="relative group aspect-square">
                          <img
                            src={url}
                            alt={`صورة ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              الصورة الرئيسية
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => navigate('/profile?tab=listings')}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm sm:text-base order-2 sm:order-1"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm sm:text-base order-1 sm:order-2"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري التحديث...
                    </span>
                  ) : 'تحديث الإعلان'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">نصائح لإعلان ناجح</h3>
          <ul className="text-sm text-blue-800 space-y-1.5 list-disc list-inside">
            <li>استخدم صور واضحة وعالية الجودة من زوايا مختلفة</li>
            <li>اكتب وصفاً دقيقاً يشمل جميع المميزات والعيوب</li>
            <li>حدد سعراً منافساً بناءً على حالة المركبة وسوق</li>
            <li>قم بتحديث الإعلان بانتظام لإبقائه في المقدمة</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditListing; 