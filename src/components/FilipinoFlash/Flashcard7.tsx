import React from "react";
import FlashcardLogic from "./FlashcardLogic";
import { getFlashcardSetById } from "./FlashcardData";

console.log("🔴 Flashcard7 FILE LOADED");

const Flashcard7: React.FC = () => {
  console.log("🔴 Flashcard7 COMPONENT RENDERING");

  const flashcardData = getFlashcardSetById(7);
  console.log("🔴 Flashcard7 - Flashcard data:", flashcardData);

  if (!flashcardData) {
    return null;
  }
  
  return <FlashcardLogic flashcardData={flashcardData} />;
};

export default Flashcard7;
