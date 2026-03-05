import React from "react";
import BaseStepsLesson, { LessonStep } from "./BaseStepsLesson";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

const STEPS: LessonStep[] = [
  {
    title: "Subject–Verb–Object (SVO)",
    explanation:
      "Filipino sentences often follow a Subject–Verb–Object structure. The subject comes first, followed by the verb and then the object.",
    examples: [
      "Ako ay masaya. (I am happy.)",
      "Ikaw ay malungkot. (You are sad.)",
      "Si Juan ay nagbabasa ng libro. (Juan is reading a book.)",
    ],
  },
  {
    title: "Negation with 'hindi'",
    explanation: "To make a sentence negative, use 'hindi' before the verb or adjective.",
    examples: [
      "Ako ay hindi masaya. (I am not happy.)",
      "Sila ay hindi naglalaro. (They are not playing.)",
      "Juan ay hindi nagbabasa ng libro.",
    ],
  },
  {
    title: "Questions",
    explanation:
      "Questions are formed using question words like 'Ano', 'Saan', or 'Kailan' at the start of the sentence.",
    examples: [
      "Ano ang ginagawa mo? (What are you doing?)",
      "Saan siya pupunta? (Where is he/she going?)",
      "Kailan tayo kakain? (When will we eat?)",
    ],
  },
  {
    title: "Sentence Variations",
    explanation: "You can add locations, descriptions, or details to make sentences richer.",
    examples: [
      "Si Maria ay nag-aaral sa eskuwelahan.",
      "Ang aso ay natutulog sa ilalim ng mesa.",
      "Kami ay naglalaro sa hardin.",
    ],
  },
];

export default function Lesson9() {
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  return (
    <BaseStepsLesson
      lessonNumber={9}
      title="Lesson 9 — Sentence Structure"
      intro="Learn how to build clear and natural Filipino sentences."
      steps={STEPS}
      xpPerStep={20}
      onLessonComplete={() => unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_9)}
    />
  );
}