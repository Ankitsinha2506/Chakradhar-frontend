import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Feather } from '@expo/vector-icons';

const HomeSearch = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="#B0B0B0" />
        <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#B0B0B0" keyboardType="default" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        backgroundColor: "#fff", 
        borderRadius: 25, 
        paddingHorizontal: 15, 
        marginHorizontal: 20, 
        marginVertical: 10, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 6, 
        elevation: 5, 
      },
      searchInput: {
        flex: 1,
        height: 40, 
        fontSize: 16, 
        paddingLeft: 10, 
        color: "#333", 
      },
})

export default HomeSearch;
