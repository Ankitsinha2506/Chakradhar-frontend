import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';

const GovindPrabhuMaharajScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Title */}
      <Text style={styles.header}>श्री गोविंद प्रभु महाराज</Text>

      {/* Image */}
      <Image
        source={require('../assets/infoImage/shreeGovindPrabhu.jpeg')} // Make sure this image exists in your project
        style={styles.image}
      />

      {/* Info Card */}
      <View style={styles.card}>
        <DetailItem label="युग" value="कलियुग" />
        <DetailItem label="अवतार" value="अच्छादनिचा परदृश्य अवतार" />
        <DetailItem label="अवतार प्रकार" value="द्वदश्याचा" />
        <DetailItem label="जन्मस्थान" value="मातुलग्राम / कसली जी. अमरावती" />
        <DetailItem label="जन्मतिथी" value="भाद्रपद शुद्ध द्वादशी" />
        <DetailItem label="जन्मवेळ" value="रात्री ९ वा." />
        <DetailItem label="आई-वडीलांचे नाव" value="नेमाईसा आणि अनंतनायक" />
        <DetailItem
          label="भक्त"
          value="पं म्हाईंभट, रामदरशन, कोठाळोबा, लक्ष्मीभट, आबाईसा, महादाईसा, साधाईसा इ."
        />
        <DetailItem
          label="कार्य"
          value="कर्मकांड व जातितत्वाची तीव्रता कमी केली. प्रतीदिनी ७ जीवांची अविधा छेद केली."
        />
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

export default GovindPrabhuMaharajScreen;

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
