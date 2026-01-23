// store/useDemoStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type DemoState = {
  isUnlocked: boolean;
  unlockDemo: () => void;
};

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      isUnlocked: false,
      unlockDemo: () =>
        set((state) =>
          state.isUnlocked ? state : { isUnlocked: true }
        ),
    }),
    {
      name: "demo-unlock",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
