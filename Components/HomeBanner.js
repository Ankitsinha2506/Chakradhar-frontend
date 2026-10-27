import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLayout } from '../ui/theme';

export default function HomeBanner() {
  const { wide } = useLayout();
  const navigation = useNavigation();
  return <LinearGradient colors={['#422C23', '#71432B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[s.hero, { flexDirection: wide ? 'row' : 'column-reverse', padding: wide ? 40 : 24 }]}>
    <View style={s.copy}><Text style={s.eyebrow}>THE MAHANUBHAVA TRADITION</Text><Text style={[s.title, { fontSize: wide ? 42 : 30 }]}>श्री चक्रधर स्वामी</Text><Text style={s.description}>आपल्या दिवसाची सुरुवात भक्तीने करा.{ '\n' }पारायण, आरती आणि पवित्र विचार — एकाच ठिकाणी.</Text>
      <Pressable accessibilityRole="button" onPress={() => navigation.navigate('पारायण')} style={({ pressed }) => [s.button, { opacity: pressed ? 0.8 : 1 }]}><Text style={s.buttonText}>पारायण वाचा</Text><Ionicons name="arrow-forward" size={18} color="#422C23" /></Pressable>
    </View>
    <View style={[s.art, { width: wide ? 250 : 170, height: wide ? 250 : 170 }]}><Image source={require('../assets/ChakradharLogo.png')} style={s.image} resizeMode="contain" /></View>
  </LinearGradient>;
}
const s = StyleSheet.create({
  hero: { borderRadius: 24, alignItems: 'center', gap: 28, overflow: 'hidden' },
  copy: { flex: 1, alignSelf: 'stretch', justifyContent: 'center', minWidth: 0 },
  eyebrow: { color: '#E4BE86', fontSize: 10, letterSpacing: 2, fontWeight: '700', marginBottom: 18 },
  title: { color: '#FFF7EA', fontWeight: '700', marginBottom: 14 },
  description: { color: '#E9D9C8', fontSize: 16, lineHeight: 29 },
  button: { alignSelf: 'flex-start', backgroundColor: '#F0D7AC', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12, flexDirection: 'row', gap: 18, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#422C23', fontSize: 15, fontWeight: '700' },
  art: { borderRadius: 150, borderWidth: 1, borderColor: '#B98B53', padding: 12, backgroundColor: '#FFFFFF0A' },
  image: { width: '100%', height: '100%', borderRadius: 140, backgroundColor: '#F3E9DA' },
});
