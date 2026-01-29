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
       * lesson 1 unlocks everything purely for demo purposes
        */isLessonUnlocked: (lesson) => {
  if (lesson === 1) return true;

  const completed = get().completedLessons;
  return completed.includes(1);
        }
    }),
    {
      name: "lesson-progress",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);