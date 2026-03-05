import React from "react";
import BaseTwoStageLesson from "./BaseTwoStageLesson";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

const items = [
  {
    image: require("../../../assets/images/red_shirt.jpg"),
    wordTop: "Pulang Polo",
    wordBottom: "Red Shirt",
    sentenceTop: "Nagsusuot ako ng pulang polo.",
    sentenceBottom: "I am wearing a red shirt.",
  },
  {
    image: require("../../../assets/images/blue_pants.jpg"),
    wordTop: "Asul na Pantalon",
    wordBottom: "Blue Pants",
    sentenceTop: "Nagsusuot ako ng asul na pantalon.",
    sentenceBottom: "I am wearing blue pants.",
  },
  {
    image: require("../../../assets/images/black_shoes.jpg"),
    wordTop: "Itim na Sapatos",
    wordBottom: "Black Shoes",
    sentenceTop: "Nagsusuot ako ng itim na sapatos.",
    sentenceBottom: "I am wearing black shoes.",
  },
  {
    image: require("../../../assets/images/white_socks.jpg"),
    wordTop: "Puting Medyas",
    wordBottom: "White Socks",
    sentenceTop: "Nagsusuot ako ng puting medyas.",
    sentenceBottom: "I am wearing white socks.",
  },
  {
    image: require("../../../assets/images/yellow_hat.jpg"),
    wordTop: "Dilaw na Sombrero",
    wordBottom: "Yellow Hat",
    sentenceTop: "Nagsusuot ako ng dilaw na sombrero.",
    sentenceBottom: "I am wearing a yellow hat.",
  },
  {
    image: require("../../../assets/images/orange_scarf.jpg"),
    wordTop: "Kahel na Scarf",
    wordBottom: "Orange Scarf",
    sentenceTop: "Nagsusuot ako ng kahel na scarf.",
    sentenceBottom: "I am wearing an orange scarf.",
  },
  {
    image: require("../../../assets/images/pink_gloves.jpg"),
    wordTop: "Rosang Guwantes",
    wordBottom: "Pink Gloves",
    sentenceTop: "Nagsusuot ako ng rosang guwantes.",
    sentenceBottom: "I am wearing pink gloves.",
  },
  {
    image: require("../../../assets/images/purple_jacket.jpg"),
    wordTop: "Lilang Dyaket",
    wordBottom: "Purple Jacket",
    sentenceTop: "Nagsusuot ako ng lilang dyaket.",
    sentenceBottom: "I am wearing a purple jacket.",
  },
  {
    image: require("../../../assets/images/green_dress.jpg"),
    wordTop: "Berdeng Bestida",
    wordBottom: "Green Dress",
    sentenceTop: "Nagsusuot ako ng berdeng bestida.",
    sentenceBottom: "I am wearing a green dress.",
  },
  {
    image: require("../../../assets/images/brown_belt.jpg"),
    wordTop: "Kayumangging Sinturon",
    wordBottom: "Brown Belt",
    sentenceTop: "Nagsusuot ako ng kayumangging sinturon.",
    sentenceBottom: "I am wearing a brown belt.",
  },
];

export default function Lesson7() {
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  return (
    <BaseTwoStageLesson
      lessonNumber={7}
      title="Lesson 7 — Clothes"
      items={items}
      xpPerTap={15}
      onLessonComplete={() => unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_7)}
    />
  );
}