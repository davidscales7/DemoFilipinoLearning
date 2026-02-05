// src/store/useProgressStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProgressState {
  completedLessons: number[];
  completedQuizzes: number[];
  completeLesson: (lesson: number) => void;
  completeQuiz: (quiz: number) => void;
  isLessonUnlocked: (lesson: number) => boolean;
  isQuizUnlocked: (quiz: number) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      completedQuizzes: [],

      completeLesson: (lesson) => {
        const completed = get().completedLessons;
        if (!completed.includes(lesson)) {
          set({ completedLessons: [...completed, lesson] });
        }
      },

      completeQuiz: (quiz) => {
        const completed = get().completedQuizzes;
        if (!completed.includes(quiz)) {
          set({ completedQuizzes: [...completed, quiz] });
        }
      },

      /**
       * Lesson 1 unlocks everything purely for demo purposes
       */
      isLessonUnlocked: (lesson) => {
        if (lesson === 1) return true;
        const completed = get().completedLessons;
        return completed.includes(1);
      },

      /**
       * Quiz N is unlocked when Lesson N is completed
       * OR when lesson 1 is completed (demo unlock)
       */
      isQuizUnlocked: (quiz) => {
        const completedLessons = get().completedLessons;

        // demo unlock
        if (completedLessons.includes(1)) return true;

        // quiz N unlocked by lesson N
        return completedLessons.includes(quiz);
      },
    }),
    {
      name: "lesson-progress",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
 