import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Make sure this is installed

const data = [
  {
    id: 'ShrikrishnaScreen',
    title: 'श्रीकृष्ण महाराज',
    image: require('../assets/infoImage/GopalKrishna.jpeg'),
  },
  {
    id: 'DattaPrabhuScreen',
    title: 'श्री दत्त प्रभू महाराज',
    image: require('../assets/infoImage/DattaTraye.jpeg'),
  },
  {
    id: 'ChakrapaniScreen',
    title: 'श्री चक्रपाणी महाराज',
    image: require('../assets/infoImage/Chakrapani.jpeg'),
  },
  {
    id: 'GovindPrabhuScreen',
    title: 'श्री गोविंद प्रभू महाराज',
    image: require('../assets/Govind.png'),
  },
  {
    id: 'ChakradharSwamiScreen',
    title: 'श्री चक्रधर स्वामी महाराज',
    image: require('../assets/infoImage/ShreeChakradharSwami.png'),
  },
];

const CardItem = ({ item, navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = () => {
    navigation.navigate(item.id); // Navigate to the screen using route name
  };

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.innerCard} onPress={handlePress}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#3E2C00" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const PanchavtaarScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <CardItem item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
};

export default PanchavtaarScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    flex: 1,
    backgroundColor: '#FAF7F2',
    paddingHorizontal: 16,
  },
  card: {
    marginVertical: 8,
    borderRadius: 50,
    backgroundColor: '#FFE7B2',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  innerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
    marginRight: 16,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3E2C00',
  },
});
