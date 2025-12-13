import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/navigation";

import AppLayout from "../components/Layout/AppLayout";
import { AppCard } from "../theme/components";
import { useTheme } from "../theme/ThemeProvider";

type Nav = StackNavigationProp<RootStackParamList, "FilipinoFlashHome">;

const FilipinoFlashHome: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const theme = useTheme();

  const params = (route.params as RootStackParamList["FilipinoFlashHome"]) ?? undefined;
const flashcardTopics = [
  { title: "Greetings", icon: "👋", count: 0, screen: "FilipinoGreetings", color: theme.colors.primary },
  { title: "Numbers (Basic)", icon: "🔢", count: 0, screen: "FilipinoFlashNumbersBasic", color: theme.colors.secondary },

  { title: "Animals", icon: "🐶", count: 0, screen: "FilipinoAnimals", color: theme.colors.accent },
  { title: "Body Parts", icon: "🧍", count: 0, screen: "FilipinoBodyparts", color: theme.colors.primary },

  { title: "Colours", icon: "🎨", count: 0, screen: "FilipinoColours", color: theme.colors.secondary },
  { title: "Weather", icon: "☀️", count: 0, screen: "FilipinoWeather", color: theme.colors.accent },

  { title: "Food & Drink", icon: "🍲", count: 0, screen: "FilipinoFoodAndDrink", color: theme.colors.primary },
  { title: "House Items", icon: "🏠", count: 0, screen: "FilipinoHouseItems", color: theme.colors.secondary },

  { title: "Transport", icon: "🚗", count: 0, screen: "FilipinoTransports", color: theme.colors.accent },
  { title: "Sports", icon: "⚽", count: 0, screen: "FilipinoSports", color: theme.colors.primary },

  { title: "Family", icon: "👨‍👩‍👧‍👦", count: 0, screen: "FilipinoFamily", color: theme.colors.secondary },
  { title: "General Topics", icon: "📚", count: 0, screen: "FilipinoGeneralTopics", color: theme.colors.accent },

  { title: "Daily Lesson", icon: "📅", count: 0, screen: "FilipinoDailyLesson", color: theme.colors.primary },
  { title: "New Topic", icon: "✨", count: 0, screen: "FilipinoNewTopic", color: theme.colors.secondary },
];

  return (
    <AppLayout
      title="Flashcards"
      animatedStartXP={params?.animatedStartXP}
      animatedEndXP={params?.animatedEndXP}
    >
      <Text style={[theme.typography.body, { textAlign: "center", marginBottom: theme.spacing.xl, color: theme.colors.textSecondary }]}>
        Choose a flashcard deck to start practicing vocabulary!
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: theme.spacing.md }}>
        {flashcardTopics.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate(item.screen as any)}
            style={{ width: "45%" }}
          >
            <AppCard color={item.color}>
              <Text style={[theme.typography.subtitle, { textAlign: "center", marginBottom: theme.spacing.sm }]}>
                {item.icon} {item.title}
              </Text>
              <Text style={{ textAlign: "center", marginTop: theme.spacing.xs, color: theme.colors.textSecondary }}>
                {item.count} cards
              </Text>
            </AppCard>
          </Pressable>
        ))}
      </View>
    </AppLayout>
  );
};

export default FilipinoFlashHome;
