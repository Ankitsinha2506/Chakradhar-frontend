import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const TermsConditions = () => {

  const navigation = useNavigation()
  const handleiagree = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.text}>
          Please read these terms and conditions carefully before using our app.
        </Text>
        
        <Text style={styles.subtitle}>1. Introduction</Text>
        <Text style={styles.text}>
          These Terms and Conditions govern your use of our app. By accessing or using the app, you agree to be bound by these terms.
        </Text>

        <Text style={styles.subtitle}>2. User Responsibilities</Text>
        <Text style={styles.text}>
          You are responsible for maintaining the confidentiality of your account and password. You must immediately notify us of any unauthorized use of your account.
        </Text>

        <Text style={styles.subtitle}>3. Privacy Policy</Text>
        <Text style={styles.text}>
          Our Privacy Policy governs the collection and use of personal data. Please review it carefully.
        </Text>

        <Text style={styles.subtitle}>4. Disclaimers</Text>
        <Text style={styles.text}>
          We do not guarantee the accuracy, completeness, or reliability of the content provided in the app. Use the app at your own risk.
        </Text>

        <Text style={styles.subtitle}>5. Changes to Terms</Text>
        <Text style={styles.text}>
          We reserve the right to update these terms at any time. Please review this page periodically for any updates.
        </Text>

        <Text style={styles.subtitle}>6. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about these Terms and Conditions, please contact us at support@example.com.
        </Text>

        <Text style={styles.disclaimer}>
          By using this app, you agree to the terms outlined above.
        </Text>
      </ScrollView>

      <TouchableOpacity style={styles.acceptButton} onPress={handleiagree}>
        <Text style={styles.acceptButtonText}>I Agree</Text>
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

export default TermsConditions;
