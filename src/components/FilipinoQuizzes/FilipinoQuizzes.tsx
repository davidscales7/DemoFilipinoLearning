import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AppLayout from "../Layout/AppLayout";
import { RootStackParamList } from "../../navigation/navigation";
import QuizChapter from "./QuizChapter";
import { useDemoStore } from "../../store/useDemoStore";
import { useProgressStore } from "../../store/useProgressStore";
import { useTheme } from "../../theme/ThemeProvider";

type Nav = StackNavigationProp<RootStackParamList>;

const FilipinoQuizzes: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const theme = useTheme();

  // 🔓 DEMO FLAG & PROGRESS
  const demoUnlocked = useDemoStore((s) => s.isUnlocked);
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const isLessonUnlocked = useProgressStore((s) => s.isLessonUnlocked);

  const goTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as never);
  };

  // Helper function to check if a quiz is unlocked
  // Quiz N is unlocked when Lesson N is completed
  const isQuizUnlocked = (quizNumber: number) => {
    return demoUnlocked || completedLessons.includes(quizNumber);
  };

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
          onPress: () => goTo("Quiz1"),
        },
        {
          title: "Numbers",
          icon: "numeric",
          color: "#22c55e",
          locked: !isQuizUnlocked(2),
          onPress: () => goTo("Quiz2"),
        },
        {
          title: "Family",
          icon: "account-group",
          color: "#a855f7",
          locked: !isQuizUnlocked(3),
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
          onPress: () => goTo("Quiz4"),
        },
        {
          title: "Animals",
          icon: "paw",
          color: "#eab308",
          locked: !isQuizUnlocked(5),
          onPress: () => goTo("Quiz5"),
        },
        {
          title: "Food & Drink",
          icon: "food",
          color: "#ef4444",
          locked: !isQuizUnlocked(6),
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
          onPress: () => goTo("Quiz8"),
        },
        {
          title: "Final Test",
          icon: "clipboard-check",
          color: "#22c55e",
          locked: !isQuizUnlocked(10),
          onPress: () => goTo("Quiz9"),
        },
      ],
    },
  ];

  return (
    <AppLayout title="Quizzes">
      <ScrollView>
        {!demoUnlocked && (
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <Text
              style={[
                theme.typography.body,
                {
                  textAlign: "center",
                  color: theme.colors.textSecondary,
                },
              ]}
            >
              🔒 Complete lesson 1 to unlock all quizzes
            </Text>
          </View>
        )}

        {chapters.map((chapter) => (
          <QuizChapter key={chapter.number} chapter={chapter} />
        ))}
      </ScrollView>
    </AppLayout>
  );
};

export default FilipinoQuizzes;