import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../apis/axiosInstance";

const DevPujaScreen = () => {
  const [infoTitles, setInfoTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [content, setContent] = useState({});
  const [contentLoading, setContentLoading] = useState(false);

  const animatedHeight = useState(new Animated.Value(0))[0];
  const animatedRotate = useState(new Animated.Value(0))[0];

  const handleToggle = async (index, title) => {
    if (expandedIndex === index) {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();

      Animated.timing(animatedRotate, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();

      setExpandedIndex(null);
      return;
    }

    setExpandedIndex(index);

    if (!content[title]) {
      setContentLoading(true);
      try {
        const response = await axiosInstance.get(
          `/users/get-DevPoojacontent/${title}`
        );
        setContent((prevContent) => ({
          ...prevContent,
          [title]: response.data.content,
        }));
      } catch (err) {
        setError("Failed to fetch content. Please try again later.");
      } finally {
        setContentLoading(false);
      }
    }

    Animated.timing(animatedHeight, {
      toValue: 500,
      duration: 400,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedRotate, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const fetchInfoTitles = async () => {
      try {
        const response = await axiosInstance.get("/users/DevPoojaSubTitle");
        setInfoTitles(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching Dev Puja subtitles");
        setLoading(false);
      }
    };
    fetchInfoTitles();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#D4AF37" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const rotateInterpolation = animatedRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.listContainer}>
        {infoTitles.map((title, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <View key={index} style={styles.itemContainer}>
              <TouchableOpacity
                style={styles.itemHeader}
                onPress={() => handleToggle(index, title)}
              >
                <LinearGradient
                  colors={["#ff9e2c", "#e44c4e"]}
                  style={styles.gradientBackground}
                >
                  <Text style={styles.itemTitle}>{title || "No Title"}</Text>
                  <Animated.View
                    style={{ transform: [{ rotate: rotateInterpolation }] }}
                  >
                    <Ionicons name="chevron-down" size={24} color="white" />
                  </Animated.View>
                </LinearGradient>
              </TouchableOpacity>

              {isExpanded && (
                <Animated.View
                  style={[styles.itemContent, { height: animatedHeight }]}
                >
                  <ScrollView
                    style={styles.scrollableContent}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                  >
                    {contentLoading ? (
                      <ActivityIndicator size="large" color="#ff6347" />
                    ) : (
                      <Text style={styles.itemText}>
                        {content[title] || "No content available."}
                      </Text>
                    )}
                  </ScrollView>
                </Animated.View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F7E2C5",
  },
  listContainer: {
    paddingVertical: 20,
  },
  itemContainer: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 6,
    borderWidth: 2,
    borderColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#E9962F",
    borderRadius: 15,
  },
  gradientBackground: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    width: "100%",
    backgroundColor: "#E9962F",
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  itemTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Noto Serif",
    fontWeight: "700",
    flex: 1,
  },
  itemContent: {
    backgroundColor: "#fff8e1",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: 10,
    padding: 15,
  },
  scrollableContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 18,
    color: "#5C3D2E",
    fontFamily: "Noto Serif",
    paddingVertical: 15,
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "600",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 18,
    marginTop: 20,
  },
});

export default DevPujaScreen;
