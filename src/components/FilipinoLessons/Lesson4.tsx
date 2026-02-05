// Lesson4.tsx
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useProgressStore } from "../../store/useProgressStore";
import { useXPStore } from "../../store/useXPStore"; // ✅ ADDED
import { RootStackParamList } from "../../navigation/navigation";
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
  { word: "Red", translated: "Pula", image: require("../../../assets/images/red.jpg") },
  { word: "Blue", translated: "Asul", image: require("../../../assets/images/blue.png") },
  { word: "Green", translated: "Berde", image: require("../../../assets/images/green.png") },
  { word: "Yellow", translated: "Dilaw", image: require("../../../assets/images/yellow.png") },
  { word: "Black", translated: "Itim", image: require("../../../assets/images/black.png") },
];

/* ----------------------------------------
QUESTIONS
---------------------------------------- */
const questions = [
  {
    question: "What is Red in Tagalog?",
    options: ["Pula", "Asul", "Dilaw", "Lila"],
    correct: "Pula",
    image: require("../../../assets/images/red.jpg"),
  },
  {
    question: "What is Blue in Tagalog?",
    options: ["Itim", "Puti", "Asul", "Kayumanggi"],
    correct: "Asul",
    image: require("../../../assets/images/blue.png"),
  },
  {
    question: "What is Green in Tagalog?",
    options: ["Berde", "Kahel", "Dilaw", "Rosas"],
    correct: "Berde",
    image: require("../../../assets/images/green.png"),
  },
];

// ✅ XP REWARDS
const XP_PER_SLIDE = 10;
const XP_PER_QUESTION = 15;

const Lesson4: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const addXP = useXPStore((s) => s.addXP); // ✅ ADDED
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
      completeLesson(4);
      unlockAccolade(DEMO_ACCOLADES.LESSONS.LESSON_4);
    }
  }, [page, completeLesson]);

  /* ----------------------------------------
     SUMMARY
  ---------------------------------------- */
  if (page === "summary") {
    return (
      <AppLayout title="Lesson 4">
        <LessonLayout lessonNumber={4} mode="summary">
          
          <Text style={styles.title}>Great job 🎉</Text>
          <Text>You've completed Lesson 4</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("FilipinoLearning")}
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

    return (
      <AppLayout title="Lesson 4">
        <LessonLayout
          lessonNumber={4}
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

                //Wrong answer
                if (opt !== q.correct) {
                  setWrong(opt);
                  setTimeout(() => setWrong(null), 600); // if wrong, clear after 600ms
                  return;
                }


                // Correct answer ✅ AWARD XP HERE
                setLocked(true);
                addXP(XP_PER_QUESTION); // ✅ ADDED
                
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
              }}>
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
    <AppLayout title="Lesson 4">
      <LessonLayout
        lessonNumber={4}
        mode="lesson"
        step={slideIndex + 1}
        total={slides.length}
      >
        <Text style={styles.title}>{slide.word}</Text>
        <Image source={slide.image} style={styles.image} />
        <Text>{slide.translated}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addXP(XP_PER_SLIDE); // ✅ ADDED
            
            if (slideIndex < slides.length - 1) {
              setSlideIndex((i) => i + 1);
            } else {
              setPage("quiz");
            }
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </LessonLayout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  image: {
    width: 220,
    height: 220,
    marginVertical: 16,
    resizeMode: "contain",
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#2563EB",
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center",
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
    backgroundColor: "#f87171",
  },
});

export default Lesson4;