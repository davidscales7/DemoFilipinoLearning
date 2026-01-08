import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import AppLayout from "../../components/Layout/AppLayout";
import { useTheme } from "../../theme/ThemeProvider";
import { useXPStore } from "../../store/useXPStore";
import { useProgressStore } from "../../store/useProgressStore";

type Step = {
  title: string;
  explanation: string;
  examples: string[];
};

const STEPS: Step[] = [
  {
    title: "Subject–Verb–Object (SVO)",
    explanation:
      "Filipino sentences often follow a Subject–Verb–Object structure. The subject comes first, followed by the verb and then the object.",
    examples: [
      "Ako ay masaya. (I am happy.)",
      "Ikaw ay malungkot. (You are sad.)",
      "Si Juan ay nagbabasa ng libro. (Juan is reading a book.)",
    ],
  },
  {
    title: "Negation with 'hindi'",
    explanation:
      "To make a sentence negative, use 'hindi' before the verb or adjective.",
    examples: [
      "Ako ay hindi masaya. (I am not happy.)",
      "Sila ay hindi naglalaro. (They are not playing.)",
      "Juan ay hindi nagbabasa ng libro.",
    ],
  },
  {
    title: "Questions",
    explanation:
      "Questions are formed using question words like 'Ano', 'Saan', or 'Kailan' at the start of the sentence.",
    examples: [
      "Ano ang ginagawa mo? (What are you doing?)",
      "Saan siya pupunta? (Where is he/she going?)",
      "Kailan tayo kakain? (When will we eat?)",
    ],
  },
  {
    title: "Sentence Variations",
    explanation:
      "You can add locations, descriptions, or details to make sentences richer.",
    examples: [
      "Si Maria ay nag-aaral sa eskuwelahan.",
      "Ang aso ay natutulog sa ilalim ng mesa.",
      "Kami ay naglalaro sa hardin.",
    ],
  },
];

const XP_PER_STEP = 20;
const XP_FINISH_BONUS = 40;

const Lesson9: React.FC = () => {
  const theme = useTheme();
  const addXP = useXPStore((s) => s.addXP);
  const completeLesson = useProgressStore((s) => s.completeLesson);

  const [stepIndex, setStepIndex] = useState(0);
  const isLastStep = stepIndex >= STEPS.length;

  const next = () => {
    console.log("➡️ NEXT STEP:", stepIndex);
    addXP(XP_PER_STEP);

    if (stepIndex < STEPS.length) {
      setStepIndex((s) => s + 1);
    }
  };

  const finishLesson = () => {
    console.log("🎉 LESSON 9 COMPLETED");
    addXP(XP_FINISH_BONUS);
    completeLesson(9); // 🔓 unlocks Lesson 10
  };

  return (
    <AppLayout title="Lesson 9 — Sentence Structure">
      {!isLastStep ? (
        <>
          {/* Intro */}
          <Text
            style={[
              theme.typography.body,
              {
                textAlign: "center",
                marginBottom: theme.spacing.lg,
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Learn how to build clear and natural Filipino sentences.
          </Text>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.title}>{STEPS[stepIndex].title}</Text>

            <Text style={styles.explanation}>
              {STEPS[stepIndex].explanation}
            </Text>

            {STEPS[stepIndex].examples.map((ex, i) => (
              <Text key={i} style={styles.example}>
                • {ex}
              </Text>
            ))}
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <Pressable onPress={next} style={styles.primaryButton}>
              <Text style={styles.primaryText}>
                {stepIndex === STEPS.length - 1 ? "Review Summary →" : "Next →"}
              </Text>
            </Pressable>
          </View>

          {/* Progress */}
          <Text style={styles.progress}>
            Step {stepIndex + 1} / {STEPS.length}
          </Text>
        </>
      ) : (
        <>
          {/* Summary */}
          <View style={styles.card}>
            <Text style={styles.finishTitle}>🎉 Lesson Complete!</Text>
            <Text style={styles.explanation}>
              You now understand Filipino sentence structure, negation, and
              question forms. Great work!
            </Text>
          </View>

          <View style={styles.controls}>
            <Pressable onPress={finishLesson} style={styles.primaryButton}>
              <Text style={styles.primaryText}>Finish Lesson ✓</Text>
            </Pressable>
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
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  explanation: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  example: {
    fontSize: 15,
    marginBottom: 6,
    color: "#444",
  },
  finishTitle: {
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 16,
  },
  controls: {
    alignItems: "center",
    marginTop: 12,
  },
  primaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
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
});

export default Lesson9;
