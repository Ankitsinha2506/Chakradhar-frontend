import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const OtpToast = ({ message, duration = 3000, onHide }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (message) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();

        setTimeout(onHide, 500); // Hide the toast after the animation
      }, duration);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [message, fadeAnim, duration, onHide]);

  return (
    <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default OtpToast;
