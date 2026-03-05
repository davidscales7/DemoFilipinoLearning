import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Chapter } from "./types";

import AppLayout from "../Layout/AppLayout";
import { ChapterRoadmap } from ".";
import { useDemoStore } from "../../store/useDemoStore";
import { useProgressStore } from "../../store/useProgressStore";
import { RootStackParamList } from "../../navigation/navigation";

type Nav = StackNavigationProp<RootStackParamList>;
type LessonRoute = "Lesson1" | "Lesson2" | "Lesson3" | "Lesson4" | "Lesson5"
  | "Lesson6" | "Lesson7" | "Lesson8" | "Lesson9" | "Lesson10";

const FilipinoLessons: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const demoUnlocked = useDemoStore((s) => s.isUnlocked);
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const isLessonUnlocked = useProgressStore((s) => s.isLessonUnlocked);

  const goTo = (screen: LessonRoute) => navigation.navigate(screen);

  const chapters: Chapter[] = [
    {
      number: 1,
      title: "Foundations",
      lessons: [
        { title: "Greetings", icon: "hand-wave", color: "#4A90E2", locked: !demoUnlocked && !isLessonUnlocked(1), completed: completedLessons.includes(1), onPress: () => goTo("Lesson1") },
        { title: "Numbers", icon: "numeric", color: "#27ae60", locked: !demoUnlocked && !isLessonUnlocked(2), completed: completedLessons.includes(2), onPress: () => goTo("Lesson2") },
        { title: "Family", icon: "account-group", color: "#9b59b6", locked: !demoUnlocked && !isLessonUnlocked(3), completed: completedLessons.includes(3), onPress: () => goTo("Lesson3") },
        { title: "Colours", icon: "palette", color: "#e67e22", locked: !demoUnlocked && !isLessonUnlocked(4), completed: completedLessons.includes(4), onPress: () => goTo("Lesson4") },
        { title: "Animals", icon: "paw", color: "#f1c40f", locked: !demoUnlocked && !isLessonUnlocked(5), completed: completedLessons.includes(5), onPress: () => goTo("Lesson5") },
      ],
    },
    {
      number: 2,
      title: "Everyday Life",
      lessons: [
        { title: "Food & Drink", icon: "food", color: "#d35400", locked: !demoUnlocked && !isLessonUnlocked(6), completed: completedLessons.includes(6), onPress: () => goTo("Lesson6") },
        { title: "Clothes", icon: "tshirt-crew", color: "#8e44ad", locked: !demoUnlocked && !isLessonUnlocked(7), completed: completedLessons.includes(7), onPress: () => goTo("Lesson7") },
        { title: "Hobbies", icon: "gamepad-variant", color: "#2980b9", locked: !demoUnlocked && !isLessonUnlocked(8), completed: completedLessons.includes(8), onPress: () => goTo("Lesson8") },
        { title: "Sentence Structure", icon: "format-text", color: "#16a085", locked: !demoUnlocked && !isLessonUnlocked(9), completed: completedLessons.includes(9), onPress: () => goTo("Lesson9") },
        { title: "Final Test", icon: "clipboard-check", color: "#2ecc71", locked: !demoUnlocked && !isLessonUnlocked(10), completed: completedLessons.includes(10), onPress: () => goTo("Lesson10") },
      ],
    },
  ];

  const totalCompleted = completedLessons.length;
  const totalLessons = 10;

  return (
    <AppLayout title="Lessons">

      {/* ── Overall progress banner ── */}
      <View style={[styles.banner, isMobile && styles.bannerMobile]}>
        <View style={styles.bannerLeft}>
          <Text style={styles.bannerTitle}>Your Progress</Text>
          <Text style={styles.bannerSub}>
            {totalCompleted} of {totalLessons} lessons complete
          </Text>
        </View>
        <View style={styles.bannerRight}>
          <Text style={styles.bannerPercent}>
            {Math.round((totalCompleted / totalLessons) * 100)}%
          </Text>
        </View>
      </View>

      {/* ── Demo notice ── */}
      {!demoUnlocked && (
        <View style={styles.demoNotice}>
          <Text style={styles.demoNoticeText}>
            🔒 Complete Lesson 1 — Greetings to unlock all lessons
          </Text>
        </View>
      )}

      {/* ── Chapter roadmap ── */}
      <ChapterRoadmap chapters={chapters} />

    </AppLayout>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#6366F1",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  bannerMobile: {
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 12,
  },
  bannerLeft: { gap: 2 },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFF",
  },
  bannerSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "500",
  },
  bannerRight: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  bannerPercent: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFF",
  },
  demoNotice: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  demoNoticeText: {
    fontSize: 13,
    color: "#92400E",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default FilipinoLessons;