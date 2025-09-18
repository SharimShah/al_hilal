export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const skip = searchParams.get("skip") || "0";

  const API_URL = process.env.API_URL; // Add this to .env.local if not already
  const API_KEY = process.env.API_KEY;

  const externalUrl = `${API_URL}/api/search?query=${query}&limit=30&skip=${skip}`;

  try {
    const response = await fetch(externalUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();
    return Response.json(data);
  } catch (err) {
    console.error("Search API failed", err);
    return new Response(
      JSON.stringify({ suggestions: { products: [], categories: [] } }),
      { status: 500 }
    );
  }
}
