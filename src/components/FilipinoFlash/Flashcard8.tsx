import React from "react";
import FlashcardLogic from "./FlashcardLogic";
import { getFlashcardSetById } from "./FlashcardData";

console.log("🔴 Flashcard8 FILE LOADED");

const Flashcard8: React.FC = () => {
  console.log("🔴 Flashcard8 COMPONENT RENDERING");

  const flashcardData = getFlashcardSetById(8);
  console.log("🔴 Flashcard8 - Flashcard data:", flashcardData);

  if (!flashcardData) {
    return null;
  }
  
  return <FlashcardLogic flashcardData={flashcardData} />;
};

export default Flashcard8;
