
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface XPState {
  xp: number;
  hasHydrated: boolean;
  addXP: (amount: number) => void;
  setHydrated: () => void;
}

export const useXPStore = create<XPState>()(
  persist(
    (set, get) => ({
      xp: 0,
      hasHydrated: false,

      addXP: (amount) => set({ xp: get().xp + amount }),

      setHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "xp-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) console.warn("XP rehydrate error:", error);
        state?.setHydrated?.();
      },
    }
  )
);
