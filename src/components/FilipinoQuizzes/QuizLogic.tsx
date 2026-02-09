import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../Layout/AppLayout";
import QuizLayout from "./QuizLayout"; 
import { useXPStore } from "../../store/useXPStore";
import { useProgressStore } from "../../store/useProgressStore";
import { QuizData } from "./QuizData";
import { RootStackParamList } from "../../navigation/navigation";
import { useAccoladeStore } from "../../store/useAccoladeStore";

type Nav = StackNavigationProp<RootStackParamList>;

type QuizLogicProps = {
  quizData: QuizData;
};

const QuizLogic: React.FC<QuizLogicProps> = ({ quizData }) => {
  const navigation = useNavigation<Nav>();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [page, setPage] = useState<"quiz" | "summary">("quiz");

  const addXP = useXPStore((s) => s.addXP);
  const completeQuiz = useProgressStore((s) => s.completeQuiz);
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);
  const unlockedAccolades = useAccoladeStore((s) => s.unlocked);

  const { id, title, accoladeKey, xpReward, questions } = quizData;

  const handleOptionPress = (option: string) => {
    if (selectedOption === option) {
      setShowAnswer(true);
      
      setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        
        if (nextQuestion >= questions.length) {
          setPage("summary");
        } else {
          setCurrentQuestion(nextQuestion);
          setSelectedOption(null);
          setShowAnswer(false);
        }
      }, 900);
    } else {
      setSelectedOption(option);
    }
  };

  /* ----------------------------------------
     UNLOCK ACCOLADE ON SUMMARY
  ---------------------------------------- */
  useEffect(() => {
    if (page !== "summary") return;

    completeQuiz(id);
    addXP(xpReward);
    unlockAccolade(accoladeKey);
  }, [page, id, xpReward, accoladeKey, addXP, completeQuiz, unlockAccolade]);

  const handleFinish = () => {
    navigation.goBack();
  };

  /* ----------------------------------------
     SUMMARY SCREEN
  ---------------------------------------- */
  if (page === "summary") {
    return (
      <AppLayout title={title}>
        <QuizLayout quizNumber={id} mode="summary">
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>🎉 Quiz Complete!</Text>
            
            <View style={styles.accoladeCard}>
              <Text style={styles.accoladeIcon}>{accoladeKey.icon}</Text>
              <Text style={styles.accoladeTitle}>{accoladeKey.title}</Text>
              <Text style={styles.accoladeDescription}>
                {accoladeKey.description}
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>
                ✨ You earned +{xpReward} XP
              </Text>
              <Text style={styles.statsText}>
                📝 Questions completed: {questions.length}
              </Text>
              <Text style={styles.statsText}>
                🏆 Total accolades: {unlockedAccolades.length}
              </Text>
            </View>

            <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
              <Text style={styles.finishButtonText}>Back to Quizzes</Text>
            </TouchableOpacity>
          </View>
        </QuizLayout>
      </AppLayout>
    );
  }

  /* ----------------------------------------
     QUIZ QUESTION SCREEN
  ---------------------------------------- */
  const q = questions[currentQuestion];

  return (
    <AppLayout title={title}>
      <QuizLayout 
        quizNumber={id} 
        mode="quiz" 
        step={currentQuestion + 1} 
        total={questions.length}
      >
        <LinearGradient colors={["#FFDEE9", "#B5FFFC"]} style={styles.container}>
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
      </QuizLayout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
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
  summaryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryTitle: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 24,
    textAlign: "center",
  },
  accoladeCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    width: "100%",
    maxWidth: 400,
  },
  accoladeIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  accoladeTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  accoladeDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  statsContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  statsText: {
    fontSize: 16,
    marginVertical: 4,
    color: "#333",
  },
  finishButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: "#2563EB",
    borderRadius: 14,
  },
  finishButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default QuizLogic;