import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import axiosInstance from '../apis/axiosInstance'; // Import axiosInstance
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAartiSangrahAdminScreen = ({ navigation, route }) => {
  const [formData, setFormData] = useState({
    mainTitle: '',
    infoTitle: '',
    subInfoTitle: '',
    content: [''],
  });

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      const response = await axiosInstance.post(
        '/aartiSangrah/create', // Use the axiosInstance here
        { ...formData, content: formData.content.filter(item => item.trim() !== '') }
      );

      Alert.alert('Success', 'Aarti Sangrah content added successfully!');

      // Trigger the refresh in AartiSangrahScreenAdmin after adding
      if (route.params?.onAddSuccess) {
        route.params.onAddSuccess(); // Call fetchData function to refresh data
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error adding Aarti Sangrah: ', error);
      Alert.alert('Error', 'Failed to add Aarti Sangrah content.');
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleContentChange = (value, index) => {
    const updatedContent = [...formData.content];
    updatedContent[index] = value;
    setFormData({ ...formData, content: updatedContent });
  };

  const handleAddContent = () => {
    setFormData({ ...formData, content: [...formData.content, ''] });
  };

  const handleRemoveContent = (index) => {
    const updatedContent = formData.content.filter((_, i) => i !== index);
    setFormData({ ...formData, content: updatedContent });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add New Aarti Sangrah</Text>

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
          placeholder="Info Title"
          value={formData.infoTitle}
          onChangeText={(text) => handleChange('infoTitle', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Sub Info Title"
          value={formData.subInfoTitle}
          onChangeText={(text) => handleChange('subInfoTitle', text)}
        />
      </View>

      <Text style={styles.contentHeader}>Content</Text>
      {formData.content.map((contentItem, index) => (
        <View key={index} style={styles.contentInputContainer}>
          <TextInput
            style={styles.contentInput}
            placeholder={`Content Line ${index + 1}`}
            value={contentItem}
            onChangeText={(text) => handleContentChange(text, index)}
            multiline
            numberOfLines={4}  // You can adjust this for more or fewer lines
          />
          <TouchableOpacity onPress={() => handleRemoveContent(index)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddContent}>
        <Text style={styles.buttonText}>Add Content Line</Text>
      </TouchableOpacity>

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
  contentHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  contentInputContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentInput: {
    flex: 1,
    height: 120, // Increased height to allow more space for longer content
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginRight: 10,
    textAlignVertical: 'top', // Ensures text aligns from the top
  },
  removeButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
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

export default AddAartiSangrahAdminScreen;
