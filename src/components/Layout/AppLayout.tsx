import React from "react";
import { View, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { useRoute } from "@react-navigation/native";

import Sidebar, { MobileTabBar } from "../Sidebar/Sidebar";
import TopBar from "./TopBar";
import { useTheme } from "../../theme/ThemeProvider";

interface AppLayoutProps {
  title?: string;
  children: React.ReactNode;
  animatedStartXP?: number | null;
  animatedEndXP?: number | null;
  showXPBadge?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  children,
  animatedStartXP = null,
  animatedEndXP = null,
  showXPBadge = true,
}) => {
  const route = useRoute();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const theme = useTheme();

  return (
    <View style={styles.root}>
      {/* Desktop sidebar — returns null on mobile */}
      <Sidebar />

      <View style={styles.column}>

        {/* ✅ TopBar OUTSIDE scroll — stays pinned at top */}
        <TopBar
          key={route.name}
          title={title}
          animatedStartXP={animatedStartXP}
          animatedEndXP={animatedEndXP}
          showXPBadge={showXPBadge}
        />

        {/* ✅ Only the page content scrolls */}
        <ScrollView
          style={[styles.scroll, { backgroundColor: theme.colors.background }]}
          contentContainerStyle={[
            styles.scrollContent,
            isMobile && styles.scrollContentMobile,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>

        {/* ✅ Bottom tabs OUTSIDE scroll — pinned at bottom on mobile */}
        {isMobile && <MobileTabBar />}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
  },
  column: {
    flex: 1,
    flexDirection: "column",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
  },
  scrollContentMobile: {
    padding: 16,
    paddingBottom: 88, // clears the 64px tab bar + breathing room
  },
});

export default AppLayout;