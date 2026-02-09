import React from "react";
import QuizLogic from "./QuizLogic";
import { getQuizById } from "./QuizData";

console.log("🔴 QUIZ1 FILE LOADED");

const Quiz1: React.FC = () => {
  console.log("🔴 QUIZ1 COMPONENT RENDERING");
  
  const quizData = getQuizById(1);
  
  console.log("🔴 QUIZ1 - Quiz data:", quizData);
  
  if (!quizData) {
    console.log("🔴 QUIZ1 - NO QUIZ DATA FOUND!");
    return null; // or error screen
  }
  
  return <QuizLogic quizData={quizData} />;
};

export default Quiz1;