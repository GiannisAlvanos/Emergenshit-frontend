import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ToiletCard from '../components/ToiletCard';
import MapView from '../components/MapView';

export default function Home() {
  const [toilets, setToilets] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    fetchToilets();
    // optional: get user location
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(p => {
      setLat(p.coords.latitude); setLng(p.coords.longitude);
    });
  }, []);

  async function fetchToilets() {
    const res = await api.get('/toilets');
    setToilets(res.data.data || []);
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <MapView toilets={toilets} center={{lat,lng}} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Results</h2>
        {toilets.map(t => <ToiletCard key={t.toiletId} toilet={t} />)}
      </div>
    </div>
  );
}
