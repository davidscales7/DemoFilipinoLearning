import React from "react";
import QuizLogic from "./QuizLogic";
import { getQuizById } from "./QuizData";

console.log("🔴 QUIZ2 FILE LOADED");

const Quiz6: React.FC = () => {
  console.log("🔴 QUIZ2 COMPONENT RENDERING");
  
  const quizData = getQuizById(6);
  
  console.log("🔴 QUIZ6 - Quiz data:", quizData);
  
  if (!quizData) {
    console.log("🔴 QUIZ6 - NO QUIZ DATA FOUND!");
    return null; // or error screen
  }
  
  console.log("🔴 QUIZ6 - Rendering QuizLogic component");
  return <QuizLogic quizData={quizData} />;
};

export default Quiz6;