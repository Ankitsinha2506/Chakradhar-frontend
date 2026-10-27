import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

// Measure available space so grids also work inside drawers and split views.
export default function ResponsiveGrid({ renderItem, style, contentContainerStyle, ...props }) {
  const [width, setWidth] = useState(0);
  const columns = width < 380 ? 1 : width < 700 ? 2 : width < 1000 ? 3 : 4;
  return <View onLayout={event => setWidth(event.nativeEvent.layout.width)} style={[{ flex: 1, width: '100%', maxWidth: 1200, alignSelf: 'center' }, style]}>
    {width > 0 && <FlatList {...props} contentContainerStyle={[contentContainerStyle, { paddingHorizontal: 0, paddingLeft: 0, paddingRight: 0 }]} key={`grid-${columns}`} numColumns={columns} renderItem={info => <View style={{ width: width / columns }}>{renderItem(info)}</View>} />}
  </View>;
}
