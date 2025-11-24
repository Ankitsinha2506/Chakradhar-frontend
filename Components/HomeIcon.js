import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for the logout icon
import { StackActions, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const HomeIcon = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false); // Track visibility of menu
  const navigation = useNavigation();
  const fadeAnim = useState(new Animated.Value(0))[0]; // For fade animation

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        if (storedEmail) {
          setUserEmail(storedEmail);
        } else {
          console.log("No email found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error retrieving user email:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEmail();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle visibility of the menu
    if (!menuVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userEmail"); // Clear stored email
      setUserEmail(null); // Reset state
      setMenuVisible(false); // Hide menu

      // Navigate to login
      navigation.dispatch(StackActions.replace("Login"));
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getInitial = (email) => {
    return email ? email[0].toUpperCase() : ""; // Get first letter of email for initial
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const fetchUserEmail = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem("userEmail");
          if (storedEmail) {
            setUserEmail(storedEmail);
          } else {
            console.log("No email found in AsyncStorage");
          }
        } catch (error) {
          console.error("Error retrieving user email:", error);
        }
      };
      fetchUserEmail();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={[styles.container, { display: "none" }]}>
      {loading ? (
        <ActivityIndicator size="small" color="#FF7043" />
      ) : (
        <>
          {/* Display initial letter of the email */}
          <TouchableOpacity onPress={toggleMenu} style={styles.iconContainer}>
            <LinearGradient
              colors={["#FF7043", "#FFA726"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <Text style={styles.iconText}>{getInitial(userEmail)}</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Conditionally render the menu below the icon */}
          {menuVisible && (
            <Animated.View
              style={[styles.menuContainer, { opacity: fadeAnim }]}
            >
              <LinearGradient
                colors={["#FF7043", "#FFA726"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.menuGradient}
              >
                {userEmail && (
                  <View style={styles.toastContainer}>
                    <Text style={styles.toastText}>{userEmail}</Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={logout}
                  style={styles.logoutIconContainer}
                >
                  <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "transparent",
    position: "relative", // Ensure the container remains positioned relative to its children
  },
  iconContainer: {
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Add shadow for depth
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  gradient: {
    borderRadius: 25,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Roboto", // Use a custom font if available
  },
  menuContainer: {
    position: "absolute", // Position the menu absolutely, so it doesn't affect layout
    top: 70, // Space below the icon
    right: -7, // Align to the right side of the screen
    backgroundColor: "transparent", // Make the background fully transparent
    padding: 10,
    width: 150,
    elevation: 5, // Add shadow for depth
    zIndex: 1, // Ensure the menu stays on top of other elements
  },
  menuGradient: {
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  toastContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 10, // Space between email and logout icon
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Roboto", // Use a custom font if available
  },
  logoutIconContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeIcon;