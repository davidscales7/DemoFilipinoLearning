import React from "react";
import QuizLogic from "./QuizLogic";
import { getQuizById } from "./QuizData";

console.log("🔴 QUIZ7 FILE LOADED");

const Quiz7: React.FC = () => {
  console.log("🔴 QUIZ7 COMPONENT RENDERING");
  
  const quizData = getQuizById(7);
  
  console.log("🔴 QUIZ7 - Quiz data:", quizData);
  
  if (!quizData) {
    console.log("🔴 QUIZ7 - NO QUIZ DATA FOUND!");
    return null; // or error screen
  }
  
  console.log("🔴 QUIZ7 - Rendering QuizLogic component");
  return <QuizLogic quizData={quizData} />;
};

export default Quiz7;