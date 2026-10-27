import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, CommonActions } from "@react-navigation/native";

const SettingsScreen = () => {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const nav = useNavigation();

  // Request Location Permission
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setHasPermission(status === "granted");
  };

  // Fetch Current Location
  const fetchCurrentLocation = async () => {
    if (!hasPermission) return;
    setLoading(true);
    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const geocode = await Location.reverseGeocodeAsync(coords);
      setCity(geocode[0]?.city || "Unknown");
    } catch (err) {
      setCity("Error fetching location");
    } finally {
      setLoading(false);
    }
  };

  // User Sign Out
  const signOut = async () => {
    await AsyncStorage.removeItem("userEmail");
    nav.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  // On Start → Ask Permission
  useEffect(() => {
    requestLocationPermission();
  }, []);

  // If Permission Granted → Fetch Location
  useEffect(() => {
    if (hasPermission) fetchCurrentLocation();
  }, [hasPermission]);

  // Get Email from Storage
  useEffect(() => {
    const getUserEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      setUserEmail(storedEmail);
    };
    getUserEmail();
  }, []);

  // Reusable Row Component
  const SettingRow = ({ icon, iconBg, label, value, onPress }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>
        <Feather name={icon} size={20} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        {value && <Text style={styles.rowValue}>{value}</Text>}
      </View>
      <Feather name="chevron-right" size={22} color="#bbb" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32, width: "100%", maxWidth: 760, alignSelf: "center" }}>
        
        {/* Header Profile */}
        <View style={styles.profileCard}>
          <Image
            style={styles.profileImage}
            source={require("../assets/ChakradharLogo.png")}
          />

          <Text style={styles.profileEmail}>
            {userEmail || "Loading..."}
          </Text>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => nav.navigate("EditProfileScreen", { email: userEmail })}
          >
            <Feather name="edit-3" size={16} color="#fff" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <SettingRow
            icon="info"
            iconBg="#ff9800"
            label="Shri Chakradhar Swami"
            value="Life History"
            onPress={() => nav.navigate("SwamiInfoPage")}
          />

          <SettingRow
            icon="map-pin"
            iconBg="#4CAF50"
            label="Your Location"
            value={loading ? "Fetching..." : city || "Not Found"}
            onPress={fetchCurrentLocation}
          />
        </View>

        {/* Videos Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Videos</Text>

          <SettingRow
            icon="video"
            iconBg="#E91E63"
            label="Watch Bhakti Videos"
            onPress={() => nav.navigate("VideoScreen")}
          />
        </View>

        {/* About Us */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.aboutText}>
            आम्ही भक्तीमार्गात आध्यात्मिक वाढ आणि प्रेरणा देण्यास वचनबद्ध आहोत.
            कृपया आम्हाला तुमच्या प्रतिक्रिया द्या. जय गुरु!
          </Text>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Feather name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },

  /* Profile Header */
  profileCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 5,
  },
  profileImage: {
    width: 95,
    height: 95,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#f5d36e",
  },
  profileEmail: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  editProfileButton: {
    marginTop: 12,
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#ffb300",
    borderRadius: 20,
    alignItems: "center",
  },
  editProfileText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "600",
  },

  /* Card Layout */
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
    color: "#8B0000",
  },

  /* Rows */
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  rowValue: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
  },

  aboutText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },

  logoutButton: {
    backgroundColor: "#ff3b30",
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "700",
  },
});
