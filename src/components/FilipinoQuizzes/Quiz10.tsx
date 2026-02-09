import React from "react";
import QuizLogic from "./QuizLogic";
import { getQuizById } from "./QuizData";

console.log("🔴 QUIZ10 FILE LOADED");

const Quiz10: React.FC = () => {
  console.log("🔴 QUIZ9 COMPONENT RENDERING");
  
  const quizData = getQuizById(10);
  
  console.log("🔴 QUIZ10 - Quiz data:", quizData);
  
  if (!quizData) {
    console.log("🔴 QUIZ10 - NO QUIZ DATA FOUND!");
    return null; // or error screen
  }
  
  console.log("🔴 QUIZ10 - Rendering QuizLogic component");
  return <QuizLogic quizData={quizData} />;
};

export default Quiz10;