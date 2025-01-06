import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Quiz7: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      question: "What is the correct way to say 'Red Shirt' in Tagalog?",
      options: ["Pulang Kamiseta", "Asul na Kamiseta", "Dilaw na Kamiseta", "Puting Kamiseta"],
      correctAnswer: "Pulang Kamiseta",
      image: require('../../../assets/images/red_shirt.jpg'),
    },
    {
      question: "What is the correct way to say 'Blue Pants' in Tagalog?",
      options: ["Asul na Pantalon", "Berdeng Pantalon", "Dilaw na Pantalon", "Kahel na Pantalon"],
      correctAnswer: "Asul na Pantalon",
      image: require('../../../assets/images/blue_pants.jpg'),
    },
    {
      question: "What is the correct way to say 'Green Dress' in Tagalog?",
      options: ["Berdeng Damit", "Rosang Damit", "Kayumangging Damit", "Dilaw na Damit"],
      correctAnswer: "Berdeng Damit",
      image: require('../../../assets/images/green_dress.jpg'),
    },
    {
      question: "How many 'Black Shoes' (Itim na Sapatos) are shown in the game?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "1",
      image: require('../../../assets/images/black_shoes.jpg'),
    },
    {
      question: "What is the correct way to say 'White Socks' in Tagalog?",
      options: ["Puting Medyas", "Asul na Medyas", "Dilaw na Medyas", "Rosang Medyas"],
      correctAnswer: "Puting Medyas",
      image: require('../../../assets/images/white_socks.jpg'),
    },
    {
      question: "What is the correct way to say 'Yellow Hat' in Tagalog?",
      options: ["Dilaw na Sombrero", "Berdeng Sombrero", "Asul na Sombrero", "Kayumangging Sombrero"],
      correctAnswer: "Dilaw na Sombrero",
      image: require('../../../assets/images/yellow_hat.jpg'),
    },
    {
      question: "What is the correct way to say 'Orange Scarf' in Tagalog?",
      options: ["Kahel na Scarf", "Rosang Scarf", "Lilamg Scarf", "Puting Scarf"],
      correctAnswer: "Kahel na Scarf",
      image: require('../../../assets/images/orange_scarf.jpg'),
    },
    {
      question: "Which of these items is 'Rosang Gwantes' in Tagalog?",
      options: ["Pink Gloves", "Purple Jacket", "Green Dress", "Blue Pants"],
      correctAnswer: "Pink Gloves",
      image: require('../../../assets/images/pink_gloves.jpg'),
    },
    {
      question: "What is the correct way to say 'Purple Jacket' in Tagalog?",
      options: ["Lilamg Dyaket", "Dilaw na Dyaket", "Kahel na Dyaket", "Berdeng Dyaket"],
      correctAnswer: "Lilamg Dyaket",
      image: require('../../../assets/images/purple_jacket.jpg'),
    },
    {
      question: "What is the correct way to say 'Brown Belt' in Tagalog?",
      options: ["Kayumangging Sinturon", "Asul na Sinturon", "Rosang Sinturon", "Dilaw na Sinturon"],
      correctAnswer: "Kayumangging Sinturon",
      image: require('../../../assets/images/brown_belt.jpg'),
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
        <Text style={styles.text}>Congratulations! You've completed Quiz 7!</Text>
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

export default Quiz7;
