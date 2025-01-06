import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// greetings along with basic responses
const slides = [
  { word: "Red", translated: "Pula", image: require('../../../assets/images/red.jpg') },
  { word: "Blue", translated: "Asul", image: require('../../../assets/images/blue.png') },
  { word: "Green", translated: "Berde", image: require('../../../assets/images/green.png') },
  { word: "Yellow", translated: "Dilaw", image: require('../../../assets/images/yellow.png') },
  { word: "Black", translated: "Itim", image: require('../../../assets/images/black.png') },
  { word: "White", translated: "Puti", image: require('../../../assets/images/white.png') },
  { word: "Orange", translated: "Kahel", image: require('../../../assets/images/orange.png') },
  { word: "Pink", translated: "Rosas", image: require('../../../assets/images/pink.jpg') },
  { word: "Purple", translated: "Lila", image: require('../../../assets/images/purple.jpg') },
  { word: "Brown", translated: "Kayumanggi", image: require('../../../assets/images/brown.png') },
];

const questions = [
  {
    question: "What is the correct way to say 'Red' in Tagalog?",
    options: ["Pula", "Asul", "Dilaw", "Lila"],
    correctAnswer: "Pula",
    image: require('../../../assets/images/red.jpg'),
  },
  {
    question: "What is the correct way to say 'Blue' in Tagalog?",
    options: ["Itim", "Puti", "Asul", "Kayumanggi"],
    correctAnswer: "Asul",
    image: require('../../../assets/images/blue.png'),
  },
  {
    question: "What is the correct way to say 'Green' in Tagalog?",
    options: ["Berde", "Kahel", "Dilaw", "Rosas"],
    correctAnswer: "Berde",
    image: require('../../../assets/images/green.png'),
  },
  {
    question: "What is the correct way to say 'Yellow' in Tagalog?",
    options: ["Dilaw", "Pula", "Lila", "Puti"],
    correctAnswer: "Dilaw",
    image: require('../../../assets/images/yellow.png'),
  },
  {
    question: "What is the correct way to say 'Black' in Tagalog?",
    options: ["Asul", "Puti", "Dilaw", "Itim"],
    correctAnswer: "Itim",
    image: require('../../../assets/images/black.png'),
  },
  {
    question: "What is the correct way to say 'White' in Tagalog?",
    options: ["Pula", "Puti", "Kahel", "Berde"],
    correctAnswer: "Puti",
    image: require('../../../assets/images/white.png'),
  },
  {
    question: "What is the correct way to say 'Orange' in Tagalog?",
    options: ["Kayumanggi", "Kahel", "Dilaw", "Lila"],
    correctAnswer: "Kahel",
    image: require('../../../assets/images/orange.png'),
  },
  {
    question: "What is the correct way to say 'Pink' in Tagalog?",
    options: ["Rosas", "Asul", "Itim", "Pula"],
    correctAnswer: "Rosas",
    image: require('../../../assets/images/pink.jpg'),
  },
  {
    question: "What is the correct way to say 'Purple' in Tagalog?",
    options: ["Dilaw", "Lila", "Berde", "Puti"],
    correctAnswer: "Lila",
    image: require('../../../assets/images/purple.jpg'),
  },
  {
    question: "What is the correct way to say 'Brown' in Tagalog?",
    options: ["Kayumanggi", "Kahel", "Pula", "Rosas"],
    correctAnswer: "Kayumanggi",
    image: require('../../../assets/images/brown.png'),
  },
];



const Lesson4: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setCurrentSlide(null); // Indicates that the intro slides are over
    }
  };

  const handleOptionPress = (option: string) => {
    if (selectedOption === option) {
      setShowAnswer(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      }, 3000); // 3 seconds delay before moving to the next question
    } else {
      setSelectedOption(option);
    }
  };

  if (currentSlide !== null && currentSlide < slides.length) {
    // Render intro slides
    return (
      <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.text}>{slides[currentSlide].word}</Text>
          <Image source={slides[currentSlide].image} style={styles.introImage} resizeMode="contain" />
          <Text style={styles.text}>{slides[currentSlide].translated}</Text>
        </View>
        <TouchableOpacity onPress={handleNextSlide} style={styles.nextButton}>
          <Text style={styles.optionText}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  if (currentQuestion >= questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You've completed the First lesson</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Question {currentQuestion + 1} of {questions.length}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>{questions[currentQuestion].question}</Text>
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
          <>
            <Text style={styles.answerText}>
              Correct Answer: {questions[currentQuestion].correctAnswer}
            </Text>
            <Image
              source={questions[currentQuestion].image}
              style={styles.answerImage}
              resizeMode="contain"
            />
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
    alignItems: 'center', // Center the content
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
    width: '100%', // Ensure the button width is full
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
    marginBottom: 20,
  },
  answerImage: {
    width: '80%',
    height: 200,
  },
  introImage: {
    width: '80%',
    height: 300,
    marginBottom: 20,
  },
  nextButton: {
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: 'blue',
    alignItems: 'center',
  },
});

export default Lesson4;
