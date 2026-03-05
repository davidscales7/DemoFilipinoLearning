import React, { useMemo } from "react";
import { Text, Pressable } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "../../theme/ThemeProvider";
import { useXPStore } from "../../store/useXPStore";
import { RootStackParamList } from "../../navigation/navigation";

type Nav = StackNavigationProp<RootStackParamList>;

type Props = {
  xpOverride?: number;
  size?: number;
};

const XP_PER_LEVEL = 100;

const ProgressRing: React.FC<Props> = ({ xpOverride, size = 70 }) => {
  const navigation = useNavigation<Nav>();
  const { colors } = useTheme();
  const xp = useXPStore((s) => s.xp);
  const ready = useXPStore((s) => s.hasHydrated);

  const gradientId = useMemo(
    () => `xpGradient-${Math.random().toString(36).slice(2)}`,
    []
  );

  if (!ready) return null;

  const activeXP = typeof xpOverride === "number" ? xpOverride : xp;
  const level = Math.floor(activeXP / XP_PER_LEVEL) + 1;
  const xpIntoLevel = activeXP % XP_PER_LEVEL;
  const percent = (xpIntoLevel / XP_PER_LEVEL) * 100;
  const STROKE = size * 0.15;
  const RADIUS = (size - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;

  return (
    <Pressable
      onPress={() => navigation.navigate("FilipinoLearning")}
      style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}
    >
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#1E80FF" />
            <Stop offset="100%" stopColor="#4AA8FF" />
          </LinearGradient>
        </Defs>

        {/* Background ring - grey */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          stroke="#A7C7ED"
          strokeWidth={STROKE}
          opacity={0.35}
          fill="none"
        />

        {/* Progress ring - blue */}
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
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>

      <Text style={{ position: "absolute", fontSize: size * 0.28, fontWeight: "700", color: colors.textPrimary }}>
        {level}
      </Text>
    </Pressable>
  );
};

export default ProgressRing;