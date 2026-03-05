import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

import AppLayout from "../components/Layout/AppLayout";
import { useTheme } from "../theme/ThemeProvider";
import { RootStackParamList } from "../navigation/navigation";
import { useDemoStore } from "../store/useDemoStore";
import { useProgressStore } from "../store/useProgressStore";
import { AppCard } from "../theme/components";
import ProgressRing from "../components/XP/ProgressRing";
import { useAccoladeStore } from "../store/useAccoladeStore";

type Nav = StackNavigationProp<RootStackParamList, "FilipinoLearning">;
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type MenuItem = {
  title: string;
  icon: IconName;
  color: string;
  screen: string;
  completed: number;
  total: number;
};

/* ── RESPONSIVE HELPERS ── */
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IS_SMALL = SCREEN_WIDTH < 400;
const IS_MEDIUM = SCREEN_WIDTH >= 400 && SCREEN_WIDTH < 700;

const getCardWidth = () => {
  if (IS_SMALL) return "100%";   // 1 column on phones
  if (IS_MEDIUM) return "47%";   // 2 columns on normal phones
  return "45%";                  // 2 columns on tablets/desktop
};

const CARD_MIN_HEIGHT = IS_SMALL ? 160 : 200;

const cardPressableBaseStyle = {
  alignItems: "center" as const,
  gap: IS_SMALL ? 6 : 10,
  paddingVertical: IS_SMALL ? 14 : 18,
  paddingHorizontal: IS_SMALL ? 10 : 12,
};

const FilipinoLearning: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const params: any = route.params || {};
  const theme = useTheme();

  const demoUnlocked = useDemoStore((s) => s.isUnlocked);
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const completedQuizzes = useProgressStore((s) => s.completedQuizzes);
  const completedFlashcards = useProgressStore((s) => s.completedFlashcards);
  const unlockedAccolades = useAccoladeStore((s) => s.unlocked);

  const menuItems: MenuItem[] = [
    {
      title: "Lessons",
      icon: "book-open-page-variant",
      color: theme.colors.secondary,
      screen: "FilipinoLessons",
      completed: completedLessons.length,
      total: 10,
    },
    {
      title: "Quizzes",
      icon: "help-circle",
      color: theme.colors.accent,
      screen: "FilipinoQuizzes",
      completed: completedQuizzes.length,
      total: 8,
    },
    {
      title: "Flashcards",
      icon: "cards",
      color: "#ff6f61",
      screen: "FilipinoFlashHome",
      completed: completedFlashcards.length,
      total: 11,
    },
    {
      title: "Accolades",
      icon: "trophy",
      color: theme.colors.success,
      screen: "FilipinoAccolades",
      completed: unlockedAccolades.length,
      total: 31,
    },
  ];

  return (
    <AppLayout
      title="Learn Filipino"
      animatedStartXP={params.animatedStartXP}
      animatedEndXP={params.animatedEndXP}
      showXPBadge={true}
    >
  

      {/* ── DASHBOARD GRID ── */}
      <View style={styles.grid}>
        {menuItems.map((item) => {
          const locked = !demoUnlocked && item.title !== "Lessons";
          const progressPercent = (item.completed / item.total) * 100;

          return (
            <View
              key={item.title}
              style={{ width: getCardWidth(), minHeight: CARD_MIN_HEIGHT }}
            >
              <AppCard color={item.color}>
                {locked && (
                  <View style={styles.demoBadge}>
                    <Text style={styles.demoBadgeText}>🔒 Demo</Text>
                  </View>
                )}

                <Pressable
                  disabled={locked}
                  onPress={() => navigation.navigate(item.screen as any)}
                  style={({ pressed }) => [
                    cardPressableBaseStyle,
                    {
                      opacity: locked ? 0.45 : pressed ? 0.85 : 1,
                      transform: [{ scale: locked ? 1 : pressed ? 0.98 : 1 }],
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={IS_SMALL ? 30 : 38}
                    color={item.color}
                  />

                  <Text
                    style={[
                      theme.typography.subtitle,
                      { textAlign: "center", fontSize: IS_SMALL ? 15 : undefined },
                    ]}
                  >
                    {item.title}
                  </Text>

                  {item.title === "Lessons" && !demoUnlocked && (
                    <Text style={{ fontSize: 12, color: item.color, fontWeight: "600" }}>
                      ⭐ Start here
                    </Text>
                  )}

                  {/* Progress bar */}
                  <View
                    style={[styles.progressTrack, { backgroundColor: theme.colors.border }]}
                  >
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: locked ? "0%" : (`${progressPercent}%` as any),
                          backgroundColor: item.color,
                          opacity: locked ? 0.3 : 1,
                        },
                      ]}
                    />
                  </View>

                  <Text style={{ fontSize: IS_SMALL ? 11 : 13, color: theme.colors.textSecondary, textAlign: "center" }}>
                    {locked
                      ? "Complete Lesson 1 to unlock"
                      : `${item.completed} / ${item.total} completed`}
                  </Text>

                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: IS_SMALL ? 12 : 13,
                      fontWeight: "600",
                      color: locked ? theme.colors.textSecondary : item.color,
                    }}
                  >
                    {locked ? "Locked" : "Continue →"}
                  </Text>
                </Pressable>
              </AppCard>
            </View>
          );
        })}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  hero: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: IS_SMALL ? 16 : 24,
    gap: 12,
  },
  heroSmall: {
    flexDirection: "column-reverse", // ring on top, text below
    alignItems: "center",
    justifyContent: "center",
  },
  heroText: {
    flex: 1,
  },
  heroTextCentered: {
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: IS_SMALL ? 12 : 16,
    paddingBottom: 60,
  },
  demoBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 1,
  },
  demoBadgeText: {
    color: "white",
    fontSize: 12,
  },
  progressTrack: {
    width: "100%",
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 6,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
});

export default FilipinoLearning;