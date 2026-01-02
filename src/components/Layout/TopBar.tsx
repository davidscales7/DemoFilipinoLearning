import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import ProgressRing from "../XP/ProgressRing";
import AnimatedXPBadge from "../XP/AnimatedXPBadge";
import { useXPStore } from "../../store/useXPStore";

interface TopBarProps {
  title?: string;
  animatedStartXP?: number | null;
  animatedEndXP?: number | null;
  showXPBadge?: boolean; // 🔒 opt-in
}

const TopBar: React.FC<TopBarProps> = ({
  title,
  animatedStartXP = null,
  animatedEndXP = null,
  showXPBadge = true, // ❗ default OFF
}) => {
  const theme = useTheme();
  const xp = useXPStore((s) => s.xp);

  const shouldAnimate =
    typeof animatedStartXP === "number" &&
    typeof animatedEndXP === "number";

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
      {!!title && (
        <Text
          style={[
            theme.typography.title,
            { marginLeft: theme.spacing.md },
          ]}
        >
          {title}
        </Text>
      )}

      {showXPBadge && (
        <View style={{ marginRight: theme.spacing.md }}>
          {shouldAnimate ? (
            <AnimatedXPBadge
              startXP={animatedStartXP!}
              endXP={animatedEndXP!}
              size={70}
            />
          ) : (
            <ProgressRing key={xp} xpOverride={xp} size={70} />
          )}
        </View>
      )}
    </View>
  );
};

export default TopBar;
