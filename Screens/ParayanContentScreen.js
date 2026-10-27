import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axiosInstance from '../apis/axiosInstance'; // Import the axios instance

const ParayanContentScreen = ({ route }) => {
  const { subInfoTitle } = route.params; // Get the subInfoTitle from the route params
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axiosInstance.get(`/users/get-parayancontent/${subInfoTitle}`); 
        console.log("API Response:", response);
        console.log("Response Data:", response.data); // Data is an array of main titles
        setContent(response.data.content); // Assuming the content is under 'content' field
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to fetch content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [subInfoTitle]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Content...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No content found for "{subInfoTitle}"</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{subInfoTitle}</Text>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  container: {
    width: "100%",
    maxWidth: 800,
    alignSelf: "center",
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
  },
});

export default ParayanContentScreen;
