"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SideBarCard from "./SideBarCard";
export default function PopularItemsSwiper({ data }) {
  return (
    <div className="max-w-full p-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[15px] font-medium">Popular with your order</h2>
          <p className="text-sm text-gray-500">
            Customers often buy these together
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center sm:justify-between justify-end sm:mt-4 min-w-[100px] relative my-8">
            <div className="swiper-button-next swiper-button-nexthehe block absolute text-white justify-center items-center hover:text-black bg-kcred p-2 text-[10px] w-[30px] h-[30px] rounded-full text-center sm:top-0 top-[11px]"></div>
            <div className="swiper-button-prev swiper-button-prevhehe block absolute text-white justify-center items-center hover:text-black bg-kcred p-2 text-[10px] w-[30px] h-[30px] rounded-full text-center sm:top-0 top-[11px]"></div>
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-nexthehe",
          prevEl: ".swiper-button-prevhehe",
        }}
        spaceBetween={20}
        slidesPerView={2}
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id} className="max-h-[230px]">
            <SideBarCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
