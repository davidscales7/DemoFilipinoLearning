import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
} from "react-native-reanimated";
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
import { useXPStore } from "../store/useXPStore";
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
const IS_DESKTOP = SCREEN_WIDTH >= 700;

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

  const xp = useXPStore((s) => s.xp);
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
      hideTopBar
      hideSidebarXP
    >
      {/* ── DECORATIVE BLOBS (behind everything) ── */}
      <View pointerEvents="none" style={styles.blobLayer}>
        <View style={[styles.blob, styles.blobOne, { backgroundColor: theme.colors.secondary }]} />
        <View style={[styles.blob, styles.blobTwo, { backgroundColor: "#ff6f61" }]} />
        <View style={[styles.blob, styles.blobThree, { backgroundColor: theme.colors.accent }]} />
        <View style={[styles.blob, styles.blobFour, { backgroundColor: theme.colors.success }]} />
      </View>

      {/* ── HERO SECTION (animated: fades + slides down) ── */}
      <Animated.View
        entering={FadeInDown.duration(600).springify().damping(18)}
        style={[
          styles.heroSection,
          IS_SMALL && styles.heroSectionStacked,
        ]}
      >
        {/* LEFT: Text */}
        <View style={styles.heroTextContainer}>
          <Text style={[styles.heroTitle, { color: theme.colors.textPrimary }]}>
            Learn Filipino{"\n"}the easy way!
          </Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
            Bite-sized lessons, quizzes, and flashcards. Just five minutes a day to fluency.
          </Text>

          {/* Button + bare XP ring */}
          <View style={styles.heroActionsRow}>
            <Pressable
              onPress={() => navigation.navigate("FilipinoLessons" as any)}
              style={({ pressed }) => [
                styles.heroButton,
                {
                  backgroundColor: theme.colors.primary,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Text style={styles.heroButtonText}>Start Learning →</Text>
            </Pressable>

            {/* XP RING — beside the button */}
            <ProgressRing key={xp} xpOverride={xp} size={IS_SMALL ? 52 : 60} />
          </View>
        </View>

        {/* RIGHT: Image (fades in slightly later) */}
        <Animated.View
          entering={FadeIn.duration(800).delay(200)}
          style={styles.heroImageContainer}
        >
          <Image
            source={require("../../assets/images/GreetingImg.jpg")}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </Animated.View>
      </Animated.View>

      {/* ── DASHBOARD GRID (cards stagger in) ── */}
      <View style={styles.grid}>
        {menuItems.map((item, index) => {
          const locked = !demoUnlocked && item.title !== "Lessons";
          const progressPercent = (item.completed / item.total) * 100;

          return (
            <Animated.View
              key={item.title}
              entering={FadeInUp
                .duration(500)
                .delay(300 + index * 120) // stagger: each card 120ms after the last
                .springify()
                .damping(16)}
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
            </Animated.View>
          );
        })}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  /* ── BLOBS ── */
  blobLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  blob: {
    position: "absolute",
    borderRadius: 9999,
    opacity: 0.1,
  },
  blobOne: {
    width: 340,
    height: 340,
    top: -90,
    right: -70,
  },
  blobTwo: {
    width: 280,
    height: 280,
    top: 260,
    left: -120,
  },
  blobThree: {
    width: 320,
    height: 320,
    bottom: 140,
    right: -90,
  },
  blobFour: {
    width: 240,
    height: 240,
    bottom: -70,
    left: 60,
  },

  /* ── HERO ── */
  heroSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: IS_SMALL ? 24 : 36,
    gap: 24,
  },
  heroSectionStacked: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  heroTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: IS_SMALL ? 26 : 36,
    fontWeight: "900",
    marginBottom: 12,
    lineHeight: IS_SMALL ? 32 : 42,
  },
  heroSubtitle: {
    fontSize: IS_SMALL ? 14 : 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  heroActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  heroButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  heroButtonText: {
    color: "white",
    fontWeight: "800",
    fontSize: 15,
  },
  heroImageContainer: {
    flex: 1,
    width: IS_SMALL ? "100%" : undefined,
    height: IS_SMALL ? 140 : 200,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  /* ── GRID ── */
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