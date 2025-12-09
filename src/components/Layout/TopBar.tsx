import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import ProgressRing from "../XP/ProgressRing";
import { useXP } from "../../context/XPContext";

const TopBar = ({ title }) => {
  const theme = useTheme();
  const { xp } = useXP(); // ← FIXED IMPORT

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: theme.spacing.md,
      }}
    >
      {/* Title */}
      <Text style={[theme.typography.title, { marginLeft: theme.spacing.md }]}>
        {title}
      </Text>

      {/* XP Ring */}
      <View style={{ marginRight: theme.spacing.md }}>
        <ProgressRing /> {/* ← NO PROPS */}
      </View>
    </View>
  );
};

export default TopBar;
