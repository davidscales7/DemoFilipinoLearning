import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import ProgressRing from "./ProgressRing";

interface Props {
  startXP: number;   // BEFORE earning XP
  endXP: number;     // AFTER earning XP
  size?: number;
}

const AnimatedXPBadge: React.FC<Props> = ({ startXP, endXP, size = 70 }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedXP = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [startXP, endXP],
  });

  return (
    <View>
      <ProgressRing xpOverride={animatedXP} size={size} />
    </View>
  );
};

export default AnimatedXPBadge;
