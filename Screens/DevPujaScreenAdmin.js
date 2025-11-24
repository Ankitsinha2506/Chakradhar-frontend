import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../apis/axiosInstance';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const DevPujaAdminScreen = () => {
  const [devPujaData, setDevPujaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/devpuja/read');
      const formattedData = response.data.map((item) => ({
        ...item,
        id: item._id,
      }));
      setDevPujaData(formattedData);
    } catch (error) {
      console.error('Error fetching data: ', error);
      Alert.alert('Error', 'Failed to fetch Dev Puja data.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigation.navigate('AddDevPujaAdminScreen', { onAddSuccess: fetchData });
  };

  const handleUpdate = (item) => {
    navigation.navigate('UpdateDevPujaAdminScreen', {
      id: item.id,
      itemData: item,
      onUpdateSuccess: fetchData,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/devpuja/delete/${id}`);
      Alert.alert('Success', 'Dev Puja deleted successfully.');
      fetchData();
    } catch (error) {
      console.error('Error deleting data: ', error);
      Alert.alert('Error', 'Failed to delete Dev Puja.');
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
        <Text style={styles.headerText}>Manage Dev Puja</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <FontAwesome name="plus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Add Dev Puja</Text>
        </TouchableOpacity>

        {devPujaData.length > 0 ? (
          devPujaData.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.mainTitle}>{item.mainTitle}</Text>
              <Text style={styles.infoTitle}>{item.subtitle}</Text>
              <Text style={styles.contentText}>{item.content}</Text>
              
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
          <Text style={styles.noDataText}>No Dev Puja data available.</Text>
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
    padding: 15,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  subInfoTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC3545',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  noDataText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default DevPujaAdminScreen;