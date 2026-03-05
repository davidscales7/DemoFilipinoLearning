import React, { useEffect, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import type { RootStackParamList } from "../../navigation/navigation";

import { useProgressStore } from "../../store/useProgressStore";
import { useXPStore } from "../../store/useXPStore";

import { ScreenGradient, CenteredCard, AppButton, OptionButton } from "../../theme/components";

type Nav = StackNavigationProp<RootStackParamList, "FilipinoLearning">;

export type MCQ = {
  question: string;
  options: string[];
  correctIndex: number;
};

type Props = {
  lessonNumber: number;
  title: string;
  questions: MCQ[];
  xpPerCorrect?: number;
  completionBonus?: number;
  onLessonComplete?: () => void;
};

export default function BaseMCQTestLesson({
  lessonNumber,
  title,
  questions,
  xpPerCorrect = 25,
  completionBonus = 100,
  onLessonComplete,
}: Props) {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const addXP = useXPStore((s) => s.addXP);
  const completeLesson = useProgressStore((s) => s.completeLesson);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState<"test" | "summary">("test");

  const current = questions[index];

  useEffect(() => {
    if (stage !== "summary") return;
    completeLesson(lessonNumber);
    onLessonComplete?.();
  }, [stage, lessonNumber, completeLesson, onLessonComplete]);

  const submit = () => {
    if (selected === null) return;

    const isCorrect = selected === current.correctIndex;
    if (isCorrect) {
      addXP(xpPerCorrect);
      setScore((s) => s + 1);
    }

    setSelected(null);

    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      return;
    }

    addXP(completionBonus);
    setStage("summary");
  };

  if (stage === "summary") {
    return (
      <AppLayout title={`${title} Complete`}>
        <LessonLayout lessonNumber={lessonNumber} mode="summary">
          <ScreenGradient>
            <CenteredCard maxWidth={480}>
              <Text style={{ fontSize: 52 }}>🏁</Text>
              <Text style={{ fontSize: isMobile ? 20 : 26, fontWeight: "900", color: "#1E1B4B", textAlign: "center" }}>
                Course Complete!
              </Text>

              <View style={{ width: "100%", backgroundColor: "#EEF2FF", borderRadius: 16, paddingVertical: 12, paddingHorizontal: 20, alignItems: "center" }}>
                <Text style={{ fontSize: 10, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", color: "#A5B4FC", marginBottom: 4 }}>
                  Score
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "900", color: "#4338CA" }}>
                  {score} / {questions.length}
                </Text>
              </View>

              <Text style={{ fontSize: isMobile ? 13 : 15, color: "#6B7280", textAlign: "center", lineHeight: 22 }}>
                Amazing work — you finished all core lessons.
              </Text>

              <AppButton
                title="Back to Lessons"
                onPress={() => navigation.navigate("FilipinoLessons")}
                variant="primary"
                style={{ width: "100%" }}
              />
            </CenteredCard>
          </ScreenGradient>
        </LessonLayout>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={title}>
      <LessonLayout lessonNumber={lessonNumber} mode="lesson" step={index + 1} total={questions.length}>
        <ScreenGradient>
          <CenteredCard maxWidth={540}>
            <Text style={{ fontSize: isMobile ? 17 : 22, fontWeight: "900", color: "#1E1B4B", textAlign: "center" }}>
              {current.question}
            </Text>

            <View style={{ width: "100%", gap: 8 }}>
              {current.options.map((opt, i) => (
                <OptionButton
                  key={`${index}-opt-${i}`}
                  label={opt}
                  selected={selected === i}
                  onPress={() => setSelected(i)}
                />
              ))}
            </View>

            <AppButton
              title={index === questions.length - 1 ? "Finish Test ✓" : "Submit →"}
              onPress={submit}
              disabled={selected === null}
              variant="primary"
              style={{ width: "100%" }}
            />

            <Text style={{ marginTop: 4, color: "#6B7280", fontSize: 13, textAlign: "center" }}>
              Question {index + 1} / {questions.length}
            </Text>
          </CenteredCard>
        </ScreenGradient>
      </LessonLayout>
    </AppLayout>
  );
}