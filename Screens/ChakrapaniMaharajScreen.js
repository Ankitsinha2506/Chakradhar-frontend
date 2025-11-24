import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';

const ChakrapaniMaharajDetailsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Title */}
      <Text style={styles.header}>भगवान श्री चक्रपाणी महाराज</Text>

      {/* Image */}
      <Image
        source={require('../assets/infoImage/Chakrapani.jpeg')} // Make sure this image exists
        style={styles.image}
      />

      {/* Info Card */}
      <View style={styles.card}>
        <DetailItem label="युग" value="कलियुग" />
        <DetailItem label="अवतार" value="अच्‍छादनिचा अवर्दृष्य अवतार" />
        <DetailItem label="अवतार प्रकार" value="गर्भीचा" />
        <DetailItem label="जन्मस्थान" value="फलटण (सातारा)" />
        <DetailItem label="जन्मतिथी" value="आश्विन वद्य नवमी" />
        <DetailItem label="जन्मवेळ" value="सकाळी ९ वाजता" />
        <DetailItem label="आई-वडीलांचे नाव" value="जनका आईसा आणि जनका नायक" />
        <DetailItem
          label="निवास"
          value="फलटण, मलकंठ, माहूर, द्वारावती / द्वारका"
        />
        <DetailItem
          label="भक्त"
          value="५२ पुरुषांना दिक्षा, ४८ पुरुषांना शिवविद्या दिली"
        />
        <DetailItem
          label="इतर नावे"
          value="उध्किनाथ, अनंतमुनी, दुंडीराज इत्यादी"
        />
        <DetailItem label="उद्देश" value="शुद्ध वाणी आणि शुद्ध आचरण राखणे" />
      </View>
    </ScrollView>
  );
};

// Reusable Info Component
const DetailItem = ({ label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default ChakrapaniMaharajDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF4',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B3711',
    textAlign: 'center',
    marginBottom: 16,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#D4AF37',
    alignSelf: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  detailItem: {
    marginBottom: 16,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    color: '#4E342E',
  },
  value: {
    fontSize: 16,
    color: '#333333',
    marginTop: 4,
    lineHeight: 22,
  },
});
