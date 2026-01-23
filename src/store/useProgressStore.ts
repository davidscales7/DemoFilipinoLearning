// src/store/useProgressStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProgressState {
  completedLessons: number[];
  completeLesson: (lesson: number) => void;
  isLessonUnlocked: (lesson: number) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],

      completeLesson: (lesson) => {
        const completed = get().completedLessons;
        if (!completed.includes(lesson)) {
          set({ completedLessons: [...completed, lesson] });
        }
      },

      /**
       * 🔓 PAIR-BASED UNLOCKING
       * 1–2 → unlock 3–4
       * 3–4 → unlock 5–6
       * etc
       */
      isLessonUnlocked: (lesson) => {
        if (lesson === 1 || lesson === 2) return true;

        const completed = get().completedLessons;
        return (
          completed.includes(lesson - 0) &&
          completed.includes(lesson - 0)
        );
      },
    }),
    {
      name: "lesson-progress",
      storage: createJSONStorage(() => AsyncStorage), // ✅ THIS FIXES IT
    }
  )
);
