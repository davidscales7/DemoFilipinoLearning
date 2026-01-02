// src/components/FilipinoLessons/FilipinoLessons.tsx

import React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../Layout/AppLayout";
import LessonPath from "./LessonPath";
import { useProgressStore } from "../../store/useProgressStore";
import { RootStackParamList } from "../../navigation/navigation";

type Nav = StackNavigationProp<RootStackParamList>;

/**
 * ✅ Restrict navigation ONLY to lesson routes
 * (Fixes React Navigation overload errors)
 */
type LessonRoute =
  | "Lesson1"
  | "Lesson2"
  | "Lesson3"
  | "Lesson4"
  | "Lesson5"
  | "Lesson6"
  | "Lesson7"
  | "Lesson8"
  | "Lesson9"
  | "Lesson10";

const FilipinoLessons: React.FC = () => {
  const navigation = useNavigation<Nav>();

  // 🔓 Progress state
  const isLessonUnlocked = useProgressStore((s) => s.isLessonUnlocked);
  const completedLessons = useProgressStore((s) => s.completedLessons);

  // 🧪 Debug (safe to remove later)
  console.log("Completed lessons:", completedLessons);

  const goTo = (screen: LessonRoute) => {
    navigation.navigate(screen);
  };

  const lessons = [
    {
      title: "Greetings",
      icon: "hand-wave",
      color: "#4A90E2",
      locked: !isLessonUnlocked(1),
      onPress: () => goTo("Lesson1"),
    },
    {
      title: "Numbers",
      icon: "numeric",
      color: "#27ae60",
      locked: !isLessonUnlocked(2),
      onPress: () => goTo("Lesson2"),
    },
    {
      title: "Family",
      icon: "account-group",
      color: "#9b59b6",
      locked: !isLessonUnlocked(3),
      onPress: () => goTo("Lesson3"),
    },
    {
      title: "Colours",
      icon: "palette",
      color: "#e67e22",
      locked: !isLessonUnlocked(4),
      onPress: () => goTo("Lesson4"),
    },
    {
      title: "Animals",
      icon: "paw",
      color: "#f1c40f",
      locked: !isLessonUnlocked(5),
      onPress: () => goTo("Lesson5"),
    },
    {
      title: "Food & Drink",
      icon: "food",
      color: "#d35400",
      locked: !isLessonUnlocked(6),
      onPress: () => goTo("Lesson6"),
    },
    {
      title: "Clothes",
      icon: "tshirt-crew",
      color: "#2980b9",
      locked: !isLessonUnlocked(7),
      onPress: () => goTo("Lesson7"),
    },
    {
      title: "Hobbies",
      icon: "gamepad-variant",
      color: "#8e44ad",
      locked: !isLessonUnlocked(8),
      onPress: () => goTo("Lesson8"),
    },
    {
      title: "Sentence Structure",
      icon: "format-text",
      color: "#16a085",
      locked: !isLessonUnlocked(9),
      onPress: () => goTo("Lesson9"),
    },
    {
      title: "Final Test — Part 1",
      icon: "clipboard-check",
      color: "#2ecc71",
      locked: !isLessonUnlocked(10),
      onPress: () => goTo("Lesson10"),
    },
  ];

  return (
    <AppLayout title="Lessons">
      <ScrollView>
        <LessonPath lessons={lessons} />
      </ScrollView>
    </AppLayout>
  );
};

export default FilipinoLessons;
