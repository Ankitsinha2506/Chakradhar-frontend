import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import SignUp from "./Screens/SignUp";
import Login from "./Screens/Login";
import BottomNavigationBar from "./Navigations/BottomNavigationBar";
import ParayanScreen from "./Screens/ParayanScreen";
import DevPujaScreen from "./Screens/DevPujaScreen";
import PanchaKrushnaScreen from "./Screens/PanchaKrushnaScreen";
import BhajanSangrahScreen from "./Screens/BhajanSangrahScreen";
import AartiSangrahScreen from "./Screens/AartiSangrahScreen";
import BhagavatGeetaScreen from "./Screens/BhagavatGeetaScreen";
import DinDarshikaScreen from "./Screens/DinDarshikaScreen";
import VideoScreen from "./Screens/VideoScreen";
import SplashScreen from "./Screens/SplashScreen";
import InfoPageOne from "./Screens/InfoPageOne";
import InfoPageTwo from "./Screens/InfoPageTwo";
import InfoPageThree from "./Screens/InfoPageThree";
import TempleMapInfo from "./Screens/TempleMapInfo";
import AdminHomeScreen from "./Screens/AdminHomeScreen";
import ParayanSubInfoScreen from "./Screens/ParayanSubInfoScreen";
import ParayanContentScreen from "./Screens/ParayanContentScreen";
import BhajanSubInfoScreen from "./Screens/BhajanSubInfoScreen";
import BhajanContentScreen from "./Screens/BhajanContentScreen";
import AartiSunInfoScreen from "./Screens/AartiSunInfoScreen";
import AartiContentScreen from "./Screens/AartiContentScreen";
import BhagavatGitaContentScreen from "./Screens/BhagavatGitaContentScreen";
import DevPujaContentScreen from "./Screens/DevPujaContentScreen";
import PanchaKrushnaContentScreen from "./Screens/PanchaKrushnaContentScreen";
import AdminAllUserScreens from "./Screens/AdminAllUserScreens";
import AdminUpdateUserScreen from "./Screens/AdminUpdateUserScreen";
import SuperAdminHomeScreen from "./Screens/SuperAdminHomeScreen";
import SuperAdminUserScreen from "./Screens/SuperAdminUserScreen";
import CreateAdminUserScreen from "./Screens/CreateAdminUserScreen";
import AdminUserCreateScreen from "./Screens/AdminUserCreateScreen";
import AdminViewContentScreen from "./Screens/AdminViewContentScreen";
import ParayanAdminScreen from "./Screens/ParayanAdminScreen";
import AartiSangrahScreenAdminScreen from "./Screens/AartiSangrahScreenAdminScreen";
import BhajanSangrahScreenAdmin from "./Screens/BhajanSangrahScreenAdmin";
import DevPujaScreenAdmin from "./Screens/DevPujaScreenAdmin";
import PanchakrushnaScreenAdmin from "./Screens/PanchakrushnaScreenAdmin";
import BhagvatGitaAdminScreen from "./Screens/BhagvatGitaAdminScreen";
import UpdateAdminParayanScreen from "./Screens/UpdateAdminParayanScreen";
import AddParayanAdminScreen from "./Screens/AddParayanAdminScreen";
import AddAartiSangrahAdmin from "./Screens/AddAartiSangrahAdmin";
import EditAartiSangrahAdmin from "./Screens/EditAartiSangrahAdmin";
import AddBhajanSangrahAdminScreen from "./Screens/AddBhajanSangrahAdminScreen";
import EditBhajanSangrahAdminScreen from "./Screens/EditBhajanSangrahAdminScreen";
import AddDevPujaAdminScreen from "./Screens/AddDevPujaAdminScreen";
import UpdateDevPujaAdminScreen from "./Screens/UpdateDevPujaAdminScreen";
import AddBhagvatGitaAdminScreen from "./Screens/AddBhagvatGitaAdminScreen";
import UpdateBhagvatGitaAdminScreen from "./Screens/UpdateBhagvatGitaAdminScreen";
import UpdateAdminPanchakrushnaScreen from "./Screens/UpdateAdminPanchakrushnaScreen";
import AddPanchakrushnaAdminScreen from "./Screens/AddPanchakrushnaAdminScreen";
import EditProfileScreen from "./Screens/EditProfileScreen";
import ForgetPasswordScreen from "./Screens/ForgetPasswordScreen";
import FetchPasswordScreen from "./Screens/FetchPasswordScreen";
import { LinearGradient } from "expo-linear-gradient";
import SettingsScreen from "./Screens/Settings";
import TempleList from "./Screens/TempleList";
import TermsConditions from "./Screens/TermsConditions";
import PrivacyPolicy from "./Screens/PrivacyPolicy";
import CookiesPolicy from "./Screens/CookiesPolicy";
import SuperAdminUserAdminScreen from "./Screens/SuperAdminUserAdminScreen";
import PhoneAuthScreen from "./Screens/PhoneAuthScreen";
import SwamiInfoPage from "./Screens/SwamiInfoPage";
import PanchaAvatarScreen from './Screens/PanchavtaarScreen'
import ShrikrishnaScreen from './Screens/ShreeKrishnaMaharajDetailsScreen'
import DattaPrabhuScreen from './Screens/DattaPrabhuMaharajScreen'
import ChakrapaniScreen from './Screens/ChakrapaniMaharajScreen'
import GovindPrabhuScreen from './Screens/GovindPrabhuMaharajScreen'
import ChakradharSwamiScreen from './Screens/ChakradharSwamiMaharajScreen'


