import React from "react";
import BaseTwoStageLesson from "./BaseTwoStageLesson";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

const items = [
  {
    image: require("../../../assets/images/reading.png"),
    wordTop: "Reading",
    wordBottom: "Pagbabasa",
    sentenceTop: "I like reading books.",
    sentenceBottom: "Gusto kong magbasa ng libro.",
  },
  {
    image: require("../../../assets/images/gaming.png"),
    wordTop: "Playing games",
    wordBottom: "Paglalaro",
    sentenceTop: "I play games at night.",
    sentenceBottom: "Naglalaro ako sa gabi.",
  },
  {
    image: require("../../../assets/images/cooking.jpg"),
    wordTop: "Cooking",
    wordBottom: "Pagluluto",
    sentenceTop: "I enjoy cooking food.",
    sentenceBottom: "Mahilig akong magluto ng pagkain.",
  },
];

export default function Lesson8() {
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  return (
    <BaseTwoStageLesson
      lessonNumber={8}
      title="Lesson 8 — Hobbies"
      items={items}
      xpPerTap={15}
      onLessonComplete={() => unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_8)}
    />
  );
}