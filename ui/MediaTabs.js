import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './theme';
const tabs = [['TEXT', 'book-outline'], ['AUDIO', 'headset-outline'], ['VIDEO', 'play-circle-outline']];
export default function MediaTabs({ selected, onChange }) {
  return <View style={styles.wrapper}><View accessibilityRole="tablist" style={styles.tabs}>{tabs.map(([tab, icon]) => {
    const active = selected === tab;
    return <Pressable key={tab} accessibilityRole="tab" accessibilityState={{ selected: active }} onPress={() => onChange(tab)} style={({ pressed }) => [styles.tab, active && styles.active, { opacity: pressed ? 0.8 : 1 }]}>
      <Ionicons name={icon} size={17} color={active ? '#FFFFFF' : colors.muted} /><Text style={[styles.label, active && { color: '#FFFFFF' }]}>{tab}</Text>
    </Pressable>;
  })}</View></View>;
}
const styles = StyleSheet.create({
  wrapper: { width: '100%', maxWidth: 1200, alignSelf: 'center', padding: 16 },
  tabs: { flexDirection: 'row', backgroundColor: colors.soft, padding: 4, borderRadius: 14, alignSelf: 'center', width: '100%', maxWidth: 480 },
  tab: { flex: 1, minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, borderRadius: 10 },
  active: { backgroundColor: colors.primary }, label: { fontSize: 12, fontWeight: '700', color: colors.muted },
});
