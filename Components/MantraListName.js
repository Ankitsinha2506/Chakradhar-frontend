import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const MantraListName = ({title}) => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.seeAll}>See All</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "white",  
        borderRadius: 10,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,  
      },
      title: {
        fontSize: 15, 
        fontWeight: "700",  
        color: "#333",  
        letterSpacing: 0.5,  
      },
      seeAllButton: {
        backgroundColor: "#FF4500", 
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,  
        shadowColor: "#000",  
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,  
      },
      seeAll: {
        fontSize: 16,  
        color: "#FF8C00",  
        fontWeight: "600",  
        textTransform: "uppercase",  
      },
})

export default MantraListName