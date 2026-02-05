import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useXPStore } from "../../store/useXPStore";
import { useProgressStore } from "../../store/useProgressStore";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { RootStackParamList } from "../../navigation/navigation";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

/* ----------------------------------------
   TYPES
---------------------------------------- */
type Nav = StackNavigationProp<RootStackParamList, "FilipinoLearning">;

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

/* ----------------------------------------
   DATA
---------------------------------------- */

const QUESTIONS: Question[] = [
  {
    question: "What does 'Kamusta' mean?",
    options: ["Goodbye", "Thank you", "Hello / How are you", "Please"],
    correctIndex: 2,
  },
  {
    question: "Which is the correct Filipino word for 'Dog'?",
    options: ["Pusa", "Aso", "Ibon", "Isda"],
    correctIndex: 1,
  },
  {
    question: "Translate: 'I eat rice.'",
    options: [
      "Ako ay kumakain ng isda.",
      "Kumakain ako ng kanin.",
      "Ako ay nagluluto ng kanin.",
      "Kanin ay kinakain ko.",
    ],
    correctIndex: 1,
  },
  {
    question: "Which sentence is grammatically correct?",
    options: [
      "Masaya ay ako.",
      "Ako ay masaya.",
      "Ay masaya ako.",
      "Masaya ako ay.",
    ],
    correctIndex: 1,
  },
  {
    question: "How do you say 'They are not playing'?",
    options: [
      "Sila ay naglalaro.",
      "Sila ay hindi naglalaro.",
      "Hindi sila ay naglalaro.",
      "Ay hindi naglalaro sila.",
    ],
    correctIndex: 1,
  },
];

const XP_PER_CORRECT = 25;
const XP_COMPLETION_BONUS = 100;

/* ---------------- COMPONENT ---------------- */

const Lesson10: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const addXP = useXPStore((s) => s.addXP);
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState<"test" | "summary">("test");

  const current = QUESTIONS[index];

  /* ----------------------------------------
     MARK COMPLETE & UNLOCK ACCOLADE
  ---------------------------------------- */
  useEffect(() => {
    if (stage === "summary") {
      console.log("🎉 LESSON 10 COMPLETED - COURSE COMPLETE!");
      completeLesson(10);
      unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_10);
    }
  }, [stage, completeLesson, unlockAccolade]);

  const submitAnswer = () => {
    if (selected === null) return;

    const isCorrect = selected === current.correctIndex;

    console.log("📝 ANSWER:", {
      question: index + 1,
      selected,
      correct: current.correctIndex,
      isCorrect,
    });

    if (isCorrect) {
      addXP(XP_PER_CORRECT);
      setScore((s) => s + 1);
      console.log("✅ CORRECT! XP ADDED:", XP_PER_CORRECT);
    } else {
      console.log("❌ INCORRECT");
    }

    setSelected(null);

    if (index < QUESTIONS.length - 1) {
      setIndex((i) => i + 1);
      return;
    }

    // Move to summary when all questions completed
    addXP(XP_COMPLETION_BONUS);
    console.log("🎊 TEST COMPLETE! BONUS XP:", XP_COMPLETION_BONUS);
    setStage("summary");
  };

  const finishLesson = () => {
    console.log("🏁 FINISH LESSON 10 - Returning to lessons");
    navigation.navigate("FilipinoLessons");
  };

  /* ---------------- SUMMARY ---------------- */

  if (stage === "summary") {
    return (
      <AppLayout title="Lesson 10 - Final Test 🎉">
        <LessonLayout lessonNumber={10} mode="summary">
          <Text style={styles.finishTitle}>🎉 Course Complete!</Text>
          <Text style={styles.resultText}>
            You scored {score} / {QUESTIONS.length}
          </Text>
          <Text style={styles.text}>
            Amazing work! You've completed all core Filipino lessons and built
            a strong foundation in vocabulary and sentence structure.
          </Text>
          <TouchableOpacity style={styles.button} onPress={finishLesson}>
            <Text style={styles.buttonText}>Back to Lessons</Text>
          </TouchableOpacity>
        </LessonLayout>
      </AppLayout>
    );
  }

  /* ---------------- TEST CONTENT ---------------- */

  return (
    <AppLayout title="Lesson 10 — Final Test">
      <LessonLayout
        lessonNumber={10}
        mode="lesson"
        step={index + 1}
        total={QUESTIONS.length}
      >
        {/* Question Card */}
        <View style={styles.card}>
          <Text style={styles.question}>{current.question}</Text>

          {current.options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setSelected(i)}
                style={[
                  styles.option,
                  {
                    borderColor: isSelected ? "#2563EB" : "#E5E7EB",
                    backgroundColor: isSelected ? "#EFF6FF" : "white",
                  },
                ]}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={submitAnswer}
          disabled={selected === null}
          style={[
            styles.button,
            { opacity: selected === null ? 0.5 : 1 },
          ]}
        >
          <Text style={styles.buttonText}>
            {index === QUESTIONS.length - 1 ? "Finish Test ✓" : "Submit →"}
          </Text>
        </TouchableOpacity>

        {/* Progress Indicator */}
        <Text style={styles.progress}>
          Question {index + 1} / {QUESTIONS.length}
        </Text>
      </LessonLayout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
  },
  option: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 2,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#2563EB",
    borderRadius: 14,
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
    marginTop: 8,
  },
  progress: {
    textAlign: "center",
    marginTop: 16,
    color: "#6B7280",
    fontSize: 14,
  },
  finishTitle: {
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: "#2563EB",
  },
});

export default Lesson10;