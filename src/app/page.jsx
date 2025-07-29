// import Navbar from "@/components/layout/Navbar";
// import ImgSlider from "@/sections/ImgSlider";
// import MMenuCards from "@/sections/MMenuCards";
// import Deals from "@/sections/Deals";
// import FixedYourCard from "@/components/ui/FixedYourCard";
// import ReviewSlider from "@/sections/ReviewSlider";
// import { fetchBranchData, fetchData } from "@/lib/api";
// import ContactSection from "@/sections/ContactSection";
// import Location from "@/sections/Location";
// import FindWhatsapp from "@/sections/FindWhatsapp";
// export const metadata = {
//   title: "Kelly Cajun Grill Best Cajun Cuisine Restaurant in Dubai",
//   description:
//     "Craving bold Cajun flavors? Kelly Cajun Grill serves up the best spicy, southern-style dishes in Dubai. Fresh, flavorful, and unforgettable!",
//   keywords: [
//     "Cajun restaurant Dubai, Kelly Cajun Grill, best Cajun food Dubai, southern cuisine Dubai, spicy food Dubai, Cajun grill, Cajun flavors, Dubai restaurants",
//   ],
// };
// export default async function HomePage() {
//   const data = await fetchData();
//   const Branchdata = await fetchBranchData();
//   // if (!data) {
//   //   return (
//   //     <>
//   //       <h1 className="text-center mt-10">Api Data Not Fetch</h1>
//   //     </>
//   //   );
//   // }
//   const { combo_data, Maindish_data, sidedish_data, drinks_data } =
//     data?.products;
//   return (
//     <>
//       <Navbar data={combo_data} bdata={Branchdata?.data} />
//       <ImgSlider />
//       <div className="container-fluid p-0">
//         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-8 lg:grid-cols-8">
//           <div className="lg:col-span-6 col-span-8 mb-10 max-w-[1760px] mx-auto">
//             <MMenuCards MSdata={data?.menus} />
//             <Deals
//               data={combo_data}
//               imgsrc="/images/combanner.png"
//               id="section-a0"
//             />
//             <Deals
//               data={Maindish_data}
//               imgsrc="/images/maindishbanner.png"
//               id="section-a1"
//             />
//             <Deals
//               data={sidedish_data}
//               imgsrc="/images/sidebanner.png"
//               id="section-a2"
//             />
//             <Deals
//               data={drinks_data}
//               imgsrc="/images/drinkbanner.png"
//               id="section-a3"
//             />
//           </div>
//           <div className="col-span-2 !lg:flex justify-end hidden lg:block">
//             <FixedYourCard data={combo_data} />
//           </div>
//         </div>
//       </div>
//       <FindWhatsapp />
//       <ReviewSlider />
//       <Location />
//       <ContactSection />
//     </>
//   );
// }
import Card from "@/components/ui/Card";
import React from "react";

const deals = [
  {
    id: 1,
    title: "summer deal 1",
    desc: "1 crex burger and 1 royal juice",
    price: 810,
    oldPrice: 900,
    image: "/images/deal1.png", // Replace with actual paths
  },
  {
    id: 2,
    title: "summer deal 2",
    desc: "Special arabian roll and 1 royal juice",
    price: 855,
    oldPrice: 950,
    image: "/images/deal2.png",
  },
  {
    id: 3,
    title: "summer deal 3",
    desc: "Chk malai boti sandwich and 1 royal juice",
    price: 810,
    oldPrice: 900,
    image: "/images/deal3.png",
  },
];

const SummerDeals = () => {
  return (
    <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-12">
      {/* Header Banner */}
      <div className="bg-red-600 rounded-xl text-white text-center py-20 mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-wide">
          summer deals
        </h1>
      </div>

      {/* Deal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div className="p-4 flex justify-center">
            <Card
              image="https://g-cdn.blinkco.io/ordering-system/55715/dish_image/1750245486645.png"
              title="summer deal 1"
              desc="1 crex burger and 1 royal juice"
              price={810}
              oldPrice={900}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummerDeals;
