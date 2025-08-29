import { FetchData } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import ImgSlider from "@/sections/ImgSlider";
import ProModal from "@/sections/ProModal";
import LocationSelect from "@/components/ui/LocationSelect";
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
