import LibraryCard from "../ui/LibraryCard";
import ResponsiveGrid from "../ui/ResponsiveGrid";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axiosInstance from "../apis/axiosInstance"; // Import the axios instance



const images = [
  require("../assets/krushna007.jpg"),
  require("../assets/dattatrey1.jpg"),
  require("../assets/chakrapaniimages.jpeg"),
  require("../assets/Govind.png"),
  require("../assets/shreechakra.jpg"),

];

const PanchaKrushnaScreen = () => {
  const navigation = useNavigation();
  const [infoTitles, setInfoTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handlePress = (subtitle) => {
    navigation.navigate("PanchaKrushnaContentScreen", { subtitle });
  };

  useEffect(() => {
    const fetchInfoTitles = async () => {
      try {
        console.log("Making API request...");
        const response = await axiosInstance.get("/users/PanchaKrushnaSubTitle");
        console.log("API Response:", response);
        console.log("Response Data:", response.data); // Data is an array of titles
        setInfoTitles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching PanchaKrushna subtitles:", error);
        setError("Error fetching PanchaKrushna subtitles");
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
    <LibraryCard title={item} image={imageSources[index % imageSources.length]} onPress={() => handlePress(item)} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF7F2", padding: 8 }}>
      <ResponsiveGrid
        data={infoTitles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}

        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#FAF7F2",
  },
  gridContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    alignSelf: "stretch",
    aspectRatio: 1.2,
    margin: 10,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "#A44826", // Golden color
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

export default PanchaKrushnaScreen;
