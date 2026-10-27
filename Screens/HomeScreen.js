import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import HomeBanner from '../Components/HomeBanner';
import SanskritShlokas from '../Components/SanskritShlokas';
import MantraList from '../Components/MantraList';
import { colors, useLayout } from '../ui/theme';
import { Reveal } from '../ui/Motion';

export default function HomeScreen() {
  const { padding } = useLayout();
  return <ScrollView style={s.page} contentContainerStyle={[s.content, { paddingHorizontal: padding }]}>
    <Reveal><HomeBanner /></Reveal>
    <SanskritShlokas />
    <View style={s.heading}><View><Text style={s.eyebrow}>A MOMENT OF DEVOTION</Text><Text style={s.title}>भक्तीचा प्रवास</Text></View><Text style={s.note}>Read. Reflect. Reconnect.</Text></View>
    <MantraList />
    <View style={s.footer}><Text style={s.footerText}>श्री चक्रधर स्वामी</Text><Text style={s.note}>ज्ञान, भक्ती आणि शांतीचा मार्ग</Text></View>
  </ScrollView>;
}
const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { width: '100%', maxWidth: 1200, alignSelf: 'center', paddingTop: 24, paddingBottom: 36 },
  heading: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginTop: 30, marginBottom: 22 },
  eyebrow: { color: colors.primary, fontSize: 11, letterSpacing: 2, fontWeight: '700', marginBottom: 8 },
  title: { color: colors.ink, fontSize: 28, fontWeight: '700' }, note: { color: colors.muted, fontSize: 13, lineHeight: 22 },
  footer: { alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 28, marginTop: 24, gap: 6 },
  footerText: { color: colors.primary, fontSize: 17, fontWeight: '600' },
});
