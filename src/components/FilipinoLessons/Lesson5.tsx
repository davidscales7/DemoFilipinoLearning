// Lesson5.tsx
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import { useProgressStore } from "../../store/useProgressStore";

/* ----------------------------------------
   SLIDES — TEACH SENTENCES
---------------------------------------- */
const slides = [
  {
    title: "Ito ay pusa.",
    subtitle: "This is a cat.",
    image: require("../../../assets/images/cat.png"),
  },
  {
    title: "Ito ay aso.",
    subtitle: "This is a dog.",
    image: require("../../../assets/images/dog.png"),
  },
  {
    title: "May pusa ako.",
    subtitle: "I have a cat.",
    image: require("../../../assets/images/cat.png"),
  },
  {
    title: "May aso ako.",
    subtitle: "I have a dog.",
    image: require("../../../assets/images/dog.png"),
  },
];

/* ----------------------------------------
   QUIZ — SENTENCE USAGE
---------------------------------------- */
const questions = [
  {
    question: "Ito ay ___ 🐱",
    options: ["Aso", "Pusa", "Ibon"],
    correct: "Pusa",
    image: require("../../../assets/images/cat.png"),
  },
  {
    question: "May ___ ako 🐶",
    options: ["Pusa", "Aso", "Isda"],
    correct: "Aso",
    image: require("../../../assets/images/dog.png"),
  },
  {
    question: "Ito ay ___ 🐟",
    options: ["Isda", "Ibon", "Pusa"],
    correct: "Isda",
    image: require("../../../assets/images/fish.png"),
  },
];

const Lesson5: React.FC = () => {
  const completeLesson = useProgressStore((s) => s.completeLesson);

  const [page, setPage] = useState<"lesson" | "quiz" | "summary">("lesson");
  const [slideIndex, setSlideIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  /* ----------------------------------------
     MARK COMPLETE — ONLY HERE
  ---------------------------------------- */
  useEffect(() => {
    if (page === "summary") {
      completeLesson(5);
    }
  }, [page, completeLesson]);

  /* ----------------------------------------
     SUMMARY
  ---------------------------------------- */
  if (page === "summary") {
    return (
      <AppLayout title="Lesson 5">
        <LessonLayout lessonNumber={5} mode="summary">
          <Text style={styles.title}>Great job 🎉</Text>
          <Text>You can now talk about animals in Filipino.</Text>

          <Text style={styles.summaryLine}>• Ito ay ___</Text>
          <Text style={styles.summaryLine}>• May ___ ako</Text>
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
      <AppLayout title="Lesson 5">
        <LessonLayout
          lessonNumber={5}
          mode="quiz"
          step={questionIndex + 1}
          total={questions.length}
        >
          <Text style={styles.title}>{q.question}</Text>

          {q.options.map((opt) => {
            const selectedThis = selected === opt;
            const wrong = selectedThis && isCorrect === false;
            const correct = selectedThis && isCorrect === true;

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
                <Text style={styles.optionText}>{opt}</Text>
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
    <AppLayout title="Lesson 5">
      <LessonLayout
        lessonNumber={5}
        mode="lesson"
        step={slideIndex + 1}
        total={slides.length}
      >
        <Text style={styles.title}>{slide.title}</Text>
        <Image source={slide.image} style={styles.image} />
        <Text style={styles.subtitle}>{slide.subtitle}</Text>

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
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.75,
  },
  image: {
    width: 220,
    height: 220,
    marginVertical: 16,
    resizeMode: "contain",
    alignSelf: "center",
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
  optionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  optionWrong: {
    backgroundColor: "#F87171",
  },
  optionCorrect: {
    backgroundColor: "#4ADE80",
  },
  summaryLine: {
    marginTop: 8,
    fontWeight: "600",
  },
});

export default Lesson5;
