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
      title: "Building Confidence",
      description: "Completed your second lesson",
      icon: "📗",
    },
    LESSON_3: {
      id: "lesson_3" as const,
      title: "Making Progress",
      description: "Completed your third lesson",
      icon: "📙",
    },
    LESSON_4: {
      id: "lesson_4" as const,
      title: "Getting Comfortable",
      description: "Completed your fourth lesson",
      icon: "📕",
    },
    LESSON_5: {
      id: "lesson_5" as const,
      title: "Halfway There",
      description: "Completed your fifth lesson",
      icon: "📒",
    },
    LESSON_6: {
      id: "lesson_6" as const,
      title: "Well Done",
      description: "Completed your sixth lesson",
      icon: "🏅",
    },
    LESSON_7: {
      id: "lesson_7" as const,
      title: "On a Roll",
      description: "Completed your seventh lesson",
      icon: "⭐",
    },
    LESSON_8: {
      id: "lesson_8" as const,
      title: "Almost There",
      description: "Completed your eighth lesson",
      icon: "🔥",
    },
    LESSON_9: {
      id: "lesson_9" as const,
      title: "So Close",
      description: "Completed your ninth lesson",
      icon: "🚀",
    },
    LESSON_10: {
      id: "lesson_10" as const,
      title: "Lesson Master",
      description: "Completed all lessons",
      icon: "🏆",
    },
  },
  QUIZZES: {
    QUIZ_1: {
      id: "quiz_1" as const,
      title: "Quick Thinker",
      description: "Completed your first quiz",
      icon: "🧠",
    },
    QUIZ_2: {
      id: "quiz_2" as const,
      title: "Quiz Explorer",
      description: "Completed your second quiz",
      icon: "🎯",
    },
    QUIZ_3: {
      id: "quiz_3" as const,
      title: "Sharp Mind",
      description: "Completed your third quiz",
      icon: "💡",
    },
    QUIZ_4: {
      id: "quiz_4" as const,
      title: "Quiz Champion",
      description: "Completed your fourth quiz",
      icon: "🏅",
    },
    QUIZ_5: {
      id: "quiz_5" as const,
      title: "Halfway There",
      description: "Completed your fifth quiz",
      icon: "🏆",
    },
    QUIZ_6: {
      id: "quiz_6" as const,
      title: "Quiz Enthusiast",
      description: "Completed your sixth quiz",
      icon: "🌟",
    },
    QUIZ_7: {
      id: "quiz_7" as const,
      title: "Chasing Excellence",
      description: "Completed your seventh quiz",
      icon: "⚡",
    },
    QUIZ_8: {
      id: "quiz_8" as const,
      title: "Quiz Master",
      description: "Completed your eighth quiz",
      icon: "👑",
    },
    QUIZ_9: {
      id: "quiz_9" as const,
      title: "Nearly Perfect",
      description: "Completed your ninth quiz",
      icon: "⏱️",
    },
    QUIZ_10: {
      id: "quiz_10" as const,
      title: "Quiz Legend",
      description: "Completed all quizzes",
      icon: "🎖️",
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
} as {
  LESSONS: Record<string, Accolade>;
  QUIZZES: Record<string, Accolade>;
  FLASHCARDS: Record<string, Accolade>;
};