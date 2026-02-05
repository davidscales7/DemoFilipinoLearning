import React from "react";
import QuizLogic from "./QuizLogic";
import { getQuizById } from "./QuizData";

console.log("🔴 QUIZ9 FILE LOADED");

const Quiz9: React.FC = () => {
  console.log("🔴 QUIZ9 COMPONENT RENDERING");
  
  const quizData = getQuizById(9);
  
  console.log("🔴 QUIZ9 - Quiz data:", quizData);
  
  if (!quizData) {
    console.log("🔴 QUIZ9 - NO QUIZ DATA FOUND!");
    return null; // or error screen
  }
  
  console.log("🔴 QUIZ9 - Rendering QuizLogic component");
  return <QuizLogic quizData={quizData} />;
};

export default Quiz9;