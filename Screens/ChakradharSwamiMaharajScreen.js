import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';

const ChakradharSwamiMaharajScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Title */}
      <Text style={styles.header}>भगवान श्रीचक्रधर स्वामी</Text>

      {/* Image */}
      <Image
        source={require('../assets/infoImage/ShreeChakradharSwami.png')} // Make sure this image is added
        style={styles.image}
      />

      {/* Info Card */}
      <View style={styles.card}>
        <DetailItem label="युग" value="कलियुग" />
        <DetailItem label="अवतार" value="उभयद्रष्ट अवतार" />
        <DetailItem label="अवतार प्रकार" value="पतित उद्धवणे" />
        <DetailItem label="जन्मस्थान" value="भडोच/भरुच (गुजरात)" />
        <DetailItem label="अवतार तिथी" value="भाद्रपद शुद्ध द्वितीया शके ११४५" />
        <DetailItem label="अवतारवेळ" value="दुपारी १२ वाजता" />
        <DetailItem label="आई-वडीलांचे नाव" value="मालिनीदेवी आणि विशालदेव" />
        <DetailItem label="ग्रंथ" value="सिद्धांत सूत्रपाठ" />
        <DetailItem
          label="भक्त"
          value="श्रीनागदेवाचार्य, महाइंभट, बाईसा, गदोनायक, चांगदेवभट, नाथोबा, महादाईसा, जानोपाध्य, निळंभट भांडारकर"
        />
        <DetailItem
          label="कार्य"
          value="जीवोद्धार, ज्ञानदान, व्रत वैकल्याची कर्तवत्ता, कर्मकांड व विषमता घालविणे, समता व मानवतेची शिकवण देऊन स्त्री पुरुष समानता निर्माण करणे."
        />
      </View>
    </ScrollView>
  );
};

// Reusable Info Row
const DetailItem = ({ label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default ChakradharSwamiMaharajScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFCF9',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B2E11',
    textAlign: 'center',
    marginBottom: 16,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: '#A37F1D',
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
    color: '#3E2723',
  },
  value: {
    fontSize: 16,
    color: '#333333',
    marginTop: 4,
    lineHeight: 22,
  },
});
