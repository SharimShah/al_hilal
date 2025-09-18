import { FetchData } from "@/lib/api";
import dynamic from "next/dynamic";
// Dynamically imported components
const Navbar = dynamic(() => import("@/components/layout/Navbar"));
const ImgSlider = dynamic(() => import("@/sections/ImgSlider"));
const ProModal = dynamic(() => import("@/sections/ProModal"));
const LocationSelect = dynamic(() => import("@/components/ui/LocationSelect"));
export default async function ItemPage({ params }) {
  const data = await FetchData("product", params?.id);
  return (
    <>
      <Navbar data="" bdata="" />
      <ImgSlider />
      <ProModal data={data?.product} id={params?.id} />
      <LocationSelect />
    </>
  );
}
