import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";

import AppLayout from "../../components/Layout/AppLayout";
import { useTheme } from "../../theme/ThemeProvider";
import { useXPStore } from "../../store/useXPStore";
import { useProgressStore } from "../../store/useProgressStore";
import { useNavigation } from "@react-navigation/native";

type ClothingItem = {
  english: string;
  filipino: string;
  sentenceEN: string;
  sentenceTL: string;
  image: any;
};

const CLOTHES: ClothingItem[] = [
  {
    english: "Shirt",
    filipino: "Damit",
    sentenceEN: "I am wearing a shirt.",
    sentenceTL: "Nagsusuot ako ng damit.",
    image: require("../../../assets/images/shirt.png"),
  },
  {
    english: "Pants",
    filipino: "Pantalon",
    sentenceEN: "I am wearing pants.",
    sentenceTL: "Nagsusuot ako ng pantalon.",
    image: require("../../../assets/images/pants.png"),
  },
  {
    english: "Shoes",
    filipino: "Sapatos",
    sentenceEN: "I am wearing shoes.",
    sentenceTL: "Nagsusuot ako ng sapatos.",
    image: require("../../../assets/images/shoes.png"),
  },
];

const XP_PER_ITEM = 15;

const Lesson7: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const addXP = useXPStore((s) => s.addXP);
  const completeLesson = useProgressStore((s) => s.completeLesson);

  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<"word" | "sentence" | "summary">("word");

  const current = CLOTHES[index];

  const next = () => {
    console.log("➡️ NEXT PRESSED (Lesson 7)");
    console.log("Index:", index, "Stage:", stage);

    addXP(XP_PER_ITEM);
    console.log("✅ XP ADDED:", XP_PER_ITEM);

    if (stage === "word") {
      setStage("sentence");
      return;
    }

    if (index < CLOTHES.length - 1) {
      setIndex(index + 1);
      setStage("word");
      return;
    }

    console.log("🎉 ALL CLOTHING ITEMS COMPLETED");
    setStage("summary");
  };

  const finishLesson = () => {
    console.log("🏁 FINISH LESSON 7");

    console.log(
      "Before completion:",
      useProgressStore.getState().completedLessons
    );

    completeLesson(7); // 🔓 UNLOCKS LESSON 8

    console.log(
      "After completion:",
      useProgressStore.getState().completedLessons
    );

    navigation.goBack();
  };

  return (
    <AppLayout title="Lesson 7 — Clothes">
      {stage !== "summary" ? (
        <>
          {/* Card */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: theme.spacing.xl,
              alignItems: "center",
              shadowOpacity: 0.08,
              shadowRadius: 10,
            }}
          >
            <Image
              source={current.image}
              style={{ width: 120, height: 120, marginBottom: 16 }}
              resizeMode="contain"
            />

            {stage === "word" ? (
              <>
                <Text style={theme.typography.title}>
                  {current.english}
                </Text>

                <Text
                  style={[
                    theme.typography.subtitle,
                    { color: theme.colors.primary, marginVertical: 8 },
                  ]}
                >
                  {current.filipino}
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={[
                    theme.typography.subtitle,
                    { textAlign: "center", marginBottom: 6 },
                  ]}
                >
                  {current.sentenceEN}
                </Text>

                <Text
                  style={[
                    theme.typography.body,
                    { textAlign: "center", color: theme.colors.primary },
                  ]}
                >
                  {current.sentenceTL}
                </Text>
              </>
            )}
          </View>

          {/* Controls */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: theme.spacing.xl,
            }}
          >
            <Pressable
              onPress={next}
              style={{
                paddingVertical: theme.spacing.md,
                paddingHorizontal: theme.spacing.xl,
                borderRadius: 14,
                backgroundColor: theme.colors.primary,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                Next →
              </Text>
            </Pressable>
          </View>

          {/* Progress */}
          <Text
            style={{
              textAlign: "center",
              marginTop: theme.spacing.md,
              color: theme.colors.textSecondary,
            }}
          >
            Item {index + 1} / {CLOTHES.length}
          </Text>
        </>
      ) : (
        /* SUMMARY */
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={theme.typography.title}>Nice work! 👕</Text>

          <Text
            style={[
              theme.typography.body,
              { marginVertical: 12, textAlign: "center" },
            ]}
          >
            You’ve completed Lesson 7.
          </Text>

          <Pressable
            onPress={finishLesson}
            style={{
              marginTop: 20,
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.xl,
              borderRadius: 16,
              backgroundColor: theme.colors.success,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              Finish Lesson ✓
            </Text>
          </Pressable>
        </View>
      )}
    </AppLayout>
  );
};

export default Lesson7;
