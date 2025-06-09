'use client';

import { useRouter } from 'next/navigation';

export default function AuthPlaceholder() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/profile'); // → тепер веде на user dashboard
  };

  return (
    <div className="bg-neutral-800/80 backdrop-blur-sm rounded-xl px-6 py-6 text-center text-sm text-white space-y-4 border border-neutral-700 max-w-md w-full mx-auto shadow-lg">
      <p className="text-base font-medium">Тута буде авторизація</p>
      <p className="text-xs text-neutral-400">
        Але поки вона в процесі, тикай &quot;Тиц&quot; і заглянь у свій кабінет!
      </p>
      <button
        onClick={handleClick}
        className="mt-2 px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
      >
        Тиц
      </button>
    </div>
  );
}
