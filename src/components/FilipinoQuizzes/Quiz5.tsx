import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Quiz5: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      question: "What is the correct way to say 'Cat' in Tagalog?",
      options: ["Pusa", "Aso", "Ibon", "Unggoy"],
      correctAnswer: "Pusa",
      image: require('../../../assets/images/cat.png'),
    },
    {
      question: "What is the correct way to say 'Dog' in Tagalog?",
      options: ["Ibon", "Aso", "Tigre", "Isda"],
      correctAnswer: "Aso",
      image: require('../../../assets/images/dog.png'),
    },
    {
      question: "What is the correct way to say 'Bird' in Tagalog?",
      options: ["Unggoy", "Baka", "Ibon", "Baboy"],
      correctAnswer: "Ibon",
      image: require('../../../assets/images/bird.png'),
    },
    {
      question: "How many 'Pusa' (Cats) are there in the game?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      image: require('../../../assets/images/cat.png'),
    },
    {
      question: "How many 'Unggoy' (Monkeys) are there in the game?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      image: require('../../../assets/images/monkey.png'),
    },
    {
      question: "What is the correct way to say 'Lion' in Tagalog?",
      options: ["Ahas", "Leon", "Manok", "Baka"],
      correctAnswer: "Leon",
      image: require('../../../assets/images/lion.png'),
    },
    {
      question: "What is the correct way to say 'Snake' in Tagalog?",
      options: ["Ahas", "Isda", "Tigre", "Pusa"],
      correctAnswer: "Ahas",
      image: require('../../../assets/images/snake.png'),
    },
    {
      question: "How many 'Manok' (Chickens) are there in the game?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      image: require('../../../assets/images/chicken.jpg'),
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
        <Text style={styles.text}>Congratulations! You've completed Quiz 5!</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.text}>
            Question {currentQuestion + 1} of {questions.length}
          </Text>
          <Text style={styles.question}>{questions[currentQuestion].question}</Text>
          <Image
            source={questions[currentQuestion].image}
            style={styles.image}
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
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
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

export default Quiz5;
