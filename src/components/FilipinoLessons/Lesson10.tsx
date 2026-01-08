import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import AppLayout from "../../components/Layout/AppLayout";
import { useTheme } from "../../theme/ThemeProvider";
import { useXPStore } from "../../store/useXPStore";
import { useProgressStore } from "../../store/useProgressStore";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

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

const Lesson10: React.FC = () => {
  const theme = useTheme();
  const addXP = useXPStore((s) => s.addXP);
  const completeLesson = useProgressStore((s) => s.completeLesson);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = QUESTIONS[index];

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
    }

    setSelected(null);

    if (index < QUESTIONS.length - 1) {
      setIndex((i) => i + 1);
    } else {
      finishTest(isCorrect);
    }
  };

  const finishTest = (lastCorrect: boolean) => {
    const finalScore = lastCorrect ? score + 1 : score;
    console.log("🎓 FINAL SCORE:", finalScore);

    addXP(XP_COMPLETION_BONUS);
    completeLesson(10); // 🎉 course complete
    setFinished(true);
  };

  return (
    <AppLayout title="Lesson 10 — Final Test">
      {!finished ? (
        <>
          {/* Question */}
          <View style={styles.card}>
            <Text style={styles.question}>
              {current.question}
            </Text>

            {current.options.map((opt, i) => {
              const isSelected = selected === i;
              return (
                <Pressable
                  key={i}
                  onPress={() => setSelected(i)}
                  style={[
                    styles.option,
                    {
                      borderColor: isSelected
                        ? theme.colors.primary
                        : theme.colors.border,
                      backgroundColor: isSelected
                        ? "#EAF2FF"
                        : "white",
                    },
                  ]}
                >
                  <Text style={styles.optionText}>{opt}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <Pressable
              onPress={submitAnswer}
              disabled={selected === null}
              style={[
                styles.primaryButton,
                { opacity: selected === null ? 0.5 : 1 },
              ]}
            >
              <Text style={styles.primaryText}>
                {index === QUESTIONS.length - 1
                  ? "Finish Test ✓"
                  : "Submit →"}
              </Text>
            </Pressable>
          </View>

          {/* Progress */}
          <Text style={styles.progress}>
            Question {index + 1} / {QUESTIONS.length}
          </Text>
        </>
      ) : (
        <>
          {/* Results */}
          <View style={styles.card}>
            <Text style={styles.finishTitle}>🎉 Course Complete!</Text>
            <Text style={styles.resultText}>
              You scored {score} / {QUESTIONS.length}
            </Text>

            <Text style={styles.explanation}>
              Amazing work. You’ve completed all core Filipino lessons and built
              a strong foundation in vocabulary and sentence structure.
            </Text>
          </View>
        </>
      )}
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
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
  controls: {
    alignItems: "center",
    marginTop: 12,
  },
  primaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 16,
    backgroundColor: "#1E80FF",
  },
  primaryText: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
  progress: {
    textAlign: "center",
    marginTop: 12,
    color: "#777",
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
  },
  explanation: {
    textAlign: "center",
    fontSize: 16,
    color: "#444",
  },
});

export default Lesson10;
