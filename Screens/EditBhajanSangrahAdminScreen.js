import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance'; // Import the axios instance

const EditBhajanSangrahAdminScreen = ({ route, navigation }) => {
  const { id, itemData, onUpdateSuccess } = route.params;
  console.log("id : ", id);

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
      console.log('Updating Bhajan Sangrah with ID:', id);

      // Ensure content is converted to an array for the API
      const updatedData = {
        ...formData,
        content: formData.content.split('\n'),
      };

      console.log('Updated Data:', updatedData);

      // Make the API call using the axios instance
      const response = await axiosInstance.put(
        `/bhajanSangrah/update/${id}`,
        updatedData
      );

      console.log('Update Successful:', response.data);

      Alert.alert('Success', 'Bhajan Sangrah updated successfully!');
      if (onUpdateSuccess) onUpdateSuccess();
      navigation.goBack();
    } catch (error) {
      console.error('Error updating Bhajan Sangrah:', error);
      Alert.alert('Error', 'Failed to update Bhajan Sangrah.');
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Bhajan Sangrah</Text>

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
        <Text style={styles.buttonText}>Update Bhajan Sangrah</Text>
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

export default EditBhajanSangrahAdminScreen;
