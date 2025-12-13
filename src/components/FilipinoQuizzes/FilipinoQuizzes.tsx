// components/Quizzes/FilipinoQuizzes.tsx

import React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import QuizPath from "./QuizPath";
import AppLayout from "../Layout/AppLayout";
import { useTheme } from "../../theme/ThemeProvider";
import { RootStackParamList } from "../../navigation/navigation";

type Nav = StackNavigationProp<RootStackParamList>;

type QuizRoute =
  | "FilipinoQuizGreetings"
  | "FilipinoQuizNumbers"
  | "FilipinoQuizFamily"
  | "FilipinoQuizColours"
  | "FilipinoQuizAnimals"
  | "FilipinoQuizFoodDrink"
  | "FilipinoQuizClothes"
  | "FilipinoQuizHobbies"
  | "FilipinoQuizSentences"
  | "FilipinoQuizFinal1";

const FilipinoQuizzes: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<Nav>();

  const goTo = (screen: QuizRoute) => {
    console.log("Navigating to:", screen);
    navigation.navigate(screen as never);
  };

  const quizzes = [
    {
      title: "Greetings Quiz",
      icon: "comment-question-outline",
      color: "#4A90E2",
      locked: false,
      onPress: () => goTo("FilipinoQuizGreetings"),
    },
    {
      title: "Numbers Quiz",
      icon: "numeric",
      color: "#27ae60",
      locked: false,
      onPress: () => goTo("FilipinoQuizNumbers"),
    },
    {
      title: "Family Quiz",
      icon: "account-group",
      color: "#9b59b6",
      locked: true,
      onPress: () => goTo("FilipinoQuizFamily"),
    },
    {
      title: "Colours Quiz",
      icon: "palette",
      color: "#e67e22",
      locked: true,
      onPress: () => goTo("FilipinoQuizColours"),
    },
    {
      title: "Animals Quiz",
      icon: "paw",
      color: "#f1c40f",
      locked: true,
      onPress: () => goTo("FilipinoQuizAnimals"),
    },
    {
      title: "Food & Drink Quiz",
      icon: "food",
      color: "#d35400",
      locked: true,
      onPress: () => goTo("FilipinoQuizFoodDrink"),
    },
    {
      title: "Clothes Quiz",
      icon: "tshirt-crew",
      color: "#2980b9",
      locked: true,
      onPress: () => goTo("FilipinoQuizClothes"),
    },
    {
      title: "Hobbies Quiz",
      icon: "gamepad-variant",
      color: "#8e44ad",
      locked: true,
      onPress: () => goTo("FilipinoQuizHobbies"),
    },
    {
      title: "Sentence Structure Quiz",
      icon: "format-text",
      color: "#16a085",
      locked: true,
      onPress: () => goTo("FilipinoQuizSentences"),
    },
    {
      title: "Final Test — Part 1",
      icon: "clipboard-check",
      color: "#2ecc71",
      locked: true,
      onPress: () => goTo("FilipinoQuizFinal1"),
    },
  ];

  console.log("QUIZZES COUNT:", quizzes.length); // 👈 should now log 10

  return (
    <AppLayout title="Quizzes">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 32,
          alignItems: "center",
        }}
      >
        <QuizPath quizzes={quizzes} />
      </ScrollView>
    </AppLayout>
  );
};

export default FilipinoQuizzes;
