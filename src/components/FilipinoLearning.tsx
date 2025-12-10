import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/navigation";
import Sidebar from "../components/Sidebar/Sidebar";
import { Screen, AppCard } from "../theme/components";
import { useTheme } from "../theme/ThemeProvider";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import TopBar from "../components/Layout/TopBar";

type Nav = StackNavigationProp<RootStackParamList, "FilipinoLearning">;



const FilipinoLearning: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const params: any = route.params || {};
  const theme = useTheme();
console.log("PARAMS RECEIVED:", route.params);

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
      <Sidebar />

      <Screen>

        <TopBar
          title="Filipino Learning"
          animatedStartXP={params.animatedStartXP}
          animatedEndXP={params.animatedEndXP}
        />

        <ProfileHeader username="DJ" streak={3} />

        <Text
          style={[
            theme.typography.title,
            { textAlign: "center", marginBottom: theme.spacing.sm },
          ]}
        >
          Filipino Learning
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
          👋 Welcome! Ready to continue your Filipino learning journey?
        </Text>

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
