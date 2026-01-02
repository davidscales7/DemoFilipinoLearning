// Lesson1.tsx
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useProgressStore } from "../../store/useProgressStore";

/* ----------------------------------------
   SLIDES
---------------------------------------- */
const slides = [
  { word: "Kamusta", translated: "Hello / How are you?", image: require("../../../assets/images/hello.png") },
  { word: "Mabuti", translated: "I'm Good", image: require("../../../assets/images/good.jpg") },
  { word: "Masaya", translated: "I'm Happy", image: require("../../../assets/images/happy.jpg") },
];

/* ----------------------------------------
   QUIZ
---------------------------------------- */
const questions = [
  {
    question: "What does 'Kamusta' mean?",
    options: ["Goodbye", "Hello / How are you?", "Sad"],
    correct: "Hello / How are you?",
    image: require("../../../assets/images/hello.png"),
  },
];

const Lesson1: React.FC = () => {
  const completeLesson = useProgressStore((s) => s.completeLesson);

  const [page, setPage] = useState<"lesson" | "quiz" | "summary">("lesson");
  const [slideIndex, setSlideIndex] = useState(0);
  const [questionIndex] = useState(0);

  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  /* ----------------------------------------
     MARK COMPLETE (ONLY ON SUMMARY)
  ---------------------------------------- */
  useEffect(() => {
    if (page === "summary") {
      completeLesson(1);
    }
  }, [page, completeLesson]);

  /* ----------------------------------------
     SUMMARY
  ---------------------------------------- */
  if (page === "summary") {
    return (
      <AppLayout title="Lesson 1">
        <LessonLayout lessonNumber={1} mode="summary">
          <Text style={styles.title}>Nice work 🎉</Text>
          <Text>You completed Lesson 1</Text>
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
      <AppLayout title="Lesson 1">
        <LessonLayout lessonNumber={1} mode="quiz" step={1} total={1}>
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

                // ❌ Wrong
                if (opt !== q.correct) {
                  setWrong(opt);
                  setTimeout(() => setWrong(null), 600);
                  return;
                }

                // ✅ Correct
                setLocked(true);

                setTimeout(() => {
                  setSelected(null);
                  setWrong(null);
                  setLocked(false);
                  setPage("summary");
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
    backgroundColor: "#FBBF24", // yellow
  },
  wrong: {
    backgroundColor: "#F87171", // red
  },
});

export default Lesson1;
