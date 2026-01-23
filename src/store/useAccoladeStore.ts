// store/useAccoladeStore.ts
import { create } from "zustand";

/* ----------------------------------------
   TYPES
---------------------------------------- */
export type AccoladeId =
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
  | "flashcards_1";

export type Accolade = {
  id: AccoladeId;
  title: string;
  description: string;
  icon: string;
};

type AccoladeState = {
  unlocked: Accolade[];
  unlockAccolade: (accolade: Accolade) => void;
};

/* ----------------------------------------
   STORE
---------------------------------------- */
export const useAccoladeStore = create<AccoladeState>((set) => ({
  unlocked: [],
  unlockAccolade: (accolade) =>
    set((state) => {
      // prevent duplicates
      if (state.unlocked.some((a) => a.id === accolade.id)) {
        return state;
      }
      return {
        unlocked: [...state.unlocked, accolade],
      };
    }),
}));