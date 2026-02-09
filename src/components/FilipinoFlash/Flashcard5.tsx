import React from "react";
import FlashcardLogic from "./FlashcardLogic";
import { getFlashcardSetById } from "./FlashcardData";

console.log("🔴 Flashcard5 FILE LOADED");

const Flashcard5: React.FC = () => {
  console.log("🔴 Flashcard5 COMPONENT RENDERING");

  const flashcardData = getFlashcardSetById(5);
  console.log("🔴 Flashcard5 - Flashcard data:", flashcardData);

  if (!flashcardData) {
    return null;
  }
  
  return <FlashcardLogic flashcardData={flashcardData} />;
};

export default Flashcard5;
