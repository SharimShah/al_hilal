"use client";
import { nav } from "@/data/MenuNav";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function NavMenuItems({ activeClass }) {
  return (
    <>
      <nav className="flex-1 flex justify-center">
        <ul className="flex align-center sx-20">
          <Swiper slidesPerView={3} spaceBetween={30} className="mySwiper">
            {nav.map((item, index) => (
              <SwiperSlide key={item.href}>
                <li>
                  <a
                    href={`#section-a${index}`}
                    className={`flex fs-14 hover:underline ${activeClass}`}
                  >
                    {item.title}
                  </a>
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </nav>
    </>
  );
}
