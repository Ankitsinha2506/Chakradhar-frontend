import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../apis/axiosInstance';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const BhagvatGitaAdminScreen = () => {
  const [bhagvatGitaData, setBhagvatGitaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/bhagavatgita/read');
      const formattedData = response.data.map((item) => ({
        ...item,
        id: item._id,
      }));
      setBhagvatGitaData(formattedData);
    } catch (error) {
      console.error('Error fetching data: ', error);
      Alert.alert('Error', 'Failed to fetch Bhagvat Gita data.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigation.navigate('AddBhagvatGitaAdminScreen', { onAddSuccess: fetchData });
  };

  const handleUpdate = (item) => {
    navigation.navigate('UpdateBhagvatGitaAdminScreen', {
      id: item.id,
      itemData: item,
      onUpdateSuccess: fetchData,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/bhagavatgita/delete/${id}`);
      Alert.alert('Success', 'Bhagvat Gita deleted successfully.');
      fetchData();
    } catch (error) {
      console.error('Error deleting data: ', error);
      Alert.alert('Error', 'Failed to delete Bhagvat Gita.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.header}>
        <Text style={styles.headerText}>Manage Bhagvat Gita</Text>
      </LinearGradient>
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <FontAwesome name="plus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Add Bhagvat Gita</Text>
        </TouchableOpacity>

        {bhagvatGitaData.length > 0 ? (
          bhagvatGitaData.map((item, index) => (
            <View key={index} style={styles.card}>
              {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
              <Text style={styles.mainTitle}>{item.mainTitle}</Text>
              <Text style={styles.infoTitle}>{item.subtitle}</Text>
              <Text style={styles.subInfoTitle}>{item.content}</Text>              
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdate(item)}>
                  <FontAwesome name="edit" size={18} color="#fff" />
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                  <FontAwesome name="trash" size={18} color="#fff" />
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No Bhagvat Gita data available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: '95%',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  subInfoTitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 18,
    color: '#444',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC3545',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  noDataText: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default BhagvatGitaAdminScreen;