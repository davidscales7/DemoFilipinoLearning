import React, { useMemo } from "react";
import { Text, Pressable } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useTheme } from "../../theme/ThemeProvider";
import { useXPStore } from "../../store/useXPStore";
import { getProgressPercent } from "../../utils/levelSystem";
import { RootStackParamList } from "../../navigation/navigation";

type Nav = StackNavigationProp<RootStackParamList>;

type Props = {
  xpOverride?: number;
  size?: number;
};

const ProgressRing: React.FC<Props> = ({ xpOverride, size = 70 }) => {
  const navigation = useNavigation<Nav>();
  const { colors } = useTheme();

  const xp = useXPStore((s) => s.xp);
  const ready = useXPStore((s) => s.hasHydrated);

  if (!ready) return null;

  const activeXP = typeof xpOverride === "number" ? xpOverride : xp;

  // ✅ Unique gradient id (prevents RN-web id collisions on navigation)
  const gradientId = useMemo(
    () => `cleanGradient-${Math.random().toString(36).slice(2)}`,
    []
  );

  const STROKE = size * 0.15;
  const RADIUS = (size - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const { percent, level } = getProgressPercent(activeXP);

  // ✅ clamp + handle 0–1 or 0–100
  const pctRaw = typeof percent === "number" ? percent : 0;
  const pct = Math.max(0, Math.min(100, pctRaw <= 1 ? pctRaw * 100 : pctRaw));

  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * pct) / 100;

  return (
    <Pressable
      onPress={() => navigation.navigate("FilipinoLearning")}
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#1E80FF" />
            <Stop offset="100%" stopColor="#4AA8FF" />
          </LinearGradient>
        </Defs>

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          stroke="#A7C7ED"
          strokeWidth={STROKE}
          opacity={0.35}
          fill="none"
        />

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          stroke={`url(#${gradientId})`}
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

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
    </Pressable>
  );
};

export default ProgressRing;
