import React from "react";
import BaseLesson from "./BaseLesson";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

const slides = [
  { word: "Ito ay pusa.", translated: "This is a cat.", image: require("../../../assets/images/cat.png") },
  { word: "Ito ay aso.", translated: "This is a dog.", image: require("../../../assets/images/dog.png") },
  { word: "May pusa ako.", translated: "I have a cat.", image: require("../../../assets/images/cat.png") },
  { word: "May aso ako.", translated: "I have a dog.", image: require("../../../assets/images/dog.png") },
];

const questions = [
  {
    question: "Ito ay ___ 🐱",
    options: ["Aso", "Pusa", "Ibon"],
    correct: "Pusa",
    image: require("../../../assets/images/cat.png"),
  },
  {
    question: "May ___ ako 🐶",
    options: ["Pusa", "Aso", "Isda"],
    correct: "Aso",
    image: require("../../../assets/images/dog.png"),
  },
  {
    question: "Ito ay ___ 🐟",
    options: ["Isda", "Ibon", "Pusa"],
    correct: "Isda",
    image: require("../../../assets/images/fish.png"),
  },
];

export default function Lesson5() {
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  return (
    <BaseLesson
      lessonNumber={5}
      slides={slides}
      questions={questions}
      xpPerSlide={10}
      xpPerQuestion={15}
      onLessonComplete={() => unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_5)}
    />
  );
}