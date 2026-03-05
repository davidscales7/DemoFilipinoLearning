import React from "react";
import BaseLesson from "./BaseLesson";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

const slides = [
  { word: "One", translated: "Isa", image: require("../../../assets/images/number1.jpg") },
  { word: "Two", translated: "Dalawa", image: require("../../../assets/images/number2.jpg") },
  { word: "Three", translated: "Tatlo", image: require("../../../assets/images/number3.png") },
  { word: "Four", translated: "Apat", image: require("../../../assets/images/number4.png") },
  { word: "Five", translated: "Lima", image: require("../../../assets/images/number5.png") },
];

const questions = [
  {
    question: "What is the correct way to say One?",
    options: ["Isa", "Dalawa", "Tatlo", "Apat"],
    correct: "Isa",
    image: require("../../../assets/images/number1.jpg"),
  },
  {
    question: "What is the correct way to say Five?",
    options: ["Tatlo", "Lima", "Isa", "Dalawa"],
    correct: "Lima",
    image: require("../../../assets/images/number5.png"),
  },
];

export default function Lesson2() {
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  return (
    <BaseLesson
      lessonNumber={2}
      slides={slides}
      questions={questions}
      xpPerSlide={10}
      xpPerQuestion={15}
      onLessonComplete={() => unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_2)}
    />
  );
}