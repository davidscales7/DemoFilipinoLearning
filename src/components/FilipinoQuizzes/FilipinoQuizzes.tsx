import React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppLayout from "../Layout/AppLayout";
import { RootStackParamList } from "../../navigation/navigation";
import QuizChapter from "./QuizChapter";

type Nav = StackNavigationProp<RootStackParamList>;

const FilipinoQuizzes: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const goTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as never);
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
          locked: false,
          onPress: () => goTo("Quiz1"),
        },
        {
          title: "Numbers",
          icon: "numeric",
          color: "#22c55e",
          locked: false,
          onPress: () => goTo("Quiz2"),
        },
        {
          title: "Family",
          icon: "account-group",
          color: "#a855f7",
          locked: true,
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
          locked: true,
          onPress: () => goTo("Quiz4"),
        },
        {
          title: "Animals",
          icon: "paw",
          color: "#eab308",
          locked: true,
          onPress: () => goTo("Quiz5"),
        },
        {
          title: "Food & Drink",
          icon: "food",
          color: "#ef4444",
          locked: true,
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
          locked: true,
          onPress: () => goTo("Quiz8"),
        },
        {
          title: "Final Test",
          icon: "clipboard-check",
          color: "#22c55e",
          locked: true,
          onPress: () => goTo("Quiz9"),
        },
      ],
    },
  ];

  return (
    <AppLayout title="Quizzes">
      <ScrollView>
        {chapters.map((chapter) => (
          <QuizChapter key={chapter.number} chapter={chapter} />
        ))}
      </ScrollView>
    </AppLayout>
  );
};

export default FilipinoQuizzes;
