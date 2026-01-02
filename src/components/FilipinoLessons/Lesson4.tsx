// Lesson4.tsx
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useProgressStore } from "../../store/useProgressStore";

/* ----------------------------------------
   SLIDES
---------------------------------------- */
const slides = [
  { word: "Red", translated: "Pula", image: require("../../../assets/images/red.jpg") },
  { word: "Blue", translated: "Asul", image: require("../../../assets/images/blue.png") },
  { word: "Green", translated: "Berde", image: require("../../../assets/images/green.png") },
  { word: "Yellow", translated: "Dilaw", image: require("../../../assets/images/yellow.png") },
  { word: "Black", translated: "Itim", image: require("../../../assets/images/black.png") },
];

/* ----------------------------------------
   QUIZ
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

const Lesson4: React.FC = () => {
  const completeLesson = useProgressStore((s) => s.completeLesson);

  const [page, setPage] = useState<"lesson" | "quiz" | "summary">("lesson");
  const [slideIndex, setSlideIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  /* ----------------------------------------
     MARK COMPLETE (ONLY ON SUMMARY)
  ---------------------------------------- */
  useEffect(() => {
    if (page === "summary") {
      completeLesson(4);
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
          <Text>You’ve completed Lesson 4</Text>
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

          {q.options.map((opt) => {
            const isSelected = selected === opt;
            const wrong = isSelected && isCorrect === false;
            const correct = isSelected && isCorrect === true;

            return (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.option,
                  wrong && styles.optionWrong,
                  correct && styles.optionCorrect,
                ]}
                disabled={selected !== null}
                onPress={() => {
                  setSelected(opt);

                  const ok = opt === q.correct;
                  setIsCorrect(ok);

                  if (!ok) {
                    // ❌ WRONG → reset only, stay on same question
                    setTimeout(() => {
                      setSelected(null);
                      setIsCorrect(null);
                    }, 900);
                    return;
                  }

                  // ✅ CORRECT → advance
                  setTimeout(() => {
                    setSelected(null);
                    setIsCorrect(null);

                    if (questionIndex + 1 === questions.length) {
                      setPage("summary");
                    } else {
                      setQuestionIndex((i) => i + 1);
                    }
                  }, 900);
                }}
              >
                <Text>{opt}</Text>
              </TouchableOpacity>
            );
          })}

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
  optionWrong: {
    backgroundColor: "#F87171",
  },
  optionCorrect: {
    backgroundColor: "#4ADE80",
  },
});

export default Lesson4;
