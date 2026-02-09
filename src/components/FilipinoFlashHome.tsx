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
import { useProgressStore } from "../store/useProgressStore";

/* -------------------- TYPES -------------------- */

type Nav = StackNavigationProp<RootStackParamList, "FilipinoFlashHome">;
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type FlashcardItem = {
  title: string;
  icon: IconName;
  screen: string;
  color: string;
  requiredLesson?: number;
};

/* -------------------- DATA -------------------- */

const coreVocabulary: FlashcardItem[] = [
  {
    title: "Greetings",
    icon: "hand-wave",
    screen: "Filipinocard1",
    color: "#3b82f6",
    requiredLesson: 1,
  },
  {
    title: "Numbers",
    icon: "numeric",
    screen: "Filipinocard2",
    color: "#22c55e",
    requiredLesson: 2,
  },
  {
    title: "Family",
    icon: "account-group",
    screen: "Filipinocard3",
    color: "#a855f7",
    requiredLesson: 3,
  },
  {
    title: "Body Parts",
    icon: "human",
    screen: "Filipinocard4",
    color: "#ef4444",
    requiredLesson: 3,
  },
  {
    title: "Colours",
    icon: "palette",
    screen: "Filipinocard5",
    color: "#f97316",
    requiredLesson: 4,
  },
];

const everydayTopics: FlashcardItem[] = [
  {
    title: "Food & Drink",
    icon: "food",
    screen: "Filipinocard6",
    color: "#f59e0b",
    requiredLesson: 6,
  },
  {
    title: "Transport",
    icon: "car",
    screen: "Filipinocard7",
    color: "#0ea5e9",
    requiredLesson: 6,
  },
  {
    title: "Weather",
    icon: "weather-sunny",
    screen: "Filipinocard8",
    color: "#eab308",
    requiredLesson: 6,
  },
  {
    title: "Sports",
    icon: "soccer",
    screen: "Filipinocard9",
    color: "#10b981",
    requiredLesson: 8,
  },
  {
    title: "House Items",
    icon: "home-outline",
    screen: "Filipinocard10",
    color: "#6366f1",
    requiredLesson: 7,
  },
];

const extras: FlashcardItem[] = [
  {
    title: "General",
    icon: "book-outline",
    screen: "Filipinocard11",
    color: "#64748b",
    requiredLesson: 5,
  },
];

/* -------------------- TRACK COMPONENT -------------------- */

const FlashcardTrack = ({
  title,
  items,
  demoUnlocked,
  completedLessons,
}: {
  title: string;
  items: FlashcardItem[];
  demoUnlocked: boolean;
  completedLessons: number[];
}) => {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.trackBlock}>
      <Text style={styles.trackTitle}>{title}</Text>

      <View style={styles.trackRow}>
        {items.map((item, index) => {
          const isUnlocked =
            demoUnlocked ||
            (item.requiredLesson
              ? completedLessons.includes(item.requiredLesson)
              : true);

          return (
            <Pressable
              key={index}
              disabled={!isUnlocked}
              onPress={() =>
                isUnlocked && navigation.navigate(item.screen as any)
              }
              style={({ pressed }) => [
                styles.nodeWrap,
                {
                  opacity: pressed && isUnlocked ? 0.7 : 1,
                },
              ]}
            >
              <View
                style={[
                  styles.node,
                  {
                    borderColor: isUnlocked ? item.color : "#d1d5db",
                    backgroundColor: isUnlocked
                      ? `${item.color}15`
                      : "#f3f4f6",
                    opacity: isUnlocked ? 1 : 0.5,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={!isUnlocked ? "lock" : item.icon}
                  size={28}
                  color={!isUnlocked ? "#9ca3af" : item.color}
                />
              </View>

              <Text
                style={[
                  styles.nodeLabel,
                  { color: isUnlocked ? "#000" : "#9ca3af" },
                ]}
              >
                {item.title}
              </Text>

              {!isUnlocked && (
                <Text style={styles.lockedText}>
                  Complete Lesson {item.requiredLesson || 1}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

/* -------------------- SCREEN -------------------- */

const FilipinoFlashHome: React.FC = () => {
  const theme = useTheme();
  const demoUnlocked = useDemoStore((s) => s.isUnlocked);
  const completedLessons = useProgressStore((s) => s.completedLessons);

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
            🔒 Complete lessons to unlock flashcards
          </Text>
        )}

        <FlashcardTrack
          title="Core Vocabulary"
          items={coreVocabulary}
          demoUnlocked={demoUnlocked}
          completedLessons={completedLessons}
        />

        <FlashcardTrack
          title="Everyday Topics"
          items={everydayTopics}
          demoUnlocked={demoUnlocked}
          completedLessons={completedLessons}
        />

        <FlashcardTrack
          title="Extras"
          items={extras}
          demoUnlocked={demoUnlocked}
          completedLessons={completedLessons}
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
    fontWeight: "500",
  },

  lockedText: {
    marginTop: 4,
    fontSize: 11,
    color: "#9ca3af",
    textAlign: "center",
  },
});