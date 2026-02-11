import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProfileState = {
  username: string | null;
  setUsername: (name: string) => void;

  // Optional streak tracking
  streak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  bumpStreakForToday: () => void;
};

const todayKey = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      username: null,
      setUsername: (name) => set({ username: name.trim() || null }),

      streak: 0,
      lastActiveDate: null,

      bumpStreakForToday: () => {
        const today = todayKey();
        const last = get().lastActiveDate;

        if (last === today) return; // already counted today

        // If last active was yesterday, streak +1; otherwise reset to 1
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yKey = yesterday.toISOString().slice(0, 10);

        const nextStreak = last === yKey ? get().streak + 1 : 1;

        set({ streak: nextStreak, lastActiveDate: today });
      },
    }),
    {
      name: "profile",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
