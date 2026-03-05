import React from "react";
import BaseMCQTestLesson, { MCQ } from "./BaseMCQTestLesson";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

const QUESTIONS: MCQ[] = [
  {
    question: "What does 'Kamusta' mean?",
    options: ["Goodbye", "Thank you", "Hello / How are you", "Please"],
    correctIndex: 2,
  },
  {
    question: "Which is the correct Filipino word for 'Dog'?",
    options: ["Pusa", "Aso", "Ibon", "Isda"],
    correctIndex: 1,
  },
  {
    question: "Translate: 'I eat rice.'",
    options: [
      "Ako ay kumakain ng isda.",
      "Kumakain ako ng kanin.",
      "Ako ay nagluluto ng kanin.",
      "Kanin ay kinakain ko.",
    ],
    correctIndex: 1,
  },
  {
    question: "Which sentence is grammatically correct?",
    options: ["Masaya ay ako.", "Ako ay masaya.", "Ay masaya ako.", "Masaya ako ay."],
    correctIndex: 1,
  },
  {
    question: "How do you say 'They are not playing'?",
    options: [
      "Sila ay naglalaro.",
      "Sila ay hindi naglalaro.",
      "Hindi sila ay naglalaro.",
      "Ay hindi naglalaro sila.",
    ],
    correctIndex: 1,
  },
];

export default function Lesson10() {
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  return (
    <BaseMCQTestLesson
      lessonNumber={10}
      title="Lesson 10 — Final Test"
      questions={QUESTIONS}
      xpPerCorrect={25}
      completionBonus={100}
      onLessonComplete={() => unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_10)}
    />
  );
}