// Lesson3.tsx
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useProgressStore } from "../../store/useProgressStore";

/* ----------------------------------------
   SLIDES
---------------------------------------- */
const slides = [
  { word: "Father", translated: "Ama", image: require("../../../assets/images/father.png") },
  { word: "Mother", translated: "Ina", image: require("../../../assets/images/mother.png") },
  { word: "Brother", translated: "Kapatid na Lalaki", image: require("../../../assets/images/brother.png") },
  { word: "Sister", translated: "Kapatid na Babae", image: require("../../../assets/images/sister.png") },
];

/* ----------------------------------------
   QUIZ
---------------------------------------- */
const questions = [
  {
    question: "What is Father in Tagalog?",
    options: ["Ama", "Ina", "Lolo", "Pinsan"],
    correct: "Ama",
    image: require("../../../assets/images/father.png"),
  },
  {
    question: "What is Sister in Tagalog?",
    options: ["Ina", "Kapatid na Babae", "Lola", "Ama"],
    correct: "Kapatid na Babae",
    image: require("../../../assets/images/sister.png"),
  },
  {
    question: "Testing question 3?",
    options: ["Correct", "Ina", "Lolo", "Pinsan"],
    correct: "Correct",
    image: require("../../../assets/images/father.png"),
  },
];

const Lesson3: React.FC = () => {
  const completeLesson = useProgressStore((s) => s.completeLesson);

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
      completeLesson(3);
    }
  }, [page, completeLesson]);

  /* ----------------------------------------
     SUMMARY
  ---------------------------------------- */
  if (page === "summary") {
    return (
      <AppLayout title="Lesson 3">
        <LessonLayout lessonNumber={3} mode="summary">
          <Text style={styles.title}>Great job 🎉</Text>
          <Text>You’ve completed Lesson 3</Text>
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
      <AppLayout title="Lesson 3">
        <LessonLayout
          lessonNumber={3}
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
                selected === opt && styles.selected, // correct (yellow)
                wrong === opt && styles.wrong,       // wrong (red)
                locked && { opacity: 0.6 },
              ]}
              onPress={() => {
                if (locked) return;

                setSelected(opt);
                setWrong(null);

                // ❌ Wrong answer
                if (opt !== q.correct) {
                  setWrong(opt);
                  setTimeout(() => setWrong(null), 600);
                  return;
                }

                // ✅ Correct answer
                setLocked(true);

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
    <AppLayout title="Lesson 3">
      <LessonLayout
        lessonNumber={3}
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

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
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
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#FBBF24", // yellow
  },
  wrong: {
    backgroundColor: "#F87171", // red
  },
});

export default Lesson3;
