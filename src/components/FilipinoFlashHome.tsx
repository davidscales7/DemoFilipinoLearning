import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

import AppLayout from "../components/Layout/AppLayout";
import { useTheme } from "../theme/ThemeProvider";
import { RootStackParamList } from "../navigation/navigation";
import { useDemoStore } from "../store/useDemoStore";

/* -------------------- TYPES -------------------- */

type Nav = StackNavigationProp<
  RootStackParamList,
  "FilipinoFlashHome"
>;

type IconName = ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

type FlashcardItem = {
  title: string;
  icon: IconName;
  screen: string;
  color: string;
};

/* -------------------- DATA -------------------- */

const coreVocabulary: FlashcardItem[] = [
  {
    title: "Greetings",
    icon: "hand-wave",
    screen: "FilipinoGreetings",
    color: "#3b82f6",
  },
  {
    title: "Numbers",
    icon: "numeric",
    screen: "FilipinoFlashNumbersBasic",
    color: "#22c55e",
  },
  {
    title: "Family",
    icon: "account-group",
    screen: "FilipinoFamily",
    color: "#a855f7",
  },
  {
    title: "Body Parts",
    icon: "human",
    screen: "FilipinoBodyparts",
    color: "#ef4444",
  },
  {
    title: "Colours",
    icon: "palette",
    screen: "FilipinoColours",
    color: "#f97316",
  },
];

const everydayTopics: FlashcardItem[] = [
  {
    title: "Food & Drink",
    icon: "food",
    screen: "FilipinoFoodAndDrink",
    color: "#f59e0b",
  },
  {
    title: "Transport",
    icon: "car",
    screen: "FilipinoTransports",
    color: "#0ea5e9",
  },
  {
    title: "Weather",
    icon: "weather-sunny",
    screen: "FilipinoWeather",
    color: "#eab308",
  },
  {
    title: "Sports",
    icon: "soccer",
    screen: "FilipinoSports",
    color: "#10b981",
  },
  {
    title: "House Items",
    icon: "home-outline",
    screen: "FilipinoHouseItems",
    color: "#6366f1",
  },
];

const extras: FlashcardItem[] = [
  {
    title: "General",
    icon: "book-outline",
    screen: "FilipinoGeneralTopics",
    color: "#64748b",
  },
];

/* -------------------- TRACK COMPONENT -------------------- */

const FlashcardTrack = ({
  title,
  items,
  locked,
}: {
  title: string;
  items: FlashcardItem[];
  locked: boolean;
}) => {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.trackBlock}>
      <Text style={styles.trackTitle}>{title}</Text>

      <View style={styles.trackRow}>
        {items.map((item, index) => (
          <Pressable
            key={index}
            disabled={locked}
            onPress={() =>
              !locked &&
              navigation.navigate(item.screen as any)
            }
            style={({ pressed }) => [
              styles.nodeWrap,
              {
                opacity: locked
                  ? 0.45
                  : pressed
                  ? 0.85
                  : 1,
              },
            ]}
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
                name={locked ? "lock" : item.icon}
                size={28}
                color={locked ? "#9ca3af" : item.color}
              />
            </View>

            <Text style={styles.nodeLabel}>
              {item.title}
            </Text>

            {locked && (
              <Text style={styles.lockedText}>
                Complete Lesson 1
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

/* -------------------- SCREEN -------------------- */

const FilipinoFlashHome: React.FC = () => {
  const theme = useTheme();

  // 🔓 demo unlock flag
  const demoUnlocked = useDemoStore((s) => s.isUnlocked);

  return (
    <AppLayout title="Flashcards">
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <Text
          style={[
            theme.typography.body,
            {
              textAlign: "center",
              marginBottom: theme.spacing.lg,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          Drill vocabulary with focused flashcard tracks.
        </Text>

        {!demoUnlocked && (
          <Text
            style={{
              textAlign: "center",
              marginBottom: 28,
              color: theme.colors.textSecondary,
            }}
          >
            🔒 Demo Mode — complete Lesson 1 to unlock
            flashcards
          </Text>
        )}

        <FlashcardTrack
          title="Core Vocabulary"
          items={coreVocabulary}
          locked={!demoUnlocked}
        />

        <FlashcardTrack
          title="Everyday Topics"
          items={everydayTopics}
          locked={!demoUnlocked}
        />

        <FlashcardTrack
          title="Extras"
          items={extras}
          locked={!demoUnlocked}
        />
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

  lockedText: {
    marginTop: 4,
    fontSize: 11,
    color: "#9ca3af",
    textAlign: "center",
  },
});
