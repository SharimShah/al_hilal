"use client";
import { useEffect, useState, useRef } from "react";
import { useClickAway } from "react-use";
import LinkSidebar from "../ui/LinkSidebar";
import ViewCart from "../ui/ViewCart";
import YourCart from "../ui/YourCart";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/context/LocationContext";
import { useCart } from "@/context/CartContext";
import { siteNumber } from "@/domain/domain";
import { TiShoppingCart } from "react-icons/ti";
function Navbar({ data }) {
  const { toggleCart, opencart, cart } = useCart();
  const { setIsModalVisible } = useModal();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  // Control body scroll on sidebar open
  useEffect(() => {
    if (typeof window !== "undefined" && window.document) {
      document.body.style.overflow = open ? "hidden" : "unset";
    }
  }, [open]);

  // Close sidebar/cart when clicking outside
  useClickAway(ref, () => {
    setOpen(false);
    setOpencart(false);
  });

  const toggleSidebar = () => setOpen((prev) => !prev);
  const handleEditClick = () => {
    setIsModalVisible(true);
  };
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <div className="container-fluid p-0 max-[380px]:p-0 md:my-5">
        <header className="flex py-2 px-2 sm:px-10 min-h-[70px] tracking-wide relative z-50 ">
          <div className="flex flex-wrap md:items-center md:gap-4 w-full">
            <Link
              href="/"
              className="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2"
            >
              <Image
                priority={true}
                height={200}
                width={300}
                src="/images/logo.png"
                alt="logo"
                className="w-[100px] max-h-[100px] lg:w-[260px] object-contain"
              />
            </Link>
            <div
              id="collapseMenu"
              className="lg:flex lg:w-auto max-lg:hidden lg:!block max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
            >
              <button
                id="toggleClose"
                className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 fill-black"
                  viewBox="0 0 320.591 320.591"
                >
                  <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
                  <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
                </svg>
              </button>

              <ul className="lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 items-center">
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <a
                    href="tel:+971502828588"
                    className="btn-red  text-white text-lg font-medium hover:underline cursor-pointer"
                  >
                    {siteNumber}
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex items-center ml-auto space-x-6">
              <div
                className="relative inline-block cursor-pointer"
                aria-label="toggle sidebar"
                onClick={toggleCart}
              >
                {/* Icon or Element */}
                <div className="flex items-center justify-center">
                  <TiShoppingCart className="text-[30px] md:text-[40px]" />
                </div>
                {/* Notification Badge */}
                <span className="absolute md:top-[15px] md:right-[30px] top-[8px] right-[23px] text-[12px] leading-[12px] md:leading-4 inline-flex items-center justify-center h-5 w-5 md:text-xs font-bold text-white bg-kcred rounded-full">
                  {totalQuantity}
                </span>
              </div>
              {/* Responsive Button for small screens */}
              {/* <Link
                href="#"
                className="btn-red flex items-center gap-2 hidden lg:block md:block"
              >
                Submit Your Complaint
              </Link> */}
              {/* <div className="relative lg:hidden md:hidden">
                <button
                  className="flex items-center gap-2"
                  onClick={handleEditClick}
                >
                  <IoLocation className="text-[30px] text-kcred" />
                </button>
              </div> */}
            </div>
          </div>
        </header>
      </div>
      <LinkSidebar open={open} toggleSidebar={toggleSidebar} />
      <YourCart open={opencart} toggleSidebar={toggleCart} data={data} />
      <ViewCart toggleCart={toggleCart} />
    </>
  );
}
export default Navbar;
