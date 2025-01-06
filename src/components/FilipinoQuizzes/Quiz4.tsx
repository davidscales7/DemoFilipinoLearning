import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Quiz4: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      question: "What is the correct way to say 'Red' in Tagalog?",
      options: ["Pula", "Asul", "Dilaw", "Lila"],
      correctAnswer: "Pula",
      image: require('../../../assets/images/red.jpg'),
    },
    {
      question: "What is the correct way to say 'Mother' in Tagalog?",
      options: ["Ama", "Ina", "Tiya", "Lolo"],
      correctAnswer: "Ina",
      image: require('../../../assets/images/mother.png'),
    },
    {
      question: "Complete the sentence: 'I have ____ apples.' (Dalawa)",
      options: ["Isa", "Dalawa", "Tatlo", "Apat"],
      correctAnswer: "Dalawa",
      image: require('../../../assets/images/twoApples.jpg'),
    },
    {
      question: "What is the correct way to say 'Blue' in Tagalog?",
      options: ["Puti", "Dilaw", "Asul", "Kayumanggi"],
      correctAnswer: "Asul",
      image: require('../../../assets/images/blue.png'),
    },
    {
      question: "What is the correct way to say 'Grandfather' in Tagalog?",
      options: ["Lolo", "Pinsan", "Ama", "Tiyo"],
      correctAnswer: "Lolo",
      image: require('../../../assets/images/grandad.png'),
    },
    {
      question: "What is the correct way to say 'Green' in Tagalog?",
      options: ["Berde", "Kahel", "Rosas", "Dilaw"],
      correctAnswer: "Berde",
      image: require('../../../assets/images/green.png'),
    },
    {
      question: "What is the correct way to say 'Five' in Tagalog?",
      options: ["Isa", "Dalawa", "Lima", "Apat"],
      correctAnswer: "Lima",
      image: require('../../../assets/images/number5.png'),
    },
    {
      question: "What is the correct way to say 'Pink' in Tagalog?",
      options: ["Lila", "Rosas", "Itim", "Kahel"],
      correctAnswer: "Rosas",
      image: require('../../../assets/images/pink.jpg'),
    },
    {
      question: "What is the correct way to say 'Cousin' in Tagalog?",
      options: ["Ama", "Ina", "Pinsan", "Lolo"],
      correctAnswer: "Pinsan",
      image: require('../../../assets/images/cousin.png'),
    },
    {
      question: "What is the correct way to say 'Yellow' in Tagalog?",
      options: ["Dilaw", "Pula", "Kayumanggi", "Asul"],
      correctAnswer: "Dilaw",
      image: require('../../../assets/images/yellow.png'),
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
        <Text style={styles.text}>Congratulations! You've completed Quiz 4!</Text>
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

export default Quiz4;
