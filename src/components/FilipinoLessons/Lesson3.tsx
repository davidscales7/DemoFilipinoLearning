import React from "react";
import BaseLesson from "./BaseLesson";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

const slides = [
  { word: "Father", translated: "Ama", image: require("../../../assets/images/father.png") },
  { word: "Mother", translated: "Ina", image: require("../../../assets/images/mother.png") },
  { word: "Brother", translated: "Kapatid na Lalaki", image: require("../../../assets/images/brother.png") },
  { word: "Sister", translated: "Kapatid na Babae", image: require("../../../assets/images/sister.png") },
];

const questions = [
  {
    question: "What is Father in Tagalog?",
    options: ["Ama", "Ina", "Lolo", "Pinsan"],
    correct: "Ama",
    image: require("../../../assets/images/father.png"),
  },
  {
    question: "What is Sister in Tagalog?",
    options: ["Ina", "Kapatid na Babae", "Lola", "Ama"],
    correct: "Kapatid na Babae",
    image: require("../../../assets/images/sister.png"),
  },
];

export default function Lesson3() {
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  return (
    <BaseLesson
      lessonNumber={3}
      slides={slides}
      questions={questions}
      xpPerSlide={10}
      xpPerQuestion={15}
      onLessonComplete={() => unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_3)}
    />
  );
}