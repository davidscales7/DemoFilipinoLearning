import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Quiz1: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasPostedAccolade, setHasPostedAccolade] = useState(false);

  const questions = [
    {
      question: "What is the correct translation for 'Kamusta'?",
      options: ["Goodbye", "Hello / How are you?", "Good Morning", "I'm Sad"],
      correctAnswer: "Hello / How are you?",
      image: require("../../../assets/images/hello.png"),
    },
    {
      question: "What word means 'I'm Happy'?",
      options: ["Masaya", "Malongkot", "Mabuti", "Pa alam"],
      correctAnswer: "Masaya",
      image: require("../../../assets/images/happy.jpg"),
    },
    {
      question: "What is the correct phrase for 'Good Morning'?",
      options: ["Magandang Umaga", "Magandang Gabi", "Masaya", "Malongkot"],
      correctAnswer: "Magandang Umaga",
      image: require("../../../assets/images/morning.jpg"),
    },
    {
      question: "Match the image with the correct word. (Hint: I'm Sad)",
      options: ["Malongkot", "Ikaw", "Pa alam", "Mabuti"],
      correctAnswer: "Malongkot",
      image: require("../../../assets/images/sad.jpg"),
    },
    {
      question: "Fill in the blank: '_____ means I'm Good.'",
      options: ["Malongkot", "Mabuti", "Masaya", "Ikaw"],
      correctAnswer: "Mabuti",
      image: require("../../../assets/images/good.jpg"),
    },
  ];

  const handleOptionPress = (option: string) => {
    if (selectedOption === option) {
      setShowAnswer(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      }, 2000);
    } else {
      setSelectedOption(option);
    }
  };

  const quizCompleted = currentQuestion >= questions.length;

  // ✅ post accolade ONCE when quiz is completed
  useEffect(() => {
    if (!quizCompleted || hasPostedAccolade) return;

    const postAccolade = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:3000/addAccoladeQuiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quizAccolade: "Quiz 1" }),
        });

        const data = await res.json();
        console.log("Accolade data:", data);
      } catch (err) {
        console.log("Failed to post quiz accolade:", err);
      } finally {
        setHasPostedAccolade(true);
      }
    };

    postAccolade();
  }, [quizCompleted, hasPostedAccolade]);

  if (quizCompleted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Congratulations! You've completed Quiz 1!
        </Text>
      </View>
    );
  }

  const q = questions[currentQuestion];

  return (
    <LinearGradient colors={["#FFDEE9", "#B5FFFC"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>{q.question}</Text>
        <Image
          source={q.image}
          style={styles.questionImage}
          resizeMode="contain"
        />

        {!showAnswer ? (
          q.options.map((option) => (
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
            Correct Answer: {q.correctAnswer}
          </Text>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  questionImage: {
    width: "80%",
    height: 200,
    marginBottom: 20,
  },
  optionButton: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  selectedOption: {
    backgroundColor: "orange",
  },
  answerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Quiz1;
