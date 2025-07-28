"use client";
import { useState, useEffect } from "react";
import ScrollSpy from "@/lib/ScrollSpy";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ScrollspyMenu({ MSdata }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Update the active class for ScrollSpy based on the Swiper's active index
  useEffect(() => {
    const activeElement = document.querySelector(
      `.mySwiper .swiper-slide-active a`
    );
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex]);

  return (
    <div
      className={`sticky top-0 z-50 px-4 bg-white shadow-lg h-[60px] flex items-center transition-transform duration-300 ease-in-out`}
      style={{ whiteSpace: "nowrap" }}
    >
      <ScrollSpy
        activeclassName="text-white bg-kcred transition-all duration-200"
        offsetTop={80}
        rootMargin="-60px 0px 0px 0px"
        behavior="smooth"
      >
        <nav className="w-full">
          <ul className="flex items-center">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              centeredSlides={true}
              centeredSlidesBounds={true}
              slideToClickedSlide={true}
              loop={false}
              navigation={{
                prevEl: ".swiper-button-prev-kcg",
                nextEl: ".swiper-button-next-kcg",
              }}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                "@0.75": {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
                "@1.00": {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                "@1.50": {
                  slidesPerView: 6,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper w-full"
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {MSdata?.map((item, i) => (
                <SwiperSlide key={i}>
                  <li className="flex justify-center">
                    <a
                      href={`#section-a${i}`}
                      className={`text-[15px] font-semibold rounded px-3 py-2 transition-all duration-200 ${
                        activeIndex === i
                          ? "text-white bg-kcred"
                          : "text-gray-700 hover:text-kcred hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-kcg absolute left-0 transform -translate-y-1/2 top-1/2 text-gray-600 bg-white rounded-full p-2 shadow-md z-50 hover:bg-gray-200 transition-all duration-200 hidden lg:block md:block sm:block">
              &lt;
            </button>
            <button className="swiper-button-next-kcg absolute right-0 transform -translate-y-1/2 top-1/2 text-gray-600 bg-white rounded-full p-2 shadow-md z-50 hover:bg-gray-200 transition-all duration-200 hidden lg:block md:block sm:block">
              &gt;
            </button>
          </ul>
        </nav>
      </ScrollSpy>
    </div>
  );
}
