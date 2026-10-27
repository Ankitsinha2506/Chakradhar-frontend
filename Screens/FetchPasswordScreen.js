import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axiosInstance from "../apis/axiosInstance"; // Assuming you have the axiosInstance set up

const FetchPasswordScreen = ({ route, navigation }) => {
  const { email } = route.params;  // Get email from route params
  const [otp, setOtp] = useState("");  // State for OTP
  const [newPassword, setNewPassword] = useState("");  // State for new password

  // Handle password reset
  const handleResetPassword = async () => {
    // Validate inputs
    if (!otp || !newPassword) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    // Call backend API to reset password
    try {
      const response = await axiosInstance.post("/users/updatePassword", {
        email,
        otp,
        newPassword,
      });

      // Show success message
      Alert.alert("Success", response.data.message);

      // Navigate to login screen or any other screen after success
      navigation.navigate("Login");  // Change this to your login screen

    } catch (error) {
      // Show error message
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>

      {/* OTP Input */}
      <TextInput
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter OTP"
        keyboardType="numeric"
        style={styles.input}
      />

      {/* New Password Input */}
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
        placeholder="Enter your new password"
        style={styles.input}
      />

      {/* Reset Password Button */}
      <TouchableOpacity onPress={handleResetPassword} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FF7043",
  },
  input: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },
  resetButton: {
    backgroundColor: "#FF7043",
    marginTop: 30,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default FetchPasswordScreen;
