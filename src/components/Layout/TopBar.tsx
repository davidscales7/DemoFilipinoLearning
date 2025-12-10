import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import ProgressRing from "../XP/ProgressRing";
import AnimatedXPBadge from "../XP/AnimatedXPBadge";
import { useXPStore } from "../../store/useXPStore";

const TopBar = ({
  title,
  animatedStartXP = null,
  animatedEndXP = null,
}) => {
  const theme = useTheme();





  // Current XP from store
  const xp = useXPStore((s) => s.xp);

  const shouldAnimate =
    typeof animatedStartXP === "number" &&
    typeof animatedEndXP === "number";

  console.log("TopBar RENDERED — xp:", xp);

 
React.useEffect(() => {
  console.log("TopBar mounted");
  return () => console.log("TopBar unmounted");
}, []);


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
          // ⭐ This guarantees the ring updates every time XP changes
          <ProgressRing xpOverride={xp} size={70} />
        )}
      </View>
    </View>
  );
};

export default TopBar;
