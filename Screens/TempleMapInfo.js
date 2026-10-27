import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
} from "react-native";
import TempleMap from "../Components/TempleMap";
import { FontAwesome5 } from "@expo/vector-icons";

const TempleMapInfo = ({ route }) => {
  const { temple } = route.params;

  // ------------------------------------
  // 3D Animation Values
  // ------------------------------------
  const mapScale = useRef(new Animated.Value(1)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;

  // Animate cards when screen opens
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, []);

  const openMaps = () => {
    const url = Platform.select({
      ios: `maps://app?daddr=${temple.latitude},${temple.longitude}`,
      android: `https://www.google.com/maps/dir/?api=1&destination=${temple.latitude},${temple.longitude}`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${temple.latitude},${temple.longitude}`,
    });
    Linking.openURL(url).catch((err) =>
      console.error("Error opening map", err)
    );
  };

  // ------------------------------------
  // Map Press Animation
  // ------------------------------------
  const animateMapPressIn = () => {
    Animated.spring(mapScale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const animateMapPressOut = () => {
    Animated.spring(mapScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* TEMPLE NAME */}
      <View style={styles.header}>
        <Text style={styles.templeName}>{temple.name}</Text>
        <Text style={styles.templeLocation}>{temple.location}</Text>
      </View>

      {/* MAP 3D CARD */}
      <Animated.View
        style={[
          styles.mapWrapper,
          {
            transform: [{ scale: mapScale }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={animateMapPressIn}
          onPressOut={animateMapPressOut}
        >
          <View style={styles.mapContainer}>
            <TempleMap temple={temple} />
          </View>
        </TouchableOpacity>

        {/* Floating Map Button */}
        <TouchableOpacity style={styles.fab} onPress={openMaps}>
          <FontAwesome5 name="location-arrow" size={20} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* SIGNIFICANCE CARD */}
      <Animated.View
        style={[
          styles.card,
          {
            opacity: cardOpacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={styles.cardTitle}>Temple Significance</Text>
        <Text style={styles.cardText}>{temple.significance}</Text>
      </Animated.View>

      {/* HOTELS CARD */}
      <Animated.View
        style={[
          styles.card,
          {
            opacity: cardOpacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={styles.cardTitle}>Nearby Hotels & Restaurants</Text>
        {temple.hotels.map((hotel, idx) => (
          <Text key={idx} style={styles.hotelText}>
            • {hotel.name} — {hotel.rating}⭐
          </Text>
        ))}
      </Animated.View>
    </ScrollView>
  );
};

export default TempleMapInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },

  content: {
    width: "100%",
    maxWidth: 1000,
    alignSelf: "center",
    paddingBottom: 40,
    paddingHorizontal: 16,
  },

  header: {
    alignItems: "center",
    marginVertical: 20,
  },

  templeName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#3B2F2F",
    textAlign: "center",
  },

  templeLocation: {
    fontSize: 16,
    color: "#6D4C41",
    fontStyle: "italic",
    marginTop: 4,
    textAlign: "center",
  },

  // MAP WRAPPER (3D card style)
  mapWrapper: {
    marginBottom: 25,
    borderRadius: 18,
    elevation: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    overflow: "visible",
  },

  mapContainer: {
    height: 250,
    borderRadius: 18,
    overflow: "hidden",
  },

  fab: {
  position: "absolute",
  bottom: 15,       // Push inside the map
  right: 15,        // Align inside right
  backgroundColor: "#8B4513",
  paddingVertical: 12,
  paddingHorizontal: 14,
  borderRadius: 40,

  // Shadow (for Android & iOS)
  elevation: 8,
  shadowColor: "#000",
  shadowOpacity: 0.3,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 6,
},


  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#4E342E",
  },

  cardText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },

  hotelText: {
    fontSize: 15,
    color: "#555",
    marginBottom: 6,
  },
});
