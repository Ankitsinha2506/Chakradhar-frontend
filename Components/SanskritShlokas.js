import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as Font from "expo-font";

const SanskritShlokas = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        TiroDevanagariMarathi: require("../assets/fonts/TiroDevanagariMarathi-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.shlokaText}>
        जय देव जयानन्द जय भक्तार्तिहारक {"\n"}
        जय नित्यप्रबोधाय जय योगीश्वराय ते ॥
      </Text>
    </View>
  );
};

export default SanskritShlokas;

const styles = StyleSheet.create({
  container: {
    padding: 22,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E9E0D5",
    backgroundColor: "#F3E9DA",
    borderRadius: 12,
    elevation: 0,
    marginBottom: 20,
  },

  shlokaText: {
    fontFamily: "TiroDevanagariMarathi",
    fontSize: 17,
    color: "#8B4513",
    textAlign: "center",
    lineHeight: 30,
  },
});
