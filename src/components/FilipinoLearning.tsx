import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

import { useDemoStore } from "../store/useDemoStore";
import { useProgressStore } from "../store/useProgressStore";
import { RootStackParamList } from "../navigation/navigation";
import AppLayout from "../components/Layout/AppLayout";
import { AppCard } from "../theme/components";
import { useTheme } from "../theme/ThemeProvider";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
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

const CARD_MIN_HEIGHT = 230;

/* ✅ Static base style (TS-safe) */
const cardPressableBaseStyle = {
  alignItems: "center" as const,
  gap: 10,
  paddingVertical: 18,
  paddingHorizontal: 12,
};

const FilipinoLearning: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const params: any = route.params || {};
  const theme = useTheme();

  /* ✅ REACTIVE demo state */
  const demoUnlocked = useDemoStore((s) => s.isUnlocked);
  
  /* ✅ REACTIVE progress state */
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const completedQuizzes = useProgressStore((s) => s.completedQuizzes);
  const completedFlashcards = useProgressStore((s) => s.completedFlashcards);
 // ❌ Remove this

// ✅ Add this - read from where accolades are ACTUALLY stored
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
      total: 31,},
  ];

  return (
    <AppLayout
      title=""
      animatedStartXP={params.animatedStartXP}
      animatedEndXP={params.animatedEndXP}
      showXPBadge={false}
    >

      {/* Hero */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: theme.spacing.lg,
          gap: theme.spacing.lg,
        }}
      >
        <View style={{ maxWidth: 500 }}>
          <Text
            style={[
              theme.typography.title,
              { marginBottom: theme.spacing.xs },
            ]}
          >
            Filipino Learning
          </Text>

          {!demoUnlocked && (
            <Text
              style={[
                theme.typography.body,
                { color: theme.colors.textSecondary },
              ]}
            >
              🔒 Demo Mode — complete Lesson 1 to unlock all features
            </Text>
          )}
        </View>

        <ProgressRing size={88} />
      </View>

      {/* Dashboard grid */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: theme.spacing.lg,
          paddingBottom: theme.spacing.xl,
        }}
      >
        {menuItems.map((item) => {
          const locked = !demoUnlocked && item.title !== "Lessons";
          const progressPercent =
            (item.completed / item.total) * 100;

          return (
            <View
              key={item.title}
              style={{
                width: "45%",
                minWidth: 260,
                minHeight: CARD_MIN_HEIGHT,
              }}
            >
              <AppCard color={item.color}>
                {/* 🔒 Demo badge */}
                {locked && (
                  <View
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      backgroundColor: "rgba(0,0,0,0.55)",
                      borderRadius: 999,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 12 }}>
                      🔒 Demo
                    </Text>
                  </View>
                )}

                <Pressable
                  disabled={locked}
                  onPress={() =>
                    navigation.navigate(item.screen as any)
                  }
                  style={({ pressed }) => [
                    cardPressableBaseStyle,
                    {
                      opacity: locked
                        ? 0.45
                        : pressed
                        ? 0.85
                        : 1,
                      transform: [
                        {
                          scale: locked
                            ? 1
                            : pressed
                            ? 0.98
                            : 1,
                        },
                      ],
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={38}
                    color={item.color}
                  />

                  <Text
                    style={[
                      theme.typography.subtitle,
                      { textAlign: "center" },
                    ]}
                  >
                    {item.title}
                  </Text>

                  {/* ⭐ Start here */}
                  {item.title === "Lessons" && !demoUnlocked && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: item.color,
                        fontWeight: "600",
                      }}
                    >
                      ⭐ Start here
                    </Text>
                  )}

                  {/* Progress bar */}
                  <View
                    style={{
                      width: "100%",
                      height: 8,
                      backgroundColor: theme.colors.border,
                      borderRadius: 999,
                      overflow: "hidden",
                      marginTop: 6,
                    }}
                  >
                    <View
                      style={{
                        width: locked
                          ? "0%"
                          : `${progressPercent}%`,
                        height: "100%",
                        backgroundColor: item.color,
                        opacity: locked ? 0.3 : 1,
                      }}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 13,
                      color: theme.colors.textSecondary,
                    }}
                  >
                    {locked
                      ? "Complete Lesson 1 to unlock"
                      : `${item.completed} / ${item.total} completed`}
                  </Text>

                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 13,
                      fontWeight: "600",
                      color: locked
                        ? theme.colors.textSecondary
                        : item.color,
                    }}
                  >
                    {locked ? "Locked" : "Continue"}
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

export default FilipinoLearning;