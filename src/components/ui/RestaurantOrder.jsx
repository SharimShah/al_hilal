"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const RESTAURANT_LAT = 25.197554406161064;
const RESTAURANT_LNG = 55.27971245959597;
const DELIVERY_RADIUS_KM = 10;

export default function RestaurantOrder({ setIsModalVisible }) {
  const { DlocationHandle } = useCart();
  const mapContainerRef = useRef(null);
  const customerAddressRef = useRef(null);
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const customerMarkerRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const [resultMessage, setResultMessage] = useState("");
  const [resultType, setResultType] = useState("");
  const [isCheckingDelivery, setIsCheckingDelivery] = useState(false);
  const [isDeliverable, setIsDeliverable] = useState(null);
  const [isDelivering, setIsDelivering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.google) return;

    const map = new window.google.maps.Map(mapContainerRef.current, {
      zoom: 12,
      center: { lat: RESTAURANT_LAT, lng: RESTAURANT_LNG },
    });

    mapRef.current = map;

    new window.google.maps.Marker({
      position: { lat: RESTAURANT_LAT, lng: RESTAURANT_LNG },
      map,
      title: "Our Restaurant",
      icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    });

    directionsServiceRef.current = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    directionsRendererRef.current = directionsRenderer;

    initializeAutocomplete();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("selectedDeliveryLocation");
    if (saved) {
      const data = JSON.parse(saved);
      const age = Date.now() - data.timestamp;
      if (age > 24 * 60 * 60 * 1000) {
        localStorage.removeItem("selectedDeliveryLocation");
      }
    }
  }, []);

  const initializeAutocomplete = () => {
    const input = customerAddressRef.current;
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") e.preventDefault();
    });

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      input,
      {
        types: ["address"],
        fields: ["geometry", "formatted_address"],
        componentRestrictions: { country: "ae" },
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (!place || !place.geometry || !place.formatted_address) {
        showResult("❌ Please select a valid address.", "error");
        return;
      }
      const location = place.geometry.location;
      customerAddressRef.current.value = place.formatted_address;
      checkDeliveryArea(
        location.lat(),
        location.lng(),
        place.formatted_address
      );
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      showResult("❌ Geolocation is not supported.", "error");
      return;
    }

    showResult("📍 Getting your location...", "info");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            customerAddressRef.current.value = address;
            checkDeliveryArea(lat, lng, address);
          } else {
            showResult("❌ Could not get address.", "error");
          }
        });
      },
      () => {
        showResult("❌ Location access denied.", "error");
      }
    );
  };

  const checkDeliveryArea = (lat, lng, address) => {
    const map = mapRef.current;
    if (!map) {
      showResult("❌ Map is not loaded yet.", "error");
      return;
    }

    setIsCheckingDelivery(true);
    setResultMessage("⏳ Checking delivery eligibility...");
    setResultType("info");

    const distance = calculateDistance(
      RESTAURANT_LAT,
      RESTAURANT_LNG,
      lat,
      lng
    );

    if (customerMarkerRef.current) {
      customerMarkerRef.current.setMap(null);
    }

    customerMarkerRef.current = new window.google.maps.Marker({
      position: { lat, lng },
      map,
      title: "Your Location",
      icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });

    directionsServiceRef.current.route(
      {
        origin: { lat: RESTAURANT_LAT, lng: RESTAURANT_LNG },
        destination: { lat, lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRendererRef.current.setDirections(response);
        }
      }
    );

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend({ lat: RESTAURANT_LAT, lng: RESTAURANT_LNG });
    bounds.extend({ lat, lng });
    map.fitBounds(bounds);

    if (distance <= DELIVERY_RADIUS_KM) {
      setIsDeliverable(true);
      showResult(
        `✅ Within delivery zone (${distance.toFixed(2)} KM)`,
        "success"
      );
    } else {
      setIsDeliverable(false);
      showResult(
        `❌ Outside delivery zone (${distance.toFixed(2)} KM)`,
        "error"
      );
    }

    setIsCheckingDelivery(false);
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const showResult = (message, type) => {
    setResultMessage(message);
    setResultType(type);
  };

  const handleDeliveryClick = () => {
    if (!isDeliverable) return;

    setIsDelivering(true);

    const address = customerAddressRef.current.value;
    const locationData = {
      address,
      timestamp: new Date().getTime(),
    };

    localStorage.setItem(
      "selectedDeliveryLocation",
      JSON.stringify(locationData)
    );
    DlocationHandle({ locationData });
    setTimeout(() => {
      localStorage.removeItem("selectedDeliveryLocation");
    }, 24 * 60 * 60 * 1000);

    setTimeout(() => {
      setIsDelivering(false);
      showResult("✅ Delivery location saved!", "success");
      if (setIsModalVisible) setIsModalVisible(false);
    }, 1000);
  };

  return (
    <>
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBPqZ6LFMCR83uPY8xmy_nQUZ4yKAVoG_c&libraries=places`}
        strategy="afterInteractive"
      />
      <label className="tracking-wider justify-between items-center flex">
        <span>Delivery Address</span>{" "}
        <span
          onClick={() => setIsModalVisible(false)}
          className="bg-kcred absolute top-3 right-3 text-lg text-white  hover:bg-black rounded-full p-1"
        >
          <RxCross2 />
        </span>
      </label>
      <input
        ref={customerAddressRef}
        type="text"
        placeholder="Search Road or Landmark..."
        className="w-full px-4 py-2 mt-2 bg-white border text-slate-900 text-md tracking-wider rounded-md focus:outline-kcred"
      />
      <button
        onClick={getCurrentLocation}
        className="mt-3 flex items-center gap-2"
      >
        <MdMyLocation size={20} className="text-red-600" />
        <span className="tracking-wider">Use My Current Location</span>
      </button>

      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "350px", marginTop: "10px" }}
      ></div>
      {/* 
      {resultMessage && (
        <div
          className={`mt-3 p-2 text-sm rounded-md ${
            resultType === "success"
              ? "bg-green-100 text-green-700"
              : resultType === "error"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {resultMessage}
        </div>
      )} */}

      <button
        onClick={handleDeliveryClick}
        disabled={!isDeliverable || isCheckingDelivery || isDelivering}
        className={`w-full mt-3 flex items-center justify-center gap-2 font-bold tracking-wider py-2 rounded-md ${
          isCheckingDelivery
            ? "bg-gray-400 text-white cursor-wait"
            : isDeliverable
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-gray-300 text-gray-700 cursor-not-allowed"
        }`}
      >
        {isDelivering ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <span className="ml-2">Saving...</span>
          </>
        ) : isCheckingDelivery ? (
          "Checking..."
        ) : isDeliverable ? (
          "Deliver Here"
        ) : (
          "Sorry, we don't deliver here"
        )}
      </button>
    </>
  );
}
