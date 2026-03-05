import React, { useEffect, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import type { RootStackParamList } from "../../navigation/navigation";

import { useProgressStore } from "../../store/useProgressStore";
import { useXPStore } from "../../store/useXPStore";

import { ScreenGradient, CenteredCard, AppButton } from "../../theme/components";

type Nav = StackNavigationProp<RootStackParamList, "FilipinoLearning">;

export type LessonStep = {
  title: string;
  explanation: string;
  examples?: string[];
};

type Props = {
  lessonNumber: number;
  title: string;
  intro?: string;
  steps: LessonStep[];
  xpPerStep?: number;
  onLessonComplete?: () => void;
};

export default function BaseStepsLesson({
  lessonNumber,
  title,
  intro,
  steps,
  xpPerStep = 20,
  onLessonComplete,
}: Props) {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const addXP = useXPStore((s) => s.addXP);
  const completeLesson = useProgressStore((s) => s.completeLesson);

  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<"lesson" | "summary">("lesson");

  const current = steps[index];

  useEffect(() => {
    if (stage !== "summary") return;
    completeLesson(lessonNumber);
    onLessonComplete?.();
  }, [stage, lessonNumber, completeLesson, onLessonComplete]);

  const next = () => {
    addXP(xpPerStep);
    if (index < steps.length - 1) setIndex((i) => i + 1);
    else setStage("summary");
  };

  if (stage === "summary") {
    return (
      <AppLayout title={`${title} Complete`}>
        <LessonLayout lessonNumber={lessonNumber} mode="summary">
          <ScreenGradient>
            <CenteredCard maxWidth={480}>
              <Text style={{ fontSize: 56 }}>🎉</Text>
              <Text style={{ fontSize: isMobile ? 20 : 26, fontWeight: "900", color: "#1E1B4B", textAlign: "center" }}>
                {title} Complete!
              </Text>
              <Text style={{ fontSize: isMobile ? 13 : 15, color: "#6B7280", textAlign: "center", lineHeight: 22 }}>
                Nice work — keep practicing these patterns.
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
      <LessonLayout lessonNumber={lessonNumber} mode="lesson" step={index + 1} total={steps.length}>
        <ScreenGradient>
          <CenteredCard maxWidth={540}>
            {!!intro && (
              <Text style={{ fontSize: isMobile ? 13 : 15, textAlign: "center", color: "#6B7280" }}>
                {intro}
              </Text>
            )}

            <Text style={{ fontSize: isMobile ? 22 : 28, fontWeight: "900", color: "#2563EB", textAlign: "center" }}>
              {current.title}
            </Text>

            <Text style={{ fontSize: isMobile ? 14 : 16, textAlign: "center", color: "#4B5563", lineHeight: isMobile ? 20 : 24 }}>
              {current.explanation}
            </Text>

            {current.examples?.length ? (
              <View style={{ width: "100%", backgroundColor: "#EEF2FF", borderRadius: 16, paddingVertical: 14, paddingHorizontal: 16 }}>
                {current.examples.map((ex, i) => (
                  <Text key={`${index}-ex-${i}`} style={{ fontSize: isMobile ? 13 : 14, color: "#1F2937", lineHeight: isMobile ? 18 : 20, marginBottom: 6 }}>
                    • {ex}
                  </Text>
                ))}
              </View>
            ) : null}

            <AppButton
              title={index < steps.length - 1 ? "Next →" : "Finish →"}
              onPress={next}
              variant="primary"
              style={{ width: "100%" }}
            />

            <Text style={{ marginTop: 4, color: "#6B7280", fontSize: 13, textAlign: "center" }}>
              Step {index + 1} / {steps.length}
            </Text>
          </CenteredCard>
        </ScreenGradient>
      </LessonLayout>
    </AppLayout>
  );
}