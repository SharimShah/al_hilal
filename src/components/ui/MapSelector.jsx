"use client";
import { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const libraries = ["places"]; // Required for the search box

const restaurantLocations = [
  { lat: 25.276987, lng: 55.296249 }, // Example: Dubai Restaurant 1
  { lat: 25.204849, lng: 55.270782 }, // Example: Dubai Restaurant 2
  { lat: 25.197201, lng: 55.274376 }, // Example: Dubai Restaurant 3
  { lat: 25.233444, lng: 55.301647 }, // Example: Dubai Restaurant 4
];

const MapSelector = ({ apiKey }) => {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isWithinRange, setIsWithinRange] = useState(false);
  const autocompleteRef = useRef(null);

  const mapContainerStyle = { width: "100%", height: "500px" };
  const center = { lat: 25.276987, lng: 55.296249 }; // Default center (Dubai)

  // Function to calculate distance using Haversine formula
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Check if selected location is within 20km of any restaurant
  const checkProximity = (lat, lng) => {
    return restaurantLocations.some(
      ({ lat: rLat, lng: rLng }) => getDistance(lat, lng, rLat, rLng) <= 20
    );
  };

  // Handle place selection from search box
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedLocation(location);
        setIsWithinRange(checkProximity(location.lat, location.lng));
        map.panTo(location);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <div style={{ marginBottom: "10px" }}>
        <Autocomplete
          onLoad={(ref) => (autocompleteRef.current = ref)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search location..."
            style={{ width: "300px", padding: "8px" }}
          />
        </Autocomplete>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onLoad={(map) => setMap(map)}
      >
        {restaurantLocations.map((pos, index) => (
          <Marker key={index} position={pos} label={`R${index + 1}`} />
        ))}
        {selectedLocation && (
          <Marker position={selectedLocation} label="Selected" />
        )}
      </GoogleMap>
      <button
        onClick={() =>
          alert(`Location selected: ${JSON.stringify(selectedLocation)}`)
        }
        disabled={!isWithinRange}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: isWithinRange ? "green" : "gray",
          color: "white",
          border: "none",
          cursor: isWithinRange ? "pointer" : "not-allowed",
        }}
      >
        Confirm Location
      </button>
      {!isWithinRange && selectedLocation && (
        <p style={{ color: "red" }}>Selected location is out of range!</p>
      )}
    </LoadScript>
  );
};

export default MapSelector;
