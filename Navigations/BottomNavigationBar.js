import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";

import HomeScreen from "../Screens/HomeScreen";
import TempleList from "../Screens/TempleList";
import SettingsScreen from "../Screens/Settings";

import Header from "./Header";
import TabButton from "./TabButton";

const Tab = createBottomTabNavigator();

const BottomNavigationBar = () => {
  const TabArr = [
    { route: "HomeScreen", label: "Home", component: HomeScreen },
    { route: "TempleList", label: "Temple", component: TempleList },
    { route: "SettingsScreen", label: "Settings", component: SettingsScreen },
  ];

  return (
    <View style={styles.wrapper}>
      {/* Floating Glass Background */}
      <BlurView intensity={80} tint="light" style={styles.floatingBar} />

      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        {TabArr.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              header: () => <Header title={item.label} />,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export default BottomNavigationBar;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  floatingBar: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 34 : 20,
    left: 30,
    right: 30,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    overflow: "hidden",
    zIndex: 1,
  },

  tabBarStyle: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 26 : 20,
    left: 30,
    right: 30,
    height: 84,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    paddingHorizontal: 30, // This creates perfect equal spacing
    justifyContent: "space-between",
    zIndex: 2,
  },
});