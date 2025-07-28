import React, { useState } from "react";

export default function DeliveryPickupToggle() {
  const [deliveryType, setDeliveryType] = useState("delivery");

  return (
    <div className="flex justify-center mb-4 relative">
      {/* Highlight div for sliding background animation */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 bg-red-500 rounded-lg transition-transform duration-300 ease-in-out ${
          deliveryType === "pickup" ? "translate-x-full" : "translate-x-0"
        }`}
      ></div>

      {/* Button container with two buttons */}
      <div className="flex space-x-0 relative">
        <button
          onClick={() => setDeliveryType("delivery")}
          className={`w-32 py-2 rounded-l-lg z-10 ${
            deliveryType === "delivery" ? "text-white" : "text-gray-700"
          }`}
        >
          DELIVERY
        </button>
        <button
          onClick={() => setDeliveryType("pickup")}
          className={`w-32 py-2 rounded-r-lg z-10 ${
            deliveryType === "pickup" ? "text-white" : "text-gray-700"
          }`}
        >
          PICKUP
        </button>
      </div>
    </div>
  );
}
