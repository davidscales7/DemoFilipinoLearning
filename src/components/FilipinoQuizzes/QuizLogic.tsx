import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
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
type QuizLogicProps = { quizData: QuizData };

const QuizLogic: React.FC<QuizLogicProps> = ({ quizData }) => {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

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

  useEffect(() => {
    if (page !== "summary") return;
    completeQuiz(id);
    addXP(xpReward);
    unlockAccolade(accoladeKey);
  }, [page, id, xpReward, accoladeKey, addXP, completeQuiz, unlockAccolade]);

  const handleFinish = () => navigation.goBack();

  /* ── SUMMARY ── */
  if (page === "summary") {
    return (
      <AppLayout title={title}>
        <QuizLayout quizNumber={id} mode="summary">
          <View style={styles.summaryContainer}>
            <Text style={[styles.summaryTitle, isMobile && styles.summaryTitleMobile]}>
              🎉 Quiz Complete!
            </Text>

            <View style={[styles.accoladeCard, isMobile && styles.accoladeCardMobile]}>
              <Text style={[styles.accoladeIcon, isMobile && styles.accoladeIconMobile]}>
                {accoladeKey.icon}
              </Text>
              <Text style={[styles.accoladeTitle, isMobile && styles.accordadeTitleMobile]}>
                {accoladeKey.title}
              </Text>
              <Text style={styles.accoladeDescription}>
                {accoladeKey.description}
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <Text style={[styles.statsText, isMobile && styles.statsTextMobile]}>
                ✨ You earned +{xpReward} XP
              </Text>
              <Text style={[styles.statsText, isMobile && styles.statsTextMobile]}>
                📝 Questions completed: {questions.length}
              </Text>
              <Text style={[styles.statsText, isMobile && styles.statsTextMobile]}>
                🏆 Total accolades: {unlockedAccolades.length}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.finishButton, isMobile && styles.finishButtonMobile]}
              onPress={handleFinish}
            >
              <Text style={styles.finishButtonText}>Back to Quizzes</Text>
            </TouchableOpacity>
          </View>
        </QuizLayout>
      </AppLayout>
    );
  }

  /* ── QUIZ QUESTION ── */
  const q = questions[currentQuestion];

  return (
    <AppLayout title={title}>
      <QuizLayout
        quizNumber={id}
        mode="quiz"
        step={currentQuestion + 1}
        total={questions.length}
      >
        <LinearGradient
          colors={["#FFDEE9", "#B5FFFC"]}
          style={[styles.container, isMobile && styles.containerMobile]}
        >
          <View style={[styles.card, isMobile && styles.cardMobile]}>

            {/* Question text */}
            <Text style={[styles.text, isMobile && styles.textMobile]}>
              {q.question}
            </Text>

            {/* Question image — hidden if null */}
            {q.image && (
              <Image
                source={q.image}
                style={[styles.questionImage, isMobile && styles.questionImageMobile]}
                resizeMode="contain"
              />
            )}

            {/* Options or answer reveal */}
            {!showAnswer ? (
              q.options.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleOptionPress(option)}
                  style={[
                    styles.optionButton,
                    isMobile && styles.optionButtonMobile,
                    selectedOption === option && styles.selectedOption,
                  ]}
                >
                  <Text style={[styles.optionText, isMobile && styles.optionTextMobile]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={[styles.answerText, isMobile && styles.answerTextMobile]}>
                ✅ Correct Answer: {q.correctAnswer}
              </Text>
            )}

          </View>
        </LinearGradient>
      </QuizLayout>
    </AppLayout>
  );
};

/* ── STYLES ── */
const styles = StyleSheet.create({
  // ── Quiz screen ──
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  containerMobile: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
    alignItems: "center",
  },
  cardMobile: {
    padding: 16,
    borderRadius: 12,
  },

  text: {
    fontSize: 22,
    fontWeight: "800",
    color: "#333",
    marginBottom: 18,
    textAlign: "center",
  },
  textMobile: {
    fontSize: 16,
    marginBottom: 12,
  },

  questionImage: {
    width: "80%",
    height: 200,
    marginBottom: 18,
  },
  questionImageMobile: {
    width: "100%",
    height: 130,
    marginBottom: 12,
  },

  optionButton: {
    padding: 14,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    width: "100%",
    alignItems: "center",
  },
  optionButtonMobile: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  optionTextMobile: {
    fontSize: 14,
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
  answerTextMobile: {
    fontSize: 15,
    marginTop: 12,
  },

  // ── Summary screen ──
  summaryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  summaryTitle: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 24,
    textAlign: "center",
  },
  summaryTitleMobile: {
    fontSize: 24,
    marginBottom: 16,
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
  accoladeCardMobile: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },

  accoladeIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  accoladeIconMobile: {
    fontSize: 44,
    marginBottom: 8,
  },

  accoladeTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  accordadeTitleMobile: {
    fontSize: 18,
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
  statsTextMobile: {
    fontSize: 13,
    marginVertical: 3,
  },

  finishButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: "#2563EB",
    borderRadius: 14,
  },
  finishButtonMobile: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: "100%",
    alignItems: "center",
  },

  finishButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default QuizLogic;