import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { StackActions, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const nav = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Modak: require("../assets/fonts/Modak-Regular.ttf"),
        PlayfairDisplay: require("../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf"), // <- add this line
        Caveat: require("../assets/fonts/Caveat-VariableFont_wght.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;

    opacity.value = withTiming(1, { duration: 800 });
    translateY.value = withTiming(0, { duration: 100000 });

    const timer = setTimeout(() => {
      nav.dispatch(StackActions.replace("InfoPageOne"));
    }, 3500);

    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <LinearGradient colors={["#000000", "#000000"]} style={styles.container}>
      <StatusBar backgroundColor="#FF9800" barStyle="light-content" />

      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={styles.topHeading}>|| श्री सर्वज्ञ ||</Text>

        <Image
          style={styles.logo}
          source={require("../assets/ChakradharLogo.png")}
          accessibilityLabel="Chakradhar Logo"
        />

        <Text style={styles.subheading}>महानुभाव पंथ सेवार्थ</Text>
        {/* <Text style={styles.tagline}>Ishwar Bhakti</Text> */}
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Developed by Devcons Software Solutions Pvt. Ltd.
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  topHeading: {
    fontSize: 36,
    letterSpacing:3,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Modak",
    letterSpacing: 1,
    textAlign: "center",
  },
  logo: {
    height: height * 0.6,
    width: width * 0.9,
    resizeMode: "contain",
    marginVertical: 10,
    marginBottom:30
  },
  subheading: {
    marginTop: 10,
    fontSize: 36,
    color: "white",
    fontFamily: "Modak",
    textAlign: "center",
    letterSpacing: 1,
    bottom:30,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
    bottom:15
  },
  footerText: {
    fontFamily:"Caveat",
    fontSize: 18,
    color: "#cccccc",
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default SplashScreen;
