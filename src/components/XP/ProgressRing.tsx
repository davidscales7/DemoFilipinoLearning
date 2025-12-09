// ProgressRing.tsx
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/navigation";
import { useTheme } from "../../theme/ThemeProvider";
import { useXP } from "../../context/XPContext";
import { getProgressPercent } from "../../utils/levelSystem";

type Nav = StackNavigationProp<RootStackParamList>;

interface Props {
  xpOverride?: number | any;   // Animated XP value OR static
  size?: number;               // Allows bigger rings on summary screen
}

const ProgressRing: React.FC<Props> = ({ xpOverride, size = 70 }) => {
  const navigation = useNavigation<Nav>();
  const { colors } = useTheme();
  const { xp } = useXP();

  /* ----------------------------------------
       SIZE-BASED DYNAMIC VALUES
  ----------------------------------------- */
  const STROKE = size * 0.15;               // Ring thickness scales with size
  const RADIUS = (size - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  /* ----------------------------------------
       DETERMINE ACTIVE XP SOURCE
  ----------------------------------------- */
const activeXP = typeof xpOverride === "number" ? xpOverride : xpOverride ?? xp;


  const { percent, level } = getProgressPercent(Number(activeXP));

  const strokeDashoffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("FilipinoAccolades")}
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
      activeOpacity={0.8}
    >
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="cleanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#1E80FF" />
            <Stop offset="100%" stopColor="#4AA8FF" />
          </LinearGradient>
        </Defs>

        {/* Track background */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          stroke="#A7C7ED"
          strokeWidth={STROKE}
          fill="none"
          opacity={0.35}
        />

        {/* Progress foreground */}
        <Circle
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

      {/* Level number inside ring */}
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
