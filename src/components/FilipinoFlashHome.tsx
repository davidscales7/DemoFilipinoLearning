import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

import AppLayout from "../components/Layout/AppLayout";
import { useTheme } from "../theme/ThemeProvider";
import { RootStackParamList } from "../navigation/navigation";

type Nav = StackNavigationProp<RootStackParamList, "FilipinoFlashHome">;
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];
type FlashcardItem = {
  title: string;
  icon: IconName;
  screen: string;
  color: string;
};


const RED = "#ef4444";

/* -------------------- DATA -------------------- */

const coreVocabulary: FlashcardItem[] = [
  { title: "Greetings", icon: "hand-wave", screen: "FilipinoGreetings", color: "#3b82f6" }, // blue
  { title: "Numbers", icon: "numeric", screen: "FilipinoFlashNumbersBasic", color: "#22c55e" }, // green
  { title: "Family", icon: "account-group", screen: "FilipinoFamily", color: "#a855f7" }, // purple
  { title: "Body Parts", icon: "human", screen: "FilipinoBodyparts", color: "#ef4444" }, // red
  { title: "Colours", icon: "palette", screen: "FilipinoColours", color: "#f97316" }, // orange
];


const everydayTopics: FlashcardItem[] = [
  { title: "Food & Drink", icon: "food", screen: "FilipinoFoodAndDrink", color: "#f59e0b" }, // amber
  { title: "Transport", icon: "car", screen: "FilipinoTransports", color: "#0ea5e9" }, // sky
  { title: "Weather", icon: "weather-sunny", screen: "FilipinoWeather", color: "#eab308" }, // yellow
  { title: "Sports", icon: "soccer", screen: "FilipinoSports", color: "#10b981" }, // emerald
  { title: "House Items", icon: "home-outline", screen: "FilipinoHouseItems", color: "#6366f1" }, // indigo
];



const extras: FlashcardItem[] = [
  { title: "General", icon: "book-outline", screen: "FilipinoGeneralTopics", color: "#64748b" }, // slate
];

/* -------------------- COMPONENTS -------------------- */

const FlashcardTrack = ({
  title,
  items,
}: {
  title: string;
  items: FlashcardItem[];
}) => {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.trackBlock}>
      <Text style={styles.trackTitle}>{title}</Text>

      <View style={styles.trackRow}>
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate(item.screen as any)}
            style={styles.nodeWrap}
          >
       <View
  style={[
    styles.node,
    {
      borderColor: item.color,
      backgroundColor: `${item.color}15`,
    },
  ]}
>
  <MaterialCommunityIcons
    name={item.icon}
    size={28}
    color={item.color}
  />
</View>


            <Text style={styles.nodeLabel}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

/* -------------------- SCREEN -------------------- */

const FilipinoFlashHome: React.FC = () => {
  const theme = useTheme();

  return (
    <AppLayout title="Flashcards">
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
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
          Drill vocabulary with focused flashcard tracks.
        </Text>

        <FlashcardTrack title="Core Vocabulary" items={coreVocabulary} />
        <FlashcardTrack title="Everyday Topics" items={everydayTopics} />
        <FlashcardTrack title="Extras" items={extras} />
      </ScrollView>
    </AppLayout>
  );
};

export default FilipinoFlashHome;

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  trackBlock: {
    marginBottom: 48,
    alignItems: "center",
  },

  trackTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
  },

  trackRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    flexWrap: "wrap",
  },

  nodeWrap: {
    alignItems: "center",
    width: 110,
  },

  node: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: RED,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

    nodeLabel: {
    marginTop: 8,
    fontSize: 13,
    textAlign: "center",
  },
});
