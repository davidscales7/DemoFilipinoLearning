import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Quiz10: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      type: "shortAnswer",
      question: "Write a short story about your day. Include what you're wearing and your hobbies.",
      placeholder: "E.g., 'I wore a blue shirt and played soccer.'",
      correctAnswer: null, // Open-ended question
    },
    {
      type: "unscramble",
      question: "Unscramble the sentence: 'blue / am / shirt / wearing / I'.",
      scrambled: "blue / am / shirt / wearing / I",
      correctAnswer: "I am wearing a blue shirt.",
    },
    {
      type: "futureTense",
      question: "Write about your plans for tomorrow. Use 'I will'.",
      placeholder: "E.g., 'I will wear my red dress tomorrow.'",
      correctAnswer: null, // Open-ended question
    },
    {
      type: "multipleChoice",
      question: "What is the correct translation for 'I am happy'?",
      options: ["Ako ay masaya.", "Ako ay malungkot.", "Ako ay nagbabasa.", "Ako ay naglalaro."],
      correctAnswer: "Ako ay masaya.",
    },
    {
      type: "sentenceCreation",
      question: "Create a sentence using 'I will' about your plans for the weekend.",
      placeholder: "E.g., 'I will go to the park.'",
      correctAnswer: null, // Open-ended question
    },
  ];

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setUserAnswer('');
      setShowAnswer(false);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      alert("Great job! You've completed Quiz 10!");
    }
  };

  const handleCheckAnswer = () => {
    const question = questions[currentQuestion];
    if (question.type === "unscramble" && userAnswer.trim() === question.correctAnswer) {
      alert("Correct! Well done!");
    } else if (question.type === "multipleChoice" && userAnswer === question.correctAnswer) {
      alert("Correct! Great job!");
    } else {
      alert("This is an open-ended question. Make sure you've answered thoughtfully!");
    }
    setShowAnswer(true);
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Quiz 10: Final Lesson</Text>
        <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>

        {questions[currentQuestion].type === "shortAnswer" ||
        questions[currentQuestion].type === "futureTense" ||
        questions[currentQuestion].type === "sentenceCreation" ? (
          <TextInput
            style={styles.input}
            placeholder={questions[currentQuestion].placeholder || "Type your answer here..."}
            multiline
            value={userAnswer}
            onChangeText={setUserAnswer}
          />
        ) : null}

        {questions[currentQuestion].type === "unscramble" && (
          <>
            <Text style={styles.scrambledText}>{questions[currentQuestion].scrambled}</Text>
            <TextInput
              style={styles.input}
              placeholder="Unscramble the sentence..."
              value={userAnswer}
              onChangeText={setUserAnswer}
            />
          </>
        )}

        {questions[currentQuestion].type === "multipleChoice" && (
          <>
            {questions[currentQuestion].options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setUserAnswer(option)}
                style={[
                  styles.optionButton,
                  userAnswer === option && styles.selectedOption,
                ]}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {showAnswer && questions[currentQuestion].type !== "shortAnswer" && (
          <Text style={styles.correctAnswerText}>
            Correct Answer: {questions[currentQuestion].correctAnswer}
          </Text>
        )}

        <TouchableOpacity onPress={handleCheckAnswer} style={styles.checkButton}>
          <Text style={styles.buttonText}>Check Answer</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextQuestion} style={styles.nextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrambledText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  optionButton: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  selectedOption: {
    backgroundColor: 'orange',
  },
  correctAnswerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Quiz10;
