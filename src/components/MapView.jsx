import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function MapView({ toilets = [], center = {} }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: apiKey });

  const mapCenter = (center.lat && center.lng) ? center : (toilets[0]?.location || { lat: 37.98, lng: 23.72 });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div style={{ height: 500 }}>
      <GoogleMap center={mapCenter} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>
        {toilets.map(t => (
          <Marker key={t.toiletId} position={t.location} />
        ))}
      </GoogleMap>
    </div>
  );
}
