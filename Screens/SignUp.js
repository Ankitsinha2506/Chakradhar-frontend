import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import axiosInstance from '../apis/axiosInstance';

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = userCredentials;
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      await axiosInstance.post('/users/signup', {
        name,
        email,
        password,
      });
      setIsLoading(false);
      navigation.navigate('Login');
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7E2C5" />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/ChakradharLogo.png")}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sign Up</Text>
          {/* <Text style={styles.subtitle}>Sign up to get started</Text> */}
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              maxLength={15}
              value={name}
              onChangeText={(val) =>
                setUserCredentials((prev) => ({ ...prev, name: val }))
              }
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#B0B0B0"
              accessibilityLabel="Username input"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(val) =>
                setUserCredentials((prev) => ({ ...prev, email: val }))
              }
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#B0B0B0"
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Email input"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={(val) =>
                  setUserCredentials((prev) => ({ ...prev, password: val }))
                }
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#B0B0B0"
                secureTextEntry={!isPasswordVisible}
                accessibilityLabel="Password input"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIcon}
                accessibilityLabel="Toggle password visibility"
              >
                <Feather
                  name={isPasswordVisible ? 'eye' : 'eye-off'}
                  size={20}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
            disabled={isLoading}
            accessibilityLabel="Sign up button"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.signupButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          {/* LOGIN PROMPT MOVED BELOW SIGNUP BUTTON */}
          <View style={styles.loginPromptBelow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By signing up, you agree to our{'\n'}
            <Text
              style={styles.termsLink}
              onPress={() => navigation.navigate('TermsConditions')}
            >
              Terms & Conditions
            </Text>{' '}
            and{' '}
            <Text
              style={styles.termsLink}
              onPress={() => navigation.navigate('PrivacyPolicy')}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2", // Light orange background
  },
  scrollView: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 70,
    borderWidth: 8,
    borderColor: '#A44826',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#BF360C', // Deep orange
    marginTop: 16,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6D4C41',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#A44826",
    borderRadius: 15,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#4E342E",
    backgroundColor: "#FFFFFF",
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A44826',
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#4E342E',
  },
  eyeIcon: {
    padding: 12,
  },
  signupButton: {
    marginTop: 18,
    height: 50,
    backgroundColor: '#A44826',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#BF360C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    marginBottom: 12,
  },
  signupButtonDisabled: {
    backgroundColor: '#FFAB91',
  },
  signupButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  loginPromptBelow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginText: {
    fontSize: 14,
    color: '#6D4C41',
  },
  loginLink: {
    fontSize: 14,
    color: '#D84315',
    fontWeight: '600',
  },
  socialLoginContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  socialLoginText: {
    fontSize: 14,
    color: '#6D4C41',
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#FFE0B2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  socialIcon: {
    width: 36,
    height: 36,
  },
  termsContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 16,
    color: '#6D4C41',
    textAlign: 'center',
  },
  termsLink: {
    fontSize: 13,
    color: "#D84315",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});


export default SignUp;
