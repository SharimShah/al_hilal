"use client";
import { IoTimeOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

import { data } from "@/data/data";
const ReviewSlider = () => {
  const reviews = data?.reviews;
  return (
    <div className="conatiner-fluid bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex block justify-between p-4">
          <h2 className="text-3xl font-[500] sm:text-center text-left mb-6">
            Customer Reviews
          </h2>
          {/* Navigation Buttons */}
          <div className="flex items-center sm:justify-between justify-end sm:mt-4">
            <div className="swiper-button-next block relative text-white hover:text-black bg-kcred p-3 text-[12px] w-[50px] h-[50px] rounded-full text-center sm:top-0 top-[11px]"></div>
            <div className="swiper-button-prev block relative text-white hover:text-black bg-kcred p-3 text-[12px] w-[50px] h-[50px] rounded-full text-center sm:top-0 top-[11px]"></div>
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className="p-4">
                <div className="bg-white p-6 rounded-md shadow-md min-h-[220px]">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        width={70}
                        height={70}
                        src="/images/review.png"
                        alt={review.name}
                        className="w-10 h-10 rounded-full"
                      /> */}
                      <p className="w-10 h-10 flex items-center justify-center bg-[#01579B] text-white rounded-full">
                        <span>{review.name[0]}</span>
                      </p>
                      <span className="h-[42px] w-[2px] bg-[#FC8A06]"></span>
                      <div>
                        <h3 className="font-semibold">{review.name}</h3>
                        <p className="text-sm text-gray-500">Review</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-[12px] mt-2 text-[#FC8A06] justify-end">
                        {Array.from({ length: review.stars }, (_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>{" "}
                      <p className="text-xs text-[#FC8A06] mt-1 flex gap-2 items-center">
                        <IoTimeOutline /> {review.timeAgo}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">{review.review}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ReviewSlider;
