// app/not-found.tsx (Next.js App Router)
'use client';

import CloudIntro3D from '@/app/components/cloudly/Cloud3d';
import Link from 'next/link';
import { Icon } from 'tiny-isprite';



export default function NotFound() {
  return (
    <div className="relative w-full h-screen">
      <CloudIntro3D />
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">404</h1>
        <p className="text-xl mb-8 drop-shadow-md">Сторінку не знайдено</p>
        <h1>Test Icon</h1>
      <Icon name="vite" size={50} external />
        <Link
          href="/"
          className="px-6 py-2 bg-white/80 text-black rounded-md shadow-md hover:bg-white"
        >
          Повернутись на головну
        </Link>
      </div>
    </div>
  );
}
