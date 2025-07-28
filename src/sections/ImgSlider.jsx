"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
export default function ImgSlider() {
  const imagessrc = [
    { img: "/images/banners/1.png" },
    { img: "/images/banners/2.png" },
    { img: "/images/banners/3.png" },
    { img: "/images/banners/4.png" },
    { img: "/images/banners/5.png" },
    { img: "/images/banners/6.png" },
  ];
  return (
    <>
      <div className="container-fluid p-0">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          //   navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {imagessrc.map((item, i) => (
            <SwiperSlide key={i}>
              <Image
                {...(i === 0 ? { priority: true } : { loading: "lazy" })}
                src={item?.img}
                width={1600}
                alt=""
                height={600}
                className="w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
