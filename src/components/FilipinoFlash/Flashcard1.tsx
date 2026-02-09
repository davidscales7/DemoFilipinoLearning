import React from "react";
import FlashcardLogic from "./FlashcardLogic";
import { getFlashcardSetById } from "./FlashcardData";

console.log("🔴 Flashcard1 FILE LOADED");

const Flashcard1: React.FC = () => {
  console.log("🔴 Flashcard1 COMPONENT RENDERING");

  const flashcardData = getFlashcardSetById(1);
  console.log("🔴 Flashcard1 - Flashcard data:", flashcardData);

  if (!flashcardData) {
    return null;
  }
  
  return <FlashcardLogic flashcardData={flashcardData} />;
};

export default Flashcard1;
