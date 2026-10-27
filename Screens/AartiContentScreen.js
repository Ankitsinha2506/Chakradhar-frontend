import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axiosInstance from '../apis/axiosInstance'; // Import the axios instance

const AartiContentScreen = ({ route }) => {
  const { subInfoTitle } = route.params; // Retrieve the subInfoTitle from route params
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/get-aarticontent/${subInfoTitle}` // Use axiosInstance to make the request
        );
        console.log("API Response:", response);
        console.log("Response Data:", response.data); // Log the response data for debugging
        setContent(response.data.content); // Assuming the content is under 'content' field
      } catch (err) {
        console.error('Error fetching content:', err); // Log any errors
        setError('Failed to fetch content. Please try again later.');
      } finally {
        setLoading(false); // Stop loading when the API call is complete
      }
    };

    fetchContent();
  }, [subInfoTitle]); // Re-run the effect if subInfoTitle changes

  // Display a loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Content...</Text>
      </View>
    );
  }

  // Display an error message if there was an issue fetching the content
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // If no content is found for the given title
  if (!content) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No content found for "{subInfoTitle}"</Text>
      </View>
    );
  }

  // Display the content once it's successfully fetched
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

export default AartiContentScreen;
