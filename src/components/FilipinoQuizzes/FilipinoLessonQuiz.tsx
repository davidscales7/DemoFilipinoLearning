// FilipinoLessonQuiz.tsx
import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';

const FilipinoLessonQuiz = ({ lessonId, questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  console.log(`Rendering FilipinoLessonQuiz for lesson ${lessonId} with questions:`, questions);

  if (!questions || questions.length === 0) {
    return <Text>No questions available for this lesson.</Text>;
  }

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectCount(correctCount + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(lessonId, correctCount + 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View>
      <Text>{currentQuestion.question}</Text>
      <Image source={currentQuestion.image} style={{ width: 200, height: 200 }} />
      {currentQuestion.options.map((option, index) => (
        <Button key={index} title={option} onPress={() => handleAnswer(option)} />
      ))}
    </View>
  );
};

export default FilipinoLessonQuiz;
