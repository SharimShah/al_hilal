"use client";
import React, { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(isModalVisible, "setIsModalVisible");
  return (
    <LocationContext.Provider value={{ isModalVisible, setIsModalVisible }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use the context
export const useModal = () => useContext(LocationContext);
