import React from "react";
import FlashcardLogic from "./FlashcardLogic";
import { getFlashcardSetById } from "./FlashcardData";

console.log("🔴 Flashcard11 FILE LOADED");

const Flashcard11: React.FC = () => {
  console.log("🔴 Flashcard11 COMPONENT RENDERING");

  const flashcardData = getFlashcardSetById(11);
  console.log("🔴 Flashcard11 - Flashcard data:", flashcardData);

  if (!flashcardData) {
    return null;
  }
  
  return <FlashcardLogic flashcardData={flashcardData} />;
};

export default Flashcard11;
