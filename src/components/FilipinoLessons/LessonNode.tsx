import React from "react";
import { Pressable, View, Text, StyleSheet, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

const LessonNode = ({ icon, title, color, locked, onPress }) => {
  const { colors, typography } = useTheme();
  const scale = new Animated.Value(1);

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (!locked) onPress();
    });
  };

  return (
    <View style={{ alignItems: "center" }}>
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

      <Text style={[typography.body, { marginTop: 8 }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default LessonNode;
