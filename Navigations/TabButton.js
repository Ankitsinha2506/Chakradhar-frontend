import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Animated, StyleSheet } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

const TabButton = ({ item, onPress, accessibilityState }) => {
  const focused = accessibilityState?.selected;

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1.25 : 1,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: focused ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  const iconColor = focused ? "#C55A11" : "#888888";
  const iconSize = focused ? 38 : 32;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.button}
    >
      {/* Golden Glow Effect */}
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: glowAnim,
            transform: [
              {
                scale: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1.5],
                }),
              },
            ],
          },
        ]}
      />

      {/* Icon with Scale Animation */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {item.route === "HomeScreen" && (
          <AntDesign name="home" size={iconSize} color={iconColor} />
        )}
        {item.route === "TempleList" && (
          <MaterialIcons name="temple-hindu" size={iconSize} color={iconColor} />
        )}
        {item.route === "SettingsScreen" && (
          <Feather name="settings" size={iconSize} color={iconColor} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 84,
    justifyContent: "center",
    alignItems: "center",
    // No negative margins or padding hacks needed!
  },

  glow: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 193, 7, 0.4)", // Gold glow
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 10,
  },
});