import { create } from "zustand";

interface FibState {
  history: number[];
  addQuery: (n: number) => void;
  clear: () => void;
}

export const useFibStore = create<FibState>((set) => ({
  history: [],
  addQuery: (n) =>
    set((s) => {
      const newHist = [n, ...s.history.filter((x) => x !== n)].slice(0, 10);
      return { history: newHist };
    }),
  clear: () => set({ history: [] }),
}));
