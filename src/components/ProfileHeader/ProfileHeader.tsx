import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import CircularProgress from "react-native-circular-progress-indicator";

const ProfileHeader = ({ username = "DJ", streak = 3, progress = 65 }) => {
  const theme = useTheme();

  const hours = new Date().getHours();
  let greeting =
    hours < 12 ? "Good morning" : hours < 18 ? "Good afternoon" : "Good evening";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
        <Text style={styles.avatar}>👤</Text>

        <View>
          <Text style={[theme.typography.subtitle, { marginBottom: 4 }]}>
            {greeting}, {username}! 👋
          </Text>

          <Text
            style={[
              theme.typography.body,
              { color: theme.colors.textSecondary },
            ]}
          >
            🔥 {streak}-day streak   •   ⭐ Beginner
          </Text>
        </View>
      </View>

      {/* PROGRESSION RING */}
      <CircularProgress
        value={progress}
        radius={35}
        activeStrokeWidth={8}
        inActiveStrokeWidth={8}
        activeStrokeColor={theme.colors.primary}
        inActiveStrokeColor="#dfe4ea"
        progressValueColor={theme.colors.textPrimary}
        valueSuffix="%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 3,
    justifyContent: "space-between",
  },
  avatar: {
    fontSize: 46,
    marginRight: 16,
  },
});

export default ProfileHeader;
