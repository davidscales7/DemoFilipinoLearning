// Lesson1.tsx
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useProgressStore } from "../../store/useProgressStore";
import { useDemoStore } from "../../store/useDemoStore";
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

const Lesson1: React.FC = () => {


  const navigation = useNavigation<Nav>();

  // 📚 progress store
  const completeLesson = useProgressStore((s) => s.completeLesson);

  // 🔓 demo store
  const unlockDemo = useDemoStore((s) => s.unlockDemo);
  
  // 🏆 accolades store
  const unlockAccolade = useAccoladeStore((s) => s.unlockAccolade);

  // 🧠 local state
  const [page, setPage] = useState<"lesson" | "quiz" | "summary">("lesson");
  const [slideIndex, setSlideIndex] = useState(0);

  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  /* ----------------------------------------
     🔓 UNLOCK DEMO ON SUMMARY (ONCE)
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


                // Correct
                setLocked(true);
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
        <Text style={styles.title}>{slide.word}</Text>
        <Image source={slide.image} style={styles.image} />
        <Text>{slide.translated}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            slideIndex < slides.length - 1
              ? setSlideIndex((i) => i + 1)
              : setPage("quiz")
          }
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </LessonLayout>
    </AppLayout>
  );
};


/* ----------------------------------------
   STYLES
---------------------------------------- */
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  body: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 24,
  },
  image: {
    width: 220,
    height: 220,
    marginVertical: 16,
    resizeMode: "contain",
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#2563EB",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center",
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