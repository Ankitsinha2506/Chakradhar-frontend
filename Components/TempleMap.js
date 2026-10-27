import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function TempleMap({ temple }) {
  const coordinate = {
    latitude: temple.latitude,
    longitude: temple.longitude,
  };

  return (
    <MapView
      style={StyleSheet.absoluteFill}
      initialRegion={{ ...coordinate, latitudeDelta: 0.05, longitudeDelta: 0.05 }}
    >
      <Marker
        coordinate={coordinate}
        title={temple.name}
        description={temple.significance}
      />
    </MapView>
  );
}
