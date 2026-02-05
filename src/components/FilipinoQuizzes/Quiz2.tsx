import React from "react";
import QuizLogic from "./QuizLogic";
import { getQuizById } from "./QuizData";

console.log("🔴 QUIZ2 FILE LOADED");

const Quiz2: React.FC = () => {
  console.log("🔴 QUIZ2 COMPONENT RENDERING");
  
  const quizData = getQuizById(2);
  
  console.log("🔴 QUIZ2 - Quiz data:", quizData);
  
  if (!quizData) {
    console.log("🔴 QUIZ2 - NO QUIZ DATA FOUND!");
    return null; // or error screen
  }
  
  console.log("🔴 QUIZ2 - Rendering QuizLogic component");
  return <QuizLogic quizData={quizData} />;
};

export default Quiz2;