import React, { useRef, useEffect } from "react";
import { TouchableOpacity, View, Text, Animated } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/navigation";
import { useTheme } from "../../theme/ThemeProvider";

type Nav = StackNavigationProp<RootStackParamList>;

const SIZE = 70;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* ----------------------------------------------------
   🎨 1. LEVEL-BASED RING SKINS  
---------------------------------------------------- */
function getGradientForLevel(level: number) {
  if (level >= 30) return "goldGradient";     // Mastery
  if (level >= 20) return "purpleGradient";   // Advanced
  if (level >= 10) return "greenGradient";    // Intermediate
  return "blueGradient";                       // Beginner
}

const ProgressRing = ({ percent, level }) => {
  const navigation = useNavigation<Nav>();
  const { colors } = useTheme();

  /* ----------------------------------------------------
     ✨ 2. LEVEL-UP ANIMATION (Pulse on Level Change)
  ---------------------------------------------------- */
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [level]);

  const strokeDashoffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;

  const gradientId = getGradientForLevel(level);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("FilipinoAccolades")}
      style={{
        width: SIZE,
        height: SIZE,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Svg width={SIZE} height={SIZE}>
          <Defs>
            {/* Blue (Beginner) */}
            <LinearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#4A90E2" />
              <Stop offset="80%" stopColor="#A8D0F5" />
            </LinearGradient>

            {/* Green (Intermediate) */}
            <LinearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#27ae60" />
              <Stop offset="80%" stopColor="#7bed9f" />
            </LinearGradient>

            {/* Purple (Advanced) */}
            <LinearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#8e44ad" />
              <Stop offset="80%" stopColor="#d7bde2" />
            </LinearGradient>

            {/* Gold (Mastery) */}
            <LinearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#C7A008" />
              <Stop offset="50%" stopColor="#F5D76E" />
              <Stop offset="100%" stopColor="#FFF2C2" />
            </LinearGradient>

            {/* Grey background */}
            <LinearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#cccccc" />
              <Stop offset="100%" stopColor="#eeeeee" />
            </LinearGradient>
          </Defs>

          {/* Background Track */}
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="url(#trackGradient)"
            strokeWidth={STROKE}
            fill="none"
            opacity={0.4}
          />

          {/* XP Progress arc */}
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={`url(#${gradientId})`}
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            rotation="-90"
            origin={`${SIZE / 2}, ${SIZE / 2}`}
          />
        </Svg>

        {/* Level Text */}
        <Text
          style={{
            position: "absolute",
            fontSize: 16,
            fontWeight: "700",
            color: colors.textPrimary,
          }}
        >
          {level}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ProgressRing;
