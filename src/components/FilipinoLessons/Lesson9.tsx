import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useXPStore } from "../../store/useXPStore";
import { useProgressStore } from "../../store/useProgressStore";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import type { RootStackParamList } from "../../navigation/navigation";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

/* ----------------------------------------
   TYPES
---------------------------------------- */
type Nav = StackNavigationProp<RootStackParamList, "FilipinoLearning">;

type Step = {
  title: string;
  explanation: string;
  examples: string[];
};

/* ----------------------------------------
   DATA
---------------------------------------- */

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

/* ---------------- COMPONENT ---------------- */

const Lesson9: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const addXP = useXPStore((s) => s.addXP);
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  const [stepIndex, setStepIndex] = useState(0);
  const [stage, setStage] = useState<"lesson" | "summary">("lesson");

  /* ----------------------------------------
     MARK COMPLETE & UNLOCK ACCOLADE
  ---------------------------------------- */
  useEffect(() => {
    if (stage === "summary") {
      console.log("🎉 LESSON 9 COMPLETED");
      completeLesson(9);
      unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_9);
    }
  }, [stage, completeLesson, unlockAccolade]);

  const next = () => {
    console.log("➡️ NEXT PRESSED — Lesson 9");
    console.log("Step Index:", stepIndex);

    addXP(XP_PER_STEP);
    console.log("✅ XP ADDED:", XP_PER_STEP);

    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }

    // Move to summary when all steps completed
    setStage("summary");
  };

  const finishLesson = () => {
    console.log("🏁 FINISH LESSON 9 - Returning to lessons");
    navigation.navigate("FilipinoLessons");
  };

  /* ---------------- SUMMARY ---------------- */

  if (stage === "summary") {
    return (
      <AppLayout title="Lesson 9 - Sentence Structure 🎉">
        <LessonLayout lessonNumber={9} mode="summary">
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.body}>
            You now understand Filipino sentence structure, negation, and
            question forms. Great work!
          </Text>
          <TouchableOpacity style={styles.button} onPress={finishLesson}>
            <Text style={styles.buttonText}>Back to Lessons</Text>
          </TouchableOpacity>
        </LessonLayout>
      </AppLayout>
    );
  }

  /* ---------------- LESSON CONTENT ---------------- */

  const currentStep = STEPS[stepIndex];

  return (
    <AppLayout title="Lesson 9 — Sentence Structure">
      <LessonLayout
        lessonNumber={9}
        mode="lesson"
        step={stepIndex + 1}
        total={STEPS.length}
      >
        {/* Intro */}
        <Text style={styles.intro}>
          Learn how to build clear and natural Filipino sentences.
        </Text>

        {/* Card */}
        <View style={styles.contentCard}>
          <Text style={styles.stepTitle}>{currentStep.title}</Text>

          <Text style={styles.explanation}>{currentStep.explanation}</Text>

          <View style={styles.examplesContainer}>
            {currentStep.examples.map((ex, i) => (
              <Text key={i} style={styles.example}>
                • {ex}
              </Text>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={next}>
            <Text style={styles.buttonText}>Next →</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <Text style={styles.progress}>
          Step {stepIndex + 1} / {STEPS.length}
        </Text>
      </LessonLayout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  intro: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#6B7280",
  },
  contentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
    color: "#2563EB",
  },
  body: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
    color: "#2563EB",
  },
  explanation: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
    color: "#4B5563",
  },
  examplesContainer: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 24,
  },
  example: {
    fontSize: 15,
    marginBottom: 8,
    color: "#1F2937",
    lineHeight: 22,
  },
  button: {
    marginTop: 20,
    paddingVertical: 18,
    paddingHorizontal: 60,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 160,
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 18,
  },
  progress: {
    textAlign: "center",
    marginTop: 16,
    color: "#6B7280",
    fontSize: 14,
  },
});

export default Lesson9;