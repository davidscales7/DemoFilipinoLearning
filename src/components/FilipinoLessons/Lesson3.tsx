import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigation';


type Lesson3NavigationProp = StackNavigationProp<RootStackParamList, 'FilipinoLessons'>;


const questions = [
  {
    question: "How are ____ today?",
    options: ["you", "I", "me", "we"],
    correctAnswer: "you",
    image: require('../../../assets/images/correct.jpg'), // Replace with your image path
  },

  // Add more questions as needed
];

const Lesson3: React.FC = () => {
const navigation = useNavigation<Lesson3NavigationProp>();

const [currentQuestion, setCurrentQuestion] = useState(0);
const [selectedOption, setSelectedOption] = useState<string | null>(null);

const [showAnswer, setShowAnswer] = useState(false);

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


  const handleNavigateToLessonsScreen = () => {
    navigation.navigate('FilipinoLessons');
  };

  if (currentQuestion >= questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You've completed the Third lesson</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToLessonsScreen}
        >
          <Text
           style={styles.buttonText}>Back to Lessons</Text>
        </TouchableOpacity>
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
            <TouchableOpacity
              style={styles.button}
              onPress={handleNavigateToLessonsScreen}
            >
              <Text style={styles.buttonText}>Back to Lessons</Text>
            </TouchableOpacity>
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
    width: '80%', // Adjust the width to fit the card
    height: 200, // Adjust the height as needed
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Lesson3;
