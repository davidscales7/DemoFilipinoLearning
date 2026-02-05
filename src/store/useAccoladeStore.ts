// src/store/useAccoladeStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ FIXED: Include ALL accolade IDs from all categories
export type AccoladeId =
  // Lesson Accolades
  | "lesson_1"
  | "lesson_2"
  | "lesson_3"
  | "lesson_4"
  | "lesson_5"
  | "lesson_6"
  | "lesson_7"
  | "lesson_8"
  | "lesson_9"
  | "lesson_10"
  // Quiz Accolades
  | "quiz_1"
  | "quiz_2"
  | "quiz_3"
  | "quiz_4"
  | "quiz_5"
  | "quiz_6"
  | "quiz_7"
  | "quiz_8"
  | "quiz_9"
  | "quiz_10"
  // Flashcard Accolades
  | "flashcards_1";

export type Accolade = {
  id: AccoladeId;
  title: string;
  description: string;
  icon: string;
};

interface AccoladeState {
  unlocked: Accolade[];
  unlockAccolade: (accolade: Accolade) => void;
  isUnlocked: (id: AccoladeId) => boolean;
}

export const useAccoladeStore = create<AccoladeState>()(
  persist(
    (set, get) => ({
      unlocked: [],

      unlockAccolade: (accolade) => {
        const current = get().unlocked;
        
        // Prevent duplicates
        if (current.some((a) => a.id === accolade.id)) {
          console.log(`🔒 Accolade "${accolade.title}" already unlocked`);
          return;
        }

        console.log(`🎉 Unlocking accolade: "${accolade.title}"`);
        set({ unlocked: [...current, accolade] });
      },

      isUnlocked: (id) => {
        return get().unlocked.some((a) => a.id === id);
      },
    }),
    {
      name: "accolade-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);