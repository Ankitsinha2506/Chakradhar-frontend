import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, useLayout } from '../ui/theme';
import { InteractiveCard } from '../ui/Motion';
import FramedImage from '../ui/FramedImage';

// These destinations are registered in AppDrawer and are available offline.
const items = [
  ['पारायण', 'Sacred readings', require('../assets/chakraimages.jpeg')],
  ['देवपूजा', 'Daily worship', require('../assets/chakradhar2.jpg')],
  ['पंचकृष्ण', 'The five incarnations', require('../assets/krushna007.jpg')],
  ['भजनसंग्रह', 'Songs of devotion', require('../assets/om12.jpg')],
  ['आरती संग्राह', 'Prayers & aarti', require('../assets/artiriver.jpg')],
  ['श्रीमद्भगवतगीता', 'Timeless wisdom', require('../assets/krushna1.jpg')],
];
export default function MantraList() {
  const navigation = useNavigation();
  const { cardWidth } = useLayout();
  const { fontScale } = useWindowDimensions();
  const imageHeight = Math.round(Math.max(150, Math.min(210, cardWidth * 0.7)));
  const detailsHeight = Math.ceil(108 * Math.max(1, fontScale));
  return <View style={s.grid}>{items.map(([route, description, image]) => <InteractiveCard key={route} accessibilityLabel={route} onPress={() => navigation.navigate(route)} style={[s.card, { width: cardWidth, height: imageHeight + detailsHeight + 2 }]}>
    <FramedImage source={image} height={imageHeight} />
    <View style={[s.details, { height: detailsHeight }]}><View style={{ flex: 1, minWidth: 0 }}><Text numberOfLines={2} style={s.title}>{route}</Text><Text numberOfLines={1} style={s.description}>{description}</Text></View><Ionicons name="arrow-forward" size={18} color={colors.primary} /></View>
  </InteractiveCard>)}</View>;
}
const s = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: 16 },
  card: { backgroundColor: colors.surface, borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  details: { flexDirection: 'row', alignItems: 'center', flexShrink: 0, padding: 14, gap: 8 },
  title: { fontSize: 18, fontWeight: '700', color: colors.ink, marginBottom: 5 },
  description: { color: colors.muted, fontSize: 12, lineHeight: 20 },
});
