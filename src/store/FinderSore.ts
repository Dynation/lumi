// src/store/useFinderStore.ts
import { create } from 'zustand';

interface Location {
  lat: number;
  lng: number;
}

interface FinderStore {
  service: string | null;
  radius: number;
  location: Location | null;

  setService: (s: string) => void;
  setRadius: (r: number) => void;
  setLocation: (loc: Location) => void;
  reset: () => void;
}

export const useFinderStore = create<FinderStore>((set) => ({
  service: null,
  radius: 5,
  location: null,

  setService: (service) => set({ service }),
  setRadius: (radius) => set({ radius }),
  setLocation: (location) => set({ location }),
  reset: () => set({ service: null, radius: 5, location: null }),
}));
