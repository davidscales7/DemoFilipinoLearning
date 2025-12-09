import React from "react";
import { ScrollView } from "react-native";
import LessonPath from "./LessonPath";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/navigation";

type Nav = StackNavigationProp<RootStackParamList>;

const FilipinoLessons = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<Nav>();

  const goTo = (screen) => navigation.navigate(screen as any);

  const lessons = [
    { title: "Greetings", icon: "hand-wave", color: "#4A90E2", locked: false, onPress: () => goTo("Lesson1") },
    { title: "Numbers", icon: "numeric", color: "#27ae60", locked: false, onPress: () => goTo("Lesson2") },
    { title: "Family", icon: "account-group", color: "#9b59b6", locked: true, onPress: () => goTo("Lesson3") },
    { title: "Colours", icon: "palette", color: "#e67e22", locked: true, onPress: () => goTo("Lesson4") },
    { title: "Animals", icon: "paw", color: "#f1c40f", locked: true, onPress: () => goTo("Lesson5") },
    { title: "Food & Drink", icon: "food", color: "#d35400", locked: true, onPress: () => goTo("Lesson6") },
    { title: "Clothes", icon: "tshirt-crew", color: "#2980b9", locked: true, onPress: () => goTo("Lesson7") },
    { title: "Hobbies", icon: "gamepad-variant", color: "#8e44ad", locked: true, onPress: () => goTo("Lesson8") },
    { title: "Sentence Structure", icon: "format-text", color: "#16a085", locked: true, onPress: () => goTo("Lesson9") },
    { title: "Test Part 1", icon: "clipboard-check", color: "#2ecc71", locked: true, onPress: () => goTo("Lesson10") },
  ];

  return (
    <ScrollView>
      <LessonPath lessons={lessons} />
    </ScrollView>
  );
};

export default FilipinoLessons;
