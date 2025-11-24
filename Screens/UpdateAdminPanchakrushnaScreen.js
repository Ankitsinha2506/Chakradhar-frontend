import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance'; // Import the axios instance
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateAdminPanchakrushnaScreen = ({ route, navigation }) => {
  const { id, itemData, onUpdateSuccess } = route.params;
  console.log("id : ", id);

  // Initialize sanskritInfo and marathiInfo as arrays
  const [formData, setFormData] = useState({
    mainTitle: itemData?.mainTitle || '',
    subtitle: itemData?.subtitle || '',
    sanskritInfo: itemData?.sanskritInfo || [],
    marathiInfo: itemData?.marathiInfo || [],
    image: itemData?.image || '',
  });

  const [loading, setLoading] = useState(!itemData); // Show loader only if itemData is not available initially

  // Handle the update action
  const handleUpdate = async () => {
    try {
      console.log('Updating Panchakrushna with ID:', id);
      const token = await AsyncStorage.getItem('userToken');
  
      // Join sanskritInfo and marathiInfo arrays into a single string before sending
      const updatedFormData = {
        ...formData,
        sanskritInfo: formData.sanskritInfo.join('\n'), // Join array elements with newlines
        marathiInfo: formData.marathiInfo.join('\n'),   // Join array elements with newlines
      };
  
      // Make the API call using axiosInstance
      const response = await axiosInstance.put(
        `/panchakrushna/update/${id}`,
        updatedFormData,
      );
  
      console.log('Update Successful:', response.data);
  
      Alert.alert('Success', 'Panchakrushna updated successfully!');
      if (onUpdateSuccess) onUpdateSuccess();
      navigation.goBack();
    } catch (error) {
      console.error('Error updating Panchakrushna:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
      }
      Alert.alert('Error', 'Failed to update Panchakrushna.');
    }
  };

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  // Function to handle text changes and update the corresponding array (sanskritInfo or marathiInfo)
  const handleContentChange = (field, value) => {
    const newContent = value.split('\n'); // Split by newlines to create an array
    setFormData({ ...formData, [field]: newContent });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Update Panchakrushna</Text>

      <TextInput
        style={styles.input}
        placeholder="Main Title"
        value={formData.mainTitle}
        onChangeText={(text) => setFormData({ ...formData, mainTitle: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Subtitle"
        value={formData.subtitle}
        onChangeText={(text) => setFormData({ ...formData, subtitle: text })}
      />

      {/* Large single input for Sanskrit Info (Content as array) */}
      <Text style={styles.subTitle}>Sanskrit Info:</Text>
      <TextInput
        style={[styles.input, styles.largeInput]}
        placeholder="Enter Sanskrit Info"
        value={formData.sanskritInfo.join('\n')}  // Join array elements with newlines for display
        onChangeText={(text) => handleContentChange('sanskritInfo', text)}
        multiline
        numberOfLines={10}  // Allow more lines for Sanskrit Info
      />

      {/* Large single input for Marathi Info (Content as array) */}
      <Text style={styles.subTitle}>Marathi Info:</Text>
      <TextInput
        style={[styles.input, styles.largeInput]}
        placeholder="Enter Marathi Info"
        value={formData.marathiInfo.join('\n')}  // Join array elements with newlines for display
        onChangeText={(text) => handleContentChange('marathiInfo', text)}
        multiline
        numberOfLines={10}  // Allow more lines for Marathi Info
      />

      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={formData.image}
        onChangeText={(text) => setFormData({ ...formData, image: text })}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Panchakrushna</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#007BFF',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  largeInput: {
    height: 200, // Larger input field for the content
    textAlignVertical: 'top', // Ensures text starts from the top
  },
  updateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UpdateAdminPanchakrushnaScreen;
