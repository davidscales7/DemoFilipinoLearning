// Lesson2.tsx
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useProgressStore } from "../../store/useProgressStore";
import { useXPStore } from "../../store/useXPStore";
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
  { word: "One", translated: "Isa", image: require("../../../assets/images/number1.jpg") },
  { word: "Two", translated: "Dalawa", image: require("../../../assets/images/number2.jpg") },
  { word: "Three", translated: "Tatlo", image: require("../../../assets/images/number3.png") },
  { word: "Four", translated: "Apat", image: require("../../../assets/images/number4.png") },
  { word: "Five", translated: "Lima", image: require("../../../assets/images/number5.png") },
];
/* ----------------------------------------
   QUESTIONS
---------------------------------------- */
const questions = [
  {
    question: "What is the correct way to say One?",
    options: ["Isa", "Dalawa", "Tatlo", "Apat"],
    correct: "Isa",
    image: require("../../../assets/images/number1.jpg"),
  },
  {
    question: "What is the correct way to say Five?",
    options: ["Tatlo", "Lima", "Isa", "Dalawa"],
    correct: "Lima",
    image: require("../../../assets/images/number5.png"),
  },
];

// XP REWARDS
const XP_PER_SLIDE = 10;
const XP_PER_QUESTION = 15;

const Lesson2: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const addXP = useXPStore((s) => s.addXP);
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);
  
  // local state
  const [page, setPage] = useState<"lesson" | "quiz" | "summary">("lesson");
  const [slideIndex, setSlideIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  /* ----------------------------------------
     MARK COMPLETE (ONLY ON SUMMARY)
  ---------------------------------------- */
  useEffect(() => {
    if (page === "summary") {
      completeLesson(2);
      unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_2);
    }
  }, [page, completeLesson]);

  /* ----------------------------------------
     SUMMARY
  ---------------------------------------- */
  if (page === "summary") {
    return (
      <AppLayout title="Lesson 2 Complete">
        <LessonLayout lessonNumber={2} mode="summary">
          
          <Text style={styles.title}>Nice work 🎉</Text>
          <Text style={styles.body}>You've completed Lesson 2</Text>
       
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FilipinoLessons")}
        >
          <Text style={styles.buttonText}>Back to Lessons</Text>
        </TouchableOpacity>
        </LessonLayout>
      </AppLayout>
    );
  }

  /* ----------------------------------------
     QUIZ
  ---------------------------------------- */
  if (page === "quiz") {
    const q = questions[questionIndex];
    // Safety guard
    if (!q) {
      setPage("summary");
      return null;
    }

    return (
      <AppLayout title="Lesson 2">
        <LessonLayout
          lessonNumber={2}
          mode="quiz"
          step={questionIndex + 1}
          total={questions.length}
        >
          <Text style={styles.title}>{q.question}</Text>

          {q.options.map((opt) => (
            <TouchableOpacity
              key={opt}
              disabled={locked}
              style={[
                styles.option,
                selected === opt && styles.selected,
                wrong === opt && styles.wrong,
                locked && { opacity: 0.6 },
              ]}
              onPress={() => {
                if (locked) return;

                setSelected(opt);
                setWrong(null);

                // Wrong answer
                if (opt !== q.correct) {
                  setWrong(opt);
                  setTimeout(() => setWrong(null), 600);
                  return;
                }

                // Correct
                setLocked(true);
                addXP(XP_PER_QUESTION);
                
                setTimeout(() => {
                  setSelected(null);
                  setWrong(null);
                  setLocked(false);

                  if (questionIndex + 1 === questions.length) {
                    setPage("summary");
                  } else {
                    setQuestionIndex((i) => i + 1);
                  }
                }, 700);
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
     LESSON
  ---------------------------------------- */
  const slide = slides[slideIndex];

  return (
    <AppLayout title="Lesson 2">
      <LessonLayout
        lessonNumber={2}
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
  title: {
    fontSize: 42,
    fontWeight: "800",
    marginBottom: 24,
    textAlign: "center",
    color: "#2563EB",
  },
  body: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 24,
  },
  image: {
    width: 280,
    height: 280,
    marginVertical: 24,
    resizeMode: "contain",
    borderRadius: 16,
  },
  translationContainer: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 20,
  },
  translated: {
    fontSize: 20,
    textAlign: "center",
    color: "#4B5563",
    fontWeight: "600",
  },
  button: {
    marginTop: 36,
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
  option: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
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

export default Lesson2;