import { View, Text,StyleSheet, TouchableOpacity,Image } from 'react-native'
import React from 'react'

const HomeMiddleIcons = () => {
  return (
    <View style={styles.buttonContainer}>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Posts</Text>
      </TouchableOpacity>

      <Image
        source={require("../assets/chakradhar.jpeg")} 
        style={styles.image}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Videos</Text>
      </TouchableOpacity> 
      
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    padding: 10, 
  },
  button: {
    backgroundColor: '#FF4500', 
    borderRadius: 10, 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    alignItems: 'center',
    justifyContent: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 6,
    elevation: 5, 
  },
  buttonText: {
    color: 'white', 
    fontSize: 16,
    fontWeight: 'bold', 
  },
  image: {
    width: 80, 
    height: 80,
    resizeMode: "contain", 
    marginHorizontal: 10, 
  },
})


export default HomeMiddleIcons