// Lesson6.tsx
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
const FOOD_ITEMS = [
  {
    english: "Rice",
    filipino: "Kanin",
    sentenceEN: "I eat rice.",
    sentenceTL: "Kumakain ako ng kanin.",
    image: require("../../../assets/images/rice.png"),
  },
  {
    english: "Chicken",
    filipino: "Manok",
    sentenceEN: "I eat chicken.",
    sentenceTL: "Kumakain ako ng manok.",
    image: require("../../../assets/images/chicken.jpg"),
  },
  {
    english: "Fish",
    filipino: "Isda",
    sentenceEN: "I eat fish.",
    sentenceTL: "Kumakain ako ng isda.",
    image: require("../../../assets/images/fish.png"),
  },
];

const XP_PER_ITEM = 15;

const Lesson6: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const addXP = useXPStore((s) => s.addXP);
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<"word" | "sentence" | "summary">("word");

  const current = FOOD_ITEMS[index];

  /* ----------------------------------------
     MARK COMPLETE & UNLOCK ACCOLADE
  ---------------------------------------- */
  useEffect(() => {
    if (stage === "summary") {
      console.log("🏁 LESSON 6 COMPLETED - Unlocking accolade");
      completeLesson(6);
      unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_6);
    }
  }, [stage, completeLesson, unlockAccolade]);


  
  const next = () => {
    console.log("➡️ NEXT PRESSED");
    console.log("Index:", index, "Stage:", stage);

    addXP(XP_PER_ITEM);
    console.log("✅ XP ADDED:", XP_PER_ITEM);

    if (stage === "word") {
      setStage("sentence");
      return;
    }

    if (index < FOOD_ITEMS.length - 1) {
      setIndex(index + 1);
      setStage("word");
      return;
    }

    console.log("🎉 ALL FOOD ITEMS COMPLETED");
    setStage("summary");
  };

  const finishLesson = () => {
    console.log("🏁 FINISH LESSON 6 - Returning to lessons");
    navigation.navigate("FilipinoLessons");
  };

  /* ----------------------------------------
     SUMMARY SCREEN
  ---------------------------------------- */
  if (stage === "summary") {
    return (
      <AppLayout title="Lesson 6 — Food">
        <LessonLayout lessonNumber={6} mode="summary">
          <Text style={styles.title}>Great job! 🎉</Text>
          
          <Text style={styles.body}>
            You've completed Lesson 6 and learned about food in Filipino!
          </Text>

          <TouchableOpacity style={styles.button} onPress={finishLesson}>
            <Text style={styles.buttonText}>Back to Lessons</Text>
          </TouchableOpacity>
        </LessonLayout>
      </AppLayout>
    );
  }

  /* ----------------------------------------
     LESSON CONTENT
  ---------------------------------------- */
  return (
    <AppLayout title="Lesson 6 — Food">
      <LessonLayout
        lessonNumber={6}
        mode="lesson"
        step={index + 1}
        total={FOOD_ITEMS.length}
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
          Item {index + 1} / {FOOD_ITEMS.length}
        </Text>
      </LessonLayout>
    </AppLayout>
  );
};

/* ----------------------------------------
   STYLES
---------------------------------------- */
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

export default Lesson6;