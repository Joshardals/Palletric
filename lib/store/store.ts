import { LocationLoadingState, searchState } from "@/typings";
import { create } from "zustand";

export const useSearchStore = create<searchState>((set) => ({
  search: false,
  setSearch: () => set((state) => ({ search: !state.search })),
  updateSearch: (search) => set(() => ({ search: search })),
}));

// Loading state for the check location button
export const useLocationLoading = create<LocationLoadingState>((set) => ({
  loadingLoc: false,
  updateLoading: (loadingLoc) => set(() => ({ loadingLoc: loadingLoc })),
}));
