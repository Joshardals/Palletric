import { searchState } from "@/typings";
import { create } from "zustand";

export const useSearchStore = create<searchState>((set) => ({
  search: false,
  setSearch: () => set((state) => ({ search: !state.search })),
}));
