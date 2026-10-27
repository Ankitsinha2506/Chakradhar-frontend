import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from './theme';

// An explicit parent height prevents intrinsic image dimensions from sizing
// the card differently on web. The image always stays inside this frame.
export default function FramedImage({ source, height, resizeMode = 'contain' }) {
  return (
    <View style={[styles.frame, { height }]}>
      <Image source={source} resizeMode={resizeMode} style={styles.image} />
    </View>
  );
}
const styles = StyleSheet.create({
  frame: { width: '100%', flexShrink: 0, overflow: 'hidden', backgroundColor: colors.soft },
  image: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
});
