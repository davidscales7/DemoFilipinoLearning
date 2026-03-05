import React, { useRef } from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

type Props = {
  icon: IconName;
  title: string;
  color: string;
  locked: boolean;
  completed?: boolean;
  onPress: () => void;
};

const LessonNode: React.FC<Props> = ({
  icon, title, color, locked, completed = false, onPress,
}) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const circleSize = isMobile ? 56 : 72;
  const iconSize = isMobile ? 22 : 28;
  const nodeWidth = isMobile ? 72 : 96;

  const scale = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    if (locked) return;
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.92, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start(() => onPress());
  };

  const bgColor = locked ? "#F3F4F6" : completed ? color : "#EEF2FF";
  const borderColor = locked ? "#E5E7EB" : completed ? color : color + "60";
  const iconColor = locked ? "#D1D5DB" : "#FFFFFF";

  return (
    <View style={[styles.nodeBox, { width: nodeWidth }]}>
      <Pressable onPress={animatePress} disabled={locked}>
        <Animated.View
          style={[
            styles.circle,
            {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: locked ? "#F3F4F6" : bgColor,
              borderColor,
              transform: [{ scale }],
              // Glow effect for unlocked nodes
              ...(Platform.OS === "web" && !locked
                ? { boxShadow: `0 4px 16px ${color}40` }
                : {}),
            },
            !locked && Platform.OS !== "web" && {
              shadowColor: color,
              shadowOpacity: completed ? 0.35 : 0.2,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            },
          ]}
        >
          {/* Completed gets a filled circle, unlocked gets icon on tinted bg */}
          {completed && !locked ? (
            <View style={[styles.completedInner, { backgroundColor: color }]}>
              <MaterialCommunityIcons name="check-bold" size={iconSize} color="#FFF" />
            </View>
          ) : locked ? (
            <MaterialCommunityIcons name="lock" size={iconSize - 2} color="#D1D5DB" />
          ) : (
            <View style={[styles.iconInner, { backgroundColor: color }]}>
              <MaterialCommunityIcons name={icon} size={iconSize} color="#FFF" />
            </View>
          )}
        </Animated.View>
      </Pressable>

      {/* Title */}
      <Text
        style={[
          styles.label,
          {
            color: locked ? "#9CA3AF" : colors.textPrimary,
            fontSize: isMobile ? 10 : 12,
          },
        ]}
        numberOfLines={2}
      >
        {title}
      </Text>

      {/* Status text */}
      {completed && !locked && (
        <View style={[styles.statusPill, { backgroundColor: color + "20" }]}>
          <Text style={[styles.statusText, { color }]}>Done</Text>
        </View>
      )}
      {locked && (
        <Text style={styles.lockedText}>Locked</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nodeBox: {
    alignItems: "center",
    gap: 6,
  },
  circle: {
    borderWidth: 2.5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  completedInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 14,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 9,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  lockedText: {
    fontSize: 9,
    color: "#D1D5DB",
    fontWeight: "600",
  },
});

export default LessonNode;