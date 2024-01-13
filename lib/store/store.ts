import { LocationLoadingState, searchPlaceState, searchState } from "@/typings";
import { create } from "zustand";

export const useSearchStore = create<searchState>((set) => ({
  search: false,
  setSearch: () => set((state) => ({ search: !state.search })),
  updateSearch: (search) => set(() => ({ search: search })),
}));

// Storing the search for a place input field value.

export const useSearchPlace = create<searchPlaceState>((set) => ({
  place: "",
  setPlace: (place) => set(() => ({ place: place })),
}));

// Loading state for the check location button
export const useLocationLoading = create<LocationLoadingState>((set) => ({
  loadingLoc: false,
  updateLoading: (loadingLoc) => set(() => ({ loadingLoc: loadingLoc })),
}));
