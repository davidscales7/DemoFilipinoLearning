import { create } from "zustand";
import { persist } from "zustand/middleware";

// TYPES FOR THE STORE
interface XPState {
  xp: number;
  hasHydrated: boolean;

  addXP: (amount: number) => void;
  setHydrated: () => void;
}

export const useXPStore = create<XPState>()(
  persist(
    (set) => ({
      xp: 0,
      hasHydrated: false,

      addXP: (amount) =>
        set((state) => ({
          xp: state.xp + amount,
        })),

      setHydrated: () => set({ hasHydrated: true }),
    }),

    {
      name: "xp-storage",

      // Runs when Zustand loads from storage
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
