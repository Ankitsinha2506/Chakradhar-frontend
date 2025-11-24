// TiroDevanagariMarathi-Regular.ttf


import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';

const DattaPrabhuMaharajScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>भगवान श्रीदत्तात्रेय प्रभु</Text>

      {/* Image */}
      <Image
        source={require('../assets/infoImage/DattaTraye.jpeg')}
        style={styles.image}
      />

      {/* Info Section */}
      <View style={styles.card}>
        <DetailItem label="युग" value="त्रेतायुग (कृतयुगाचे शेवटचे चरण)" />
        <DetailItem label="अवतार" value="उभयदृष्ट अवतार" />
        <DetailItem label="अवतार प्रकार" value="गर्भीचा" />
        <DetailItem label="जन्म तिथी" value="मार्गशीर्ष शुद्ध चतुर्दशी" />
        <DetailItem label="जन्मवेळ" value="प्रात: ४ वा" />
        <DetailItem label="आई-वडीलांचे नाव" value="अनसूया आणि अत्रीऋषी" />
        <DetailItem label="निवास" value="माहूर, पांडवगड, बद्रिकाश्रम" />
        <DetailItem label="ग्रंथ" value="२४ गुरुंचे व्याख्यान" />
        <DetailItem
          label="भक्त"
          value={`यदुराज, अलर्क, सहस्त्रार्जुन,\nमदालसा, आदि शंकराचार्य,\nपरशुराम, पंडित विद्याधर व्यास,\nबाळापूरकर इ.`}
        />
        <DetailItem
          label="दैनंदिनी"
          value={`स्नान: वाराणशी काशी,\nपुराणश्रवण: बद्रिकाश्रम,\nभिक्षा: कोल्हापूर,\nभोजन: पांडवगड,\nनिद्रा: माहूर`}
        />
      </View>
    </ScrollView>
  );
};

const DetailItem = ({ label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default DattaPrabhuMaharajScreen;

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
    borderWidth: 2,
    borderColor: '#D4AF37',
    alignSelf: 'center',
    marginBottom: 20,
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
