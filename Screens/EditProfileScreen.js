import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axiosInstance from "../apis/axiosInstance";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Back icon

const EditProfileScreen = ({ route }) => {
  const [name, setName] = useState(route?.params?.name || "");
  const [email] = useState(route?.params?.email || ""); // Read-only email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Edit Profile",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#FAF7F2",
      },
      headerTintColor: "#6A3F6B",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
          <Ionicons name="arrow-back-circle" size={30} color="#6A3F6B" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty.");
      return;
    }

    if (password && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const updatedData = { name, email };
      if (password) {
        updatedData.password = password;
      }

      const response = await axiosInstance.put("/users/editprofile", updatedData);

      if (response.status === 200) {
        alert("Profile updated successfully!");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating profile:", error.response ? error.response.data : error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        {/* Email (read-only) */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.readOnlyInput]}
          placeholder="Current email"
          value={email}
          editable={false}
        />

        {/* Password */}
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your new password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    flex: 1,
    padding: 20,
    backgroundColor: "#FAF7F2",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    height: 55,
    width: "100%",
    borderRadius: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#6A3F6B",
    shadowColor: "#6A3F6B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  readOnlyInput: {
    backgroundColor: "#EAEAEA",
    color: "#888",
  },
  saveButton: {
    backgroundColor: "#EFA423",
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#EFA423",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default EditProfileScreen;
