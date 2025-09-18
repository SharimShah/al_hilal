export const dynamic = "force-dynamic";
import Navbar from "@/components/layout/Navbar";
import ImgSlider from "@/sections/ImgSlider";
import Deals from "@/sections/Deals";
import ScrollspyMenu from "@/components/layout/ScrollspyMenu";
import { FetchData } from "@/lib/api";
import Footer from "@/components/layout/Footer";
import Search from "@/sections/Search";
import PopupModal from "@/components/ui/PopupModal";
export const metadata = {
  title: "Best Desi & Chinese Food in Dubai | Al Hilal Restaurant",
  description:
    "Craving desi or Chinese food in Dubai? Al Hilal Restaurant brings you flavorful dishes, fresh ingredients & warm hospitality all under one roof.",
  keywords: [""],
};
export default async function HomePage() {
  const data = await FetchData("home");
  const { HomeProducts, images_slider } = data;
  return (
    <>
      <PopupModal />
      <Navbar data={HomeProducts[0]?.products} />
      <ImgSlider images_slider={images_slider} />
      <ScrollspyMenu categories={HomeProducts} />
      <Search />
      {HomeProducts?.map((item, i) => (
        <Deals
          key={i}
          data={item?.products}
          id={`section-a${item?.id}`}
          name={item?.name}
          image={item?.image}
        />
      ))}
      <Footer />
    </>
  );
}
