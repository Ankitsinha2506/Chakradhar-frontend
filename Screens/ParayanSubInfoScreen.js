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
import axiosInstance from "../apis/axiosInstance"; // Import your axiosInstance

const ParayanSubInfoScreen = ({ route }) => {
  const { infoTitle } = route.params; // Get the title from navigation params
  const [subInfoTitles, setSubInfoTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [content, setContent] = useState({});
  const [contentLoading, setContentLoading] = useState(false);

  // Animated height for dropdown transition
  const animatedHeight = useState(new Animated.Value(0))[0];
  const animatedRotate = useState(new Animated.Value(0))[0]; // For Chevron Rotation

  const handleToggle = async (index, subInfoTitle) => {
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

    if (!content[subInfoTitle]) {
      setContentLoading(true);
      try {
        const response = await axiosInstance.get(
          `/users/get-parayancontent/${subInfoTitle}`
        );
        setContent((prevContent) => ({
          ...prevContent,
          [subInfoTitle]: response.data.content,
        }));
      } catch (err) {
        setError("Failed to fetch content. Please try again later.");
      } finally {
        setContentLoading(false);
      }
    }

    Animated.timing(animatedHeight, {
      toValue: 500, // Adjusted for better UX
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
    const fetchSubInfoTitles = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/parayanSubInfoTitle/${infoTitle}`
        );
        setSubInfoTitles(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching parayan subinfotitles");
        setLoading(false);
      }
    };
    fetchSubInfoTitles();
  }, [infoTitle]);

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
      {/* Use the passed title as the heading */}
      <Text style={styles.marathiHeading}>{infoTitle}</Text>

      <View style={styles.listContainer}>
        {subInfoTitles.map((title, index) => {
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
                  style={[styles.itemContent, { maxHeight: animatedHeight }]}
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
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FAF7F2", // Divine Saffron
  },
  marathiHeading: {
    fontSize: 32,
    fontFamily: "Noto Serif",
    fontWeight: "bold",
    color: "#5C3D2E", // Dark Brown for contrast
    textAlign: "center",
    marginVertical: 20,
    textShadowColor: "#E9E0D5", // Golden glow effect
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
    borderColor: "#E9E0D5", // Golden border for divine feel
    shadowColor: "#E9E0D5", // Subtle glow effect
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
    backgroundColor: "#A44826",
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
    backgroundColor: "#A44826", // Vibrant Saffron Shade
    borderWidth: 2,
    borderColor: "#E9E0D5", // Divine Golden Touch
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

export default ParayanSubInfoScreen;