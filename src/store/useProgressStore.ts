import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProgressState {
  completedLessons: number[];
  completedQuizzes: number[];
  completedFlashcards: number[];
  completedAccolades: number[];  // ✅ fixed typo
  completeLesson: (lesson: number) => void;
  completeQuiz: (quiz: number) => void;
  completeFlashcard: (flashcard: number) => void;
  completeAccolade: (accolade: number) => void;
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
      completedAccolades: [],  // ✅ fixed typo

      completeAccolade: (accolade) => {
        const completed = get().completedAccolades;  // ✅ fixed typo
        if (!completed.includes(accolade)) {
          set({ completedAccolades: [...completed, accolade] });  // ✅ fixed typo
        }
      },

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

      isLessonUnlocked: (lesson) => {
        if (lesson === 1) return true;
        return get().completedLessons.includes(1);
      },

      isQuizUnlocked: (quiz) => {
        const completedLessons = get().completedLessons;
        if (completedLessons.includes(1)) return true;
        return completedLessons.includes(quiz);
      },

      isCompleteFlashcardUnlocked: (flashcard) => {
        const completedQuizzes = get().completedQuizzes;
        if (get().completedLessons.includes(1)) return true;
        return completedQuizzes.includes(flashcard);
      },
    }),
    {
      name: "lesson-progress",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);