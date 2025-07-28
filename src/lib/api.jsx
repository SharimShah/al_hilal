import { Api_Url } from "@/data/data";
const NEXT_COUNTRY_API_KEY = process.env.NEXT_PUBLIC_COUNTRY_API_KEY;
const CURRENT_COUNTRY_URL = `https://ipinfo.io/?token=${NEXT_COUNTRY_API_KEY}`;
const TOKEN = process.env.NEXT_PUBLIC_LARAVEL_API_TOKEN;
const BASE_URL = `${Api_Url}/api/products-list?include=category,modifiers,modifiers.options,discounts&filter[category_id]=9f14bdce-f3f1-4bf2-9c51-bc7326430929,9f14c309-9931-467e-9a52-aed696f32d74,9f14bf86-f86a-4a02-a279-c920f9c67764,9f14c343-d1ec-4aa0-acb5-5a00469fd243`;
const Branches_URl = `${Api_Url}/api/branches`;
export async function fetchData() {
  try {
    const response = await fetch(BASE_URL, {
      // Caching options for Next.js
      next: { revalidate: 3600 },
      headers: {
        Authorization: `Bearer ${TOKEN}`, // Proper string interpolation
        "Content-Type": "application/json", // Optional, but often needed
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Make sure to parse the JSON
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function fetchBranchData() {
  try {
    const response = await fetch(Branches_URl, {
      // Caching options for Next.js
      next: { revalidate: 3600 },
      headers: {
        Authorization: `Bearer ${TOKEN}`, // Proper string interpolation
        "Content-Type": "application/json", // Optional, but often needed
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Make sure to parse the JSON
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function ProductDetail(id) {
  try {
    const response = await fetch(`${Api_Url}/api/product/${id}`, {
      // Caching options for Next.js
      next: { revalidate: 3600 },
      headers: {
        Authorization: `Bearer ${TOKEN}`, // Proper string interpolation
        "Content-Type": "application/json", // Optional, but often needed
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Make sure to parse the JSON
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export const fetchCountry = async () => {
  try {
    const response = await fetch(CURRENT_COUNTRY_URL);
    const data = await response.json();
    return data;
    // ?.country?.toLowerCase() || null;
  } catch (error) {
    console.error("Error fetching current country info:", error);
    return null;
  }
};
