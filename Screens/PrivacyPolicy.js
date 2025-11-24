import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const PrivacyPolicy = () => {

  const navigation = useNavigation();
  const handleAgree = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.text}>
          Your privacy is important to us. This privacy policy explains how we collect,
          use, and protect your personal information. By using our app, you agree to the
          terms outlined in this policy.
        </Text>

        <Text style={styles.subtitle}>1. Information Collection</Text>
        <Text style={styles.text}>
          We may collect personal information such as name, email, and other necessary
          details when you sign up or interact with our app.
        </Text>

        <Text style={styles.subtitle}>2. Use of Information</Text>
        <Text style={styles.text}>
          The collected information is used to improve the app experience, communicate
          with users, and offer personalized content.
        </Text>

        <Text style={styles.subtitle}>3. Data Protection</Text>
        <Text style={styles.text}>
          We implement appropriate security measures to protect your data from unauthorized
          access, alteration, or deletion.
        </Text>

        <Text style={styles.subtitle}>4. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or concerns about our privacy policy, feel free to
          contact us at [email address].
        </Text>

        <Text style={styles.disclaimer}>
          By using this app, you agree to the privacy policy outlined above.
        </Text>
      </ScrollView>

      <TouchableOpacity style={styles.acceptButton} onPress={handleAgree}>
        <Text style={styles.acceptButtonText}>Yes, I understood Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9', // Soft neutral background color
    paddingTop: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 80, // To avoid overlap with button
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4A3F8A', // Elegant dark purple for title
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#6A3F6B', // Divine purple for subtitles
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333', // Dark text for readability
    marginBottom: 15,
  },
  disclaimer: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  acceptButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#6A3F6B', // Divine purple button
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PrivacyPolicy;
