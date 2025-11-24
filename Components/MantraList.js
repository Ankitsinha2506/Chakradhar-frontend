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

const images = [
  require("../assets/chakraimages.jpeg"),
  require("../assets/chakradhar2.jpg"),
  require("../assets/krushna007.jpg"),
  require("../assets/om12.jpg"),
  require("../assets/artiriver.jpg"),
  require("../assets/krushna1.jpg"),
];

const MantraList = () => {
  const navigation = useNavigation();
  const [mainTitles, setMainTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePress = (name) => {
    navigation.navigate(name);
  };

  useEffect(() => {
    const fetchMainTitles = async () => {
      try {
        const response = await axiosInstance.get("/users/mainTitle");
        setMainTitles(response.data);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMainTitles();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.card}>
      <ImageBackground
        source={images[index % images.length]}
        style={styles.cardBackground}
        imageStyle={{ borderRadius: 15 }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)"]}
          style={styles.overlay}
        >
          <Text style={styles.cardText}>{item}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={mainTitles}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
      scrollEnabled={false}
    />
  );
};

export default MantraList;

const styles = StyleSheet.create({
  gridContainer: {
    paddingBottom: 20,
    justifyContent: "center",
  },

  card: {
    width: (width - 100) / 2,
    aspectRatio: 1.2,
    margin: 10,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 10,
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
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
});
