import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import * as Font from "expo-font";


const { width } = Dimensions.get("window");
const AVATAR_SIZE = width * 0.38;

const InfoPageOne = ({ navigation }) => {
  // Animation values
  const centerImageOpacity = useSharedValue(0);
  const centerImageScale = useSharedValue(0.5);

  const labelTranslateY = useSharedValue(20);
  const labelOpacity = useSharedValue(0);

  const buttonScale = useSharedValue(1);

  useEffect(() => {
    centerImageOpacity.value = withTiming(1, { duration: 1000 });
    centerImageScale.value = withTiming(1, { duration: 1000 });

    labelTranslateY.value = withDelay(
      500,
      withTiming(0, { duration: 600 })
    );
    labelOpacity.value = withDelay(
      500,
      withTiming(1, { duration: 600 })
    );
  }, []);

  const centerImageStyle = useAnimatedStyle(() => ({
    opacity: centerImageOpacity.value,
    transform: [{ scale: centerImageScale.value }],
  }));

  const labelAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: labelTranslateY.value }],
    opacity: labelOpacity.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  return (
    <LinearGradient colors={["#FFEBCD", "#FFF8DC"]} style={styles.background}>
      {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}
      {/* Fixed Header Text */}
      <Animated.Text style={[styles.headerText, labelAnimatedStyle]}>
        || पंचावतार ||
      </Animated.Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Row */}
        <View style={styles.row}>
          <Avatar
            source={require("../assets/infoImage/GopalKrishna.jpeg")}
            label="श्री गोपाळकृष्ण प्रभु"
          />
          <Avatar
            source={require("../assets/infoImage/DattaTraye.jpeg")}
            label="श्री दत्तात्रेय प्रभु"
          />
        </View>

        {/* Center Avatar */}
        <Animated.View style={[styles.centerAvatarContainer, centerImageStyle]}>
          <Image
            source={require("../assets/infoImage/ShreeChakradharSwami.png")}
            style={styles.centerAvatar}
          />
          <Animated.Text style={[styles.centerLabel, labelAnimatedStyle]}>
            सर्वज्ञ श्रीचक्रधर स्वामी
          </Animated.Text>
        </Animated.View>

        {/* Bottom Row */}
        <View style={styles.row}>
          <Avatar
            source={require("../assets/infoImage/Chakrapani.jpeg")}
            label="श्री चक्रपाणी प्रभु"
          />
          <Avatar
            source={require("../assets/infoImage/shreeGovindPrabhu.jpeg")}
            label="श्री गोविंद प्रभु"
          />
        </View>
      </ScrollView>

      {/* Button */}
      <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate("InfoPageTwo")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

// Reusable Avatar Component
const Avatar = ({ source, label }) => (
  <View style={styles.avatarContainer}>
    <Image source={source} style={styles.avatar} />
    <Text style={styles.avatarLabel}>{label}</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "relative",
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 30,
    paddingBottom: 100,
  },
  headerText: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 34,
    color: "#8B0000",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    zIndex: 10,
  },
  
  row: {
    top: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: "center",
    width: AVATAR_SIZE,
  },
  avatar: {
    width: "100%",
    height: AVATAR_SIZE,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#DAA520",
    resizeMode: "cover",
  },
  avatarLabel: {
    fontSize: 16,
    color: "#4B0082",
    marginTop: 8,
    textAlign: "center",
    fontWeight: 600
  },
  centerAvatarContainer: {
    top:50,
    alignItems: "center",
    marginVertical: 30,
  },
  centerAvatar: {
    width: AVATAR_SIZE + 60,
    height: AVATAR_SIZE + 60,
    // borderWidth: 4,
    // borderColor: "#FFD700",
    resizeMode: "contain",
    alignSelf: "center", // ensures it is centered horizontally
  },
  
  centerLabel: {
    marginTop: 5,
    fontSize: 20,
    color: "#8B0000",
    fontWeight: "600",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 15,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#8B0000",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    elevation: 4,
  },
  buttonText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    textShadowColor: "rgba(255, 215, 0, 0.4)", // Glow effect for text
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default InfoPageOne;
