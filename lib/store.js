"use client";

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(devtools((set, get) => ({
  // State
  favorites: [],
  isLoading: false,
  error: null,

  // Actions
  setFavorites: (favorites) => set({ favorites }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Computed
  getFavoriteCount: () => get().favorites.length,
  isFavorite: (exerciseId) => get().favorites.some(fav => fav.id === exerciseId),

  // Async Actions
  fetchFavorites: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await fetch("/api/favorites");
      
      if (!res.ok) {
        throw new Error("Failed to fetch favorites");
      }
      
      const favorites = await res.json();
      set({ favorites, isLoading: false });
      return favorites;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return [];
    }
  },

  addToFavorites: async (exercise) => {
    try {
      set({ isLoading: true, error: null });
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exercise }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add to favorites");
      }

      const { favorites } = await res.json();
      set({ favorites, isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  removeFromFavorites: async (exerciseId) => {
    try {
      set({ isLoading: true, error: null });
      const res = await fetch("/api/favorites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exerciseId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to remove from favorites");
      }

      const { favorites } = await res.json();
      set({ favorites, isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
})));

export default useStore;
