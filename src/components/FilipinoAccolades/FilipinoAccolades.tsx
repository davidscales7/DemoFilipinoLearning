import React, { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import AppLayout from "../../components/Layout/AppLayout";
import { AppCard } from "../../theme/components";
import { useTheme } from "../../theme/ThemeProvider";
import { useAccoladeStore } from "../../store/useAccoladeStore";
import { DEMO_ACCOLADES } from "../demo/DemoAccolades";

const FilipinoAccolades: React.FC = () => {
  const theme = useTheme();
  const unlocked = useAccoladeStore((s) => s.unlocked);

  /* ----------------------------------------
     GROUP ACCOLADES BY CATEGORY
  ---------------------------------------- */
  const sections = useMemo(() => {
    const lessonIds = Object.values(DEMO_ACCOLADES.LESSONS).map((a) => a.id) as string[];
    const quizIds = Object.values(DEMO_ACCOLADES.QUIZZES).map((a) => a.id) as string[];
    const flashcardIds = Object.values(DEMO_ACCOLADES.FLASHCARDS).map(
      (a) => a.id
    ) as string[];

    return [
      {
        title: "Lessons",
        icon: "📘",
        color: theme.colors.secondary,
        items: unlocked.filter((a) => lessonIds.includes(a.id as string)),
      },
      {
        title: "Quizzes",
        icon: "🧠",
        color: theme.colors.accent,
        items: unlocked.filter((a) => quizIds.includes(a.id as string)),
      },
      {
        title: "Flashcards",
        icon: "🃏",
        color: theme.colors.primary,
        items: unlocked.filter((a) => flashcardIds.includes(a.id as string)),
      },
    ];
  }, [unlocked, theme.colors]);

  return (
    <AppLayout title="Accolades">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: theme.spacing.xl,
        }}
      >
        <Text
          style={[
            theme.typography.body,
            {
              textAlign: "center",
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.lg,
            },
          ]}
        >
          Earn accolades by completing lessons, quizzes, and flashcards.
        </Text>

        <View style={{ gap: theme.spacing.lg }}>
          {sections.map((section) => (
            <View key={section.title} style={{ gap: theme.spacing.sm }}>
              <Text
                style={[
                  theme.typography.subtitle,
                  { marginLeft: theme.spacing.xs },
                ]}
              >
                {section.icon} {section.title}
              </Text>

              {section.items.length > 0 ? (
                section.items.map((acc) => (
                  <AppCard key={acc.id} color={section.color}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "700",
                        color: theme.colors.textLight ?? "#411a56",
                      }}
                    >
                      {acc.icon} {acc.title}
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 4,
                        fontSize: 13,
                        opacity: 0.85,
                        color: theme.colors.textLight ?? "#411a56",
                      }}
                    >
                      {acc.description}
                    </Text>
                  </AppCard>
                ))
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: theme.colors.textSecondary,
                  }}
                >
                  No {section.title.toLowerCase()} accolades yet.
                </Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default FilipinoAccolades;