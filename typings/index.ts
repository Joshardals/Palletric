export interface searchState {
  search: boolean;
  setSearch: () => void;
}

export interface searchAction {
  updateSearch: (search : searchState['search']) => void; 
}
