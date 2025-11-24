import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CookiesPolicy = () => {
  const navigation = useNavigation();
  const [showConsentBanner, setShowConsentBanner] = useState(true);

  const handleUnderstood = () => {
    setShowConsentBanner(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Cookies Policy</Text>
        <Text style={styles.text}>
          This Cookies Policy explains what cookies are, how we use them, and your choices regarding cookies.
        </Text>
        <Text style={styles.subtitle}>What Are Cookies?</Text>
        <Text style={styles.text}>
          Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
        </Text>
        <Text style={styles.subtitle}>How We Use Cookies</Text>
        <Text style={styles.text}>We use cookies for various purposes, including:</Text>
        <Text style={styles.listItem}>- To enable certain functions of the service</Text>
        <Text style={styles.listItem}>- To provide analytics</Text>
        <Text style={styles.listItem}>- To store your preferences</Text>
        <Text style={styles.listItem}>- To enable advertisements delivery, including behavioral advertising</Text>
        <Text style={styles.subtitle}>Your Choices Regarding Cookies</Text>
        <Text style={styles.text}>
          If you prefer to avoid the use of cookies on the website, you can disable cookies in your browser settings. However, please note that disabling cookies may affect the functionality of the website and your ability to use certain features.
        </Text>
        <Text style={styles.subtitle}>Changes to This Cookies Policy</Text>
        <Text style={styles.text}>
          We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new Cookies Policy on this page.
        </Text>
        <Text style={styles.text}>
          You are advised to review this Cookies Policy periodically for any changes. Changes to this Cookies Policy are effective when they are posted on this page.
        </Text>
        <Text style={styles.subtitle}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about this Cookies Policy, please contact us at support@example.com.
        </Text>
      </ScrollView>

      {showConsentBanner && (
        <View style={styles.consentBanner}>
          <Text style={styles.consentText}>
            We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleUnderstood}>
              <Text style={styles.buttonText}>Yes, I Understood</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1', // Light soft background
    paddingTop: 20,
  },
  content: {
    paddingHorizontal: 25,
    paddingBottom: 120, // Ensures content is not covered by consent banner
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#6A3F6B', // Divine purple color
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6A3F6B',
    marginTop: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  listItem: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 10,
    color: '#555',
  },
  consentBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 2,
    borderTopColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  consentText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#6A3F6B', // Divine purple accent color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 10,
    minWidth: 180, // Adjusted width for the text to fit
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CookiesPolicy;
