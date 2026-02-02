// src/screens/demo/DemoAccolades.ts
import { Query } from "mongoose";
import { Accolade } from "../../store/useAccoladeStore";
import Quiz4 from "../FilipinoQuizzes/Quiz4";

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
  id: "quiz_1",
  title: "Quick Thinker",
  description: "Completed your first quiz",
  icon: "🧠",
},

QUIZ_2: {
  id: "quiz_2",
  title: "Finding Your Rhythm",
  description: "Completed two quizzes",
  icon: "🎯",
},

QUIZ_3: {
  id: "quiz_3",
  title: "Sharp Mind",
  description: "Completed three quizzes",
  icon: "💡",
},

QUIZ_4: {
  id: "quiz_4",
  title: "Quiz Champion",
  description: "Completed four quizzes",
  icon: "🏅",
},

QUIZ_5: {
  id: "quiz_5",
  title: "Halfway There",
  description: "Completed five quizzes",
  icon: "🏆",
},
QUIZ_6: {
  id: "quiz_6",
  title: "Perfectionist",
  description: "Achieved a perfect score on a quiz",
  icon: "🌟",
},

QUIZ_7: {
  id: "quiz_7",
  title: "Chasing Excellence",
  description: "Completed seven quizzes",
  icon: "⚡",
},
QUIZ_8: {
  id: "quiz_8",
  title: "Quiz Master",
  description: "Completed eight quizzes",
  icon: "👑",
},
QUIZ_9: {
  id: "quiz_9",
  title: "Speedster",
  description: "Completed a quiz in record time",
  icon: "⏱️",
},

QUIZ_10: {
  id: "quiz_10",
  title: "Consistent Performer",
  description: "Scored above 80% across multiple quizzes",
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
} satisfies {
  LESSONS: Record<string, Accolade>;
  QUIZZES: Record<string, Accolade>;
  FLASHCARDS: Record<string, Accolade>;
};