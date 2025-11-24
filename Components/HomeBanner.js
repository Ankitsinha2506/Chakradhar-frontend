import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const circleItemsTop = ["पारायण", "देवपूजा", "पंचकृष्ण"];
const circleItemsBottom = ["भजनसंग्रह", "आरती संग्राह", "श्रीमद्भगवतगीता"];

const CIRCLE_SIZE = 80;

const HomeBanner = () => {
  const navigation = useNavigation();
  const chakraRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(chakraRotate, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const chakraSpin = chakraRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const renderCircle = (item) => (
    <TouchableOpacity
      key={item}
      onPress={() => navigation.navigate(item)}
      style={{ marginHorizontal: 10 }}
    >
      <LinearGradient
        colors={["#FF9933", "#F5F5F5", "#138808"]}
        style={styles.circleButton}
      >
        <Text style={styles.circleText}>{item}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>{circleItemsTop.map(renderCircle)}</View>

      <View style={styles.centerWrapper}>
        <Animated.Image
          source={require("../assets/chakra13.webp")}
          style={[styles.chakraImage, { transform: [{ rotate: chakraSpin }] }]}
        />

        <Image
          source={require("../assets/ChakradharLogo.png")}
          style={styles.centralImage}
        />
      </View>

      <View style={styles.row}>{circleItemsBottom.map(renderCircle)}</View>
    </View>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },

  row: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },

  centerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },

  chakraImage: {
    width: 220,
    height: 220,
    position: "absolute",
    opacity: 0.22,
  },

  centralImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: "#FFD700",
  },

  circleButton: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFE082",
    elevation: 6,
  },

  circleText: {
    color: "#4B2E00",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
});
