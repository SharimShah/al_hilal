import localFont from "next/font/local";
import { Poppins } from "@next/font/google";
export const gotham = localFont({
  src: "./Gotham-Font/GothamMedium.woff",
  variable: "--font-gotham",
});
export const Thunder = localFont({
  src: "./ALoveofThunder/ALoveofThunder.ttf",
  variable: "--font-Thunder",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});
