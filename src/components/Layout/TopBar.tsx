import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import ProgressRing from "../XP/ProgressRing";
import AnimatedXPBadge from "../XP/AnimatedXPBadge";
import { useXPStore } from "../../store/useXPStore";

interface TopBarProps {
  title?: string;
  animatedStartXP?: number | null;
  animatedEndXP?: number | null;
  showXPBadge?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  title,
  animatedStartXP = null,
  animatedEndXP = null,
  showXPBadge = true,
}) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const xp = useXPStore((s) => s.xp);

  const shouldAnimate =
    typeof animatedStartXP === "number" && typeof animatedEndXP === "number";

  const eyebrowText = title === "Learn Filipino" ? "🇵🇭 Welcome" : "🇵🇭 Filipino";

  const bg = theme.colors.topbarBg ?? theme.colors.background;
  const accent = theme.colors.topbarAccent ?? theme.colors.primary;
  const titleColor = theme.colors.topbarTitle ?? theme.colors.textPrimary;
  const eyebrowColor = theme.colors.topbarEyebrow ?? theme.colors.textSecondary;
  const border = (theme.colors.topbarBorder ?? theme.colors.border) as any;
  const surface = (theme.colors.topbarSurface ?? theme.colors.card) as any;

  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: isMobile ? 10 : 14,
          paddingHorizontal: isMobile ? 14 : 20,
          backgroundColor: bg as any,
          borderBottomColor: border,
        },
      ]}
    >
      {!!title && (
        <View style={styles.titleBlock}>
          <View style={[styles.accentBar, { backgroundColor: accent as any }]} />

          <View style={{ flexShrink: 1 }}>
            <View
              style={[
                styles.eyebrowPill,
                { backgroundColor: theme.colors.pillBg as any },
              ]}
            >
              <Text style={[styles.eyebrow, { color: eyebrowColor as any }]}>
                {eyebrowText}
              </Text>
            </View>

            <Text
              style={[
                styles.title,
                { fontSize: isMobile ? 18 : 22, color: titleColor as any },
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        </View>
      )}

      {showXPBadge && (
        <View style={[styles.xpPill, { backgroundColor: surface, borderColor: border }]}>
          <Text style={[styles.xpLabel, { color: theme.colors.textSecondary as any }]}>
            Level
          </Text>

          {shouldAnimate ? (
            <AnimatedXPBadge
              startXP={animatedStartXP!}
              endXP={animatedEndXP!}
              size={isMobile ? 52 : 62}
            />
          ) : (
            <ProgressRing key={xp} xpOverride={xp} size={isMobile ? 52 : 62} />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,

    // subtle elevation (works on native + web)
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  titleBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  accentBar: {
    width: 5,
    height: 38,
    borderRadius: 999,
  },
  eyebrowPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 6,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    fontWeight: "900",
    letterSpacing: -0.3,
  },

  // ✅ makes XP feel “placed” rather than floating
  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 999,
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 6,
  },
  xpLabel: {
    fontSize: 12,
    fontWeight: "800",
  },
});

export default TopBar;