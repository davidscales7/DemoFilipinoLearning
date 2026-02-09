import React from "react";
import FlashcardLogic from "./FlashcardLogic";
import { getFlashcardSetById } from "./FlashcardData";

console.log("🔴 Flashcard10 FILE LOADED");

const Flashcard10: React.FC = () => {
  console.log("🔴 Flashcard1 COMPONENT RENDERING");

  const flashcardData = getFlashcardSetById(10);
  console.log("🔴 Flashcard10 - Flashcard data:", flashcardData);

  if (!flashcardData) {
    return null;
  }
  
  return <FlashcardLogic flashcardData={flashcardData} />;
};

export default Flashcard10;
