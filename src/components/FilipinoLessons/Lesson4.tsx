import React from "react";
import BaseLesson from "./BaseLesson";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

const slides = [
  { word: "Red", translated: "Pula", image: require("../../../assets/images/red.jpg") },
  { word: "Blue", translated: "Asul", image: require("../../../assets/images/blue.png") },
  { word: "Green", translated: "Berde", image: require("../../../assets/images/green.png") },
  { word: "Yellow", translated: "Dilaw", image: require("../../../assets/images/yellow.png") },
  { word: "Black", translated: "Itim", image: require("../../../assets/images/black.png") },
];

const questions = [
  {
    question: "What is Red in Tagalog?",
    options: ["Pula", "Asul", "Dilaw", "Lila"],
    correct: "Pula",
    image: require("../../../assets/images/red.jpg"),
  },
  {
    question: "What is Blue in Tagalog?",
    options: ["Itim", "Puti", "Asul", "Kayumanggi"],
    correct: "Asul",
    image: require("../../../assets/images/blue.png"),
  },
  {
    question: "What is Green in Tagalog?",
    options: ["Berde", "Kahel", "Dilaw", "Rosas"],
    correct: "Berde",
    image: require("../../../assets/images/green.png"),
  },
];

export default function Lesson4() {
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  return (
    <BaseLesson
      lessonNumber={4}
      slides={slides}
      questions={questions}
      xpPerSlide={10}
      xpPerQuestion={15}
      onLessonComplete={() => unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_4)}
    />
  );
}