"use client";
import { AnimatePresence, motion } from "framer-motion";
import SliderCart from "./SliderCart";
import TotalPrices from "./TotalPrices";
import { FaCircleArrowRight } from "react-icons/fa6";
import Emptycart from "./Emptycart";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import PopularItemsSwiper from "./PopularItemsSwiper";
import AreaSelect from "./AreaSelect";
const FixedYourCard = ({ data }) => {
  const { cart, isAllowedTime, selectedOption } = useCart();
  const [Cheakbtn, setCheakbtn] = useState(false);

  useEffect(() => {
    if (selectedOption?.address != null && isAllowedTime == true) {
      setCheakbtn(true);
    } else {
      setCheakbtn(false);
    }
  }, [selectedOption, isAllowedTime]);
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {cart.length > 0 ? (
          <motion.div
            {...framerSidebarPanel}
            className="shadow-[-10px_0px_20px_-5px_rgba(149,_157,_165,_0.2)] w-full sticky top-0 left-0 overflow-y-auto bottom-0 right-0 w-full h-screen border-r-2 border-kcred z-[49] bg-white"
          >
            <div className="flex items-center justify-between p-5 border-b-2 border-kcred text-2xl">
              <span>Your Cart</span>
            </div>
            <ul>
              <li>
                {cart.map((item, index) => (
                  <a
                    key={index}
                    className="flex items-center justify-between gap-5 p-3 transition-all border-b-2 border-kcred"
                  >
                    <motion.div {...framerText(index)} className="w-full">
                      <SliderCart item={item} />
                    </motion.div>
                  </a>
                ))}
                <a
                  className="flex items-center justify-between gap-5 p-2 transition-all cursor-pointer"
                  aria-hidden="true"
                ></a>
              </li>
            </ul>
            <motion.div {...framerText(6)}>
              <PopularItemsSwiper data={data} />
            </motion.div>
            <motion.div {...framerText(7)}>
              <TotalPrices />
            </motion.div>
            <motion.div {...framerText(8)}>
              <AreaSelect />
            </motion.div>
            <div className="px-4 pb-6 mt-4">
              {Cheakbtn ? (
                <Link href="/guestcheckout">
                  <button className="btn-red rounded h-[50px] flex items-center justify-center gap-10 w-full text-[16px]">
                    Check Out
                    <FaCircleArrowRight className="text-2xl" />
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="rounded h-[50px] flex items-center justify-center gap-10 w-full text-[16px] bg-gray-300 cursor-not-allowed"
                >
                  Check Out
                  <FaCircleArrowRight className="text-2xl" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            {...framerSidebarPanel}
            className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] max-w-[350px] sticky top-0 left-0 overflow-y-auto bottom-0 w-full h-screen border-r-2 border-kcred z-[49] bg-white"
          >
            <Emptycart />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
const framerSidebarPanel = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { duration: 0.3 },
};

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};
export default FixedYourCard;
