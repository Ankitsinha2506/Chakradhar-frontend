import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import axiosInstance from "../apis/axiosInstance"; // Import the custom axios instance
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome"; // For icons in buttons
import { useIsFocused, useNavigation } from "@react-navigation/native";

const AdminAllUserScreens = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();
  const isFocused = useIsFocused();

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      setLoading(true); // Set loading to true while fetching
      const response = await axiosInstance.get("/users/get");

      setUsers(response.data); // Update state with users
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to fetch users.");
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };

  // Delete a user
  const deleteUser = async (userId, userEmail) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("userToken");

              if (!token) {
                throw new Error("No token found. Please log in again.");
              }

              const response = await axiosInstance.delete(`/users/delete/${userEmail}`);

              Alert.alert("Success", response.data.message);
              fetchUsers(); // Refresh user list after deletion
            } catch (error) {
              console.error("Error deleting user:", error);
              Alert.alert("Error", error.response?.data?.message || "Failed to delete user.");
            }
          },
        },
      ]
    );
  };

  // Logout function
  const handleLogout = async () => {
    try {
      nav.goBack(); // Navigate to login screen
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUsers();
    }
  }, [isFocused]);

  // Render each user
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => nav.navigate("AdminUpdateUserScreen")}
        >
          <Icon name="edit" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => deleteUser(item._id, item.email)}
        >
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Manage Users</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout} // Logout functionality
        >
          <Icon name="sign-out" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" style={styles.loading} />
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item._id ? item._id.toString() : item.email}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff", // Soft, warm background color for divine feel
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: "darkblue", // Dark brown with a divine gold accent
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFD700", // Gold color for a divine touch
    fontFamily: "serif",
    left : 10
  },
  logoutButton: {
    backgroundColor: "#8B0000", // Deep red for logout button
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    right: 10
  },
  card: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
    alignItems: "center",
    borderColor: "#FFD700", // Gold border to indicate the card's divine nature
    borderWidth: 1,
  },
  userDetails: {
    flex: 1,
    marginRight: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 8,
    fontFamily: "serif",
  },
  userEmail: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
    fontFamily: "sans-serif",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  editButton: {
    backgroundColor: "#4CAF50", // Green for edit
  },
  deleteButton: {
    backgroundColor: "#8B0000", // Deep red for delete
  },
  loading: {
    marginTop: 30,
  },
});

export default AdminAllUserScreens;
