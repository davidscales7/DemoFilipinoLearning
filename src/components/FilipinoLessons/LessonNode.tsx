import React, { useRef } from "react";
import { Pressable, View, Text, StyleSheet, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";
import { Lesson } from "./types";

/* ✅ Correct icon name type */
type IconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

type Props = {
  icon: IconName;
  title: string;
  color: string;
  locked: boolean;
  onPress: () => void;
};

const LessonNode: React.FC<Props> = ({
  icon,
  title,
  color,
  locked,
  onPress,
}) => {
  const { colors, typography } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (!locked) onPress();
    });
  };

  return (
    <View style={styles.nodeBox}>
      <Pressable onPress={animatePress} disabled={locked}>
        <Animated.View
          style={[
            styles.circle,
            {
              borderColor: locked ? colors.border : color,
              transform: [{ scale }],
              opacity: locked ? 0.5 : 1,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={locked ? "lock" : icon}
            size={32}
            color={locked ? colors.border : color}
          />
        </Animated.View>
      </Pressable>

      <Text style={[typography.body, styles.label]}>
        {title}
      </Text>
    </View>
  );
};

export default LessonNode;

/* ✅ THIS FIXES THE `styles` ERROR */
const styles = StyleSheet.create({
  nodeBox: {
    width: 160,
    alignItems: "center",
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  label: {
    marginTop: 10,
    textAlign: "center",
    width: "100%",
  },
});
