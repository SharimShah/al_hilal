import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineRollback } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import SliderCart from "./SliderCart";
import TotalPrices from "./TotalPrices";
import { FaCircleArrowRight } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";
import Emptycart from "./Emptycart";
import Link from "next/link";
import { useEffect, useState } from "react";
import PopularItemsSwiper from "./PopularItemsSwiper";

const YourCart = ({ toggleSidebar, open, ref, data }) => {
  const { cart, isAllowedTime } = useCart();
  const [Cheakbtn, setCheakbtn] = useState(false);

  useEffect(() => {
    if (isAllowedTime == true) {
      setCheakbtn(true);
    } else {
      setCheakbtn(false);
    }
  }, [isAllowedTime]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              onClick={toggleSidebar}
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm z-[120]"
            ></motion.div>
            {cart.length > 0 ? (
              <motion.div
                {...framerSidebarPanel}
                className="fixed top-0 overflow-y-auto bottom-0 right-0 z-50 md:w-full w-[90%] h-screen max-w-sm border-r-2 border-kcred z-[130] bg-white"
                ref={ref}
                aria-label="Sidebar"
              >
                <div className="flex items-center justify-between p-5 border-b-2 border-kcred text-2xl">
                  <span>Your Cart</span>
                  <button
                    onClick={toggleSidebar}
                    className="p-3 border-2 border-kcred rounded-xl"
                    aria-label="close sidebar"
                  >
                    <AiOutlineRollback />
                  </button>
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
                      onClick={toggleSidebar}
                    >
                      <motion.div {...framerText(5)}>
                        <h1 className="text-[16px] text-gray-400 flex items-center gap-3">
                          <IoMdAdd />
                          Add more items
                        </h1>
                      </motion.div>
                    </a>
                  </li>
                </ul>
                {data && (
                  <motion.div {...framerText(6)}>
                    <PopularItemsSwiper data={data} />
                  </motion.div>
                )}

                <motion.div {...framerText(7)}>
                  <TotalPrices />
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
                className="fixed top-0 overflow-y-auto bottom-0 right-0 z-50 md:w-full w-[90%] h-screen max-w-sm border-r-2 border-kcred z-[130] bg-white"
                ref={ref}
                aria-label="Sidebar"
              >
                <div className="flex items-center justify-between p-5 border-b-2 border-kcred text-2xl">
                  <span>Your Cart</span>
                  <button
                    onClick={toggleSidebar}
                    className="p-3 border-2 border-kcred rounded-xl"
                    aria-label="close sidebar"
                  >
                    <AiOutlineRollback />
                  </button>
                </div>
                <Emptycart />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
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
export default YourCart;
