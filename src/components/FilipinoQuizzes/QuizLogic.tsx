import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../Layout/AppLayout";
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
  console.log("🔵 [COMPONENT RENDER] QuizLogic rendered");
  
  const navigation = useNavigation<Nav>();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [page, setPage] = useState<"quiz" | "summary">("quiz");

  console.log("📊 [STATE] Current state:", {
    currentQuestion,
    selectedOption,
    showAnswer,
    page,
  });

  const addXP = useXPStore((s) => s.addXP);
  const currentXP = useXPStore((s) => s.xp);
  const completeQuiz = useProgressStore((s) => s.completeQuiz);
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);
  const unlockedAccolades = useAccoladeStore((s) => s.unlocked);
  const completedQuizzes = useProgressStore((s) => s.completedQuizzes);

  const { id, title, accoladeKey, xpReward, questions } = quizData;

  console.log("📋 [QUIZ DATA]:", {
    id,
    title,
    xpReward,
    totalQuestions: questions.length,
    accoladeKey: {
      id: accoladeKey.id,
      title: accoladeKey.title,
      icon: accoladeKey.icon,
    },
  });

  console.log("🏆 [STORES STATE]:", {
    currentXP,
    unlockedAccoladesCount: unlockedAccolades.length,
    unlockedAccoladeIds: unlockedAccolades.map(a => a.id),
    completedQuizzes,
  });

  const handleOptionPress = (option: string) => {
    console.log("🖱️ [OPTION PRESS] Option pressed:", option);
    console.log("🖱️ [OPTION PRESS] Selected option:", selectedOption);
    
    if (selectedOption === option) {
      console.log("✅ [OPTION PRESS] Option confirmed - showing answer");
      setShowAnswer(true);
      
      setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        console.log("⏭️ [QUESTION PROGRESS]:", {
          currentQuestion,
          nextQuestion,
          totalQuestions: questions.length,
          isComplete: nextQuestion >= questions.length,
        });
        
        // Check if quiz is complete
        if (nextQuestion >= questions.length) {
          console.log("🎉 [QUIZ COMPLETE] All questions answered!");
          console.log("🎉 [QUIZ COMPLETE] Going to summary page...");
          setPage("summary");
        } else {
          console.log("➡️ [NEXT QUESTION] Moving to question", nextQuestion + 1);
          setCurrentQuestion(nextQuestion);
          setSelectedOption(null);
          setShowAnswer(false);
        }
      }, 900);
    } else {
      console.log("🔄 [OPTION PRESS] Option selected (not confirmed yet)");
      setSelectedOption(option);
    }
  };

  /* ----------------------------------------
     UNLOCK ACCOLADE ON SUMMARY
  ---------------------------------------- */
  useEffect(() => {
    console.log("🔄 [EFFECT] useEffect triggered");
    console.log("🔄 [EFFECT] Page value:", page);
    
    if (page !== "summary") {
      console.log("⏭️ [EFFECT] Not on summary page, skipping. Current page:", page);
      return;
    }

    console.log("=" .repeat(60));
    console.log("🎯 [EFFECT] SUMMARY PAGE REACHED!");
    console.log("🎯 [EFFECT] Starting quiz completion process...");
    console.log("=" .repeat(60));

    // Mark quiz complete
    console.log("📝 [EFFECT] Calling completeQuiz with id:", id);
    completeQuiz(id);
    console.log("✅ [EFFECT] completeQuiz called");

    // Award XP
    console.log("⭐ [EFFECT] Calling addXP with amount:", xpReward);
    console.log("⭐ [EFFECT] Current XP before:", currentXP);
    addXP(xpReward);
    console.log("✅ [EFFECT] addXP called");

    // Unlock accolade
    console.log("🏆 [EFFECT] Calling unlockAccolade with:", {
      id: accoladeKey.id,
      title: accoladeKey.title,
      description: accoladeKey.description,
      icon: accoladeKey.icon,
    });
    unlockAccolade(accoladeKey);
    console.log("✅ [EFFECT] unlockAccolade called");

    console.log("=" .repeat(60));
    console.log("🎊 [EFFECT] Quiz completion process finished!");
    console.log("🎊 [EFFECT] Check stores to verify data was saved");
    console.log("=" .repeat(60));
    
    // Check results after a short delay
    setTimeout(() => {
      console.log("🔍 [VERIFICATION] Checking if data was saved...");
      const quizStore = useProgressStore.getState();
      const accoladeStore = useAccoladeStore.getState();
      console.log("🔍 [VERIFICATION] Completed quizzes:", quizStore.completedQuizzes);
      console.log("🔍 [VERIFICATION] Unlocked accolades:", accoladeStore.unlocked.map(a => ({
        id: a.id,
        title: a.title,
      })));
    }, 100);
  }, [page, id, xpReward, accoladeKey, addXP, completeQuiz, unlockAccolade]);

  const handleFinish = () => {
    console.log("🏁 [NAVIGATION] Back button pressed");
    console.log("🏁 [NAVIGATION] Returning from quiz:", title);
    navigation.goBack();
  };

  /* ----------------------------------------
     SUMMARY SCREEN
  ---------------------------------------- */
  if (page === "summary") {
    console.log("🖼️ [RENDER] Rendering SUMMARY screen");
    
    return (
      <AppLayout title={title}>
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
      </AppLayout>
    );
  }

  /* ----------------------------------------
     QUIZ QUESTION SCREEN
  ---------------------------------------- */
  console.log("🖼️ [RENDER] Rendering QUIZ screen - Question", currentQuestion + 1);
  
  const q = questions[currentQuestion];

  return (
    <AppLayout title={title}>
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
  summaryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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