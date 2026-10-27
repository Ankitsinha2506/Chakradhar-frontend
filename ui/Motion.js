import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Platform, Pressable } from 'react-native';

export function Reveal({ children, style }) {
  const value = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    let active = true;
    let animation;
    AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (!active || reduced) return;
      value.setValue(0);
      animation = Animated.timing(value, { toValue: 1, duration: 450, useNativeDriver: Platform.OS !== 'web' });
      animation.start();
    });
    return () => { active = false; animation?.stop(); };
  }, [value]);
  return <Animated.View style={[style, { opacity: value, transform: [{ translateY: value.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] }]}>{children}</Animated.View>;
}
export function InteractiveCard({ children, style, ...props }) {
  const [hovered, setHovered] = useState(false);
  return <Pressable {...props} accessibilityRole="button" onHoverIn={() => setHovered(true)} onHoverOut={() => setHovered(false)} style={({ pressed }) => [style, { opacity: pressed ? 0.85 : 1, transform: [{ translateY: hovered ? -3 : 0 }] }]}>{children}</Pressable>;
}
