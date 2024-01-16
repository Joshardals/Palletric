export interface BrightnessState {
  brightness: number;
  updateBrightness: (brightness: BrightnessState["brightness"]) => void;
}

export interface HueState {
  hue: number;
  updateHue: (hue: HueState["hue"]) => void;
}

export interface LocationResult {
  place_id: string;
  display_name: string;
}

export interface LocationLoadingState {
  loadingLoc: boolean;
  updateLoading: (loading: LocationLoadingState["loadingLoc"]) => void;
}

export interface SaturationState {
  saturation: number;
  updateSaturation: (saturation: SaturationState["saturation"]) => void;
}

export interface searchPlaceState {
  place: string;
  setPlace: (place: searchPlaceState["place"]) => void;
}

export interface searchState {
  search: boolean;
  setSearch: () => void;
  updateSearch: (search: searchState["search"]) => void;
}

// Props for the Slider Component
export interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}
