import React from "react";
import BaseLesson from "./BaseLesson";

import { useDemoStore } from "../../store/useDemoStore";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

const slides = [
  {
    word: "Kamusta",
    translated: "Hello / How are you?",
    image: require("../../../assets/images/hello.png"),
  },
  {
    word: "Mabuti",
    translated: "I'm Good",
    image: require("../../../assets/images/good.jpg"),
  },
  {
    word: "Masaya",
    translated: "I'm Happy",
    image: require("../../../assets/images/happy.jpg"),
  },
];

const questions = [
  {
    question: "What does 'Kamusta' mean?",
    options: ["Goodbye", "Hello / How are you?", "Sad"],
    correct: "Hello / How are you?",
    image: require("../../../assets/images/hello.png"),
  },
];

const Lesson1: React.FC = () => {
  const unlockDemo = useDemoStore((s) => s.unlockDemo);
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  return (
    <BaseLesson
      lessonNumber={1}
      slides={slides}
      questions={questions}
      xpPerSlide={10}
      xpPerQuestion={15}
      onLessonComplete={() => {
        unlockDemo();
        unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_1);
      }}
    />
  );
};

export default Lesson1;