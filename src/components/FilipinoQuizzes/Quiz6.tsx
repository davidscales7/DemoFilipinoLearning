import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Quiz6: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      question: "What is the correct way to say 'Water' in Tagalog?",
      options: ["Tubig", "Kape", "Gatas", "Sopas"],
      correctAnswer: "Tubig",
      image: require('../../../assets/images/water.png'),
    },
    {
      question: "What is the correct way to say 'Bread' in Tagalog?",
      options: ["Tinapay", "Adobo", "Isda", "Mansanas"],
      correctAnswer: "Tinapay",
      image: require('../../../assets/images/bread.png'),
    },
    {
      question: "What is the correct way to say 'Coffee' in Tagalog?",
      options: ["Gatas", "Sopas", "Kape", "Tubig"],
      correctAnswer: "Kape",
      image: require('../../../assets/images/coffee.png'),
    },
    {
      question: "How many '🍌' (Saging) are in the game?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      image: require('../../../assets/images/banana.png'),
    },
    {
      question: "What is the correct way to say 'Rice' in Tagalog?",
      options: ["Kanin", "Gatas", "Isda", "Tinapay"],
      correctAnswer: "Kanin",
      image: require('../../../assets/images/rice.png'),
    },
    {
      question: "What is the correct way to say 'Milk' in Tagalog?",
      options: ["Tubig", "Gatas", "Kape", "Saging"],
      correctAnswer: "Gatas",
      image: require('../../../assets/images/milk.png'),
    },
    {
      question: "How many '🥛' (Gatas) are in the game?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      image: require('../../../assets/images/twoMilk.png'),
    },
    {
      question: "What is the correct way to say 'Chocolate' in Tagalog?",
      options: ["Tsokolate", "Adobo", "Kape", "Mansanas"],
      correctAnswer: "Tsokolate",
      image: require('../../../assets/images/chocolate.png'),
    },
    {
      question: "What is the correct way to say 'Fish' in Tagalog?",
      options: ["Isda", "Saging", "Tubig", "Adobo"],
      correctAnswer: "Isda",
      image: require('../../../assets/images/fish.png'),
    },
    {
      question: "What is the correct way to say 'Soup' in Tagalog?",
      options: ["Sopas", "Tsokolate", "Tinapay", "Tubig"],
      correctAnswer: "Sopas",
      image: require('../../../assets/images/soup.jpg'),
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
        <Text style={styles.text}>Congratulations! You've completed Quiz 6!</Text>
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

export default Quiz6;
