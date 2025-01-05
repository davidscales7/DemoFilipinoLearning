import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// greetings along with basic responses
const slides = [
  { word: "Father", translated: "Ama", image: require('../../../assets/images/father.png') },
  { word: "Mother", translated: "Ina", image: require('../../../assets/images/mother.png') },
  { word: "Brother", translated: "Kapatid na Lalaki", image: require('../../../assets/images/brother.png') },
  { word: "Sister", translated: "Kapatid na Babae", image: require('../../../assets/images/sister.png') },
  { word: "Grandfather", translated: "Lolo", image: require('../../../assets/images/grandad.png') },
  { word: "Grandmother", translated: "Lola", image: require('../../../assets/images/grandma.png') },
  { word: "Uncle", translated: "Tiyo", image: require('../../../assets/images/uncle.jpg') },
  { word: "Aunt", translated: "Tiya", image: require('../../../assets/images/aunt.jpg') },
  { word: "Cousin", translated: "Pinsan", image: require('../../../assets/images/cousin.png') },
];


const questions = [
  {
    question: "What is the correct way to say 'Father' in Tagalog?",
    options: ["Ama", "Ina", "Lolo", "Pinsan"],
    correctAnswer: "Ama",
    image: require('../../../assets/images/father.png'), // Update with the correct image path
  },
  {
    question: "What is the correct way to say 'Mother' in Tagalog?",
    options: ["Kapatid na Babae", "Ina", "Tiya", "Lola"],
    correctAnswer: "Ina",
    image: require('../../../assets/images/mother.png'), // Update with the correct image path
  },
  {
    question: "What is the correct way to say 'Brother' in Tagalog?",
    options: ["Kapatid na Lalaki", "Ama", "Tiyo", "Pinsan"],
    correctAnswer: "Kapatid na Lalaki",
    image: require('../../../assets/images/brother.png'), // Update with the correct image path
  },
  {
    question: "What is the correct way to say 'Sister' in Tagalog?",
    options: ["Lolo", "Kapatid na Babae", "Ina", "Lola"],
    correctAnswer: "Kapatid na Babae",
    image: require('../../../assets/images/sister.png'), // Update with the correct image path
  },
  {
    question: "What is the correct way to say 'Grandfather' in Tagalog?",
    options: ["Lolo", "Tiyo", "Ama", "Tiya"],
    correctAnswer: "Lolo",
    image: require('../../../assets/images/grandad.png'), // Update with the correct image path
  },
  {
    question: "What is the correct way to say 'Grandmother' in Tagalog?",
    options: ["Lola", "Ina", "Pinsan", "Tiya"],
    correctAnswer: "Lola",
    image: require('../../../assets/images/grandma.png'), // Update with the correct image path
  },
  {
    question: "What is the correct way to say 'Uncle' in Tagalog?",
    options: ["Tiyo", "Kapatid na Lalaki", "Lolo", "Ama"],
    correctAnswer: "Tiyo",
    image: require('../../../assets/images/uncle.jpg'), // Update with the correct image path
  },
  {
    question: "What is the correct way to say 'Aunt' in Tagalog?",
    options: ["Tiya", "Lola", "Ina", "Pinsan"],
    correctAnswer: "Tiya",
    image: require('../../../assets/images/aunt.jpg'), // Update with the correct image path
  },
  {
    question: "What is the correct way to say 'Cousin' in Tagalog?",
    options: ["Pinsan", "Ama", "Kapatid na Babae", "Lolo"],
    correctAnswer: "Pinsan",
    image: require('../../../assets/images/cousin.png'), // Update with the correct image path
  },
];


const Lesson3: React.FC = () => {
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

export default Lesson3;
