import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HomeTitle = () => {
  return (
    <LinearGradient
      colors={["#FFD700", "#FFA500"]}
      style={styles.titleContainer}
    >
      <Text style={styles.titleText}>🔱 श्री चक्रधर स्वामी 🔱</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#800000",
    textAlign: "center",
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
});

export default HomeTitle;
