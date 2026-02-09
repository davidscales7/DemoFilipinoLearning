import React from "react";
import FlashcardLogic from "./FlashcardLogic";
import { getFlashcardSetById } from "./FlashcardData";

console.log("🔴 Flashcard6 FILE LOADED");

const Flashcard6: React.FC = () => {
  console.log("🔴 Flashcard2 COMPONENT RENDERING");

  const flashcardData = getFlashcardSetById(6);
  console.log("🔴 Flashcard3 - Flashcard data:", flashcardData);

  if (!flashcardData) {
    return null;
  }
  
  return <FlashcardLogic flashcardData={flashcardData} />;
};

export default Flashcard6;
