// src/screens/demo/DemoAccolades.ts
import { Accolade } from "../../store/useAccoladeStore";

export const DEMO_ACCOLADES = {
  LESSONS: {
    LESSON_1: {
      id: "lesson_1" as const,
      title: "First Steps",
      description: "Completed your first lesson",
      icon: "📘",
    },
    LESSON_2: {
      id: "lesson_2" as const,
      title: "Building Knowledge",
      description: "Completed your second lesson",
      icon: "📗",
    },
    LESSON_3: {
      id: "lesson_3" as const,
      title: "Getting Advanced",
      description: "Completed your third lesson",
      icon: "📙",
    },
  },
  QUIZZES: {
    QUIZ_1: {
      id: "quiz_1" as const,
      title: "Quick Thinker",
      description: "Completed your first quiz",
      icon: "🧠",
    },
  },
  FLASHCARDS: {
    FLASHCARDS_1: {
      id: "flashcards_1" as const,
      title: "Memory Builder",
      description: "Completed your first flashcard set",
      icon: "🃏",
    },
  },
} satisfies {
  LESSONS: Record<string, Accolade>;
  QUIZZES: Record<string, Accolade>;
  FLASHCARDS: Record<string, Accolade>;
};