import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FramedImage from './FramedImage';
import { InteractiveCard } from './Motion';
import { colors } from './theme';

export default function LibraryCard({ title, image, onPress }) {
  const { fontScale } = useWindowDimensions();
  const detailsHeight = Math.ceil(116 * Math.max(1, fontScale));
  return (
    <InteractiveCard onPress={onPress} accessibilityLabel={title} style={[styles.card, { height: 184 + detailsHeight + 2 }]}>
      <View style={styles.artwork}><FramedImage source={image} height={168} /></View>
      <View style={[styles.details, { height: detailsHeight }]}>
        <Text numberOfLines={2} style={styles.title}>{title || 'वाचन'}</Text>
        <View style={styles.action}>
          <View style={styles.actionLabel}><Ionicons name="book-outline" size={15} color={colors.primary} /><Text style={styles.actionText}>वाचन सुरू करा</Text></View>
          <View style={styles.arrow}><Ionicons name="arrow-forward" size={16} color={colors.primary} /></View>
        </View>
      </View>
    </InteractiveCard>
  );
}
const styles = StyleSheet.create({
  card: { margin: 8, borderRadius: 18, overflow: 'hidden', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, shadowColor: '#422C23', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 },
  artwork: { height: 184, padding: 8, flexShrink: 0, backgroundColor: colors.soft, borderBottomWidth: 1, borderBottomColor: colors.border },
  details: { paddingHorizontal: 16, paddingVertical: 14, flexShrink: 0, justifyContent: 'space-between' },
  title: { fontSize: 17, lineHeight: 25, fontWeight: '700', color: colors.ink },
  action: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  actionLabel: { flex: 1, minWidth: 0, flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center' },
  actionText: { color: colors.primary, fontSize: 12, fontWeight: '600' },
  arrow: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.soft },
});
