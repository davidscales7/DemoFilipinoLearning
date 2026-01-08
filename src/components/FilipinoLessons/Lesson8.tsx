import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";

import AppLayout from "../../components/Layout/AppLayout";
import { useTheme } from "../../theme/ThemeProvider";
import { useXPStore } from "../../store/useXPStore";
import { useProgressStore } from "../../store/useProgressStore";

/* ---------------- TYPES ---------------- */

type HobbyItem = {
  english: string;
  filipino: string;
  sentenceEN: string;
  sentenceTL: string;
  image: any;
};

/* ---------------- DATA ---------------- */

const HOBBIES: HobbyItem[] = [
  {
    english: "Reading",
    filipino: "Pagbabasa",
    sentenceEN: "I like reading books.",
    sentenceTL: "Gusto kong magbasa ng libro.",
    image: require("../../../assets/images/reading.png"),
  },
  {
    english: "Playing games",
    filipino: "Paglalaro",
    sentenceEN: "I play games at night.",
    sentenceTL: "Naglalaro ako sa gabi.",
    image: require("../../../assets/images/gaming.png"),
  },
  {
    english: "Cooking",
    filipino: "Pagluluto",
    sentenceEN: "I enjoy cooking food.",
    sentenceTL: "Mahilig akong magluto ng pagkain.",
    image: require("../../../assets/images/cooking.jpg"),
  },
];

const XP_PER_ITEM = 15;

/* ---------------- COMPONENT ---------------- */

const Lesson8: React.FC = () => {
  const theme = useTheme();

  const addXP = useXPStore((s) => s.addXP);
  const completeLesson = useProgressStore((s) => s.completeLesson);

  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<"word" | "sentence">("word");
  const [showSummary, setShowSummary] = useState(false);

  const current = HOBBIES[index];

  /* ---------------- NEXT ---------------- */

  const next = () => {
    console.log("➡️ NEXT PRESSED — Lesson 8");
    console.log("Index:", index);
    console.log("Stage:", stage);

    addXP(XP_PER_ITEM);
    console.log("✅ XP ADDED:", XP_PER_ITEM);

    setStage("word");

    if (index < HOBBIES.length - 1) {
      setIndex((i) => i + 1);
      return;
    }

    // ✅ Finished lesson
    console.log("🎉 ALL HOBBIES COMPLETED — UNLOCKING LESSON 9");
    completeLesson(8);
    setShowSummary(true);
  };

  /* ---------------- SUMMARY ---------------- */

  if (showSummary) {
    return (
      <AppLayout title="Lesson 8 Complete 🎉">
        <View style={{ alignItems: "center", marginTop: theme.spacing.xl }}>
          <Text style={theme.typography.title}>
            Great job!
          </Text>

          <Text
            style={[
              theme.typography.body,
              {
                marginTop: theme.spacing.md,
                textAlign: "center",
                color: theme.colors.textSecondary,
              },
            ]}
          >
            You’ve learned how to talk about hobbies in Filipino.
            Lesson 9 is now unlocked!
          </Text>

          <Pressable
            style={{
              marginTop: theme.spacing.xl,
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.xl,
              borderRadius: 14,
              backgroundColor: theme.colors.primary,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              Continue →
            </Text>
          </Pressable>
        </View>
      </AppLayout>
    );
  }

  /* ---------------- MAIN ---------------- */

  return (
    <AppLayout title="Lesson 8 — Hobbies">
      {/* Intro */}
      <Text
        style={[
          theme.typography.body,
          {
            textAlign: "center",
            marginBottom: theme.spacing.lg,
            color: theme.colors.textSecondary,
          },
        ]}
      >
        Learn hobbies and how to talk about what you like doing.
      </Text>

      {/* Card */}
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: theme.spacing.xl,
          alignItems: "center",
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

            <Pressable
              onPress={() => setStage("sentence")}
              style={{
                marginTop: 12,
                paddingVertical: 10,
                paddingHorizontal: 18,
                borderRadius: 999,
                backgroundColor: theme.colors.secondary,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                Use in a sentence →
              </Text>
            </Pressable>
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
                {
                  textAlign: "center",
                  color: theme.colors.primary,
                  marginBottom: 12,
                },
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
            {index === HOBBIES.length - 1 ? "Finish ✓" : "Next →"}
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
        Item {index + 1} / {HOBBIES.length}
      </Text>
    </AppLayout>
  );
};

export default Lesson8;
