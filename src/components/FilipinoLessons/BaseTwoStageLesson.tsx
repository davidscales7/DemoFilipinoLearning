import React, { useEffect, useState } from "react";
import { Text, Image, View, useWindowDimensions, ImageSourcePropType } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../../components/Layout/AppLayout";
import LessonLayout from "./LessonLayout";
import type { RootStackParamList } from "../../navigation/navigation";

import { useProgressStore } from "../../store/useProgressStore";
import { useXPStore } from "../../store/useXPStore";

import { ScreenGradient, CenteredCard, AppButton } from "../../theme/components";

type Nav = StackNavigationProp<RootStackParamList, "FilipinoLearning">;

export type TwoStageItem = {
  image: ImageSourcePropType;
  wordTop: string;
  wordBottom: string;
  sentenceTop: string;
  sentenceBottom: string;
};

type Props = {
  lessonNumber: number;
  title: string;
  items: TwoStageItem[];
  xpPerTap?: number;
  onLessonComplete?: () => void;
};

export default function BaseTwoStageLesson({
  lessonNumber,
  title,
  items,
  xpPerTap = 15,
  onLessonComplete,
}: Props) {
  const navigation = useNavigation<Nav>();
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const imageSize = isMobile ? Math.min(height * 0.25, 180) : 260;

  const addXP = useXPStore((s) => s.addXP);
  const completeLesson = useProgressStore((s) => s.completeLesson);

  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<"word" | "sentence" | "summary">("word");

  const current = items[index];

  useEffect(() => {
    if (stage !== "summary") return;
    completeLesson(lessonNumber);
    onLessonComplete?.();
  }, [stage, lessonNumber, completeLesson, onLessonComplete]);

  const next = () => {
    addXP(xpPerTap);

    if (stage === "word") {
      setStage("sentence");
      return;
    }

    if (index < items.length - 1) {
      setIndex((i) => i + 1);
      setStage("word");
      return;
    }

    setStage("summary");
  };

  if (stage === "summary") {
    return (
      <AppLayout title={`${title} Complete`}>
        <LessonLayout lessonNumber={lessonNumber} mode="summary">
          <ScreenGradient>
            <CenteredCard maxWidth={480}>
              <Text style={{ fontSize: 56 }}>🎉</Text>
              <Text style={{ fontSize: 26, fontWeight: "900", color: "#1E1B4B", textAlign: "center" }}>
                {title} Complete!
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

  const topText = stage === "word" ? current.wordTop : current.sentenceTop;
  const bottomText = stage === "word" ? current.wordBottom : current.sentenceBottom;

  return (
    <AppLayout title={title}>
      <LessonLayout lessonNumber={lessonNumber} mode="lesson" step={index + 1} total={items.length}>
        <ScreenGradient>
          <CenteredCard>
            <Text style={{ fontSize: isMobile ? 26 : 34, fontWeight: "900", color: "#2563EB", textAlign: "center" }}>
              {topText}
            </Text>

            <Image source={current.image} style={{ width: imageSize, height: imageSize, borderRadius: 16 }} resizeMode="contain" />

            <View
              style={{
                width: "100%",
                backgroundColor: "#EEF2FF",
                borderRadius: 16,
                paddingVertical: 12,
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", color: "#A5B4FC", marginBottom: 4 }}>
                English
              </Text>
              <Text style={{ fontSize: isMobile ? 15 : 18, fontWeight: "800", color: "#4338CA", textAlign: "center" }}>
                {bottomText}
              </Text>
            </View>

            <AppButton
              title={stage === "word" ? "Show sentence →" : index < items.length - 1 ? "Next →" : "Finish →"}
              onPress={next}
              variant="primary"
              style={{ width: "100%" }}
            />

            <Text style={{ marginTop: 4, color: "#6B7280", fontSize: 13, textAlign: "center" }}>
              Item {index + 1} / {items.length}
            </Text>
          </CenteredCard>
        </ScreenGradient>
      </LessonLayout>
    </AppLayout>
  );
}