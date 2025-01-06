import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Quiz9: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      question: "Translate the sentence: 'I am happy.'",
      options: ["Ako ay masaya.", "Ikaw ay malungkot.", "Sila ay mabuti.", "Si Juan ay nagbabasa."],
      correctAnswer: "Ako ay masaya.",
    },
    {
      question: "What is the correct way to negate the sentence 'I am happy'?",
      options: [
        "Ako ay hindi masaya.",
        "Ikaw ay hindi masaya.",
        "Sila ay masaya.",
        "Ako ay masaya.",
      ],
      correctAnswer: "Ako ay hindi masaya.",
    },
    {
      question: "Rearrange the sentence: 'malungkot / Ako / ay'.",
      options: [
        "Ako ay malungkot.",
        "Ay malungkot Ako.",
        "Malungkot Ako ay.",
        "Malungkot ay Ako.",
      ],
      correctAnswer: "Ako ay malungkot.",
    },
    {
      question: "Translate the question: 'What are you doing?'",
      options: [
        "Ano ang ginagawa mo?",
        "Saan ka pupunta?",
        "Paano mo ito ginagawa?",
        "Kailan tayo kakain?",
      ],
      correctAnswer: "Ano ang ginagawa mo?",
    },
    {
      question: "How do you ask: 'Where are you going?' in Tagalog?",
      options: [
        "Saan ka pupunta?",
        "Ano ang ginagawa mo?",
        "Paano mo ito ginagawa?",
        "Kailan tayo kakain?",
      ],
      correctAnswer: "Saan ka pupunta?",
    },
    {
      question: "Negate the sentence: 'Sila ay naglalaro.'",
      options: [
        "Sila ay hindi naglalaro.",
        "Sila ay hindi mabuti.",
        "Sila ay hindi masaya.",
        "Sila ay naglalaro.",
      ],
      correctAnswer: "Sila ay hindi naglalaro.",
    },
    {
      question: "Translate the sentence: 'They are good.'",
      options: [
        "Sila ay mabuti.",
        "Sila ay masaya.",
        "Sila ay naglalaro.",
        "Sila ay nagbabasa.",
      ],
      correctAnswer: "Sila ay mabuti.",
    },
    {
      question: "Rearrange the sentence: 'ay / Si Ana / nagluluto / ng pagkain'.",
      options: [
        "Si Ana ay nagluluto ng pagkain.",
        "Si Ana ng pagkain ay nagluluto.",
        "Nagluluto ay Si Ana ng pagkain.",
        "Si Ana nagluluto ay ng pagkain.",
      ],
      correctAnswer: "Si Ana ay nagluluto ng pagkain.",
    },
    {
      question: "Translate: 'She is reading a book in the library.'",
      options: [
        "Siya ay nagbabasa ng libro sa aklatan.",
        "Siya ay nagbabasa ng aklat sa kusina.",
        "Siya ay nagluluto ng libro sa aklatan.",
        "Siya ay kumakain ng libro sa aklatan.",
      ],
      correctAnswer: "Siya ay nagbabasa ng libro sa aklatan.",
    },
    {
      question: "Form a question: 'Where are they playing?'",
      options: [
        "Saan sila naglalaro?",
        "Ano ang ginagawa nila?",
        "Paano sila naglalaro?",
        "Kailan sila pupunta?",
      ],
      correctAnswer: "Saan sila naglalaro?",
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
        <Text style={styles.text}>🎉 Congratulations! You've completed Quiz 9! 🎉</Text>
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

export default Quiz9;
