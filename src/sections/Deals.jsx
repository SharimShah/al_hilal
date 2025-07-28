"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
const Card = dynamic(() => import("@/components/ui/Card"));
import { useState } from "react";
export default function Deals({ data, imgsrc, id }) {
  const cardsQuantity = 9;
  const [visibleCards, setVisibleCards] = useState(cardsQuantity); // Initial number of visible cards
  const loadMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + cardsQuantity); // Increase by 3 cards
  };
  return (
    <>
      <div className="container-fluid lg:p-6 md:p-0 p-5" id={id}>
        <Image
          src={imgsrc}
          width={1400}
          alt=""
          className="object-contain w-full my-10"
          height={50}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xxl:grid-cols-4 gap-8">
          {data?.slice(0, visibleCards).map((item) => (
            <Card item={item} key={item?.id} />
          ))}
        </div>
        {visibleCards < data?.length && (
          <div className="text-center mt-6">
            <button className="btn-red" onClick={loadMoreCards}>
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
}
