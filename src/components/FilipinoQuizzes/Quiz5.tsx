import React from "react";
import QuizLogic from "./QuizLogic";
import { getQuizById } from "./QuizData";

console.log("🔴 QUIZ2 FILE LOADED");

const Quiz5: React.FC = () => {
  console.log("🔴 QUIZ2 COMPONENT RENDERING");
  
  const quizData = getQuizById(5);
  
  console.log("🔴 QUIZ5 - Quiz data:", quizData);
  
  if (!quizData) {
    console.log("🔴 QUIZ5 - NO QUIZ DATA FOUND!");
    return null; // or error screen
  }
  
  console.log("🔴 QUIZ5 - Rendering QuizLogic component");
  return <QuizLogic quizData={quizData} />;
};

export default Quiz5;