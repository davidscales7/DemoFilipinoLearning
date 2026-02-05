import React from "react";
import QuizLogic from "./QuizLogic";
import { getQuizById } from "./QuizData";

console.log("🔴 QUIZ2 FILE LOADED");

const Quiz8: React.FC = () => {
  console.log("🔴 QUIZ8 COMPONENT RENDERING");
  
  const quizData = getQuizById(8);
  
  console.log("🔴 QUIZ8 - Quiz data:", quizData);
  
  if (!quizData) {
    console.log("🔴 QUIZ8 - NO QUIZ DATA FOUND!");
    return null; // or error screen
  }
  
  console.log("🔴 QUIZ8 - Rendering QuizLogic component");
  return <QuizLogic quizData={quizData} />;
};

export default Quiz8;