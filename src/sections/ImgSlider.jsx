"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
export default function ImgSlider({ images_slider }) {
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
          {images_slider?.map((item, i) => (
            <SwiperSlide key={i}>
              <Image
                {...(i === 0 ? { priority: true } : { loading: "lazy" })}
                src={item?.image || "/images/noimg.jpg"}
                width={1600}
                alt=""
                height={600}
                className="w-full md:h-[500px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
