import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import ProgressRing from "../XP/ProgressRing";
import { getProgressPercent } from "../../utils/levelSystem";

const TopBar = ({ title, xp }) => {
  const theme = useTheme();

  const { percent, level } = getProgressPercent(xp);

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

      {/* XP Ring (top-right) */}
      <View style={{ marginRight: theme.spacing.md }}>
        <ProgressRing percent={percent} level={level} />
      </View>
    </View>
  );
};

export default TopBar;
