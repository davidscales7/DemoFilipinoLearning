import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/navigation";

// Sidebar
import Sidebar from "../components/Sidebar/Sidebar";

// THEME COMPONENTS
import { Screen, AppCard } from "../theme/components";
import { useTheme } from "../theme/ThemeProvider";

// PROFILE HEADER
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";

// ⭐ TOP BAR (XP RING)
import TopBar from "../components/Layout/TopBar";

type Nav = StackNavigationProp<RootStackParamList, "FilipinoLearning">;

const FilipinoLearning: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const theme = useTheme();

  // TEMP XP FOR TESTING — replace with real user XP later
  const userXP =600000;

  const menuItems = [
    {
      title: "Flashcards",
      image: require("../../assets/images/flashcards.jpg"),
      screen: "FilipinoFlashHome",
      color: theme.colors.primary,
    },
    {
      title: "Quizzes",
      image: require("../../assets/images/quizzes.jpg"),
      screen: "FilipinoQuizzes",
      color: theme.colors.accent,
    },
    {
      title: "Lessons",
      image: require("../../assets/images/lessons.jpg"),
      screen: "FilipinoLessons",
      color: theme.colors.secondary,
    },
    {
      title: "Accolades",
      image: require("../../assets/images/accolades.jpg"),
      screen: "FilipinoAccolades",
      color: theme.colors.success,
    },
  ];

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <Screen>

        {/* ⭐ TOP BAR WITH XP RING */}
        <TopBar title="Filipino Learning" xp={userXP} />

        {/* ⭐ PROFILE HEADER */}
        <ProfileHeader username="DJ" streak={3} />

        {/* TITLE */}
        <Text
          style={[
            theme.typography.title,
            { textAlign: "center", marginBottom: theme.spacing.sm },
          ]}
        >
          Filipino Learning
        </Text>

        {/* INTRO SECTION */}
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
          👋 Welcome! Ready to continue your Filipino learning journey?
          {"\n"}Choose an activity below to begin exploring new words,
          improve your skills, and track your progress.
        </Text>

        {/* GRID OF CARDS */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: theme.spacing.md,
          }}
        >
          {menuItems.map((item, index) => (
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
                  {item.title}
                </Text>

                <Image
                  source={item.image}
                  style={{
                    width: 60,
                    height: 60,
                    alignSelf: "center",
                    resizeMode: "contain",
                    marginTop: theme.spacing.sm,
                  }}
                />
              </AppCard>
            </TouchableOpacity>
          ))}
        </View>

      </Screen>
    </View>
  );
};

export default FilipinoLearning;
