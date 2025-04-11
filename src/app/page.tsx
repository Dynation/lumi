
"use client";
import { useState } from 'react';
import WelcomeScreen from '../app/components/WelcomeScreen';
import ClientMainPage from './components/ClientMainPage';


export default function EntryPage() {
  const [filters, setFilters] = useState<null | {
    service: string;
    radius: number;
    location: { lat: number; lng: number };
  }>(null);

  return filters === null ? (
    <WelcomeScreen onSubmit={setFilters} />
  ) : (
    <ClientMainPage filters={filters} />
  );
}
