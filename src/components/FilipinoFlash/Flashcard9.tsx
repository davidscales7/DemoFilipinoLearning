import React from "react";
import FlashcardLogic from "./FlashcardLogic";
import { getFlashcardSetById } from "./FlashcardData";

console.log("🔴 Flashcard9 FILE LOADED");

const Flashcard9: React.FC = () => {
  console.log("🔴 Flashcard9 COMPONENT RENDERING");

  const flashcardData = getFlashcardSetById(9);
  console.log("🔴 Flashcard - Flashcard data:", flashcardData);

  if (!flashcardData) {
    return null;
  }
  
  return <FlashcardLogic flashcardData={flashcardData} />;
};

export default Flashcard9;
