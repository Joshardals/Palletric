import { searchAction, searchState } from "@/typings";
import { create } from "zustand";

export const useSearchStore = create<searchState & searchAction>((set) => ({
  search: false,
  setSearch: () => set((state) => ({ search: !state.search })),
  updateSearch: (search) => set(() => ({ search: search })),
}));
