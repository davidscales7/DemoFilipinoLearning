import React from "react";
import BaseTwoStageLesson from "./BaseTwoStageLesson";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

const items = [
  {
    image: require("../../../assets/images/rice.png"),
    wordTop: "Rice",
    wordBottom: "Kanin",
    sentenceTop: "I eat rice.",
    sentenceBottom: "Kumakain ako ng kanin.",
  },
  {
    image: require("../../../assets/images/chicken.jpg"),
    wordTop: "Chicken",
    wordBottom: "Manok",
    sentenceTop: "I eat chicken.",
    sentenceBottom: "Kumakain ako ng manok.",
  },
  {
    image: require("../../../assets/images/fish.png"),
    wordTop: "Fish",
    wordBottom: "Isda",
    sentenceTop: "I eat fish.",
    sentenceBottom: "Kumakain ako ng isda.",
  },
];

export default function Lesson6() {
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  return (
    <BaseTwoStageLesson
      lessonNumber={6}
      title="Lesson 6 — Food"
      items={items}
      xpPerTap={15}
      onLessonComplete={() => unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_6)}
    />
  );
}