"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
export default function MenuCards({ MSdata }) {
  return (
    <>
      <div className="flex justify-around relative menus-slide">
        <button className="btn-red swiper-button-next-kcg w-[30px] rounded p-0 h-[150px] hidden lg:block md:block">
          <IoIosArrowBack className="mx-auto text-3xl" />
        </button>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={{
            prevEl: ".swiper-button-prev-kcg",
            nextEl: ".swiper-button-next-kcg",
          }}
          centeredSlidesBounds={true}
          breakpoints={{
            "@0.00": {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            "@1.00": {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            "@1.50": {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {MSdata?.map((item, i) => (
            <SwiperSlide key={i}>
              <a href={`#section-a${i}`} className="flex justify-center">
                <div className="w-[120px] text-center">
                  <Image src={item?.image} width={120} height={120} />
                  <p className="mt-2 text-black font-bold text-[12px] lg:text-[16px] sm:text-[14px]">
                    {item?.name}
                  </p>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="btn-red swiper-button-prev-kcg w-[30px] rounded p-0 h-[150px] hidden lg:block md:block">
          <IoIosArrowForward className="mx-auto text-3xl" />
        </button>
      </div>
    </>
  );
}
