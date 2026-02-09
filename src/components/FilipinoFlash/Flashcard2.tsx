import React from "react";
import FlashcardLogic from "./FlashcardLogic";
import { getFlashcardSetById } from "./FlashcardData";

console.log("🔴 Flashcard2 FILE LOADED");

const Flashcard2: React.FC = () => {
  console.log("🔴 Flashcard2 COMPONENT RENDERING");

  const flashcardData = getFlashcardSetById(2);
  console.log("🔴 Flashcard3 - Flashcard data:", flashcardData);

  if (!flashcardData) {
    return null;
  }
  
  return <FlashcardLogic flashcardData={flashcardData} />;
};

export default Flashcard2;
