import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon, ArrowLeftIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

// الفئات الرئيسية
const mainCategories = [
  {
    id: 'emlak',
    name: 'عقارات',
    icon: '🏠',
    color: 'bg-yellow-500',
    description: 'سكن، مكان عمل، أرض'
  },
  {
    id: 'vasita',
    name: 'مركبات',
    icon: '🚗',
    color: 'bg-blue-500',
    description: 'سيارات، دراجات نارية، تجارية'
  },
  {
    id: 'ikinci-el',
    name: 'تسوق مستعمل',
    icon: '📱',
    color: 'bg-purple-500',
    description: 'هواتف، كمبيوتر، إلكترونيات'
  }
];

const CreateListingWizard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [step, setStep] = useState(0);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setStep(1);
  };

  const handleBackToCategories = () => {
    setSelectedCategory('');
    setStep(0);
  };

  if (step === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">نشر إعلان</h1>
          <p className="text-gray-600">في أي فئة تريد نشر إعلان؟</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className="group p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0`}>
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-orange-500 flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            بعد اختيار الفئة، سيتم طلب المعلومات التفصيلية خطوة بخطوة.
          </p>
        </div>
      </div>
    );
  }

  // عرض النموذج حسب الفئة المختارة
  if (selectedCategory === 'vasita') {
    return <VasitaForm onBack={handleBackToCategories} />;
  } else if (selectedCategory === 'emlak') {
    return <EmlaklarForm onBack={handleBackToCategories} />;
  } else if (selectedCategory === 'ikinci-el') {
    return <IkinciElForm onBack={handleBackToCategories} />;
  } else {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={handleBackToCategories}
          className="flex items-center text-orange-600 hover:text-orange-700 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          العودة إلى اختيار الفئة
        </button>
        <h2 className="text-2xl font-bold mb-4">نموذج إعلان {selectedCategory}</h2>
        <p className="text-gray-600">النموذج لهذه الفئة لم يتم إعداده بعد.</p>
      </div>
    );
  }
};

