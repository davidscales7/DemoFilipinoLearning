import React, { useRef } from "react";
import { Pressable, View, Text, StyleSheet, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

/* ✅ Correct icon name type */
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
  icon,
  title,
  color,
  locked,
  completed = false,
  onPress,
}) => {
  const { colors, typography } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    if (locked) return;
    
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onPress();
    });
  };

  return (
    <View style={styles.nodeBox}>
      <Pressable onPress={animatePress} disabled={locked}>
        <Animated.View
          style={[
            styles.circle,
            {
              backgroundColor: locked ? "#f3f4f6" : color,
              borderColor: locked ? "#d1d5db" : color,
              transform: [{ scale }],
              opacity: locked ? 0.5 : 1,
            },
          ]}
        >
          {completed && !locked ? (
            <MaterialCommunityIcons
              name="check"
              size={32}
              color="#FFFFFF"
            />
          ) : (
            <MaterialCommunityIcons
              name={locked ? "lock" : icon}
              size={32}
              color={locked ? "#9ca3af" : "#FFFFFF"}
            />
          )}
        </Animated.View>
      </Pressable>

      <Text
        style={[
          typography.body,
          styles.label,
          { color: locked ? "#9ca3af" : colors.textPrimary },
        ]}
      >
        {title}
      </Text>

      {locked && (
        <Text style={styles.lockedText}>Complete previous lessons</Text>
      )}

      {completed && !locked && (
        <Text style={[styles.completedText, { color: color }]}>
          ✓ Completed
        </Text>
      )}
    </View>
  );
};

export default LessonNode;

/* ✅ Updated styles to match the unified design */
const styles = StyleSheet.create({
  nodeBox: {
    width: 160,
    alignItems: "center",
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  label: {
    marginTop: 10,
    textAlign: "center",
    width: "100%",
    fontWeight: "500",
  },
  lockedText: {
    marginTop: 4,
    fontSize: 11,
    color: "#9ca3af",
    textAlign: "center",
  },
  completedText: {
    marginTop: 4,
    fontSize: 11,
    textAlign: "center",
    fontWeight: "600",
  },
});