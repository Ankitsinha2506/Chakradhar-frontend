import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import axiosInstance from '../apis/axiosInstance'; // Import your axios instance
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateAdminParayanScreen = ({ route, navigation }) => {
  const { id, itemData, onUpdateSuccess } = route.params;

  const [formData, setFormData] = useState({
    mainTitle: itemData?.mainTitle || '',
    infoTitle: itemData?.infoTitle || '',
    subInfoTitle: itemData?.subInfoTitle || '',
    content: (itemData?.content || []).join('\n'),
  });

  const [loading, setLoading] = useState(!itemData); // Show loader only if itemData is not available initially

  // Handle the update action
  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
  
      // Ensure content is converted to an array for the API
      const updatedData = {
        ...formData,
        content: formData.content.split('\n'),
      };
  
      // Make the API call using axiosInstance
      const response = await axiosInstance.put(
        `/parayan/update/${id}`,  // No need to specify the full URL here, it uses the baseURL from axiosInstance
        updatedData,
      );
  
      Alert.alert('Success', 'Parayan updated successfully!');
      if (onUpdateSuccess) onUpdateSuccess();
      navigation.goBack();
    } catch (error) {
      console.error('Error updating Parayan:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
      }
      Alert.alert('Error', 'Failed to update Parayan.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Parayan</Text>

      <TextInput
        style={styles.input}
        placeholder="Main Title"
        value={formData.mainTitle}
        onChangeText={(text) => setFormData({ ...formData, mainTitle: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Info Title"
        value={formData.infoTitle}
        onChangeText={(text) => setFormData({ ...formData, infoTitle: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Sub Info Title"
        value={formData.subInfoTitle}
        onChangeText={(text) => setFormData({ ...formData, subInfoTitle: text })}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Content"
        value={formData.content}
        onChangeText={(text) => setFormData({ ...formData, content: text })}
        multiline
        numberOfLines={5}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Parayan</Text>
      </TouchableOpacity>
    </View>
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
  textArea: {
    height: 150,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  updateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UpdateAdminParayanScreen;
