export interface BrightnessState {
  brightness: number;
  updateBrightness: (brightness: BrightnessState["brightness"]) => void;
}

// ColorTiles Props
export interface ColorTilesProps {
  id: number;
  color: string;
  brightness: number;
  saturation: number;
  hue: number;
  index: number;
}

// Error State for the SearchPlace component.
export interface ErrorSearchPlaceState {
  error: string;
  updateError: (error: ErrorSearchPlaceState["error"]) => void;
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
  updateLoading: (loadingLoc: LocationLoadingState["loadingLoc"]) => void;
}

export interface PaletteState {
  palette: string[];
  updatePalette: (palette: PaletteState["palette"]) => void;
}

export interface SaturationState {
  saturation: number;
  updateSaturation: (saturation: SaturationState["saturation"]) => void;
}

export interface SearchLoadingState {
  loadingSearch: boolean;
  updateLoadingSearch: (
    loadingSearch: SearchLoadingState["loadingSearch"]
  ) => void;
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
