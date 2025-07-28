"use client";
import { fetchCountry } from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";
const CountryContext = createContext();
export const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    async function getCountry() {
      try {
        const fetchedCountry = await fetchCountry(); // Assuming fetchCountry() returns a Promise
        setCountry(fetchedCountry);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    }
    getCountry();
  }, []); // Empty dependency array means it runs once when the component mounts
  return (
    <CountryContext.Provider value={country}>
      {children}
    </CountryContext.Provider>
  );
};
export const useCountry = () => useContext(CountryContext);
