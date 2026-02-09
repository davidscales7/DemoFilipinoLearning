import React from "react";
import FlashcardLogic from "./FlashcardLogic";
import { getFlashcardSetById } from "./FlashcardData";

console.log("🔴 Flashcard3 FILE LOADED");

const Flashcard3: React.FC = () => {
  console.log("🔴 Flashcard1 COMPONENT RENDERING");

  const flashcardData = getFlashcardSetById(3);
  console.log("🔴 Flashcard3 - Flashcard data:", flashcardData);

  if (!flashcardData) {
    return null;
  }
  
  return <FlashcardLogic flashcardData={flashcardData} />;
};

export default Flashcard3;
