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
import axiosInstance from "../apis/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const SuperAdminUserAdminScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();
  const isFocused = useIsFocused();

  const adminEmailPattern = /^admin[\w\d]*@gmail\.com$/;
  const superadminEmail = "superadmin@gmail.com"; // Superadmin email

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      setLoading(true);
      const response = await axiosInstance.get("/users/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filteredUsers = response.data.filter(
        (user) =>
          adminEmailPattern.test(user.email) || user.email === superadminEmail
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to fetch users. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userEmail) => {
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
              const response = await axiosInstance.delete(
                `/users/delete/${userEmail}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              Alert.alert("Success", response.data.message);
              fetchUsers();
            } catch (error) {
              console.error("Error deleting user:", error);
              Alert.alert(
                "Error",
                error.response?.data?.message || "Failed to delete user."
              );
            }
          },
        },
      ]
    );
  };

  // Handle logout and navigate back
  const handleLogout = async () => {
    try {
      nav.goBack(); // Navigate back to previous screen
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUsers();
    }
  }, [isFocused]);

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
          onPress={() => deleteUser(item.email)}
        >
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Admins & Superadmins</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => nav.navigate("CreateAdminUserScreen")}
          >
            <Icon name="plus" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Icon name="sign-out" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loading} />
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => (item._id ? item._id.toString() : item.email)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f4f6f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerButtons: {
    flexDirection: "row",
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: "#dc3545", // Red color for logout
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  userDetails: {
    flex: 1,
    marginRight: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#777",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  loading: {
    marginTop: 20,
  },
});

export default SuperAdminUserAdminScreen;
