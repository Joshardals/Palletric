export interface searchState {
  search: boolean;
  setSearch: () => void;
  updateSearch: (search: searchState["search"]) => void;
}

export interface LocationResult {
  place_id: string;
  display_name: string;
}

export interface LocationLoadingState {
  loadingLoc: boolean;
  updateLoading: (loading: LocationLoadingState["loadingLoc"]) => void;
}
