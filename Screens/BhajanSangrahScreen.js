import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axiosInstance from "../apis/axiosInstance";

const { width } = Dimensions.get("window");

const imageSources = [
  require("../assets/bhajan.jpg"),
  require("../assets/Govind.png"),
  require("../assets/chakrapaniimages.jpeg"),
  require("../assets/chakradhar2.jpg"),
];

const BhajanSangrahScreen = () => {
  const navigation = useNavigation();
  const [infoTitles, setInfoTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handlePress = (infoTitle) => {
    navigation.navigate("BhajanSubInfoScreen", { infoTitle });
  };

  useEffect(() => {
    const fetchInfoTitles = async () => {
      try {
        console.log("Making API request...");
        const response = await axiosInstance.get("/users/bhajanInfoTile");
        console.log("API Response:", response);
        console.log("Response Data:", response.data); // Data is an array of main titles
        setInfoTitles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching BhajanSangrah infotitles:", error);
        setError("Error fetching BhajanSangrah infotitles");
        setLoading(false);
      }
    };

    fetchInfoTitles();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.card}>
      <ImageBackground
        source={imageSources[index % imageSources.length]} // Use a sacred-themed background
        style={styles.cardBackground}
        imageStyle={{ borderRadius: 15 }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)"]}
          style={styles.overlay}
        >
          <Text style={styles.cardText}>{item || "No Title"}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <FlatList
        data={infoTitles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#F7E2C5",
  },
  gridContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    width: (width - 60) / 2,
    aspectRatio: 1.2,
    margin: 10,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 3,
    borderColor: "#FFD700", // Golden color
  },
  cardBackground: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
  },
  overlay: {
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default BhajanSangrahScreen;
