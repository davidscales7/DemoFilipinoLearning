import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// greetings along with basic responses
const slides = [
  { word: "Red Shirt", translated: "Pulang Kamiseta", image: require('../../../assets/images/red_shirt.jpg') },
  { word: "Blue Pants", translated: "Asul na Pantalon", image: require('../../../assets/images/blue_pants.jpg') },
  { word: "Green Dress", translated: "Berdeng Damit", image: require('../../../assets/images/green_dress.jpg') },
  { word: "Yellow Hat", translated: "Dilaw na Sombrero", image: require('../../../assets/images/yellow_hat.jpg') },
  { word: "Black Shoes", translated: "Itim na Sapatos", image: require('../../../assets/images/black_shoes.jpg') },
  { word: "White Socks", translated: "Puting Medyas", image: require('../../../assets/images/white_socks.jpg') },
  { word: "Orange Scarf", translated: "Kahel na Scarf", image: require('../../../assets/images/orange_scarf.jpg') },
  { word: "Pink Gloves", translated: "Rosang Gwantes", image: require('../../../assets/images/pink_gloves.jpg') },
  { word: "Purple Jacket", translated: "Lilang Dyaket", image: require('../../../assets/images/purple_jacket.jpg') },
  { word: "Brown Belt", translated: "Kayumangging Sinturon", image: require('../../../assets/images/brown_belt.jpg') },
];

const questions = [
  {
    question: "What is the correct way to say 'Red Shirt' in Tagalog?",
    options: ["Pulang Kamiseta", "Asul na Kamiseta", "Dilaw na Kamiseta", "Lilamg Kamiseta"],
    correctAnswer: "Pulang Kamiseta",
    image: require('../../../assets/images/red_shirt.jpg'),
  },
  {
    question: "What is the correct way to say 'Blue Pants' in Tagalog?",
    options: ["Asul na Pantalon", "Berdeng Pantalon", "Puting Pantalon", "Kahel na Pantalon"],
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
    question: "What is the correct way to say 'Yellow Hat' in Tagalog?",
    options: ["Dilaw na Sombrero", "Puting Sombrero", "Itim na Sombrero", "Asul na Sombrero"],
    correctAnswer: "Dilaw na Sombrero",
    image: require('../../../assets/images/yellow_hat.jpg'),
  },
  {
    question: "What is the correct way to say 'Black Shoes' in Tagalog?",
    options: ["Itim na Sapatos", "Berdeng Sapatos", "Kahel na Sapatos", "Lilamg Sapatos"],
    correctAnswer: "Itim na Sapatos",
    image: require('../../../assets/images/black_shoes.jpg'),
  },
  {
    question: "What is the correct way to say 'White Socks' in Tagalog?",
    options: ["Puting Medyas", "Asul na Medyas", "Dilaw na Medyas", "Kayumangging Medyas"],
    correctAnswer: "Puting Medyas",
    image: require('../../../assets/images/white_socks.jpg'),
  },
  {
    question: "What is the correct way to say 'Orange Scarf' in Tagalog?",
    options: ["Kahel na Scarf", "Rosang Scarf", "Berdeng Scarf", "Puting Scarf"],
    correctAnswer: "Kahel na Scarf",
    image: require('../../../assets/images/orange_scarf.jpg'),
  },
  {
    question: "What is the correct way to say 'Pink Gloves' in Tagalog?",
    options: ["Rosang Gwantes", "Berdeng Gwantes", "Kayumangging Gwantes", "Lilamg Gwantes"],
    correctAnswer: "Rosang Gwantes",
    image: require('../../../assets/images/pink_gloves.jpg'),
  },
  {
    question: "What is the correct way to say 'Purple Jacket' in Tagalog?",
    options: ["Lilamg Dyaket", "Dilaw na Dyaket", "Asul na Dyaket", "Kahel na Dyaket"],
    correctAnswer: "Lilamg Dyaket",
    image: require('../../../assets/images/purple_jacket.jpg'),
  },
  {
    question: "What is the correct way to say 'Brown Belt' in Tagalog?",
    options: ["Kayumangging Sinturon", "Puting Sinturon", "Pulang Sinturon", "Asul na Sinturon"],
    correctAnswer: "Kayumangging Sinturon",
    image: require('../../../assets/images/brown_belt.jpg'),
  },
];



const Lesson7: React.FC = () => {
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
        <Text style={styles.text}>You've completed lesson 7</Text>
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

export default Lesson7;
