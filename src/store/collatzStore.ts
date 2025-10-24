import { create } from "zustand";
import type { CollatzResult } from "../utils/collatz";

type CollatzState = {
  lastResult: CollatzResult | null;
  setLastResult: (r: CollatzResult | null) => void;
};

export const useCollatzStore = create<CollatzState>((set) => ({
  lastResult: null,
  setLastResult: (result) => {
    set({ lastResult: result });
    try {
      if (result) {
        localStorage.setItem("collatzResult", JSON.stringify(result));
      } else {
        localStorage.removeItem("collatzResult");
      }
    } catch (error) {
      console.error("Error saving collatz result:", error);
    }
  },
}));

// Load saved result on store initialization
try {
  const raw = localStorage.getItem("collatzResult");
  if (raw) {
    const result = JSON.parse(raw) as CollatzResult;
    useCollatzStore.getState().setLastResult(result);
  }
} catch (error) {
  console.error("Error loading collatz result:", error);
}
