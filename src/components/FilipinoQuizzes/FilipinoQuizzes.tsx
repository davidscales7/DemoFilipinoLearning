console.log("🚨🚨🚨 QUIZLOGIC FILE LOADED 🚨🚨🚨");

import React, { useEffect, useState } from "react";
// ... rest of imports


import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import QuizLogic from "./QuizLogic";
import AppLayout from "../Layout/AppLayout";
import { RootStackParamList } from "../../navigation/navigation";
import QuizChapter from "./QuizChapter";
import { useDemoStore } from "../../store/useDemoStore";
import { useProgressStore } from "../../store/useProgressStore";
import { useTheme } from "../../theme/ThemeProvider";
/* ----------------------------------------
   TYPES
---------------------------------------- */
type Nav = StackNavigationProp<RootStackParamList>;

const FilipinoQuizzes: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const theme = useTheme();

  // 🔓 DEMO FLAG & PROGRESS
  const demoUnlocked = useDemoStore((s) => s.isUnlocked);
  const isQuizUnlocked = useProgressStore((s) => s.isQuizUnlocked);
  const completedQuizzes = useProgressStore((s) => s.completedQuizzes); // ✅ Get completed quizzes

  const goTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as never);
  };

  console.log("📊 Quiz Progress:", {
    demoUnlocked,
    completedQuizzes,
  });

  const chapters = [
    {
      number: 1,
      title: "Foundations Checkpoints",
      quizzes: [
        {
          title: "Greetings",
          icon: "comment-question-outline",
          color: "#3b82f6",
          locked: !isQuizUnlocked(1),
          completed: completedQuizzes.includes(1), // ✅ Track completion
          onPress: () => goTo("Quiz1"),
        },
        {
          title: "Family",
          icon: "account-group",
          color: "#a855f7",
          locked: !isQuizUnlocked(2),
          completed: completedQuizzes.includes(2), // ✅ Track completion
          onPress: () => goTo("Quiz2"),
        },
        {
          title: "Numbers",
          icon: "numeric",
          color: "#22c55e",
          locked: !isQuizUnlocked(3),
          completed: completedQuizzes.includes(2), // ✅ Track completion
          onPress: () => goTo("Quiz3"),
        },
        
      ],
      
    },
    {
      number: 2,
      title: "Everyday Usage",
      quizzes: [
        {
          title: "Colours",
          icon: "palette",
          color: "#f97316",
          locked: !isQuizUnlocked(4),
          completed: completedQuizzes.includes(4), // ✅ Track completion
          onPress: () => goTo("Quiz4"),
        },
        {
          title: "Animals",
          icon: "paw",
          color: "#eab308",
          locked: !isQuizUnlocked(5),
          completed: completedQuizzes.includes(5), // ✅ Track completion
          onPress: () => goTo("Quiz5"),
        },
        {
          title: "Food & Drink",
          icon: "food",
          color: "#ef4444",
          locked: !isQuizUnlocked(6),
          completed: completedQuizzes.includes(6), // ✅ Track completion
          onPress: () => goTo("Quiz6"),
        },
      ],
    },
    {
      number: 3,
      title: "Putting It Together",
      quizzes: [
        {
          title: "Sentence Structure",
          icon: "format-text",
          color: "#14b8a6",
          locked: !isQuizUnlocked(9),
          completed: completedQuizzes.includes(9), // ✅ Track completion
          onPress: () => goTo("Quiz8"),
        },
        {
          title: "Final Test",
          icon: "clipboard-check",
          color: "#22c55e",
          locked: !isQuizUnlocked(10),
          completed: completedQuizzes.includes(10), // ✅ Track completion
          onPress: () => goTo("Quiz9"),
        },
      ],
    },
  ];

  // ✅ Calculate overall progress
  const totalQuizzes = chapters.reduce((sum, ch) => sum + ch.quizzes.length, 0);
  const completedCount = completedQuizzes.length;
  const progressPercent = Math.round((completedCount / totalQuizzes) * 100);

  return (
    <AppLayout title="Quizzes">
      <ScrollView>
        {/* Demo Message */}
        {!demoUnlocked && (
          <View style={styles.demoMessage}>
            <Text style={[theme.typography.body, styles.demoText]}>
              🔒 Complete lesson 1 to unlock all quizzes
            </Text>
          </View>
        )}

        {/* Overall Progress Bar */}
        {completedCount > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Overall Progress</Text>
              <Text style={styles.progressStats}>
                {completedCount} / {totalQuizzes} ({progressPercent}%)
              </Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercent}%` },
                ]}
              />
            </View>
          </View>
        )}

        {/* Quiz Chapters */}
        {chapters.map((chapter) => (
          <QuizChapter key={chapter.number} chapter={chapter} />
        ))}
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  demoMessage: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 8,
  },
  demoText: {
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 22,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  progressStats: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 4,
  },
});

export default FilipinoQuizzes;