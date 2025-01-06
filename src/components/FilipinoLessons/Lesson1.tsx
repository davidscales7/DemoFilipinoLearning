import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// Define slides as a JavaScript array of objects
const slides = [
  { number: "1", word: "Kamusta", translated: "Hello / how are you?", image: require('../../../assets/images/hello.png') },
  { number: "2", word: "Mabuti", translated: "I'm Good", image: require('../../../assets/images/good.jpg') },
  { number: "3", word: "Malongkot", translated: "I'm Sad", image: require('../../../assets/images/sad.jpg') },
  { number: "4", word: "Masaya", translated: "I'm Happy", image: require('../../../assets/images/happy.jpg') },
  { number: "5", word: "Magandang Umaga", translated: "Good Morning", image: require('../../../assets/images/morning.jpg') },
  { number: "6", word: "Magadang Hapon", translated: "Good Afternoon", image: require('../../../assets/images/afternoon.jpg') },
  { number: "7", word: "Magandang Gabi", translated: "Good Evening", image: require('../../../assets/images/evening.jpg') },
  { number: "8", word: "Pa alam", translated: "Goodbye", image: require('../../../assets/images/goodbye.jpg') },
  { number: "9", word: "Ikaw", translated: "You", image: require('../../../assets/images/you.jpg') },
];

// Define questions as a JavaScript array of objects
const questions = [
  {
    question: "What is the correct way to greet someone?",
    options: ["Masaya", "Mabuti", "Malongkot", "Kamusta"],
    correctAnswer: "Kamusta",
    image: require('../../../assets/images/hand.jpg'),
  },
  {
    question: "What is the correct way to say I'm sad?",
    options: ["Pa alam", "Masaya", "Ikaw", "Malongkot"],
    correctAnswer: "Malongkot",
    image: require('../../../assets/images/sad.jpg'),
  },
];

const Lesson1: React.FC = () => {
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

export default Lesson1;
