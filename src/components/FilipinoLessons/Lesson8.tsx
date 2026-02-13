import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useProgressStore } from "../../store/useProgressStore";
import { useXPStore } from "../../store/useXPStore";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import type { RootStackParamList } from "../../navigation/navigation";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

/* ----------------------------------------
   TYPES
---------------------------------------- */
type Nav = StackNavigationProp<RootStackParamList, "FilipinoLearning">;

/* ----------------------------------------
   DATA
---------------------------------------- */

const HOBBIES = [
  {
    english: "Reading",
    filipino: "Pagbabasa",
    sentenceEN: "I like reading books.",
    sentenceTL: "Gusto kong magbasa ng libro.",
    image: require("../../../assets/images/reading.png"),
  },
  {
    english: "Playing games",
    filipino: "Paglalaro",
    sentenceEN: "I play games at night.",
    sentenceTL: "Naglalaro ako sa gabi.",
    image: require("../../../assets/images/gaming.png"),
  },
  {
    english: "Cooking",
    filipino: "Pagluluto",
    sentenceEN: "I enjoy cooking food.",
    sentenceTL: "Mahilig akong magluto ng pagkain.",
    image: require("../../../assets/images/cooking.jpg"),
  },
];

const XP_PER_ITEM = 15;

/* ---------------- COMPONENT ---------------- */

const Lesson8: React.FC = () => {
  const navigation = useNavigation<Nav>();
  
  const addXP = useXPStore((s) => s.addXP);
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<"word" | "sentence" | "summary">("word");
  const current = HOBBIES[index];

  /* ----------------------------------------
     MARK COMPLETE & UNLOCK ACCOLADE
  ---------------------------------------- */
  useEffect(() => {
    if (stage === "summary") {
      console.log("🎉 LESSON 8 COMPLETED");
      completeLesson(8);
      unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_8);
    }
  }, [stage, completeLesson, unlockAccolade]);

  const next = () => {
    console.log("➡️ NEXT PRESSED — Lesson 8");
    console.log("Index:", index, "Stage:", stage);

    addXP(XP_PER_ITEM);
    console.log("✅ XP ADDED:", XP_PER_ITEM);

    if (stage === "word") {
      setStage("sentence");
      return;
    }

    if (index < HOBBIES.length - 1) {
      setIndex(index + 1);
      setStage("word");
      return;
    }

    // Move to summary when all items completed
    setStage("summary");
  };

  // Finishing the lesson
  const finishLesson = () => {
    console.log("🏁 FINISH LESSON 8 - Returning to lessons");
    navigation.navigate("FilipinoLessons");
  };

  /* ---------------- SUMMARY ---------------- */

  if (stage === "summary") {
    return (
      <AppLayout title="Lesson 8 - Hobbies 🎉">
        <LessonLayout lessonNumber={8} mode="summary">
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.body}>
            You can now talk about some common hobbies in Filipino.
          </Text>
          <TouchableOpacity style={styles.button} onPress={finishLesson}>
            <Text style={styles.buttonText}>Back to Lessons</Text>
          </TouchableOpacity>
        </LessonLayout>
      </AppLayout>
    );
  }

  /* ---------------- LESSON CONTENT ---------------- */

  return (
    <AppLayout title="Lesson 8 — Hobbies">
      <LessonLayout
        lessonNumber={8}
        mode="lesson"
        step={index + 1}
        total={HOBBIES.length}
      >
        {/* Card */}
        <View style={styles.contentCard}>
          <Image
            source={current.image}
            style={styles.image}
            resizeMode="contain"
          />
          {stage === "word" ? (
            <>
              <Text style={styles.title}>{current.english}</Text>
              <View style={styles.translationContainer}>
                <Text style={styles.filipino}>{current.filipino}</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.sentenceEN}>{current.sentenceEN}</Text>
              <View style={styles.translationContainer}>
                <Text style={styles.sentenceTL}>{current.sentenceTL}</Text>
              </View>
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={next}>
            <Text style={styles.buttonText}>Next →</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <Text style={styles.progress}>
          Item {index + 1} / {HOBBIES.length}
        </Text>
      </LessonLayout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  contentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
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
  filipino: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4B5563",
    textAlign: "center",
  },
  sentenceEN: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: "#2563EB",
  },
  sentenceTL: {
    fontSize: 18,
    textAlign: "center",
    color: "#4B5563",
    fontWeight: "600",
  },
  translationContainer: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginVertical: 12,
  },
  button: {
    marginTop: 32,
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

export default Lesson8;