// مكون نموذج المركبة
const VasitaForm = ({ onBack }: { onBack: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    subCategory: '',
    brand: '',
    series: '',
    model: '',
    year: '',
    fuel: '',
    transmission: '',
    mileage: '',
    bodyType: '',
    color: '',
    damageRecord: '',
    exchange: '',
    price: '',
    priceType: 'fixed',
    description: '',
    location: {
      city: '',
      district: ''
    },
    contact: {
      name: '',
      phone: ''
    },
    images: [] as File[]
  });

  const steps = [
    'نوع المركبة',
    'اختيار العلامة التجارية', 
    'السلسلة والطراز',
    'تفاصيل المركبة',
    'الصور',
    'السعر والوصف',
    'الموقع والمعاينة'
  ];

  const vasitaTypes = [
    { id: 'otomobil', name: 'سيارة', icon: '🚗' },
    { id: 'arazi-suv', name: 'دفع رباعي، SUV وبيك أب', icon: '🚙' },
    { id: 'motosiklet', name: 'دراجة نارية', icon: '🏍️' },
    { id: 'minivan', name: 'ميني فان وبانل فان', icon: '🚐' }
  ];

  const carBrands = [
    'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 'Honda', 
    'Nissan', 'Ford', 'Hyundai', 'Kia', 'Mazda', 'Peugeot', 'Renault', 
    'Citroën', 'Fiat', 'Opel', 'Skoda', 'Seat', 'Volvo', 'Suzuki'
  ];

  const fuelTypes = ['بنزين', 'ديزل', 'غاز وبنزين', 'هجين', 'كهربائي'];
  const transmissionTypes = ['يدوي', 'أوتوماتيك', 'نصف أوتوماتيك'];
  const bodyTypes = ['سيدان', 'هاتشباك', 'SUV', 'كوبيه', 'ستيشن واغن', 'كابريو'];
  const colors = ['أبيض', 'أسود', 'رمادي', 'أحمر', 'أزرق', 'أخضر', 'أصفر', 'أخرى'];
  const cities = ['دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'طرطوس', 'درعا', 'أخرى'];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'متوفر' : 'غير متوفر');
      
      if (!token) {
        alert('يرجى تسجيل الدخول أولاً!');
        return;
      }

      // تحويل الصور إلى Base64
      const imagePromises = formData.images.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      console.log('جار تحويل الصور إلى Base64...');
      const imageBase64Array = await Promise.all(imagePromises);
      console.log(`تم تحويل ${imageBase64Array.length} صورة إلى تنسيق Base64`);

      // تحويل بيانات النموذج إلى التنسيق المناسب للخادم
      const listingData = {
        title: `${formData.year} ${formData.brand} ${formData.series} ${formData.model}`,
        description: formData.description,
        price: parseInt(formData.price),
        location: formData.location.city + (formData.location.district ? ` / ${formData.location.district}` : ''),
        mainCategory: 'مركبات',
        category: 'مركبات',
        subCategory: formData.subCategory,
        images: imageBase64Array, // إضافة الصور بتنسيق Base64
        // حقول خاصة للمعلومات الإضافية
        vehicleDetails: {
          brand: formData.brand,
          series: formData.series,
          model: formData.model,
          year: parseInt(formData.year),
          fuel: formData.fuel,
          transmission: formData.transmission,
          mileage: parseInt(formData.mileage),
          bodyType: formData.bodyType,
          color: formData.color,
          damageRecord: formData.damageRecord,
          exchange: formData.exchange,
          // إضافة الحقول بالأسماء العربية أيضاً
          الماركة: formData.brand,
          السلسلة: formData.series,
          الموديل: formData.model,
          السنة: parseInt(formData.year),
          نوع_الوقود: formData.fuel,
          ناقل_الحركة: formData.transmission,
          الكيلومترات: parseInt(formData.mileage),
          نوع_الهيكل: formData.bodyType,
          اللون: formData.color,
          حالة_الأضرار: formData.damageRecord,
          مقايضة: formData.exchange === 'نعم'
        },
        contact: formData.contact,
        priceType: formData.priceType
      };

      console.log('البيانات المرسلة:', { ...listingData, images: `${listingData.images.length} صورة` });
      console.log('رابط الخادم:', 'http://localhost:5000/api/listings');

      const response = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(listingData)
      });

      console.log('حالة الاستجابة:', response.status);
      console.log('نجح الطلب:', response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.log('بيانات الخطأ:', errorData);
        throw new Error(errorData.message || 'لا يمكن إنشاء الإعلان');
      }

      const result = await response.json();
      console.log('نتيجة ناجحة:', result);
      alert('تم إنشاء الإعلان بنجاح!');
      
      // توجيه إلى صفحة تفاصيل الإعلان
      window.location.href = `/listing/${result._id}`;
      
    } catch (error) {
      console.error('خطأ في إنشاء الإعلان:', error);
      
      // فحص خطأ الاتصال
      if (error instanceof TypeError && error.message.includes('fetch')) {
        alert('خطأ في الاتصال بالخادم! تحقق من تشغيل الخادم.');
      } else {
        alert('حدث خطأ أثناء إنشاء الإعلان: ' + (error instanceof Error ? error.message : 'خطأ غير معروف'));
      }
    }
  };

  // وظائف تحميل الصور
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // فحص الحد الأقصى للصور 10
    const currentImages = formData.images;
    const totalImages = currentImages.length + files.length;
    
    if (totalImages > 10) {
      alert('يمكنك تحميل حد أقصى 10 صور!');
      return;
    }

    // فحص حجم الملف (5MB كحد أقصى)
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('يجب أن تكون الصور أقل من 5MB!');
      return;
    }

    // فحص نوع الملف
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      alert('يمكنك تحميل ملفات الصور فقط!');
      return;
    }

    setFormData({
      ...formData,
      images: [...currentImages, ...files]
    });
  };

  const handleImageRemove = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const handleImageReorder = (dragIndex: number, hoverIndex: number) => {
    const newImages = [...formData.images];
    const draggedImage = newImages[dragIndex];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, draggedImage);
    
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">اختر نوع المركبة</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vasitaTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({...formData, subCategory: type.id})}
                  className={`p-4 border-2 rounded-lg text-center transition-colors hover:border-orange-500 ${
                    formData.subCategory === type.id 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium">{type.name}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">اختر العلامة التجارية</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
              {carBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setFormData({...formData, brand})}
                  className={`p-3 border rounded-lg text-sm font-medium transition-colors hover:border-orange-500 ${
                    formData.brand === brand 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">أدخل معلومات السلسلة والطراز</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السلسلة</label>
                <input
                  type="text"
                  placeholder="مثال: A4, 3 Series, Civic"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.series}
                  onChange={(e) => setFormData({...formData, series: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الطراز</label>
                <input
                  type="text"
                  placeholder="مثال: 2.0 TDI, 320i, 1.6 VTEC"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">تفاصيل المركبة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">سنة الطراز</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                >
                  <option value="">اختر</option>
                  {Array.from({length: 30}, (_, i) => 2024 - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع الوقود</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  value={formData.fuel}
                  onChange={(e) => setFormData({...formData, fuel: e.target.value})}
                >
                  <option value="">اختر</option>
                  {fuelTypes.map(fuel => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع ناقل الحركة</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  value={formData.transmission}
                  onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                >
                  <option value="">اختر</option>
                  {transmissionTypes.map(trans => (
                    <option key={trans} value={trans}>{trans}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المسافة المقطوعة</label>
                <input
                  type="number"
                  placeholder="KM"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  value={formData.mileage}
                  onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع الهيكل</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  value={formData.bodyType}
                  onChange={(e) => setFormData({...formData, bodyType: e.target.value})}
                >
                  <option value="">اختر</option>
                  {bodyTypes.map(body => (
                    <option key={body} value={body}>{body}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللون</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  value={formData.color}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                >
                  <option value="">اختر</option>
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">سجل الأضرار</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="damageRecord"
                      value="yok"
                      checked={formData.damageRecord === 'yok'}
                      onChange={(e) => setFormData({...formData, damageRecord: e.target.value})}
                      className="mr-2"
                    />
                    لا يوجد
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="damageRecord"
                      value="var"
                      checked={formData.damageRecord === 'var'}
                      onChange={(e) => setFormData({...formData, damageRecord: e.target.value})}
                      className="mr-2"
                    />
                    يوجد
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">التبديل</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="exchange"
                      value="evet"
                      checked={formData.exchange === 'evet'}
                      onChange={(e) => setFormData({...formData, exchange: e.target.value})}
                      className="mr-2"
                    />
                    نعم
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="exchange"
                      value="hayir"
                      checked={formData.exchange === 'hayir'}
                      onChange={(e) => setFormData({...formData, exchange: e.target.value})}
                      className="mr-2"
                    />
                    لا
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">إضافة الصور</h3>
            <p className="text-gray-600">أضف صور مركبتك (بحد أقصى 10 صور، كل واحدة أقل من 5MB)</p>
            
            {/* منطقة تحميل الصور */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={formData.images.length >= 10}
              />
              <label
                htmlFor="image-upload"
                className={`cursor-pointer flex flex-col items-center ${formData.images.length >= 10 ? 'opacity-50' : ''}`}
              >
                <div className="text-4xl mb-4">📷</div>
                <div className="text-lg font-medium text-gray-700 mb-2">
                  {formData.images.length >= 10 ? 'وصلت إلى الحد الأقصى لعدد الصور' : 'اختر الصور أو اسحبها'}
                </div>
                <div className="text-sm text-gray-500">
                  تم تحميل {formData.images.length}/10 صورة
                </div>
              </label>
            </div>

            {/* عرض الصور المحملة */}
            {formData.images.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">الصور المحملة</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`صورة المركبة ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      {/* علامة الصورة الرئيسية */}
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                          الصورة الرئيسية
                        </div>
                      )}
                      {/* زر الحذف */}
                      <button
                        onClick={() => handleImageRemove(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                      {/* أزرار تغيير الترتيب */}
                      <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {index > 0 && (
                          <button
                            onClick={() => handleImageReorder(index, index - 1)}
                            className="bg-gray-800 text-white rounded text-xs px-2 py-1"
                          >
                            ←
                          </button>
                        )}
                        {index < formData.images.length - 1 && (
                          <button
                            onClick={() => handleImageReorder(index, index + 1)}
                            className="bg-gray-800 text-white rounded text-xs px-2 py-1"
                          >
                            →
                          </button>
                        )}
                      </div>
                      <div className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  💡 نصيحة: الصورة الأولى ستظهر كصورة رئيسية. استخدم أزرار الأسهم لتغيير ترتيب الصور.
                </div>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">السعر والوصف</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السعر (ل.س)</label>
                <input
                  type="number"
                  placeholder="أدخل السعر"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع السعر</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceType"
                      value="fixed"
                      checked={formData.priceType === 'fixed'}
                      onChange={(e) => setFormData({...formData, priceType: e.target.value})}
                      className="mr-2"
                    />
                    ثابت
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceType"
                      value="negotiable"
                      checked={formData.priceType === 'negotiable'}
                      onChange={(e) => setFormData({...formData, priceType: e.target.value})}
                      className="mr-2"
                    />
                    قابل للتفاوض
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
              <textarea
                rows={6}
                placeholder="قدم معلومات مفصلة عن مركبتك..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">الموقع والاتصال</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المحافظة</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    value={formData.location.city}
                    onChange={(e) => setFormData({
                      ...formData, 
                      location: {...formData.location, city: e.target.value}
                    })}
                  >
                    <option value="">اختر المحافظة</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                  <input
                    type="text"
                    placeholder="أدخل المدينة"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    value={formData.location.district}
                    onChange={(e) => setFormData({
                      ...formData, 
                      location: {...formData.location, district: e.target.value}
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم التواصل</label>
                  <input
                    type="text"
                    placeholder="اسمك"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    value={formData.contact.name}
                    onChange={(e) => setFormData({
                      ...formData, 
                      contact: {...formData.contact, name: e.target.value}
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الهاتف</label>
                  <input
                    type="tel"
                    placeholder="09XX XXX XXX"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    value={formData.contact.phone}
                    onChange={(e) => setFormData({
                      ...formData, 
                      contact: {...formData.contact, phone: e.target.value}
                    })}
                  />
                </div>
              </div>
            </div>

            {/* قسم المعاينة */}
            <div>
              <h3 className="text-xl font-semibold mb-6">معاينة الإعلان</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h4 className="font-bold text-xl mb-4 text-gray-900">
                  {formData.year} {formData.brand} {formData.series} {formData.model}
                </h4>
                
                {/* عرض الحقول المملوءة فقط */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-6">
                  {formData.subCategory && <div><strong>الفئة:</strong> {formData.subCategory}</div>}
                  {formData.fuel && <div><strong>الوقود:</strong> {formData.fuel}</div>}
                  {formData.transmission && <div><strong>ناقل الحركة:</strong> {formData.transmission}</div>}
                  {formData.mileage && <div><strong>KM:</strong> {parseInt(formData.mileage).toLocaleString()} km</div>}
                  {formData.color && <div><strong>اللون:</strong> {formData.color}</div>}
                  {formData.bodyType && <div><strong>الهيكل:</strong> {formData.bodyType}</div>}
                  {formData.damageRecord && <div><strong>الأضرار:</strong> {formData.damageRecord}</div>}
                  {formData.exchange && <div><strong>التبديل:</strong> {formData.exchange}</div>}
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-orange-600">
                    {formData.price ? `${parseInt(formData.price).toLocaleString()} ل.س` : 'لم يتم تحديد السعر'}
                    {formData.priceType === 'negotiable' && (
                      <span className="text-lg text-gray-500 ml-2">(قابل للتفاوض)</span>
                    )}
                  </div>
                </div>

                {(formData.location.city || formData.location.district) && (
                  <div className="mb-4">
                    <strong>الموقع:</strong> {formData.location.city} {formData.location.district && `/ ${formData.location.district}`}
                  </div>
                )}

                {(formData.contact.name || formData.contact.phone) && (
                  <div className="mb-4">
                    <strong>التواصل:</strong> {formData.contact.name} {formData.contact.phone && `- ${formData.contact.phone}`}
                  </div>
                )}

                {formData.description && (
                  <div className="mb-4">
                    <strong>الوصف:</strong>
                    <p className="mt-2 text-gray-700 whitespace-pre-wrap">{formData.description}</p>
                  </div>
                )}

                {formData.images.length > 0 && (
                  <div className="mb-4">
                    <strong>الصور:</strong> {formData.images.length} صورة
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {formData.images.slice(0, 8).map((image, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={`معاينة ${index + 1}`}
                          className="w-full h-16 object-cover rounded border"
                        />
                      ))}
                      {formData.images.length > 8 && (
                        <div className="w-full h-16 bg-gray-200 rounded border flex items-center justify-center text-sm text-gray-600">
                          +{formData.images.length - 8}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-4">
                <h5 className="font-medium text-yellow-800 mb-2">تحقق قبل نشر الإعلان:</h5>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• هل جميع المعلومات صحيحة؟</li>
                  <li>• هل معلومات التواصل محدثة؟</li>
                  <li>• هل معلومات السعر صحيحة؟</li>
                  <li>• هل مواصفات المركبة مكتملة؟</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center text-orange-600 hover:text-orange-700 mb-2"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            العودة إلى اختيار الفئة
          </button>
          <h1 className="text-3xl font-bold text-gray-900">نشر إعلان مركبة</h1>
        </div>
        <div className="text-sm text-gray-500">
          الخطوة {currentStep} / {steps.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 < currentStep
                    ? 'bg-green-500 text-white'
                    : index + 1 === currentStep
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1 < currentStep ? <CheckIcon className="w-4 h-4" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          {steps.map((step, index) => (
            <span key={index} className={index === 0 || index === steps.length - 1 ? '' : 'text-center'}>
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg border p-8 mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-medium ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          السابق
        </button>

        {currentStep === steps.length ? (
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
          >
            نشر الإعلان
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700"
          >
            التالي
          </button>
        )}
      </div>
    </div>
  );
};

// نموذج العقارات (مؤقت)
const EmlaklarForm = ({ onBack }: { onBack: () => void }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    listingType: 'sale', // sale veya rent
    title: '',
    description: '',
    price: '',
    priceType: 'fixed',
    area: '',
    roomCount: '',
    buildingAge: '',
    floor: '',
    totalFloors: '',
    heating: '',
    furnished: '',
    balcony: '',
    elevator: '',
    parking: '',
    location: {
      city: '',
      district: '',
      neighborhood: ''
    },
    contact: {
      name: '',
      phone: ''
    },
    images: [] as File[]
  });

  const steps = [
    'نوع العقار',
    'نوع الإعلان',
    'المعلومات الأساسية',
    'تفاصيل العقار',
    'المميزات',
    'الصور',
    'الموقع والاتصال'
  ];

  const propertyTypes = [
    { id: 'apartment', name: 'شقة', icon: '🏢' },
    { id: 'villa', name: 'فيلا', icon: '🏡' },
    { id: 'land', name: 'أرض', icon: '🏞️' },
    { id: 'commercial', name: 'محل تجاري', icon: '🏪' },
    { id: 'office', name: 'مكتب', icon: '🏢' },
    { id: 'building', name: 'بناء كامل', icon: '🏗️' },
    { id: 'farm', name: 'مزرعة', icon: '🌾' },
    { id: 'warehouse', name: 'مستودع', icon: '📦' }
  ];

  const cities = ['دمشق', 'ريف دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'طرطوس', 'درعا', 'السويداء', 'القنيطرة', 'دير الزور', 'الرقة', 'الحسكة', 'إدلب'];
  
  const heatingTypes = ['مركزي', 'أرضي', 'مكيفات', 'صوبة غاز', 'صوبة مازوت', 'بدون تدفئة'];
  const roomOptions = ['1+0', '1+1', '2+1', '3+1', '4+1', '4+2', '5+1', '5+2', '6+1', 'أكثر'];
  const buildingAges = ['0-1 سنة', '2-5 سنوات', '6-10 سنوات', '11-15 سنة', '16-20 سنة', '21-30 سنة', 'أكثر من 30 سنة'];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 10) {
      alert('يمكنك تحميل حد أقصى 10 صور!');
      return;
    }
    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    });
  };

  const handleImageRemove = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('يرجى تسجيل الدخول أولاً!');
        return;
      }

      // تحويل الصور إلى Base64
      const imagePromises = formData.images.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const imageBase64Array = await Promise.all(imagePromises);

      const listingData = {
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        location: `${formData.location.city}${formData.location.district ? ' / ' + formData.location.district : ''}${formData.location.neighborhood ? ' / ' + formData.location.neighborhood : ''}`,
        mainCategory: 'عقارات',
        category: 'عقارات',
        subCategory: formData.propertyType,
        images: imageBase64Array,
        // حقول خاصة بالعقارات
        propertyDetails: {
          propertyType: formData.propertyType,
          listingType: formData.listingType,
          area: parseInt(formData.area),
          roomCount: formData.roomCount,
          buildingAge: formData.buildingAge,
          floor: formData.floor ? parseInt(formData.floor) : null,
          totalFloors: formData.totalFloors ? parseInt(formData.totalFloors) : null,
          heating: formData.heating,
          furnished: formData.furnished,
          balcony: formData.balcony === 'yes',
          elevator: formData.elevator === 'yes',
          parking: formData.parking === 'yes',
          // إضافة الحقول بالأسماء العربية أيضاً
          نوع_العقار: formData.propertyType === 'apartment' ? 'شقة' : 
                    formData.propertyType === 'villa' ? 'فيلا' :
                    formData.propertyType === 'land' ? 'أرض' :
                    formData.propertyType === 'commercial' ? 'محل تجاري' :
                    formData.propertyType === 'office' ? 'مكتب' :
                    formData.propertyType === 'building' ? 'بناء كامل' :
                    formData.propertyType === 'farm' ? 'مزرعة' : 'مستودع',
          نوع_الإعلان: formData.listingType === 'sale' ? 'بيع' : 'إيجار',
          المساحة: parseInt(formData.area),
          عدد_الغرف: formData.roomCount,
          عمر_البناء: formData.buildingAge,
          الطابق: formData.floor,
          عدد_الطوابق: formData.totalFloors,
          التدفئة: formData.heating,
          مفروش: formData.furnished === 'yes' ? 'نعم' : formData.furnished === 'partial' ? 'جزئياً' : 'لا',
          شرفة: formData.balcony === 'yes' ? 'نعم' : 'لا',
          مصعد: formData.elevator === 'yes' ? 'نعم' : 'لا',
          موقف_سيارات: formData.parking === 'yes' ? 'نعم' : 'لا'
        },
        contact: formData.contact,
        priceType: formData.priceType
      };

      const response = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(listingData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'لا يمكن إنشاء الإعلان');
      }

      const result = await response.json();
      alert('تم إنشاء الإعلان بنجاح!');
      window.location.href = `/listing/${result._id}`;
      
    } catch (error) {
      console.error('خطأ في إنشاء الإعلان:', error);
      alert('حدث خطأ أثناء إنشاء الإعلان: ' + (error instanceof Error ? error.message : 'خطأ غير معروف'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <button
        onClick={onBack}
        className="flex items-center text-orange-600 hover:text-orange-700 mb-4"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        العودة إلى اختيار الفئة
      </button>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 text-center">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-full flex items-center justify-center text-sm sm:text-base ${
                index + 1 === currentStep 
                  ? 'bg-orange-600 text-white' 
                  : index + 1 < currentStep 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1 < currentStep ? <CheckIcon className="w-5 h-5" /> : index + 1}
              </div>
              <p className={`mt-2 text-xs sm:text-sm ${
                index + 1 === currentStep ? 'text-orange-600 font-medium' : 'text-gray-500'
              } hidden sm:block`}>
                {step}
              </p>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
          <div 
            className="absolute top-0 left-0 h-2 bg-orange-600 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        {/* Step 1: Property Type */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">اختر نوع العقار</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">ما نوع العقار الذي تريد الإعلان عنه؟</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({ ...formData, propertyType: type.id })}
                  className={`p-4 border-2 rounded-lg text-center hover:border-orange-500 transition-colors ${
                    formData.propertyType === type.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-2xl sm:text-3xl mb-2">{type.icon}</div>
                  <p className="font-medium text-sm sm:text-base">{type.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Listing Type */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">نوع الإعلان</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">هل تريد البيع أم التأجير؟</p>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                onClick={() => setFormData({ ...formData, listingType: 'sale' })}
                className={`p-6 border-2 rounded-lg text-center hover:border-orange-500 transition-colors ${
                  formData.listingType === 'sale' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                }`}
              >
                <div className="text-3xl mb-2">💰</div>
                <p className="font-medium text-lg">للبيع</p>
              </button>
              <button
                onClick={() => setFormData({ ...formData, listingType: 'rent' })}
                className={`p-6 border-2 rounded-lg text-center hover:border-orange-500 transition-colors ${
                  formData.listingType === 'rent' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                }`}
              >
                <div className="text-3xl mb-2">🏠</div>
                <p className="font-medium text-lg">للإيجار</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Basic Information */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">المعلومات الأساسية</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان الإعلان <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="مثال: شقة 3 غرف للبيع في المزة"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الوصف <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                placeholder="اكتب وصفاً مفصلاً للعقار..."
                dir="rtl"
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.description.length}/2000 حرف
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  السعر (ل.س) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع السعر
                </label>
                <select
                  value={formData.priceType}
                  onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="fixed">ثابت</option>
                  <option value="negotiable">قابل للتفاوض</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Property Details */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">تفاصيل العقار</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المساحة (م²) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              {formData.propertyType !== 'land' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عدد الغرف
                  </label>
                  <select
                    value={formData.roomCount}
                    onChange={(e) => setFormData({ ...formData, roomCount: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">اختر</option>
                    {roomOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              )}

              {formData.propertyType !== 'land' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      عمر البناء
                    </label>
                    <select
                      value={formData.buildingAge}
                      onChange={(e) => setFormData({ ...formData, buildingAge: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">اختر</option>
                      {buildingAges.map(age => (
                        <option key={age} value={age}>{age}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الطابق
                    </label>
                    <input
                      type="number"
                      value={formData.floor}
                      onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      إجمالي الطوابق
                    </label>
                    <input
                      type="number"
                      value={formData.totalFloors}
                      onChange={(e) => setFormData({ ...formData, totalFloors: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      التدفئة
                    </label>
                    <select
                      value={formData.heating}
                      onChange={(e) => setFormData({ ...formData, heating: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">اختر</option>
                      {heatingTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Features */}
        {currentStep === 5 && formData.propertyType !== 'land' && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">المميزات</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مفروش؟
                </label>
                <select
                  value={formData.furnished}
                  onChange={(e) => setFormData({ ...formData, furnished: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">اختر</option>
                  <option value="yes">نعم</option>
                  <option value="partial">جزئياً</option>
                  <option value="no">لا</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شرفة؟
                </label>
                <select
                  value={formData.balcony}
                  onChange={(e) => setFormData({ ...formData, balcony: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">اختر</option>
                  <option value="yes">نعم</option>
                  <option value="no">لا</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مصعد؟
                </label>
                <select
                  value={formData.elevator}
                  onChange={(e) => setFormData({ ...formData, elevator: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">اختر</option>
                  <option value="yes">نعم</option>
                  <option value="no">لا</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  موقف سيارات؟
                </label>
                <select
                  value={formData.parking}
                  onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">اختر</option>
                  <option value="yes">نعم</option>
                  <option value="no">لا</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Images */}
        {currentStep === (formData.propertyType === 'land' ? 5 : 6) && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">صور العقار</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="text-gray-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-2">اضغط لتحميل الصور</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF حتى 5MB</p>
              </label>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-500">
              {formData.images.length}/10 صور محملة
            </p>
          </div>
        )}

        {/* Step 7: Location & Contact */}
        {currentStep === steps.length && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">الموقع ومعلومات الاتصال</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المحافظة <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.location.city}
                  onChange={(e) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">اختر المحافظة</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المنطقة
                </label>
                <input
                  type="text"
                  value={formData.location.district}
                  onChange={(e) => setFormData({ ...formData, location: { ...formData.location, district: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="مثال: المزة"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الحي
                </label>
                <input
                  type="text"
                  value={formData.location.neighborhood}
                  onChange={(e) => setFormData({ ...formData, location: { ...formData.location, neighborhood: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="مثال: المزة أوتستراد"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-900 mb-4">معلومات الاتصال</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contact.name}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, name: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="اسمك الكامل"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="09xxxxxxxx"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          السابق
        </button>

        {currentStep === steps.length ? (
          <button
            onClick={handleSubmit}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 text-sm sm:text-base"
          >
            نشر الإعلان
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !formData.propertyType) ||
              (currentStep === 3 && (!formData.title || !formData.description || !formData.price)) ||
              (currentStep === 4 && !formData.area) ||
              (currentStep === steps.length && (!formData.location.city || !formData.contact.name || !formData.contact.phone))
            }
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base ${
              ((currentStep === 1 && !formData.propertyType) ||
               (currentStep === 3 && (!formData.title || !formData.description || !formData.price)) ||
               (currentStep === 4 && !formData.area) ||
               (currentStep === steps.length && (!formData.location.city || !formData.contact.name || !formData.contact.phone)))
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            التالي
          </button>
        )}
      </div>
    </div>
  );
};

// نموذج المستعمل
const IkinciElForm = ({ onBack }: { onBack: () => void }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    mainCategory: '',
    subCategory: '',
    itemCondition: '',
    brand: '',
    model: '',
    title: '',
    description: '',
    price: '',
    priceType: 'fixed',
    shippingAvailable: '',
    warrantyStatus: '',
    exchangePossible: '',
    location: {
      city: '',
      district: ''
    },
    contact: {
      name: '',
      phone: ''
    },
    images: [] as File[]
  });

  const steps = [
    'اختر الفئة',
    'الفئة الفرعية',
    'معلومات المنتج',
    'الحالة والتفاصيل',
    'الصور',
    'السعر والشحن',
    'الموقع والاتصال'
  ];

  // الفئات الرئيسية للمستعمل
  const usedCategories = [
    { id: 'electronics', name: 'إلكترونيات', icon: '📱' },
    { id: 'home-garden', name: 'المنزل والحديقة', icon: '🏡' },
    { id: 'fashion', name: 'أزياء وإكسسوارات', icon: '👔' },
    { id: 'baby-kids', name: 'أطفال ورضع', icon: '👶' },
    { id: 'sports', name: 'رياضة وترفيه', icon: '⚽' },
    { id: 'books-hobbies', name: 'كتب وهوايات', icon: '📚' },
    { id: 'business', name: 'معدات أعمال', icon: '💼' },
    { id: 'other', name: 'أخرى', icon: '📦' }
  ];

  // الفئات الفرعية
  const subCategories: { [key: string]: Array<{ id: string; name: string }> } = {
    electronics: [
      { id: 'phones', name: 'هواتف محمولة' },
      { id: 'computers', name: 'كمبيوتر وأجهزة لوحية' },
      { id: 'tv-audio', name: 'تلفزيون وصوتيات' },
      { id: 'cameras', name: 'كاميرات وتصوير' },
      { id: 'gaming', name: 'ألعاب فيديو' },
      { id: 'accessories', name: 'إكسسوارات إلكترونية' }
    ],
    'home-garden': [
      { id: 'furniture', name: 'أثاث' },
      { id: 'appliances', name: 'أجهزة منزلية' },
      { id: 'kitchen', name: 'أدوات مطبخ' },
      { id: 'decor', name: 'ديكور' },
      { id: 'garden', name: 'حديقة ونباتات' },
      { id: 'tools', name: 'أدوات ومعدات' }
    ],
    fashion: [
      { id: 'mens-clothing', name: 'ملابس رجالية' },
      { id: 'womens-clothing', name: 'ملابس نسائية' },
      { id: 'shoes', name: 'أحذية' },
      { id: 'bags', name: 'حقائب' },
      { id: 'jewelry', name: 'مجوهرات' },
      { id: 'watches', name: 'ساعات' }
    ],
    'baby-kids': [
      { id: 'baby-clothes', name: 'ملابس أطفال' },
      { id: 'toys', name: 'ألعاب' },
      { id: 'strollers', name: 'عربات أطفال' },
      { id: 'baby-care', name: 'مستلزمات العناية' },
      { id: 'kids-furniture', name: 'أثاث أطفال' }
    ],
    sports: [
      { id: 'gym', name: 'معدات رياضية' },
      { id: 'bikes', name: 'دراجات' },
      { id: 'outdoor', name: 'رياضات خارجية' },
      { id: 'fitness', name: 'لياقة بدنية' },
      { id: 'sports-wear', name: 'ملابس رياضية' }
    ],
    'books-hobbies': [
      { id: 'books', name: 'كتب' },
      { id: 'music', name: 'آلات موسيقية' },
      { id: 'art', name: 'فنون وحرف' },
      { id: 'collectibles', name: 'مقتنيات' },
      { id: 'board-games', name: 'ألعاب طاولة' }
    ],
    business: [
      { id: 'office-furniture', name: 'أثاث مكتبي' },
      { id: 'office-equipment', name: 'معدات مكتبية' },
      { id: 'industrial', name: 'معدات صناعية' },
      { id: 'restaurant', name: 'معدات مطاعم' },
      { id: 'medical', name: 'معدات طبية' }
    ],
    other: [
      { id: 'other-items', name: 'أشياء أخرى' }
    ]
  };

  const conditions = [
    { id: 'new', name: 'جديد', description: 'لم يستخدم من قبل' },
    { id: 'like-new', name: 'كالجديد', description: 'استخدام خفيف جداً' },
    { id: 'good', name: 'جيد', description: 'حالة جيدة مع استخدام عادي' },
    { id: 'fair', name: 'مقبول', description: 'يعمل بشكل جيد مع بعض علامات الاستخدام' }
  ];

  const cities = ['دمشق', 'ريف دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'طرطوس', 'درعا', 'السويداء', 'القنيطرة', 'دير الزور', 'الرقة', 'الحسكة', 'إدلب'];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 10) {
      alert('يمكنك تحميل حد أقصى 10 صور!');
      return;
    }
    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    });
  };

  const handleImageRemove = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('يرجى تسجيل الدخول أولاً!');
        return;
      }

      // تحويل الصور إلى Base64
      const imagePromises = formData.images.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const imageBase64Array = await Promise.all(imagePromises);

      // الحصول على اسم الفئة الرئيسية والفرعية بالعربية
      const mainCategoryName = usedCategories.find(cat => cat.id === formData.mainCategory)?.name || 'مستعمل';
      const subCategoryName = subCategories[formData.mainCategory]?.find(cat => cat.id === formData.subCategory)?.name || '';
      const conditionName = conditions.find(cond => cond.id === formData.itemCondition)?.name || '';

      const listingData = {
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        location: `${formData.location.city}${formData.location.district ? ' / ' + formData.location.district : ''}`,
        mainCategory: 'تسوق مستعمل',
        category: 'تسوق مستعمل',
        subCategory: mainCategoryName,
        images: imageBase64Array,
        // حقول خاصة بالمستعمل
        usedItemDetails: {
          mainCategory: formData.mainCategory,
          subCategory: formData.subCategory,
          itemCondition: formData.itemCondition,
          brand: formData.brand,
          model: formData.model,
          shippingAvailable: formData.shippingAvailable,
          warrantyStatus: formData.warrantyStatus,
          exchangePossible: formData.exchangePossible,
          // إضافة الحقول بالأسماء العربية أيضاً
          الفئة_الرئيسية: mainCategoryName,
          الفئة_الفرعية: subCategoryName,
          حالة_المنتج: conditionName,
          العلامة_التجارية: formData.brand,
          الموديل: formData.model,
          الشحن_متاح: formData.shippingAvailable === 'yes' ? 'نعم' : 'لا',
          الضمان: formData.warrantyStatus === 'yes' ? 'متوفر' : 'غير متوفر',
          إمكانية_المقايضة: formData.exchangePossible === 'yes' ? 'نعم' : 'لا'
        },
        contact: formData.contact,
        priceType: formData.priceType
      };

      const response = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(listingData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'لا يمكن إنشاء الإعلان');
      }

      const result = await response.json();
      alert('تم إنشاء الإعلان بنجاح!');
      window.location.href = `/listing/${result._id}`;
      
    } catch (error) {
      console.error('خطأ في إنشاء الإعلان:', error);
      alert('حدث خطأ أثناء إنشاء الإعلان: ' + (error instanceof Error ? error.message : 'خطأ غير معروف'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <button
        onClick={onBack}
        className="flex items-center text-orange-600 hover:text-orange-700 mb-4"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        العودة إلى اختيار الفئة
      </button>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 text-center">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-full flex items-center justify-center text-sm sm:text-base ${
                index + 1 === currentStep 
                  ? 'bg-purple-600 text-white' 
                  : index + 1 < currentStep 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1 < currentStep ? <CheckIcon className="w-5 h-5" /> : index + 1}
              </div>
              <p className={`mt-2 text-xs sm:text-sm ${
                index + 1 === currentStep ? 'text-purple-600 font-medium' : 'text-gray-500'
              } hidden sm:block`}>
                {step}
              </p>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
          <div 
            className="absolute top-0 left-0 h-2 bg-purple-600 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        {/* Step 1: Main Category */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">اختر الفئة الرئيسية</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">ما نوع المنتج الذي تريد بيعه؟</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {usedCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFormData({ ...formData, mainCategory: category.id })}
                  className={`p-4 border-2 rounded-lg text-center hover:border-purple-500 transition-colors ${
                    formData.mainCategory === category.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-2xl sm:text-3xl mb-2">{category.icon}</div>
                  <p className="font-medium text-sm sm:text-base">{category.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Sub Category */}
        {currentStep === 2 && formData.mainCategory && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">اختر الفئة الفرعية</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">حدد نوع المنتج بشكل أكثر دقة</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {subCategories[formData.mainCategory]?.map((subCategory) => (
                <button
                  key={subCategory.id}
                  onClick={() => setFormData({ ...formData, subCategory: subCategory.id })}
                  className={`p-4 border-2 rounded-lg text-center hover:border-purple-500 transition-colors ${
                    formData.subCategory === subCategory.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                  }`}
                >
                  <p className="font-medium">{subCategory.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Product Information */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">معلومات المنتج</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان الإعلان <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="مثال: آيفون 13 برو 128 جيجا"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الوصف <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="اكتب وصفاً مفصلاً للمنتج..."
                dir="rtl"
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.description.length}/2000 حرف
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العلامة التجارية
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="مثال: Apple"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الموديل
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="مثال: iPhone 13 Pro"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Condition and Details */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">الحالة والتفاصيل</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                حالة المنتج <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {conditions.map((condition) => (
                  <button
                    key={condition.id}
                    onClick={() => setFormData({ ...formData, itemCondition: condition.id })}
                    className={`p-4 border-2 rounded-lg text-right hover:border-purple-500 transition-colors ${
                      formData.itemCondition === condition.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                    }`}
                  >
                    <p className="font-medium">{condition.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{condition.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الضمان
                </label>
                <select
                  value={formData.warrantyStatus}
                  onChange={(e) => setFormData({ ...formData, warrantyStatus: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">اختر</option>
                  <option value="yes">متوفر</option>
                  <option value="no">غير متوفر</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  إمكانية المقايضة
                </label>
                <select
                  value={formData.exchangePossible}
                  onChange={(e) => setFormData({ ...formData, exchangePossible: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">اختر</option>
                  <option value="yes">نعم</option>
                  <option value="no">لا</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الشحن متاح
                </label>
                <select
                  value={formData.shippingAvailable}
                  onChange={(e) => setFormData({ ...formData, shippingAvailable: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">اختر</option>
                  <option value="yes">نعم</option>
                  <option value="no">لا - استلام فقط</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Images */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">صور المنتج</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="text-gray-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-2">اضغط لتحميل الصور</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF حتى 5MB</p>
                <p className="text-xs text-gray-400 mt-2">نصيحة: أضف صور واضحة من زوايا مختلفة</p>
              </label>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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

            <p className="text-sm text-gray-500">
              {formData.images.length}/10 صور محملة
            </p>
          </div>
        )}

        {/* Step 6: Price and Shipping */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">السعر والشحن</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  السعر (ل.س) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع السعر
                </label>
                <select
                  value={formData.priceType}
                  onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="fixed">ثابت</option>
                  <option value="negotiable">قابل للتفاوض</option>
                </select>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-2">معلومات مهمة:</h3>
              <ul className="text-sm text-purple-700 space-y-1 list-disc list-inside">
                <li>ضع سعراً منافساً لبيع منتجك بسرعة</li>
                <li>الصور الواضحة تزيد من فرص البيع</li>
                <li>كن صادقاً في وصف حالة المنتج</li>
                <li>الرد السريع على المشترين يزيد فرص البيع</li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 7: Location & Contact */}
        {currentStep === steps.length && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">الموقع ومعلومات الاتصال</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المحافظة <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.location.city}
                  onChange={(e) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">اختر المحافظة</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المنطقة
                </label>
                <input
                  type="text"
                  value={formData.location.district}
                  onChange={(e) => setFormData({ ...formData, location: { ...formData.location, district: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="مثال: المزة"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-900 mb-4">معلومات الاتصال</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contact.name}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, name: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="اسمك الكامل"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="09xxxxxxxx"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          السابق
        </button>

        {currentStep === steps.length ? (
          <button
            onClick={handleSubmit}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 text-sm sm:text-base"
          >
            نشر الإعلان
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !formData.mainCategory) ||
              (currentStep === 2 && !formData.subCategory) ||
              (currentStep === 3 && (!formData.title || !formData.description)) ||
              (currentStep === 4 && !formData.itemCondition) ||
              (currentStep === 6 && !formData.price) ||
              (currentStep === steps.length && (!formData.location.city || !formData.contact.name || !formData.contact.phone))
            }
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base ${
              ((currentStep === 1 && !formData.mainCategory) ||
               (currentStep === 2 && !formData.subCategory) ||
               (currentStep === 3 && (!formData.title || !formData.description)) ||
               (currentStep === 4 && !formData.itemCondition) ||
               (currentStep === 6 && !formData.price) ||
               (currentStep === steps.length && (!formData.location.city || !formData.contact.name || !formData.contact.phone)))
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            التالي
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateListingWizard; 