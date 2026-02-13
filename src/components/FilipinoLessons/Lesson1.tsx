// Lesson1.tsx
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useProgressStore } from "../../store/useProgressStore";
import { useXPStore } from "../../store/useXPStore";
import { useDemoStore } from "../../store/useDemoStore";

import type { RootStackParamList } from "../../navigation/navigation";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

/* ----------------------------------------
   TYPES
---------------------------------------- */
type Nav = StackNavigationProp<
  RootStackParamList,
  "FilipinoLearning"
>;

/* ----------------------------------------
   DATA
---------------------------------------- */
const slides = [
  {
    word: "Kamusta",
    translated: "Hello / How are you?",
    image: require("../../../assets/images/hello.png"),
  },
  {
    word: "Mabuti",
    translated: "I'm Good",
    image: require("../../../assets/images/good.jpg"),
  },
  {
    word: "Masaya",
    translated: "I'm Happy",
    image: require("../../../assets/images/happy.jpg"),
  },
];

const questions = [
  {
    question: "What does 'Kamusta' mean?",
    options: ["Goodbye", "Hello / How are you?", "Sad"],
    correct: "Hello / How are you?",
    image: require("../../../assets/images/hello.png"),
  },
];

// XP REWARDS
const XP_PER_SLIDE = 10;
const XP_PER_QUESTION = 15;

const Lesson1: React.FC = () => {
  const navigation = useNavigation<Nav>();

  // stores
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const addXP = useXPStore((s) => s.addXP);
  const unlockDemo = useDemoStore((s) => s.unlockDemo);
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  // local state
  const [page, setPage] = useState<"lesson" | "quiz" | "summary">("lesson");
  const [slideIndex, setSlideIndex] = useState(0);

  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  /* ----------------------------------------
     UNLOCK DEMO ON SUMMARY (ONCE)
  ---------------------------------------- */
  useEffect(() => {
    if (page !== "summary") return;

    completeLesson(1);
    unlockDemo();
    unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_1);
  }, [page, completeLesson, unlockDemo, unlockAccolade]);

  /* ----------------------------------------
     SUMMARY
  ---------------------------------------- */
  if (page === "summary") {
    return (
      <AppLayout title="Lesson 1 Complete">
        <LessonLayout lessonNumber={1} mode="summary">
          <Text style={styles.title}>🎉 Congratulations!</Text>

          <Text style={styles.body}>
            You've completed Lesson 1.
            {"\n\n"}
            The rest of the demo is now unlocked!
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("FilipinoLessons")}
          >
            <Text style={styles.buttonText}>Back to Lessons</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("FilipinoLearning")}
          >
            <Text style={styles.buttonText}>Back to main menu</Text>
          </TouchableOpacity>
        </LessonLayout>
      </AppLayout>
    );
  }

  /* ----------------------------------------
     QUIZ
  ---------------------------------------- */
  if (page === "quiz") {
    const q = questions[0];

    return (
      <AppLayout title="Lesson 1">
        <LessonLayout lessonNumber={1} mode="quiz" step={1} total={questions.length}>
          <Text style={styles.title}>{q.question}</Text>

          {q.options.map((opt) => (
            <TouchableOpacity
              key={opt}
              disabled={locked}
              style={[
                styles.option,
                selected === opt && styles.selected,
                wrong === opt && styles.wrong,
              ]}
              onPress={() => {
                if (locked) return;

                setSelected(opt);
                setWrong(null);
                
                // Wrong
                if (opt !== q.correct) {
                  setWrong(opt);
                  setTimeout(() => setWrong(null), 600);
                  return;
                }

                // Correct - AWARD XP HERE
                setLocked(true);
                addXP(XP_PER_QUESTION);
                setTimeout(() => setPage("summary"), 700);
              }}
            >
              <Text>{opt}</Text>
            </TouchableOpacity>
          ))}

          <Image source={q.image} style={styles.image} />
        </LessonLayout>
      </AppLayout>
    );
  }

  /* ----------------------------------------
     LESSON SLIDES
  ---------------------------------------- */
  const slide = slides[slideIndex];

  return (
    <AppLayout title="Lesson 1">
      <LessonLayout
        lessonNumber={1}
        mode="lesson"
        step={slideIndex + 1}
        total={slides.length}
      >
        <View style={styles.contentCard}>
          <Text style={styles.title}>{slide.word}</Text>
          <Image source={slide.image} style={styles.image} />
          
          <View style={styles.translationContainer}>
            <Text style={styles.translated}>{slide.translated}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              addXP(XP_PER_SLIDE);
              
              if (slideIndex < slides.length - 1) {
                setSlideIndex((i) => i + 1);
              } else {
                setPage("quiz");
              }
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
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
    padding: 40, // ✅ More padding
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
    marginVertical: 20, // ✅ Add vertical margin
  },
  title: {
    fontSize: 42, // ✅ Bigger!
    fontWeight: "800",
    marginBottom: 24, // ✅ More space
    textAlign: "center",
    color: "#2563EB",
  },
  body: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 24,
  },
  image: {
    width: 280, // ✅ Bigger image
    height: 280,
    marginVertical: 24,
    resizeMode: "contain",
    borderRadius: 16,
  },
  translationContainer: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 16, // ✅ More padding
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 20,
  },
  translated: {
    fontSize: 20, // ✅ Bigger text
    textAlign: "center",
    color: "#4B5563",
    fontWeight: "600",
  },
  button: {
    marginTop: 36, // ✅ More space above
    paddingVertical: 18, // ✅ Bigger button
    paddingHorizontal: 60,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 160, // ✅ Minimum width
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 18,
  },
  option: {
    padding: 14,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#FBBF24",
  },
  wrong: {
    backgroundColor: "#F87171",
  },
});

export default Lesson1;