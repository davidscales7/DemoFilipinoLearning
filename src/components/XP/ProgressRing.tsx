import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/navigation";

import { useTheme } from "../../theme/ThemeProvider";
import { useXPStore } from "../../store/useXPStore";
import { getProgressPercent } from "../../utils/levelSystem";

type Nav = StackNavigationProp<RootStackParamList>;

interface Props {
  xpOverride?: number; // animated XP input
  size?: number;
}

const ProgressRing: React.FC<Props> = ({ xpOverride, size = 70 }) => {
  const navigation = useNavigation<Nav>();
  const { colors } = useTheme();

  // Zustand values
  const xp = useXPStore((s) => s.xp);
  const ready = useXPStore((s) => s.hasHydrated);

  // ⭐ Fix for React Native Web hydration timing:
  // Ensures the SVG renders AFTER hydration + layout
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  // Prevent empty/incorrect ring before XP data + hydration are ready
  if (!ready || !mounted) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#d0d7e0", // placeholder ring
        }}
      />
    );
  }

  // Choose animated XP or store XP
  const activeXP = typeof xpOverride === "number" ? xpOverride : xp;

  // Debug
  console.log("ProgressRing activeXP:", activeXP);

  // Ring geometry
  const STROKE = size * 0.15;
  const RADIUS = (size - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const { percent, level } = getProgressPercent(activeXP);

  const strokeDashoffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;

  // Debug the math
  console.log("Level:", level, "Percent:", percent, "XP:", activeXP);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("FilipinoAccolades")}
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
      activeOpacity={0.7}
    >
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="cleanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#1E80FF" />
            <Stop offset="100%" stopColor="#4AA8FF" />
          </LinearGradient>
        </Defs>

        {/* Base circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          stroke="#A7C7ED"
          strokeWidth={STROKE}
          opacity={0.35}
          fill="none"
        />

        {/* Progress circle */}
        <Circle
          key={percent} // ⭐ Forces remount so SVG updates correctly
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          stroke="url(#cleanGradient)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Level text */}
      <Text
        style={{
          position: "absolute",
          fontSize: size * 0.28,
          fontWeight: "700",
          color: colors.textPrimary,
        }}
      >
        {level}
      </Text>
    </TouchableOpacity>
  );
};

export default ProgressRing;
