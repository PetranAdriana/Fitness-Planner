"use client";

import { create } from 'zustand';

const useStore = create((set) => ({
  favoritesCount: 0,
  setFavoritesCount: (count) => set({ favoritesCount: count }),
  refreshFavorites: async () => {
    try {
      const res = await fetch("/api/favorites");
      if (!res.ok) return;
      const favorites = await res.json();
      set({ favoritesCount: favorites.length });
      return favorites;
    } catch (error) {
      console.error("Error refreshing favorites:", error);
      return [];
    }
  },
}));

export default useStore;
