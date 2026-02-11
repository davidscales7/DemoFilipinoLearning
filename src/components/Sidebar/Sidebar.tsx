import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useTheme } from "../../theme/ThemeProvider";

// Type for valid icon names
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const Sidebar = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const menu: { label: string; icon: IconName; screen: string }[] = [
    { label: "Dashboard", icon: "view-dashboard", screen: "FilipinoLearning" },
    { label: "Lessons", icon: "book-open-page-variant", screen: "FilipinoLessons" },
    { label: "Flashcards", icon: "cards", screen: "FilipinoFlashHome" },
    { label: "Quizzes", icon: "help-circle", screen: "FilipinoQuizzes" },
    { label: "Accolades", icon: "trophy", screen: "FilipinoAccolades" },
  ];

  return (
    <View style={[styles.sidebar, { backgroundColor: theme.colors.sidebarBg }]}>
      <Text style={[styles.logoText, { color: theme.colors.sidebarText }]}>
        Learn 🇵🇭
      </Text>

      <View style={styles.menuList}>
        {menu.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen as never)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={22}
              color={theme.colors.sidebarText}
              style={{ marginRight: 12 }}
            />

            <Text style={[styles.menuText, { color: theme.colors.sidebarText }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 30,
  },
  menuList: {
    flexDirection: "column",
    gap: 18,
    marginTop: 10, 
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
  },
 
});

export default Sidebar;
