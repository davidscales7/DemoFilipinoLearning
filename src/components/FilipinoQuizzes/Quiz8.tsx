
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Quiz8: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      question: "How do you say 'Reading' in Tagalog?",
      options: ["Pagluluto", "Pagbabasa", "Pagpipinta", "Pagsasayaw"],
      correctAnswer: "Pagbabasa",
      image: require('../../../assets/images/reading.jpg'),
    },
    {
      question: "What is the Tagalog translation of 'Cooking'?",
      options: ["Pagpipinta", "Pagluluto", "Pagtugtog ng Instrumento", "Pagbabasa"],
      correctAnswer: "Pagluluto",
      image: require('../../../assets/images/cooking.jpg'),
    },
    {
      question: "What hobby is 'Paglalakbay' in English?",
      options: ["Traveling", "Drawing", "Watching Movies", "Gardening"],
      correctAnswer: "Traveling",
      image: require('../../../assets/images/traveling.jpg'),
    },
    {
      question: "How do you say 'Singing' in Tagalog?",
      options: ["Pagpipinta", "Pagluluto", "Pagkanta", "Panonood ng Pelikula"],
      correctAnswer: "Pagkanta",
      image: require('../../../assets/images/singing.jpg'),
    },
    {
      question: "What is the correct way to say 'Gardening' in Tagalog?",
      options: ["Paghahalaman", "Pagluluto", "Paglalakbay", "Pagtugtog ng Instrumento"],
      correctAnswer: "Paghahalaman",
      image: require('../../../assets/images/gardening.jpg'),
    },
    {
      question: "What is 'Pagsasayaw' in English?",
      options: ["Dancing", "Drawing", "Cooking", "Gardening"],
      correctAnswer: "Dancing",
      image: require('../../../assets/images/dancing.jpg'),
    },
    {
      question: "What is the Tagalog translation of 'Drawing'?",
      options: ["Pagluluto", "Paglalakbay", "Pagpipinta", "Pagkanta"],
      correctAnswer: "Pagpipinta",
      image: require('../../../assets/images/drawing.jpg'),
    },
    {
      question: "What hobby is 'Pagtugtog ng Instrumento' in English?",
      options: ["Playing Instruments", "Traveling", "Gardening", "Singing"],
      correctAnswer: "Playing Instruments",
      image: require('../../../assets/images/music.jpg'),
    },
    {
      question: "What is the correct way to say 'Watching Movies' in Tagalog?",
      options: ["Pagluluto", "Paghahalaman", "Panonood ng Pelikula", "Paglalakbay"],
      correctAnswer: "Panonood ng Pelikula",
      image: require('../../../assets/images/movies.jpg'),
    },
    {
      question: "What is 'Ano ang iyong libangan?' in English?",
      options: ["What is your hobby?", "Do you like to cook?", "What do you do on Saturdays?", "Do you enjoy singing?"],
      correctAnswer: "What is your hobby?",
      image: null,
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
        <Text style={styles.text}>Congratulations! You've completed Quiz 8!</Text>
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
          {questions[currentQuestion].image && (
            <Image
              source={questions[currentQuestion].image}
              style={styles.image}
              resizeMode="contain"
            />
          )}
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

export default Quiz8;
