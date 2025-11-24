import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import axiosInstance from '../apis/axiosInstance'; // Import the custom axios instance
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPanchakrushnaAdminScreen = ({ navigation, route }) => {
  const [formData, setFormData] = useState({
    mainTitle: '',
    subtitle: '',
    sanskritInfo: [''],
    marathiInfo: [''],
    image: '',
  });

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      // Use axiosInstance to send the request
      const response = await axiosInstance.post(
        '/panchakrushna/create', // Endpoint for creating Panchakrushna
        formData
      );

      Alert.alert('Success', 'PanchaKrushna added successfully!');

      // Trigger the refresh in PanchakrushnaAdminScreen after adding
      if (route.params?.onAddSuccess) {
        route.params.onAddSuccess(); // Call fetchData function to refresh data
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error adding Panchakrushna: ', error);
      Alert.alert('Error', 'Failed to add PanchaKrushna.');
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add New PanchaKrushna</Text>

      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Main Title"
          value={formData.mainTitle}
          onChangeText={(text) => handleChange('mainTitle', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Subtitle"
          value={formData.subtitle}
          onChangeText={(text) => handleChange('subtitle', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Sanskrit Info"
          value={formData.sanskritInfo}
          onChangeText={(text) => handleChange('sanskritInfo', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <TextInput
          style={[styles.input, styles.largeInput]}
          placeholder="Marathi Info"
          value={formData.marathiInfo}
          onChangeText={(text) => handleChange('marathiInfo', text)}
          multiline
          numberOfLines={10}  // Allow more lines
        />
      </View>

      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={formData.image}
          onChangeText={(text) => handleChange('image', text)}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007BFF',
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  largeInput: {
    height: 200, // Increased height for larger input field
    textAlignVertical: 'top', // Ensures text starts from the top
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPanchakrushnaAdminScreen;