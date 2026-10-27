import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../ui/theme';

export default function Header({ title, back = false }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  return <View style={[s.header, { paddingTop: insets.top }]}><View style={s.inner}>
    <Pressable accessibilityRole="button" accessibilityLabel={back ? "Go back" : "Open navigation menu"} onPress={() => back ? (navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home")) : navigation.toggleDrawer()} style={s.menu}><Ionicons name={back ? "arrow-back" : "menu-outline"} size={24} color={colors.ink} /></Pressable>
    <Image source={require('../assets/ChakradharLogo.png')} style={s.logo} />
    <View style={{ flex: 1 }}><Text style={s.brand}>श्री चक्रधर स्वामी</Text>{width > 500 && <Text style={s.caption}>A daily connection to devotion</Text>}</View>
    <Text style={s.location}>{title}</Text>
  </View></View>;
}
const s = StyleSheet.create({
  header: { backgroundColor: colors.background, borderBottomWidth: 1, borderBottomColor: colors.border },
  inner: { maxWidth: 1200, width: '100%', alignSelf: 'center', paddingHorizontal: 20, minHeight: 76, flexDirection: 'row', alignItems: 'center', gap: 12 },
  menu: { width: 44, height: 44, borderWidth: 1, borderColor: colors.border, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 40, height: 40, borderRadius: 20 }, brand: { fontSize: 17, color: colors.ink, fontWeight: '700' },
  caption: { color: colors.muted, fontSize: 11, marginTop: 4 }, location: { color: colors.primary, fontSize: 13, fontWeight: '600', flexShrink: 1 },
});
