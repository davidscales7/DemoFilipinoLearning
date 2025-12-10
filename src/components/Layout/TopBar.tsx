import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import ProgressRing from "../XP/ProgressRing";
import AnimatedXPBadge from "../XP/AnimatedXPBadge";

const TopBar = ({
  title,
  animatedStartXP = null,
  animatedEndXP = null,
}) => {
  const theme = useTheme();

  const shouldAnimate =
    typeof animatedStartXP === "number" &&
    typeof animatedEndXP === "number";
console.log("TopBar MOUNTED");

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
      <Text style={[theme.typography.title, { marginLeft: theme.spacing.md }]}>
        {title}
      </Text>

      <View style={{ marginRight: theme.spacing.md }}>
        {shouldAnimate ? (
          <AnimatedXPBadge
            startXP={animatedStartXP}
            endXP={animatedEndXP}
            size={70}
          />
        ) : (
          <ProgressRing size={70} />
        )}
      </View>
    </View>
  );
};

export default TopBar;
