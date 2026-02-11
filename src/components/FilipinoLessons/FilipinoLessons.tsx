// src/components/FilipinoLessons/FilipinoLessons.tsx
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Chapter } from "./types";

import AppLayout from "../Layout/AppLayout";
import { ChapterRoadmap } from ".";
import { useDemoStore } from "../../store/useDemoStore";
import { useProgressStore } from "../../store/useProgressStore";
import { RootStackParamList } from "../../navigation/navigation";
import { useTheme } from "../../theme/ThemeProvider";

type Nav = StackNavigationProp<RootStackParamList>;

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
  const theme = useTheme();

  // 🔓 Demo override
  const demoUnlocked = useDemoStore((s) => s.isUnlocked);

  // 📚 Progress state
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const isLessonUnlocked = useProgressStore((s) => s.isLessonUnlocked);

  const goTo = (screen: LessonRoute) => {
    navigation.navigate(screen);
  };

  console.log("Demo unlocked:", demoUnlocked);
  console.log("Completed lessons:", completedLessons);

  // 2 CHAPTERS × 5 LESSONS (balanced layout)
  const chapters: Chapter[] = [
    {
      number: 1,
      title: "Foundations",
      lessons: [
        {
          title: "Greetings",
          icon: "hand-wave",
          color: "#4A90E2",
          locked: !demoUnlocked && !isLessonUnlocked(1),
          completed: completedLessons.includes(1),
          onPress: () => goTo("Lesson1"),
        },
        {
          title: "Numbers",
          icon: "numeric",
          color: "#27ae60",
          locked: !demoUnlocked && !isLessonUnlocked(2),
          completed: completedLessons.includes(2),
          onPress: () => goTo("Lesson2"),
        },
        {
          title: "Family",
          icon: "account-group",
          color: "#9b59b6",
          locked: !demoUnlocked && !isLessonUnlocked(3),
          completed: completedLessons.includes(3),
          onPress: () => goTo("Lesson3"),
        },
        {
          title: "Colours",
          icon: "palette",
          color: "#e67e22",
          locked: !demoUnlocked && !isLessonUnlocked(4),
          completed: completedLessons.includes(4),
          onPress: () => goTo("Lesson4"),
        },
        {
          title: "Animals",
          icon: "paw",
          color: "#f1c40f",
          locked: !demoUnlocked && !isLessonUnlocked(5),
          completed: completedLessons.includes(5),
          onPress: () => goTo("Lesson5"),
        },
      ],
    },
    {
      number: 2,
      title: "Everyday Life",
      lessons: [
        {
          title: "Food & Drink",
          icon: "food",
          color: "#d35400",
          locked: !demoUnlocked && !isLessonUnlocked(6),
          completed: completedLessons.includes(6),
          onPress: () => goTo("Lesson6"),
        },
         {
          title: "Hobbies",
          icon: "gamepad-variant",
          color: "#8e44ad",
          locked: !demoUnlocked && !isLessonUnlocked(7),
          completed: completedLessons.includes(7),
          onPress: () => goTo("Lesson7"),
        },
        {
          title: "Clothes",
          icon: "tshirt-crew",
          color: "#2980b9",
          locked: !demoUnlocked && !isLessonUnlocked(8),
          completed: completedLessons.includes(8),
          onPress: () => goTo("Lesson8"),
        },
       
        {
          title: "Sentence Structure",
          icon: "format-text",
          color: "#16a085",
          locked: !demoUnlocked && !isLessonUnlocked(9),
          completed: completedLessons.includes(9),
          onPress: () => goTo("Lesson9"),
        },
        {
          title: "Final Test — Part 1",
          icon: "clipboard-check",
          color: "#2ecc71",
          locked: !demoUnlocked && !isLessonUnlocked(10),
          completed: completedLessons.includes(10),
          onPress: () => goTo("Lesson10"),
        },
      ],
    },
  ];

  return (
    <AppLayout title="Lessons">
      <ScrollView>
        {!demoUnlocked && (
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 24,
              marginTop: 8,
            }}
          >
            <Text
              style={[
                theme.typography.body,
                {
                  textAlign: "center",
                  color: theme.colors.textSecondary,
                  lineHeight: 22,
                },
              ]}
            >
              🔒 Demo Mode — complete Lesson 1 to unlock all content
            </Text>
          </View>
        )}

        <ChapterRoadmap chapters={chapters} />
      </ScrollView>
    </AppLayout>
  );
};

export default FilipinoLessons;
