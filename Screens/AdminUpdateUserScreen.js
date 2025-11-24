import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../apis/axiosInstance"; // Import your custom axios instance
import { useNavigation } from "@react-navigation/native"; // Import useNavigation for back navigation

const AdminUpdateUserScreen = () => {
  const navigation = useNavigation(); // Hook to use navigation
  const [email, setEmail] = useState(""); // Current user email
  const [newEmail, setNewEmail] = useState(""); // New email if needed
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!email || !name) {
      Alert.alert("Validation Error", "Email and Name are required.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      setLoading(true);

      const response = await axiosInstance.put(
        `/users/update/${email}`, // Use the axios instance with the base URL
        {
          name,
          newEmail: newEmail || email,
          password,
        }
      );

      setLoading(false);
      Alert.alert("Success", "User updated successfully!");
      navigation.goBack(); // Navigate back after success
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to update user. Please try again."
      );
      console.error("Error updating user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Go back to the previous screen
      >
        <Text style={styles.backText}>{"< Back"}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Update User</Text>

      <Text style={styles.label}>Current Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter current email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>New Email (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new email"
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Password (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loading} />
      ) : (
        <Button title="Update User" onPress={handleUpdate} color="#4CAF50" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  backButton: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    alignItems: "flex-start",
  },
  backText: {
    fontSize: 18,
    color: "#007BFF",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  loading: {
    marginTop: 20,
  },
});

export default AdminUpdateUserScreen;
