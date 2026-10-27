import React from "react";

// Metro selects this file on web, keeping native map imports out of the bundle.
export default function TempleMap({ temple }) {
  const location = encodeURIComponent(`${temple.latitude},${temple.longitude}`);

  return (
    <iframe
      title={`Map of ${temple.name}`}
      src={`https://maps.google.com/maps?q=${location}&z=14&output=embed`}
      style={{ width: "100%", height: "100%", border: 0 }}
      loading="lazy"
      allowFullScreen
    />
  );
}
