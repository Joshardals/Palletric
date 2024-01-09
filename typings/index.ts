export interface searchState {
  search: boolean;
  setSearch: () => void;
  updateSearch: (search: searchState["search"]) => void;
}

export interface LocationResult {
  place_id: string;
  display_name: string;
}
