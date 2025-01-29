"use client";

import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        favorites: [],
        isLoading: false,
        error: null,
        isHydrated: false,
        lastUpdate: 0,

        // Actions
        setFavorites: (favorites, version) => set({ 
          favorites, 
          lastUpdate: version || Date.now() 
        }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        setHydrated: (isHydrated) => set({ isHydrated }),

        // Computed
        getFavoriteCount: () => get().favorites.length,
        isFavorite: (exerciseId) => get().favorites.some(fav => fav.id === exerciseId),

        // Async Actions
        fetchFavorites: async () => {
          if (!get().isHydrated) {
            return get().favorites;
          }

          try {
            set({ isLoading: true, error: null });
            const res = await fetch("/api/favorites");
            
            if (!res.ok) {
              throw new Error("Failed to fetch favorites");
            }
            
            const { favorites, version } = await res.json();
            
            // Only update if server data is newer
            if (version > get().lastUpdate) {
              set({ 
                favorites, 
                lastUpdate: version,
                isLoading: false 
              });
            }
            
            return favorites;
          } catch (error) {
            console.error('Error fetching favorites:', error);
            set({ error: error.message, isLoading: false });
            return get().favorites;
          }
        },

        addToFavorites: async (exercise) => {
          if (!get().isHydrated) return false;

          try {
            set({ isLoading: true, error: null });
            
            // Optimistically update local state
            const currentFavorites = get().favorites;
            if (currentFavorites.some(fav => fav.id === exercise.id)) {
              set({ isLoading: false });
              return true;
            }

            const timestamp = Date.now();
            set({ 
              favorites: [...currentFavorites, exercise],
              lastUpdate: timestamp
            });
            
            const res = await fetch("/api/favorites", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ exercise }),
            });

            if (!res.ok) {
              // Revert on failure
              set({ 
                favorites: currentFavorites,
                lastUpdate: get().lastUpdate
              });
              const data = await res.json();
              throw new Error(data.error || "Failed to add to favorites");
            }

            const { favorites, version } = await res.json();
            // Update with server version
            set({ 
              favorites, 
              lastUpdate: version,
              isLoading: false 
            });

            return true;
          } catch (error) {
            console.error('Error adding to favorites:', error);
            set({ error: error.message, isLoading: false });
            return false;
          }
        },

        removeFromFavorites: async (exerciseId) => {
          if (!get().isHydrated) return false;

          try {
            set({ isLoading: true, error: null });
            
            // Optimistically update local state
            const currentFavorites = get().favorites;
            const timestamp = Date.now();
            set({ 
              favorites: currentFavorites.filter(fav => fav.id !== exerciseId),
              lastUpdate: timestamp
            });
            
            const res = await fetch("/api/favorites", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ exerciseId }),
            });

            if (!res.ok) {
              // Revert on failure
              set({ 
                favorites: currentFavorites,
                lastUpdate: get().lastUpdate
              });
              const data = await res.json();
              throw new Error(data.error || "Failed to remove from favorites");
            }

            const { favorites, version } = await res.json();
            // Update with server version
            set({ 
              favorites, 
              lastUpdate: version,
              isLoading: false 
            });

            return true;
          } catch (error) {
            console.error('Error removing from favorites:', error);
            set({ error: error.message, isLoading: false });
            return false;
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: 'fitness-favorites-storage',
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
          // Set hydrated state after rehydration
          state.setHydrated(true);
          
          // Fetch latest data from server after rehydration
          if (state.favorites.length > 0) {
            state.fetchFavorites();
          }
        },
      }
    )
  )
);

export default useStore;
