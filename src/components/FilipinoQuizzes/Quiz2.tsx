import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Quiz2: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      question: "What is the correct way to say Number 1?",
      options: ["Isa", "Dalawa", "Tatlo", "Apat"],
      correctAnswer: "Isa",
      image: require('../../../assets/images/number1.jpg'),
    },
    {
      question: "What is the correct way to say Number 2?",
      options: ["Tatlo", "Dalawa", "Apat", "Lima"],
      correctAnswer: "Dalawa",
      image: require('../../../assets/images/number2.jpg'),
    },
    {
      question: "Complete the sentence: 'I have ____ apples' (Dalawa)",
      options: ["Isa", "Tatlo", "Dalawa", "Apat"],
      correctAnswer: "Dalawa",
      image: require('../../../assets/images/twoApples.jpg'),
    },
    {
      question: "What does 'Apat' mean?",
      options: ["Three", "Four", "Two", "One"],
      correctAnswer: "Four",
      image: require('../../../assets/images/number4.png'),
    },
    {
      question: "How do you say 'Five chairs' in Filipino?",
      options: ["Isa upuan", "Anim na upuan", "Tatlo upuan", "Apat upuan"],
      correctAnswer: "Anim na upuan",
      image: require('../../../assets/images/sixChairs.jpg'),
    },
  ];

  const handleOptionPress = (option: string) => {
    if (selectedOption === option) {
      setShowAnswer(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      }, 2000); // 2 seconds delay before moving to the next question
    } else {
      setSelectedOption(option);
    }
  };

  if (currentQuestion >= questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Congratulations! You've completed Quiz 2!</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>{questions[currentQuestion].question}</Text>
        <Image
          source={questions[currentQuestion].image}
          style={styles.questionImage}
          resizeMode="contain"
        />
        {!showAnswer ? (
          questions[currentQuestion].options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleOptionPress(option)}
              style={[
                styles.optionButton,
                selectedOption === option && styles.selectedOption,
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.answerText}>
            Correct Answer: {questions[currentQuestion].correctAnswer}
          </Text>
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
  questionImage: {
    width: '80%',
    height: 200,
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
  answerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Quiz2;
