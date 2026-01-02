// Lesson2.tsx
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useProgressStore } from "../../store/useProgressStore";

/* ----------------------------------------
   SLIDES (NUMBERS)
---------------------------------------- */
const slides = [
  { word: "One", translated: "Isa", image: require("../../../assets/images/number1.jpg") },
  { word: "Two", translated: "Dalawa", image: require("../../../assets/images/number2.jpg") },
  { word: "Three", translated: "Tatlo", image: require("../../../assets/images/number3.png") },
  { word: "Four", translated: "Apat", image: require("../../../assets/images/number4.png") },
  { word: "Five", translated: "Lima", image: require("../../../assets/images/number5.png") },
];

/* ----------------------------------------
   QUIZ
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

const Lesson2: React.FC = () => {
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
      completeLesson(2);
    }
  }, [page, completeLesson]);

  /* ----------------------------------------
     SUMMARY
  ---------------------------------------- */
  if (page === "summary") {
    return (
      <AppLayout title="Lesson 2">
        <LessonLayout lessonNumber={2} mode="summary">
          <Text style={styles.title}>Nice work 🎉</Text>
          <Text style={styles.text}>You’ve completed Lesson 2</Text>
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
        <Text style={styles.title}>{slide.word}</Text>
        <Image source={slide.image} style={styles.image} />
        <Text style={styles.text}>{slide.translated}</Text>

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
    backgroundColor: "#FBBF24", // yellow
  },
  wrong: {
    backgroundColor: "#F87171", // red
  },
});

export default Lesson2;
