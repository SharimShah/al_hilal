const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const NEXT_COUNTRY_API_KEY = process.env.NEXT_PUBLIC_COUNTRY_API_KEY;
const CURRENT_COUNTRY_URL = `https://ipinfo.io/?token=${NEXT_COUNTRY_API_KEY}`;

export async function SearchApi(q, skip = 0) {
  const apiURL = `${API_URL}/api/search?query=${q}&limit=28&skip=${skip}`;
  try {
    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { products: [], total: 0 };
  }
}

export async function FetchData(firstparam = "", secondparam = "") {
  const apiURL = `${API_URL}/api/${firstparam}/${secondparam}`;
  try {
    const response = await fetch(apiURL, {
      // Caching options for Next.js
      next: { revalidate: 1000 }, // Revalidate every hour
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const data = await response.json();
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
