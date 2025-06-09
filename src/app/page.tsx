'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionPopover from '@/app/components/qestionPopover';
import AuthPlaceholder from '@/app/components/AuthPlaceholder';
import Cloud3D from './components/cloudly/Cloud3d';

export default function WelcomeScreen() {
  const router = useRouter();
  const [hasGeo, setHasGeo] = useState<boolean | null>(null);

  // Перевірка геолокації (асинхронно)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => setHasGeo(true),
      () => setHasGeo(false)
    );
  }, []);

  const handleTryWithout = () => {
    if (hasGeo === null) return; // ще не визначено
    if (hasGeo) {
      router.push('/home'); // юзер дав гео
    } else {
      router.push('/finder'); // не дав гео
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <Cloud3D />
      <QuestionPopover />
      <div className="relative z-10 text-center px-4 space-y-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-white">LUMI</h1>
        
        {/* Заглушка авторизації */}
        <AuthPlaceholder />

        {/* Кнопка Try without... */}
        <button
          onClick={handleTryWithout}
          disabled={hasGeo === null}
          className={`w-full py-3 rounded-xl text-lg font-semibold transition ${
            hasGeo === null
              ? 'bg-gray-600 cursor-wait text-white'
              : 'bg-yellow-500 text-black hover:bg-yellow-400'
          }`}
        >
          Try without account
        </button>
      </div>
    </main>
  );
}

