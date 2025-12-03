import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { useLanguage } from '../../contexts/LanguageContext';

export function OnboardingGuide() {
  const { showOnboarding, completeOnboarding } = useOnboarding();
  const { t } = useLanguage();
  const [isLandscape, setIsLandscape] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showRotatePrompt, setShowRotatePrompt] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  if (!showOnboarding) return null;

  const handleSkip = () => {
    completeOnboarding();
  };

  const handleContinue = () => {
    setShowRotatePrompt(false);
  };

  const guidePages = [
    {
      title: 'Welcome to KUKI',
      content: 'KUKI is your complete employee management system. Track wages, attendance, loans, and more all in one place.',
      features: [
        'Real-time wage tracking',
        'QR code attendance',
        'Loan management',
        'Performance ratings'
      ]
    },
    {
      title: 'Home Dashboard',
      content: 'Your home screen shows your current status and quick actions.',
      features: [
        'View your current balance',
        'See recent transactions',
        'Quick access to scan QR codes',
        'Check upcoming payments'
      ]
    },
    {
      title: 'QR Scanner',
      content: 'Scan QR codes to perform various actions instantly.',
      features: [
        'Clock in/out for attendance',
        'Receive wage payments',
        'Get loan advances',
        'Record bonuses'
      ]
    },
    {
      title: 'Calendar & Attendance',
      content: 'Track your work schedule and attendance history.',
      features: [
        'View monthly attendance',
        'See work hours logged',
        'Track present/absent days',
        'Export attendance reports'
      ]
    },
    {
      title: 'Messages',
      content: 'Receive important notifications and statements.',
      features: [
        'Wage statements',
        'Loan notifications',
        'Performance reviews',
        'System announcements'
      ]
    },
    {
      title: 'Profile & Settings',
      content: 'Manage your account and preferences.',
      features: [
        'Update profile photo',
        'Change language',
        'View employment details',
        'Rate your employer'
      ]
    }
  ];

  if (showRotatePrompt && !isLandscape) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <RotateCcw className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('rotate_your_screen')}
          </h2>
          <p className="text-gray-600 mb-8">
            For the best experience viewing the beginner's guide, please rotate your device to landscape mode.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleContinue}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Continue to Guide
            </button>
            <button
              onClick={handleSkip}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Skip Guide
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-auto">
      <div className={`${isLandscape ? 'h-full' : 'min-h-screen'} p-4 md:p-8`}>
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <img src="/logo-kuki.png" alt="KUKI" className="h-10" />
              <h1 className="text-2xl font-bold text-gray-900">Beginner's Guide</h1>
            </div>
            <button
              onClick={completeOnboarding}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {guidePages[currentPage].title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {guidePages[currentPage].content}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guidePages[currentPage].features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm"
                    >
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {currentPage === 0 && (
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 Pro Tip</h4>
                  <p className="text-gray-700">
                    Take your time going through each section. You can always access this guide later from your profile settings.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="border-t border-gray-200 p-6">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                {guidePages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentPage
                        ? 'w-8 bg-blue-500'
                        : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                {currentPage > 0 && (
                  <button
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>
                )}

                {currentPage < guidePages.length - 1 ? (
                  <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={completeOnboarding}
                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
