import {
  BrightnessState,
  HueState,
  LocationLoadingState,
  SaturationState,
  searchPlaceState,
  searchState,
} from "@/typings";
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

// Color Controls State Store.
export const useBrightness = create<BrightnessState>((set) => ({
  brightness: 100,
  updateBrightness: (brightness) => set(() => ({ brightness: brightness })),
}));

export const useSaturation = create<SaturationState>((set) => ({
  saturation: 100,
  updateSaturation: (saturation) => set(() => ({ saturation: saturation })),
}));

export const useHue = create<HueState>((set) => ({
  hue: 0,
  updateHue: (hue) => set(() => ({ hue: hue })),
}));
