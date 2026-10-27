import React from 'react';
import { View } from 'react-native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../Screens/HomeScreen';
import TempleList from '../Screens/TempleList';
import SettingsScreen from '../Screens/Settings';
import Header from './Header';
import { colors } from '../ui/theme';
const Tab = createBottomTabNavigator();
const tabs = [ ['HomeScreen', 'Home', HomeScreen, 'home-outline'], ['TempleList', 'Temples', TempleList, 'location-outline'], ['SettingsScreen', 'Settings', SettingsScreen, 'settings-outline'] ];
export default function BottomNavigationBar() {
  return <Tab.Navigator tabBar={props => <View style={{ backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border }}><View style={{ width: "100%", maxWidth: 800, alignSelf: "center" }}><BottomTabBar {...props} /></View></View>} screenOptions={{ tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.muted,
    tabBarHideOnKeyboard: true, tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
    tabBarLabelStyle: { fontSize: 11, fontWeight: '600' } }}>
    {tabs.map(([name, label, component, icon]) => <Tab.Screen key={name} name={name} component={component} options={{ title: label, header: () => <Header title={label} />, tabBarIcon: ({ color, size }) => <Ionicons name={icon} color={color} size={size} /> }} />)}
  </Tab.Navigator>;
}
