import React from "react";
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import HomeIcon from "../Components/HomeIcon";

const Header = ({ title }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const current = route.name;

  return (
    <LinearGradient
      colors={["#C55A11", "#E9962F"]}
      style={styles.headerContainer}
    >

      {/* LEFT ICON / IMAGE */}
      <View style={styles.leftWrapper}>
        {current === "HomeScreen" && (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <FontAwesome name="navicon" size={28} color="#fff" />
          </TouchableOpacity>
        )}

        {current === "TempleList" && (
          <Image source={require("../assets/temple2.jpg")} style={styles.headerImage} />
        )}

        {current === "SettingsScreen" && (
          <Image source={require("../assets/settings3.jpg")} style={styles.headerImage} />
        )}
      </View>

      {/* TITLE CENTER */}
      <View style={styles.centerWrapper}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* RIGHT ICON */}
      <View style={styles.rightWrapper}>
        <HomeIcon />
      </View>

    </LinearGradient>
  );
};

export default Header;


const styles = StyleSheet.create({
  headerContainer: {
    height: 115,
    paddingTop: Platform.OS === "ios" ? 55 : 25,
    justifyContent: "center",
    alignItems: "center",
  },

  // LEFT SECTION (ABSOLUTE)
  leftWrapper: {
    position: "absolute",
    left: 18,
    top: Platform.OS === "ios" ? 55 : 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  // RIGHT SECTION (ABSOLUTE)
  rightWrapper: {
    position: "absolute",
    right: 18,
    top: Platform.OS === "ios" ? 55 : 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  // TITLE CENTERED – ALWAYS PERFECT
  centerWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: "#fff",
    textAlign: "center",
  },

  headerImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
});
