'use client';

import { useState } from 'react';

interface Props {
  onNotFound?: (phone: string) => void;
  onFound?: (master: any) => void; // тип можна уточнити
}

export default function MasterSearchByPhone({ onNotFound, onFound }: Props) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError('');
    setLoading(true);

    // заглушка: тут буде запит до API
    const found = false; // <- замінити на реальну перевірку

    setLoading(false);

    if (found) {
      // тут можна буде передати знайденого майстра
      onFound?.({ name: 'Test Master' });
    } else {
      setError('Майстра з таким номером не знайдено');
      onNotFound?.(phone);
    }
  };

  return (
    <div className="mt-6 p-4 border rounded-xl shadow-sm max-w-md w-full text-[var(--text-color)] bg-gradient-to-br from-[var(--grad-start)] via-[var(--background-color)] to-[var(--grad-end)]">
      <label className="block mb-2 font-semibold text-sm text-[var(--text-color)]">
        Знайти майстра за номером телефону
      </label>
      <div className="flex items-center gap-2">
        <input
          type="tel"
          placeholder="+1 438 555 1234"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Пошук...' : 'Знайти'}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
