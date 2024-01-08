export interface searchState {
  search: boolean;
  setSearch: () => void;
  updateSearch: (search : searchState['search']) => void; 
}

