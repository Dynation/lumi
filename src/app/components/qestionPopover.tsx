'use client';

import { useState } from 'react';

export default function QuestionPopover() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur text-white font-bold text-lg flex items-center justify-center"
        aria-label="Допомога"
      >
        ?
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-neutral-900 text-white rounded-xl shadow-lg border border-neutral-700 p-4 text-sm space-y-2 z-50">
          <div>
            <strong>LUMI</strong> — платформа для пошуку майстрів і запису онлайн.
          </div>
          <hr className="border-neutral-700" />
          <ul className="space-y-1">
          <li><a href="#" className="text-blue-400 hover:underline">Пояснювальна бригада</a></li>
            <li><a href="#" className="text-blue-400 hover:underline">Про нас</a></li>
            <li><a href="#" className="text-blue-400 hover:underline">Підтримка</a></li>
            <li><a href="#" className="text-blue-400 hover:underline">Для майстрів</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}
