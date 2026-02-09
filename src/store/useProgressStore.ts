// src/store/useProgressStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProgressState {
  completedLessons: number[];
  completedQuizzes: number[];
  completedFlashcards: number[];
  completeLesson: (lesson: number) => void;
  completeQuiz: (quiz: number) => void;
  completeFlashcard: (flashcard: number) => void;
  isLessonUnlocked: (lesson: number) => boolean;
  isQuizUnlocked: (quiz: number) => boolean;
  isCompleteFlashcardUnlocked: (flashcard: number) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      completedQuizzes: [],
      completedFlashcards: [],
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
      completeFlashcard: (flashcard) => {
        const completed = get().completedFlashcards;
        if (!completed.includes(flashcard)) {
          set({ completedFlashcards: [...completed, flashcard] });
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
      /**
       * Flashcard N is unlocked when Quiz N is completed
       * OR when lesson 1 is completed (demo unlock)
       */
      isCompleteFlashcardUnlocked: (flashcard) => {
        const completedQuizzes = get().completedQuizzes;
        // demo unlock
        if (get().completedLessons.includes(1)) return true;
        // flashcard N unlocked by quiz N
        return completedQuizzes.includes(flashcard);
      },
    }),
    {
      name: "lesson-progress",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);