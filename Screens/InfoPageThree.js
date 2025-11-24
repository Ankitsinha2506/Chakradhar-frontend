import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  Easing,
  withTiming,
  useAnimatedStyle,
  withDelay,
  useSharedValue,
} from "react-native-reanimated";

const InfoPageThree = () => {
  const nav = useNavigation();

  // Shared values for animations
  const imageOpacity = useSharedValue(0);
  const imageScale = useSharedValue(1.2); // Initial scaling of the image for zoom effect
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(50); // Start from below
  const descriptionOpacity = useSharedValue(0);
  const descriptionTranslateY = useSharedValue(20); // Slightly below the final position
  const iconScale = useSharedValue(1);

  useEffect(() => {
    // Animating the image with a zoom-in effect and fade-in
    imageOpacity.value = withTiming(1, { duration: 1500, easing: Easing.ease });
    imageScale.value = withTiming(1, { duration: 1500, easing: Easing.ease });

    // Animating the title and description to slide up from below and fade in
    titleOpacity.value = withDelay(300, withTiming(1, { duration: 1000 }));
    titleTranslateY.value = withDelay(300, withTiming(0, { duration: 1000 }));

    descriptionOpacity.value = withDelay(
      600,
      withTiming(1, { duration: 1000 })
    );
    descriptionTranslateY.value = withDelay(
      600,
      withTiming(0, { duration: 1000 })
    );

    // Animating the arrow icon with a pulsing effect
    iconScale.value = withDelay(
      1200,
      withTiming(1.2, { duration: 500, easing: Easing.ease, loop: true })
    );
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
    transform: [{ scale: imageScale.value }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: descriptionOpacity.value,
    transform: [{ translateY: descriptionTranslateY.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  return (
    <LinearGradient colors={["#EFA423", "#F04333"]} style={styles.background}>
      <Animated.Image
        source={require("../assets/chakra4.jpg")}
        style={[styles.image, imageAnimatedStyle]}
      />
      <View style={styles.overlay}>
        <Animated.Text style={[styles.title, titleAnimatedStyle]}>
          कृष्णस्य दिव्यरूपम्
        </Animated.Text>

        <Animated.Text style={[styles.description, descriptionAnimatedStyle]}>
          नमो भगवते वासुदेवाय नमः सर्वाय जगतां कारणाय यत्र योगेश्वरः कृष्णो यत्र
          पार्थो धनुर्धरः
        </Animated.Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => nav.navigate("InfoPageTwo")}>
            <Animated.View style={iconAnimatedStyle}>
              <AntDesign name="caret-left" size={60} color="#fff" />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              nav.reset({
                index: 0, 
                routes: [{ name: "Login" }],
              })
            }
          >
            <Animated.View style={iconAnimatedStyle}>
              <AntDesign name="caret-right" size={60} color="#fff" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute", // Ensures the image is behind the text and icons
  },
  overlay: {
    position: "absolute",
    bottom: 30, // Adjust the bottom to place text lower
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay to increase text contrast
    borderRadius: 20,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  description: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 30,
    paddingHorizontal: 20,
    fontFamily: "Arial",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginTop: 30,
  },
});

export default InfoPageThree;
