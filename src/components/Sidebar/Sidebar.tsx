import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useTheme } from "../../theme/ThemeProvider";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const menu: { label: string; icon: IconName; screen: string }[] = [
  { label: "Dashboard", icon: "view-dashboard",          screen: "FilipinoLearning"  },
  { label: "Lessons",   icon: "book-open-page-variant",  screen: "FilipinoLessons"   },
  { label: "Flashcards",icon: "cards",                   screen: "FilipinoFlashHome" },
  { label: "Quizzes",   icon: "help-circle",             screen: "FilipinoQuizzes"   },
  { label: "Accolades", icon: "trophy",                  screen: "FilipinoAccolades" },
];

/* ── DESKTOP SIDEBAR ── */
const DesktopSidebar = () => {
  const navigation = useNavigation();
  const theme = useTheme();

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

/* ── MOBILE BOTTOM TAB BAR ── */
export const MobileTabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  return (
    <View style={[styles.tabBar, { backgroundColor: theme.colors.sidebarBg }]}>
      {menu.map((item, index) => {
        const isActive = route.name === item.screen;
        const color = isActive ? "#fff" : "rgba(255,255,255,0.5)";

        return (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={() => navigation.navigate(item.screen as never)}
          >
            {isActive && <View style={styles.activeIndicator} />}
            <MaterialCommunityIcons name={item.icon} size={22} color={color} />
            <Text style={[styles.tabLabel, { color }]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

/* ── SMART SIDEBAR: picks correct version reactively ── */
const Sidebar = () => {
  const { width } = useWindowDimensions(); // ✅ reactive — works on web
  if (width < 768) return null;
  return <DesktopSidebar />;
};

export default Sidebar;

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
  tabBar: {
    flexDirection: "row",
    height: 64,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.15)",
    paddingBottom: Platform.OS === "ios" ? 12 : 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: "600",
    textAlign: "center",
  },
  activeIndicator: {
    position: "absolute",
    top: 0,
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#fff",
  },
});
