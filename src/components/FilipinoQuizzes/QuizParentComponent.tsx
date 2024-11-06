// QuizParentComponent.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import FilipinoLessonQuiz from './FilipinoLessonQuiz';
import FilipinoAccolades from '../FilipinoAccolades/FilipinoAccolades';

const lessons = {
  1: [
    {
      question: "What is the correct way to say Number 1?",
      options: ["Apat", "Isa", "Dalawa", "Tatlo"],
      correctAnswer: "Isa",
      image: require('../../../assets/images/rightAnswerQuestion1.jpg')
    }
  ],
  2: [
    {
      question: "What is the correct way to say Number 2?",
      options: ["Dalawa", "Apat", "Lima", "Anim"],
      correctAnswer: "Dalawa",
      image: require('../../../assets/images/rightAnswerQuestion2.jpg')
    }
  ]
};

const QuizParentComponent = () => {
  const [progress, setProgress] = useState({ 1: 0, 2: 0 });

  const handleComplete = (lessonId, correctCount) => {
    setProgress({ ...progress, [lessonId]: correctCount });
  };

  console.log("Rendering QuizParentComponent with lessons:", lessons);

  return (
    <View>
      {Object.keys(lessons).map((lessonId) => (
        <FilipinoLessonQuiz key={lessonId} lessonId={lessonId} questions={lessons[lessonId]} onComplete={handleComplete} />
      ))}
      <FilipinoAccolades progress={progress} lessons={lessons} />
    </View>
  );
};

export default QuizParentComponent;
