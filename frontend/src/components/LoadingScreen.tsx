import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, duration = 3000 }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const loadingTexts = [
    'مرحباً بك في أسواق',
    'جاري تحميل أفضل العروض',
    'نحضر لك آلاف الإعلانات',
    'تقريباً انتهينا...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 300);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, duration / 4);

    return () => clearInterval(textInterval);
  }, [duration, loadingTexts.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="text-center px-4 sm:px-8">
        {/* Logo */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 sm:mb-4">
            أسواق
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-orange-100 font-medium">
            منصة التسوق الآمنة في سوريا
          </p>
        </div>

        {/* Animation Circle */}
        <div className="relative mb-8 sm:mb-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="white"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-300 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-6 sm:mb-8">
          <p className="text-base sm:text-lg md:text-xl text-white font-medium min-h-[1.5em] sm:min-h-[1.75em]">
            {loadingTexts[currentText]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <div className="bg-white bg-opacity-30 rounded-full h-2 sm:h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 sm:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl mb-2">🛡️</div>
              <p className="text-sm sm:text-base text-orange-100">معاملات آمنة</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl mb-2">🚀</div>
              <p className="text-sm sm:text-base text-orange-100">سرعة في الاستجابة</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl mb-2">💎</div>
              <p className="text-sm sm:text-base text-orange-100">جودة عالية</p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-8 sm:mt-12">
          <p className="text-xs sm:text-sm text-orange-200 opacity-80">
            منصة أسواق - حيث تجد كل ما تبحث عنه
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 