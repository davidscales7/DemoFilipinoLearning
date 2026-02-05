import React from "react";
import QuizLogic from "./QuizLogic";
import { getQuizById } from "./QuizData";

console.log("🔴 QUIZ2 FILE LOADED");

const Quiz4: React.FC = () => {
  console.log("🔴 QUIZ3 COMPONENT RENDERING");
  
  const quizData = getQuizById(4);
  
  console.log("🔴 QUIZ4 - Quiz data:", quizData);
  
  if (!quizData) {
    console.log("🔴 QUIZ4 - NO QUIZ DATA FOUND!");
    return null; // or error screen
  }
  
  console.log("🔴 QUIZ4 - Rendering QuizLogic component");
  return <QuizLogic quizData={quizData} />;
};

export default Quiz4;