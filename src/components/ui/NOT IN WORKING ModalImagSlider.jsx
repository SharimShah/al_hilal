"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
export default function ModalImagSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const imgsslider = [
    {
      src: "https://kababjeesfriedchicken.com/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1718001140-_JK_6581.jpg%3Fq%3D10&w=640&q=75",
    },
    {
      src: "https://kababjeesfriedchicken.com/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1729947285-Lemon-Wings.jpg%3Fq%3D10&w=640&q=75",
    },
    {
      src: "https://kababjeesfriedchicken.com/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1729931963-Lemon-Chicken.jpg%3Fq%3D10&w=640&q=75",
    },
    {
      src: "https://kababjeesfriedchicken.com/_next/image?url=https%3A%2F%2Fassets.indolj.io%2Fimages%2F1730537398-Ultimate-feast-box-Changes-1.jpg%3Fq%3D10&w=640&q=75",
    },
  ];
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 mb-3"
      >
        {imgsslider.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.src} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imgsslider.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.src} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
