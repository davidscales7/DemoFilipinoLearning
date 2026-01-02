// screens/FilipinoLearning.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { RootStackParamList } from "../navigation/navigation";
import AppLayout from "../components/Layout/AppLayout";
import { AppCard } from "../theme/components";
import { useTheme } from "../theme/ThemeProvider";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import ProgressRing from "../components/XP/ProgressRing";

type Nav = StackNavigationProp<RootStackParamList, "FilipinoLearning">;

const FilipinoLearning: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const params: any = route.params || {};
  const theme = useTheme();

  const menuItems = [
    {
      title: "Flashcards",
      icon: "cards-outline",
      color: theme.colors.primary,
      screen: "FilipinoFlashHome",
    },
    {
      title: "Quizzes",
      icon: "help-circle-outline",
      color: theme.colors.accent,
      screen: "FilipinoQuizzes",
    },
    {
      title: "Lessons",
      icon: "blackboard",
      color: theme.colors.secondary,
      screen: "FilipinoLessons",
    },
    {
      title: "Accolades",
      icon: "trophy-award",
      color: theme.colors.success,
      screen: "FilipinoAccolades",
    },
  ];

  return (
    <AppLayout
      title="" // we’ll render our own big title below
      animatedStartXP={params.animatedStartXP}
      animatedEndXP={params.animatedEndXP}
      showXPBadge={false} // 👈 no ring in top bar
    >
      {/* Greeting bar */}
      <ProfileHeader username="DJ" streak={3} />

      {/* Hero row: title + subtitle + XP ring */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: theme.spacing.xl,
          gap: theme.spacing.lg,
        }}
      >
        <View style={{ maxWidth: 500 }}>
          <Text
            style={[
              theme.typography.title,
              { textAlign: "left", marginBottom: theme.spacing.xs },
            ]}
          >
            Filipino Learning
          </Text>
          <Text
            style={[
              theme.typography.body,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            👋 Welcome! Ready to continue your Filipino learning journey?
          </Text>
        </View>

        <ProgressRing size={88} />
      </View>

      {/* Main menu grid */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: theme.spacing.lg,
        }}
      >
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate(item.screen as any)}
            style={{ width: "45%", minWidth: 260 }}
          >
            <AppCard color={item.color}>
              <Text
                style={[
                  theme.typography.subtitle,
                  {
                    textAlign: "center",
                    marginBottom: theme.spacing.sm,
                  },
                ]}
              >
                {item.title}
              </Text>

              <MaterialCommunityIcons
                name={item.icon as any}
                size={40}
                color={theme.colors.textLight}
                style={{ alignSelf: "center", marginTop: theme.spacing.sm }}
              />
            </AppCard>
          </Pressable>
        ))}
      </View>
    </AppLayout>
  );
};

export default FilipinoLearning;
