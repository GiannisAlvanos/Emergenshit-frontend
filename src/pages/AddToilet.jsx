import React, { useState } from "react";
import api from "../api/api";

export default function AddToilet() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });

  const [amenities, setAmenities] = useState({
    wheelchair: false,
    soap: false,
    toiletPaper: false,
    dryer: false,
  });

  const [loading, setLoading] = useState(false);

  async function handleUseMyLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        alert("Could not fetch your location.");
      }
    );
  }

  function handleAmenityChange(e) {
    setAmenities({
      ...amenities,
      [e.target.name]: e.target.checked,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // --- START OF CORRECTION ---
    // 1. Filter the amenities object to only include true values (the checked ones).
    // 2. Map the filtered object keys to create an array of strings.
    const activeAmenities = Object.keys(amenities).filter(
      (key) => amenities[key]
    );

    const data = {
      name,
      description,
      location,
      // 3. Use the corrected array of strings for the API payload.
      amenities: activeAmenities, 
    };
    // --- END OF CORRECTION ---

    try {
      await api.post("/toilets", data);
      alert("Toilet successfully added!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Failed to add toilet");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded">
      <h1 className="text-3xl font-semibold mb-6">Add a New Toilet</h1>

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <label className="block font-medium mb-1">Name</label>
        <input
          className="w-full border rounded p-2 mb-4"
          placeholder="Toilet name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* DESCRIPTION */}
        <label className="block font-medium mb-1">Description</label>
        <textarea
          className="w-full border rounded p-2 mb-4"
          placeholder="Short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* LOCATION */}
        <label className="block font-medium mb-1">Location</label>
        <div className="flex gap-2 mb-2">
          <input
            className="w-full border rounded p-2"
            placeholder="Latitude"
            value={location.lat}
            onChange={(e) =>
              setLocation({ ...location, lat: e.target.value })
            }
          />
          <input
            className="w-full border rounded p-2"
            placeholder="Longitude"
            value={location.lng}
            onChange={(e) =>
              setLocation({ ...location, lng: e.target.value })
            }
          />
        </div>
        <button
          type="button"
          onClick={handleUseMyLocation}
          className="bg-green-600 text-white px-3 py-2 rounded mb-4"
        >
          Use My Location
        </button>

        {/* AMENITIES */}
        <h2 className="text-xl font-medium mt-4 mb-2">Amenities</h2>

        <div className="space-y-2">
          {[
            { key: "wheelchair", label: "Wheelchair Accessible" },
            { key: "soap", label: "Has Soap" },
            { key: "toiletPaper", label: "Toilet Paper" },
            { key: "dryer", label: "Dryer / Air Blower" },
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-3">
              <input
                type="checkbox"
                name={item.key}
                checked={amenities[item.key]}
                onChange={handleAmenityChange}
              />
              {item.label}
            </label>
          ))}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded mt-6"
        >
          {loading ? "Adding..." : "Add Toilet"}
        </button>
      </form>
    </div>
  );
}