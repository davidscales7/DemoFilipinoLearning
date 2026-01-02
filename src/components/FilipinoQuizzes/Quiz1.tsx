import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppLayout from "../Layout/AppLayout";
import { useXPStore } from "../../store/useXPStore";

const Quiz1: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasPostedAccolade, setHasPostedAccolade] = useState(false);

  const addXP = useXPStore((s) => s.addXP);
  const currentXP = useXPStore((s) => s.xp);

  const QUIZ_XP_REWARD = 20;

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
      }, 900);
    } else {
      setSelectedOption(option);
    }
  };

  const quizCompleted = currentQuestion >= questions.length;

  /* ----------------------------------------
     POST ACCOLADE + XP (ONCE)
  ---------------------------------------- */
  useEffect(() => {
    if (!quizCompleted || hasPostedAccolade) return;

    const beforeXP = currentXP;

    addXP(QUIZ_XP_REWARD);

    const postAccolade = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        await fetch("http://localhost:3000/addAccoladeQuiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quizAccolade: "Quiz 1" }),
        });
      } catch (err) {
        console.log("Failed to post quiz accolade:", err);
      } finally {
        setHasPostedAccolade(true);
      }
    };

    postAccolade();
  }, [quizCompleted, hasPostedAccolade]);

  /* ----------------------------------------
     COMPLETION SCREEN
  ---------------------------------------- */
  if (quizCompleted) {
    return (
      <AppLayout
        title="Greetings Quiz"
        animatedStartXP={currentXP}
        animatedEndXP={currentXP + QUIZ_XP_REWARD}
      >
        <View style={styles.completedWrap}>
          <Text style={styles.completedTitle}>Nice work 🎉</Text>
          <Text style={styles.completedSub}>
            You earned +{QUIZ_XP_REWARD} XP
          </Text>
        </View>
      </AppLayout>
    );
  }

  const q = questions[currentQuestion];

  return (
    <AppLayout title="Greetings Quiz">
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
    </AppLayout>
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
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
    alignItems: "center",
  },

  text: {
    fontSize: 22,
    fontWeight: "800",
    color: "#333",
    marginBottom: 18,
    textAlign: "center",
  },

  questionImage: {
    width: "80%",
    height: 200,
    marginBottom: 18,
  },

  optionButton: {
    padding: 14,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    width: "100%",
    alignItems: "center",
  },

  optionText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  selectedOption: {
    backgroundColor: "#F59E0B",
  },

  answerText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#16A34A",
    textAlign: "center",
    marginTop: 16,
  },

  completedWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  completedTitle: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 8,
  },
  completedSub: {
    fontSize: 18,
    opacity: 0.7,
  },
});

export default Quiz1;
