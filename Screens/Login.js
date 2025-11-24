import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../apis/axiosInstance";

const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { email, password } = loginCredentials;
  const navigation = useNavigation();

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        setLoading(false);
        setIsLoggedIn(true);

        const token = data.token;
        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userEmail", email.trim().toLowerCase());

        axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

        const userEmail = email.trim().toLowerCase();
        const superAdminEmail = "superadmin@gmail.com";
        const adminEmailPattern = /^admin[\w\d]*@gmail\.com$/;

        if (userEmail === superAdminEmail) {
          setIsAdmin(true);
          navigation.reset({
            index: 0,
            routes: [{ name: "SuperAdminHomeScreen" }],
          });
        } else if (adminEmailPattern.test(userEmail)) {
          setIsAdmin(true);
          navigation.reset({
            index: 0,
            routes: [{ name: "AdminHome" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
      } else {
        setLoading(false);
        Alert.alert("Error", data.message || "Something went wrong.");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Error",
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7E2C5" />
      <ScrollView style={styles.scrollView}>
        
        <Image
          style={styles.logo}
          source={require("../assets/ChakradharLogo.png")}
          resizeMode="contain"
        />
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(val) =>
              setLoginCredentials({ ...loginCredentials, email: val })
            }
            keyboardType="email-address"
            style={styles.emailInput}
            placeholder="Enter your email"
            placeholderTextColor="#B0B0B0"
            autoCapitalize="none"
            accessibilityLabel="Email input"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={(val) =>
                setLoginCredentials({ ...loginCredentials, password: val })
              }
              secureTextEntry={!isPasswordVisible}
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#B0B0B0"
              accessibilityLabel="Password input"
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
              accessibilityLabel="Toggle password visibility"
            >
              <Feather
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={20}
                color="#000000"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rememberForgotContainer}>
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() =>
                navigation.navigate("ForgetPasswordScreen", {
                  email: loginCredentials.email,
                })
              }
            >
              <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={loginUser}
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            disabled={loading}
            accessibilityLabel="Login button"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUpLink}>Sign Up Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.socialIconButton}>
            {/* <Image
              source={require("../assets/googleicon.webp")}
              style={styles.socialIcon}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIconButton}>
            {/* <FontAwesome5 name="facebook" size={24} color="#4267B2" /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIconButton}>
            {/* <FontAwesome5 name="phone" size={24} color="#F57C00" /> */}
          </TouchableOpacity>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>By continuing, you agree to our</Text>
          <View style={styles.termsLinks}>
            <TouchableOpacity
              onPress={() => navigation.navigate("TermsConditions")}
            >
              <Text style={styles.highlightedText}>Terms & Conditions</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}> | </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("PrivacyPolicy")}
            >
              <Text style={styles.highlightedText}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}> | </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("CookiesPolicy")}
            >
              <Text style={styles.highlightedText}>Cookies Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE5B4", // Light orange background
  },
  scrollView: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 24,
  },
  logo: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: "#FF7043",
    marginBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    color: "#BF360C", // Deep orange
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    color: "#6D4C41",
    marginBottom: 8,
    marginTop: 16,
  },
  emailInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#FF7043",
    borderRadius: 15,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#4E342E",
    backgroundColor: "#FFF3E0",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF7043",
    borderRadius: 15,
    backgroundColor: "#FFF3E0",
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#4E342E",
  },
  eyeIcon: {
    padding: 12,
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    marginBottom: 16,
  },
  forgotPassword: {
    paddingVertical: 4,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#D84315",
    fontWeight: "500",
  },
  loginButton: {
    height: 50,
    backgroundColor: "#FF7043",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#BF360C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  loginButtonDisabled: {
    backgroundColor: "#FFAB91",
  },
  loginButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    fontSize: 14,
    color: "#6D4C41",
  },
  signUpLink: {
    fontSize: 14,
    color: "#D84315",
    fontWeight: "600",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    gap: 10,
  },
  socialIconButton: {
    width: 50,
    height: 50,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
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
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 16,
    color: "#6D4C41",
  },
  termsLinks: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  highlightedText: {
    fontSize: 14,
    color: "#D84315",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});


export default Login;