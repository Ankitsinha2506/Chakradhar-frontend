import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';

const ShreeKrishnaMaharajDetailsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Title */}
      <Text style={styles.header}>पंचकृष्ण : भगवान श्रीकृष्ण चक्रवर्ती</Text>

      {/* Image */}
      <Image
        source={require('../assets/infoImage/GopalKrishna.jpeg')}
        style={styles.image}
      />

      {/* Info Card */}
      <View style={styles.card}>
        <DetailItem label="युग" value="द्वापर युग" />
        <DetailItem label="अवतार" value="उभयदृष्ट्य अवतार" />
        <DetailItem label="अवतार प्रकार" value="गर्भीचा" />
        <DetailItem label="जन्मस्थान" value="मथुरा (उत्तर प्रदेश)" />
        <DetailItem label="जन्मतिथी" value="श्रावण वद्य अष्टमी" />
        <DetailItem label="जन्मवेळ" value="रात्रि १२ वाजता" />
        <DetailItem
          label="निवास"
          value="मथुरा, गोकुळ, वृंदावन, बरासाना,\nअमरावती, फलटण, द्वारावती / द्वारका"
        />
        <DetailItem label="आई-वडीलांचे नाव" value="देवकी आणि वसुदेव" />
        <DetailItem label="पालकांचे नाव" value="यशोदा आणि नंदबाबा" />
        <DetailItem label="ग्रंथ" value="श्रीमद् भगवद् गीता" />
        <DetailItem label="भक्त" value="उद्धव, अर्जुन, विदुर, रुक्मिणी" />
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

export default ShreeKrishnaMaharajDetailsScreen;

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
