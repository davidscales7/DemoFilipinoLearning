import React, { useEffect, useRef, useState } from "react";
import { View, Animated } from "react-native";
import ProgressRing from "./ProgressRing";

interface Props {
  startXP: number;  // XP before gaining
  endXP: number;    // XP after gaining
  size?: number;
}

const AnimatedXPBadge: React.FC<Props> = ({ startXP, endXP, size = 70 }) => {
  const anim = useRef(new Animated.Value(0)).current;
  const [displayXP, setDisplayXP] = useState(startXP);

  useEffect(() => {
    anim.setValue(0);

    const id = anim.addListener(({ value }) => {
      const xp = startXP + (endXP - startXP) * value;
      setDisplayXP(Math.round(xp));
    });

    Animated.timing(anim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,  // required for SVG animation
    }).start(() => anim.removeListener(id));

  }, [startXP, endXP]);

  // Debug log to confirm animation is moving
  console.log("Animated XP:", displayXP);

  return (
    <View>
      <ProgressRing xpOverride={displayXP} size={size} />
    </View>
  );
};

export default AnimatedXPBadge;
