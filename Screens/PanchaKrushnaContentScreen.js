import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axiosInstance from "../apis/axiosInstance"; // Import the axios instance

const PanchaKrushnaContentScreen = ({ route }) => {
  const { subtitle } = route.params; // Extract the subtitle passed via navigation
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/get-PanchaKrushnaContent/${subtitle}`
        );
        setContent(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Error fetching content");
        setLoading(false);
      }
    };

    fetchContent();
  }, [subtitle]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display Subtitle */}
      <View style={styles.subtitleContainer}>
        <LinearGradient
          colors={["#FFD700", "#FF4500"]}
          style={styles.subtitleBackground}
        >
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </LinearGradient>
      </View>

      {/* Display Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: content.image }} style={styles.image} />
      </View>

      {/* Display Sanskrit Info */}
      <View style={styles.infoContainer}>
        <LinearGradient
          colors={["#DA7233", "#FFD700"]}
          style={styles.infoHeader}
        >
          <Text style={styles.infoHeaderText}>प्रारम्भ मन्त्र</Text>
        </LinearGradient>
        {content.sanskritInfo.map((info, index) => (
          <Text key={index} style={styles.infoText}>
            {info}
          </Text>
        ))}
      </View>

      {/* Display Marathi Info */}
      <View style={styles.infoContainer}>
        <LinearGradient
          colors={["#DA7233", "#FFD700"]}
          style={styles.infoHeader}
        >
          <Text style={styles.infoHeaderText}>वैयक्तिक माहिती</Text>
        </LinearGradient>
        {content.marathiInfo.map((info, index) => (
          <Text key={index} style={styles.infoText}>
            {info}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#F7E2C5", // Light golden background for serenity
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitleContainer: {
    marginBottom: 20,
  },
  subtitleBackground: {
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  subtitleText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  infoContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  infoHeader: {
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  infoHeaderText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
    lineHeight: 22,
  },
});

export default PanchaKrushnaContentScreen;