// import GoogleAuth from "./Screens/GoogleAuth";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      {/* Header Title */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* Divine Icon (Can be replaced with a logo) */}
      <Image
        source={require("./assets/shri chakardhar swami logopurple.jpg")} // Replace with your icon
        style={styles.icon}
      />
    </View>
  );
};

function AuthStack({ setIsLoggedIn, setIsAdmin }) {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="InfoPageOne" component={InfoPageOne} />
      <Stack.Screen name="InfoPageTwo" component={InfoPageTwo} />
      <Stack.Screen name="InfoPageThree" component={InfoPageThree} />
      <Stack.Screen name="Login">
        {(props) => (
          <Login
            {...props}
            setIsLoggedIn={setIsLoggedIn}
            setIsAdmin={setIsAdmin}
          />
        )}
      </Stack.Screen>

    </Stack.Navigator>
  );
}

const CustomDrawerContent = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#C55A11", "#E9962F"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.drawerContainer}
    >
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <Image
          source={require("./assets/chimage.png")} // Replace with your logo
          style={styles.Mainlogo}
        />
        <Text style={styles.drawerTitle}>श्री जगन्नाथ</Text>
      </View>

      {/* Drawer Items */}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "HomePage" }],
          })
        }
      >
        <Image
          source={require("./assets/hometemple.jpg")} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.drawerItemText}>होम</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("पारायण")}
      >
        <Image
          source={require("./assets/parayan3.webp")} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.drawerItemText}>पारायण</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("देवपूजा")}
      >
        <Image
          source={require("./assets/devpuja07.jpg")} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.drawerItemText}>देवपूजा</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("")}
      >
        <Image
          source={require("./assets/krushna07.jpg")} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.drawerItemText}>पंचकृष्ण</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("भजनसंग्रह")} // सर्व
      >
        <Image
          source={require("./assets/bhajan.jpg")} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.drawerItemText}>भजनसंग्रह</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("आरती संग्राह")}
      >
        <Image
          source={require("./assets/aarti.jpg")} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.drawerItemText}>आरती संग्राह</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("श्रीमद्भगवतगीता")}
      >
        <Image
          source={require("./assets/vaishnav-temple.jpg")} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.drawerItemText}>श्रीमद्भगवतगीता</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("दिनदर्शिका")}
      >
        <Image
          source={require("./assets/hinducalender.webp")} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.drawerItemText}>दिनदर्शिका</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("पंचावतार")}
      >
        <Image
          source={require("./assets/PanchAvtaar.jpeg")} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.drawerItemText}>पंचावतार</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 280, // Adjust drawer width
        },
        headerShown: false, // Hide default header
      }}
    >
      <Drawer.Screen
        name="HomePage"
        component={BottomNavigationBar}
        options={{ title: "होम", headerShown: false }}
      />
      <Drawer.Screen
        name="पारायण" // श्रीचक्रधर प्रभू
        component={ParayanScreen}
        options={{
          header: () => <CustomHeader title="📖 पारायण" />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="देवपूजा"
        component={DevPujaScreen}
        options={{
          header: () => <CustomHeader title="🕉 देवपूजा" />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="पंचकृष्ण"
        component={PanchaKrushnaScreen}
        options={{
          header: () => <CustomHeader title="🔱 पंचकृष्ण" />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="भजनसंग्रह"
        component={BhajanSangrahScreen}
        options={{
          header: () => <CustomHeader title="🎶 भजनसंग्रह" />,
          headerShown: true,
        }}
      />
      {/* श्री दत्तात्रय प्रभू , आरती संग्राह */}
      <Drawer.Screen
        name="आरती संग्राह"
        component={AartiSangrahScreen}
        options={{
          header: () => <CustomHeader title="🪔 आरती संग्राह" />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="श्रीमद्भगवतगीता"
        component={BhagavatGeetaScreen}
        options={{
          header: () => <CustomHeader title="📜 श्रीमद्भगवतगीता" />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="दिनदर्शिका"
        component={DinDarshikaScreen}
        options={{
          header: () => <CustomHeader title="📅 दिनदर्शिका" />,
          headerShown: true,
        }}
      />

      <Drawer.Screen
        name="पंचावतार"
        component={PanchaAvatarScreen}
        options={{
          header: () => <CustomHeader title="📅 पंचावतार" />,
          headerShown: true,
        }}
      />

      <Stack.Screen name="ShrikrishnaScreen" component={ShrikrishnaScreen}
        options={{
          header: () => <CustomHeader title="श्रीकृष्ण महाराज" />,
          headerShown: true,
        }} />
      <Stack.Screen name="DattaPrabhuScreen" component={DattaPrabhuScreen}
        options={{
          header: () => <CustomHeader title="श्री दत्त प्रभू महाराज" />,
          headerShown: true,
        }} />
      <Stack.Screen name="ChakrapaniScreen" component={ChakrapaniScreen}
        options={{
          header: () => <CustomHeader title="श्री चक्रपाणी महाराज" />,
          headerShown: true,
        }} />
      <Stack.Screen name="GovindPrabhuScreen" component={GovindPrabhuScreen}
        options={{
          header: () => <CustomHeader title="श्री गोविंद प्रभू महाराज" />,
          headerShown: true,
        }} />
      <Stack.Screen name="ChakradharSwamiScreen" component={ChakradharSwamiScreen}
        options={{
          header: () => <CustomHeader title="श्री चक्रधर स्वामी महाराज" />,
          headerShown: true,
        }} />


    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigationRef = useRef(null); // Reference for navigation

  useEffect(() => {
    if (isLoggedIn) {
      if (isAdmin) {
        navigationRef.current?.reset({
          index: 0,
          routes: [{ name: "AdminHome" }],
        });
      } else {
        navigationRef.current?.reset({
          index: 0,
          routes: [{ name: "HomeDrawer" }],
        });
      }
    }
  }, [isLoggedIn, isAdmin]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={AppDrawer} />
            <Stack.Screen name="TempleMapInfo" component={TempleMapInfo}
              options={{
                header: () => <CustomHeader />,
                headerShown: true,
              }} />
          </>
        ) : (
          <Stack.Screen name="Auth">
            {(props) => (
              <AuthStack
                {...props}
                setIsLoggedIn={setIsLoggedIn}
                setIsAdmin={setIsAdmin}
              />
            )}
          </Stack.Screen>
        )}
        <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
        <Stack.Screen
          name="SuperAdminHomeScreen"
          component={SuperAdminHomeScreen}
        />
        <Stack.Screen
          name="SuperAdminUserScreen"
          component={SuperAdminUserScreen}
        />
        <Stack.Screen
          name="AdminAllUserScreen"
          component={AdminAllUserScreens}
        />
        <Stack.Screen
          name="ParayanSubInfoScreen"
          component={ParayanSubInfoScreen}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ParayanContentScreen"
          component={ParayanContentScreen}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="BhajanSubInfoScreen"
          component={BhajanSubInfoScreen}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="BhajanContentScreen"
          component={BhajanContentScreen}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="AartiSunInfoScreen"
          component={AartiSunInfoScreen}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="AartiContentScreen"
          component={AartiContentScreen}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="BhagavatGitaContentScreen"
          component={BhagavatGitaContentScreen}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="DevPujaContentScreen"
          component={DevPujaContentScreen}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="PanchaKrushnaContentScreen"
          component={PanchaKrushnaContentScreen}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="AdminUpdateUserScreen"
          component={AdminUpdateUserScreen}

        />
        <Stack.Screen
          name="CreateAdminUserScreen"
          component={CreateAdminUserScreen}
        />
        <Stack.Screen
          name="AdminUserCreateScreen"
          component={AdminUserCreateScreen}
        />
        <Stack.Screen
          name="AdminViewContentScreen"
          component={AdminViewContentScreen}
        />
        <Stack.Screen
          name="ParayanAdminScreen"
          component={ParayanAdminScreen}
        />
        <Stack.Screen
          name="AartiSangrahScreenAdminScreen"
          component={AartiSangrahScreenAdminScreen}
        />
        <Stack.Screen
          name="BhajanSangrahScreenAdmin"
          component={BhajanSangrahScreenAdmin}
        />
        <Stack.Screen
          name="DevPujaScreenAdmin"
          component={DevPujaScreenAdmin}
        />
        <Stack.Screen
          name="PanchakrushnaScreenAdmin"
          component={PanchakrushnaScreenAdmin}
        />
        <Stack.Screen
          name="BhagvatGitaAdminScreen"
          component={BhagvatGitaAdminScreen}
        />
        <Stack.Screen
          name="UpdateAdminParayanScreen"
          component={UpdateAdminParayanScreen}
        />
        <Stack.Screen
          name="AddParayanAdminScreen"
          component={AddParayanAdminScreen}
        />
        <Stack.Screen
          name="AddAartiSangrahAdmin"
          component={AddAartiSangrahAdmin}
        />
        <Stack.Screen
          name="EditAartiSangrahAdmin"
          component={EditAartiSangrahAdmin}
        />
        <Stack.Screen
          name="AddBhajanSangrahAdminScreen"
          component={AddBhajanSangrahAdminScreen}
        />
        <Stack.Screen
          name="EditBhajanSangrahAdminScreen"
          component={EditBhajanSangrahAdminScreen}
        />
        <Stack.Screen
          name="AddDevPujaAdminScreen"
          component={AddDevPujaAdminScreen}
        />
        <Stack.Screen
          name="UpdateDevPujaAdminScreen"
          component={UpdateDevPujaAdminScreen}
        />
        <Stack.Screen
          name="AddBhagvatGitaAdminScreen"
          component={AddBhagvatGitaAdminScreen}
        />
        <Stack.Screen
          name="UpdateBhagvatGitaAdminScreen"
          component={UpdateBhagvatGitaAdminScreen}
        />
        <Stack.Screen
          name="UpdateAdminPanchakrushnaScreen"
          component={UpdateAdminPanchakrushnaScreen}
        />
        <Stack.Screen
          name="AddPanchakrushnaAdminScreen"
          component={AddPanchakrushnaAdminScreen}
        />
        <Stack.Screen
          name="ForgetPasswordScreen"
          component={ForgetPasswordScreen}
        />
        <Stack.Screen
          name="FetchPasswordScreen"
          component={FetchPasswordScreen}
        />
        <Stack.Screen name="VideoScreen" component={VideoScreen}
          options={{
            header: () => <CustomHeader title=" भक्ती व्हिडिओ" />,
            headerShown: true,
          }}
        />
        <Stack.Screen name="Login">
          {(props) => (
            <Login
              {...props}
              setIsLoggedIn={setIsLoggedIn}
              setIsAdmin={setIsAdmin}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
        />
        <Stack.Screen name="TermsConditions" component={TermsConditions} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="CookiesPolicy" component={CookiesPolicy} />
        <Stack.Screen
          name="SuperAdminUserAdminScreen"
          component={SuperAdminUserAdminScreen}
        />
        <Stack.Screen name="PhoneAuthScreen" component={PhoneAuthScreen} />
        <Stack.Screen name="SwamiInfoPage" component={SwamiInfoPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff4e1", // Soft saffron background color
    borderBottomWidth: 2, // Elegant border separating the header from content
    borderBottomColor: "#f1c40f", // Divine golden color for the border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 }, // Subtle shadow for depth
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // Adds more elevation on Android devices
  },
  icon: {
    marginRight: 15, // Adds space between icon and text
    color: "#f39c12", // Divine golden color for the icon
  },
  headerTitle: {
    fontSize: 24, // Larger font for the header
    fontWeight: "700", // Bold and elegant for spiritual emphasis
    color: "#3c3c3c", // Dark gray for text, standing out against the saffron background
    fontFamily: "Merriweather", // Elegant, classical serif font
    letterSpacing: 1.2, // Slight letter spacing for enhanced readability
    textTransform: "capitalize", // Makes the title feel more divine
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10, // Adds space from the left edge
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10, // Adds space from the right edge
  },
  logoutButton: {
    marginLeft: 15, // Adds space for logout button
    padding: 5,
  },
  logoutIcon: {
    padding: 5, // Padding around the logout icon for better touch area
    color: "#e74c3c", // A striking red for logout icon
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  Mainlogo: {
    width: 85,
    height: 85,
    borderRadius: 45,
    marginRight: 14,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Merriweather", // Use a custom font if available
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  drawerItemText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 20,
    fontFamily: "Roboto", // Use a custom font if available
  },
  headerContainer: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#C55A11", // Divine color (or use gradient)
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#FFD700", // Gold color
    elevation: 10,
    shadowColor: "#FFD700", // Gold glow effect
  },
  backButton: {
    top: 20,
    padding: 5,
  },
  headerTitle: {
    top: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    flex: 1,
  },
  icon: {
    top: 20,
    width: 30,
    height: 30,
  },
});
