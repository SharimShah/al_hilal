// app/api/proxy-order/route.ts (or route.js)
import { NextResponse } from "next/server";
import axios from "axios";
export async function POST(req) {
  try {
    const formData = await req.formData();

    const apiResponse = await axios.post(
      `${process.env.API_URL}/api/orders`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    return NextResponse.json(apiResponse.data);
  } catch (error) {
    console.error("API Proxy Error:");
    if (axios.isAxiosError(error)) {
      console.error("Response:", error.response?.data);
      console.error("Status:", error.response?.status);
      console.error("Headers:", error.response?.headers);
    } else {
      console.error("Unexpected Error:", error);
    }

    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
