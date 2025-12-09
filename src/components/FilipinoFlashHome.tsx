import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/navigation";

import Sidebar from "../components/Sidebar/Sidebar";
import { Screen, AppCard } from "../theme/components";
import { useTheme } from "../theme/ThemeProvider";

type Nav = StackNavigationProp<RootStackParamList, "FilipinoFlashHome">;

const FilipinoFlashHome: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const theme = useTheme();

  // Flashcard categories
  const flashcardTopics = [
    {
      title: "Numbers (Basic)",
      icon: "🔢",
      count: 20,
      screen: "FilipinoFlashNumbersBasic",
      color: theme.colors.primary,
    },
    {
      title: "Numbers (Intermediate)",
      icon: "🧮",
      count: 30,
      screen: "FilipinoNumbersIntermediate",
      color: theme.colors.secondary,
    },
    {
      title: "Numbers (Expert)",
      icon: "📘",
      count: 40,
      screen: "FilipinoNumbersExpert",
      color: theme.colors.accent,
    },
    // Add more categories here later…
  ];

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Sidebar />

      <Screen>
        <Text
          style={[
            theme.typography.title,
            { textAlign: "center", marginBottom: theme.spacing.md },
          ]}
        >
          Flashcards
        </Text>

        <Text
          style={[
            theme.typography.body,
            {
              textAlign: "center",
              marginBottom: theme.spacing.xl,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          Choose a flashcard deck to start practicing vocabulary!
        </Text>

        {/* FLASHCARD CATEGORY GRID */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: theme.spacing.md,
          }}
        >
          {flashcardTopics.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.screen as any)}
              style={{ width: "45%" }}
            >
              <AppCard color={item.color}>
                <Text
                  style={[
                    theme.typography.subtitle,
                    { textAlign: "center", marginBottom: theme.spacing.sm },
                  ]}
                >
                  {item.icon} {item.title}
                </Text>

                <Text
                  style={{
                    textAlign: "center",
                    marginTop: theme.spacing.xs,
                    color: theme.colors.textSecondary,
                  }}
                >
                  {item.count} cards
                </Text>
              </AppCard>
            </TouchableOpacity>
          ))}
        </View>
      </Screen>
    </View>
  );
};

export default FilipinoFlashHome;
