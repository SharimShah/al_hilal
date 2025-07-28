import Navbar from "@/components/layout/Navbar";
import ImgSlider from "@/sections/ImgSlider";
import MMenuCards from "@/sections/MMenuCards";
import Deals from "@/sections/Deals";
import FixedYourCard from "@/components/ui/FixedYourCard";
import ReviewSlider from "@/sections/ReviewSlider";
import { fetchBranchData, fetchData } from "@/lib/api";
import ContactSection from "@/sections/ContactSection";
import Location from "@/sections/Location";
import FindWhatsapp from "@/sections/FindWhatsapp";
export const metadata = {
  title: "Kelly Cajun Grill Best Cajun Cuisine Restaurant in Dubai",
  description:
    "Craving bold Cajun flavors? Kelly Cajun Grill serves up the best spicy, southern-style dishes in Dubai. Fresh, flavorful, and unforgettable!",
  keywords: [
    "Cajun restaurant Dubai, Kelly Cajun Grill, best Cajun food Dubai, southern cuisine Dubai, spicy food Dubai, Cajun grill, Cajun flavors, Dubai restaurants",
  ],
};
export default async function HomePage() {
  const data = await fetchData();
  const Branchdata = await fetchBranchData();
  // if (!data) {
  //   return (
  //     <>
  //       <h1 className="text-center mt-10">Api Data Not Fetch</h1>
  //     </>
  //   );
  // }
  const { combo_data, Maindish_data, sidedish_data, drinks_data } =
    data?.products;
  return (
    <>
      <Navbar data={combo_data} bdata={Branchdata?.data} />
      <ImgSlider />
      <div className="container-fluid p-0">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-8 lg:grid-cols-8">
          <div className="lg:col-span-6 col-span-8 mb-10 max-w-[1760px] mx-auto">
            <MMenuCards MSdata={data?.menus} />
            <Deals
              data={combo_data}
              imgsrc="/images/combanner.png"
              id="section-a0"
            />
            <Deals
              data={Maindish_data}
              imgsrc="/images/maindishbanner.png"
              id="section-a1"
            />
            <Deals
              data={sidedish_data}
              imgsrc="/images/sidebanner.png"
              id="section-a2"
            />
            <Deals
              data={drinks_data}
              imgsrc="/images/drinkbanner.png"
              id="section-a3"
            />
          </div>
          <div className="col-span-2 !lg:flex justify-end hidden lg:block">
            <FixedYourCard data={combo_data} />
          </div>
        </div>
      </div>
      <FindWhatsapp />
      <ReviewSlider />
      <Location />
      <ContactSection />
    </>
  );
}
