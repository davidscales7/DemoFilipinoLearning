import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const Quiz1 = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      question: "How do you say 'Good morning' in Filipino?",
      type: 'multiple-choice',
      options: ["Kamusta", "Magandang Umaga", "Mabuti", "Salamat"],
      correctAnswer: "Magandang Umaga",
      image: require('../../../assets/images/i.png'), // Update the path as per your folder structure
    },
    {
      question: "What does 'Mabuti' mean in English?",
      type: 'multiple-choice',
      options: ["Hello", "Good", "Weather", "Thank you"],
      correctAnswer: "Good",
      image: require('../../../assets/images/i.png'), // Updat
      // e the path as per your folder structure
    },
    {
      question: "Which of these images shows 'Kamusta' (Hello/How are you)?",
      type: 'multiple-choice',
      options: [
        { image: require('../../../assets/images/tea.png'), label: "Handshake" },
        { image: require('../../../assets/images/tea.png'), label: "Waving Hand" },
        { image: require('../../../assets/images/tea.png'), label: "Thumbs Up" },
        { image: require('../../../assets/images/tea.png'), label: "Writing" },
      ],
      correctAnswer: "Waving Hand",
    },
    {
      question: "Translate to Filipino: 'How are you?'",
      type: 'fill-in-the-blank',
      correctAnswer: "Kamusta",
    },
    {
      question: "Translate to Filipino: 'I am good.'",
      type: 'fill-in-the-blank',
      correctAnswer: "Mabuti",
    },
    {
      question: "'Mabuti' means 'Bad' in Filipino.",
      type: 'true-false',
      correctAnswer: false,
    },
    {
      question: "'Kamusta' is used to greet someone in Filipino.",
      type: 'true-false',
      correctAnswer: true,
    },
  ];

  const handleAnswer = (selectedOption: string | boolean) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.type === 'multiple-choice' && selectedOption === currentQuestion.correctAnswer) {
      setCorrectCount(correctCount + 1);
    }

    if (
      currentQuestion.type === 'fill-in-the-blank' &&
      typeof userAnswer === 'string' && // Ensure it's a string
      userAnswer.toLowerCase() === currentQuestion.correctAnswer
    ) {
      setCorrectCount(correctCount + 1);
    }

    if (
      currentQuestion.type === 'true-false' &&
      typeof selectedOption === 'boolean' && // Ensure it's a boolean
      selectedOption === currentQuestion.correctAnswer
    ) {
      setCorrectCount(correctCount + 1);
    }

    // Move to the next question
    setSelectedOption(null);
    setUserAnswer('');
    setShowAnswer(false);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(correctCount + 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>{currentQuestion.question}</Text>

        {currentQuestion.type === 'multiple-choice' && (
          <>
            {currentQuestion.image && (
              <Image
                source={currentQuestion.image}
                style={styles.image}
                resizeMode="contain"
              />
            )}
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(option)}
                style={[
                  styles.optionButton,
                  selectedOption === option && styles.selectedOption,
                ]}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {currentQuestion.type === 'fill-in-the-blank' && (
          <>
            <TextInput
              style={styles.textInput}
              placeholder="Type your answer here..."
              value={userAnswer}
              onChangeText={(text) => setUserAnswer(text)}
            />
            <TouchableOpacity
              onPress={() => handleAnswer(userAnswer)}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}

        {currentQuestion.type === 'true-false' && (
          <>
            <TouchableOpacity
              onPress={() => handleAnswer(true)}
              style={styles.optionButton}
            >
              <Text style={styles.optionText}>True</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAnswer(false)}
              style={styles.optionButton}
            >
              <Text style={styles.optionText}>False</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
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
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default Quiz1;
