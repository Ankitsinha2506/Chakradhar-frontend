import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axiosInstance from '../apis/axiosInstance'; // Import the custom axios instance

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(null); // Initially set to null
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP is sent

  // Send OTP request
  const sendOtp = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    try {
      const response = await axiosInstance.post('/users/send-otp', {
        phoneNumber,
      });

      if (response.data.success) {
        setOtp(response.data.otp); // Store the OTP temporarily (for testing)
        setIsOtpSent(true); // Mark OTP as sent
        Alert.alert('OTP Sent', 'An OTP has been sent to your phone number');
      } else {
        Alert.alert('Error', 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  // Verify OTP request
  const verifyOtp = async () => {
    if (enteredOtp === otp) {
      try {
        const response = await axiosInstance.post('/users/verify-otp', {
          phoneNumber,
          enteredOtp,
        });

        if (response.data.success) {
          Alert.alert('Success', 'OTP verified successfully');
        } else {
          Alert.alert('Error', 'OTP verification failed');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to verify OTP');
      }
    } else {
      Alert.alert('Error', 'Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phone Number Authentication</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        maxLength={15}
      />

      <TouchableOpacity style={styles.button} onPress={sendOtp}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>

      {isOtpSent && (
        <View style={styles.otpSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={enteredOtp}
            onChangeText={setEnteredOtp}
            maxLength={6}
          />

          <TouchableOpacity style={styles.button} onPress={verifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  otpSection: {
    marginTop: 20,
    width: '100%',
  },
});

export default PhoneAuthScreen;
