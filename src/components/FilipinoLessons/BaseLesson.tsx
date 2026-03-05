import React, { useEffect, useMemo, useState } from "react";
import { Text, Image, View, useWindowDimensions, ImageSourcePropType } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import type { RootStackParamList } from "../../navigation/navigation";

import { useProgressStore } from "../../store/useProgressStore";
import { useXPStore } from "../../store/useXPStore";

// ✅ theme components
import { ScreenGradient, CenteredCard, AppButton, OptionButton } from "../../theme/components";

type Nav = StackNavigationProp<RootStackParamList, "FilipinoLearning">;

export type LessonSlide = {
  word: string;
  translated: string;
  image: ImageSourcePropType;
};

export type LessonQuestion = {
  question: string;
  options: string[];
  correct: string;
  image: ImageSourcePropType;
};

type BaseLessonProps = {
  lessonNumber: number;
  title?: string;
  slides: LessonSlide[];
  questions: LessonQuestion[];
  xpPerSlide?: number;
  xpPerQuestion?: number;
  onLessonComplete?: () => void;
  lessonsRouteName?: keyof RootStackParamList;
  mainMenuRouteName?: keyof RootStackParamList;
};

const BaseLesson: React.FC<BaseLessonProps> = ({
  lessonNumber,
  title,
  slides,
  questions,
  xpPerSlide = 10,
  xpPerQuestion = 15,
  onLessonComplete,
  lessonsRouteName = "FilipinoLessons",
  mainMenuRouteName = "FilipinoLearning",
}) => {
  const navigation = useNavigation<Nav>();
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;

  const imageSize = isMobile ? Math.min(height * 0.25, 180) : 280;

  const completeLesson = useProgressStore((s) => s.completeLesson);
  const addXP = useXPStore((s) => s.addXP);

  const [page, setPage] = useState<"lesson" | "quiz" | "summary">("lesson");
  const [slideIndex, setSlideIndex] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const screenTitle = useMemo(() => title ?? `Lesson ${lessonNumber}`, [title, lessonNumber]);

  useEffect(() => {
    if (page !== "summary") return;
    completeLesson(lessonNumber);
    onLessonComplete?.();
  }, [page, lessonNumber, completeLesson, onLessonComplete]);

  /* ── SUMMARY ── */
  if (page === "summary") {
    return (
      <AppLayout title={`${screenTitle} Complete`}>
        <LessonLayout lessonNumber={lessonNumber} mode="summary">
          <ScreenGradient>
            <CenteredCard maxWidth={480}>
              <Text style={{ fontSize: 56 }}>🎉</Text>
              <Text
                style={{
                  fontSize: isMobile ? 22 : 28,
                  fontWeight: "900",
                  color: "#1E1B4B",
                  textAlign: "center",
                }}
              >
                {screenTitle} Complete!
              </Text>
              <Text
                style={{
                  fontSize: isMobile ? 14 : 16,
                  color: "#6B7280",
                  textAlign: "center",
                  lineHeight: 24,
                }}
              >
                Nice work — keep going!
              </Text>

              <AppButton
                title="Back to Lessons"
                onPress={() => navigation.navigate(lessonsRouteName as any)}
                variant="primary"
                style={{ width: "100%" }}
              />

              <AppButton
                title="Main Menu"
                onPress={() => navigation.navigate(mainMenuRouteName as any)}
                variant="secondary"
                style={{ width: "100%" }}
              />
            </CenteredCard>
          </ScreenGradient>
        </LessonLayout>
      </AppLayout>
    );
  }

  /* ── QUIZ ── */
  if (page === "quiz") {
    const q = questions[questionIndex];

    return (
      <AppLayout title={screenTitle}>
        <LessonLayout
          lessonNumber={lessonNumber}
          mode="quiz"
          step={questionIndex + 1}
          total={questions.length}
        >
          <ScreenGradient>
            <CenteredCard>
              <Text
                style={{
                  fontSize: isMobile ? 17 : 22,
                  fontWeight: "900",
                  color: "#1E1B4B",
                  textAlign: "center",
                }}
              >
                {q.question}
              </Text>

              <Image
                source={q.image}
                style={{ width: imageSize, height: imageSize, borderRadius: 16 }}
                resizeMode="contain"
              />

              <View style={{ width: "100%", gap: 8 }}>
                {q.options.map((opt) => {
                  const isSelected = selected === opt;
                  const isCorrect = locked && opt === q.correct; // show correct after lock
                  const isWrong = wrong === opt;

                  return (
                    <OptionButton
                      key={opt}
                      label={opt}
                      disabled={locked}
                      selected={isSelected}
                      correct={isCorrect}
                      wrong={isWrong}
                      onPress={() => {
                        if (locked) return;

                        setSelected(opt);
                        setWrong(null);

                        if (opt !== q.correct) {
                          setWrong(opt);
                          setTimeout(() => setWrong(null), 600);
                          return;
                        }

                        setLocked(true);
                        addXP(xpPerQuestion);

                        setTimeout(() => {
                          if (questionIndex < questions.length - 1) {
                            setQuestionIndex((i) => i + 1);
                            setSelected(null);
                            setWrong(null);
                            setLocked(false);
                          } else {
                            setPage("summary");
                          }
                        }, 650);
                      }}
                    />
                  );
                })}
              </View>
            </CenteredCard>
          </ScreenGradient>
        </LessonLayout>
      </AppLayout>
    );
  }

  /* ── LESSON SLIDES ── */
  const slide = slides[slideIndex];

  return (
    <AppLayout title={screenTitle}>
      <LessonLayout lessonNumber={lessonNumber} mode="lesson" step={slideIndex + 1} total={slides.length}>
        <ScreenGradient>
          <CenteredCard>
            <Text
              style={{
                fontSize: isMobile ? 32 : 40,
                fontWeight: "900",
                color: "#2563EB",
                textAlign: "center",
              }}
            >
              {slide.word}
            </Text>

            <Image
              source={slide.image}
              style={{ width: imageSize, height: imageSize, borderRadius: 16 }}
              resizeMode="contain"
            />

            <View
              style={{
                width: "100%",
                backgroundColor: "#EEF2FF",
                borderRadius: 16,
                paddingVertical: 12,
                paddingHorizontal: 24,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "#A5B4FC",
                  marginBottom: 4,
                }}
              >
                English
              </Text>
              <Text
                style={{
                  fontSize: isMobile ? 17 : 20,
                  fontWeight: "800",
                  color: "#4338CA",
                  textAlign: "center",
                }}
              >
                {slide.translated}
              </Text>
            </View>

            <AppButton
              title={slideIndex < slides.length - 1 ? "Next →" : "Take the Quiz →"}
              onPress={() => {
                addXP(xpPerSlide);
                if (slideIndex < slides.length - 1) setSlideIndex((i) => i + 1);
                else setPage("quiz");
              }}
              variant="primary"
              style={{ width: "100%" }}
            />
          </CenteredCard>
        </ScreenGradient>
      </LessonLayout>
    </AppLayout>
  );
};

export default BaseLesson;