"use client";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { loadDealFromStorage, saveDealToStorage } from "../hooks/imageStorage";
import { Toaster } from "react-hot-toast";
export default function CardDetail({ data, closeModal }) {
  const { cart, addToCart, toggleCart, removeFromCart } = useCart();
  const [refreshKey, setRefreshKey] = useState(0);
  const [btn, setbtn] = useState("ADD TO CART");
  const item = useMemo(() => {
    if (data?.fake_id) return data;
    return {
      ...data,
      fake_id: data?.id + Math.floor(Math.random() * 10000),
    };
  }, [data, refreshKey]);

  const getCartItemQuantity = (itemId) => {
    const cartItem = cart.find((item) => item.fake_id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };
  const quantity = getCartItemQuantity(item.fake_id);

  const regenerateFakeId = () => {
    setRefreshKey((prev) => prev + 1);
  };
  const { id, name, description, price, discount_percentage, fake_id } = item;
  const dealKey = `c_variations_${fake_id}`;
  // Restore selected modifiers if already in cart
  useEffect(() => {
    if (quantity !== 0) {
      setbtn("UPDATE CART");
    } else {
      setbtn("ADD TO CART");
    }
  }, [quantity, item]);
  const { register, watch, reset } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (data?.fake_id) {
      const sub = watch((data) => {
        saveDealToStorage(dealKey, {
          fields: data,
        });
      });
      return () => sub.unsubscribe();
    }
  }, [watch, data]);

  useEffect(() => {
    const saved = loadDealFromStorage(dealKey);
    if (saved?.fields) {
      reset(saved.fields);
    }
  }, [dealKey, reset]);

  const handleAddToCart = async () => {
    const formData = watch();
    saveDealToStorage(dealKey, {
      fields: formData,
    });
    if (btn === "UPDATE CART") {
      closeModal();
    } else {
      addToCart(item);
    }
    if (quantity === 0) {
      closeModal();
    }
    if (!data?.fake_id) {
      toggleCart();
      reset();
      regenerateFakeId();
    }
  };
  const Removehandle = () => {
    removeFromCart(fake_id);
    const dealKey = `c_variations_${fake_id}`;
    localStorage.removeItem(dealKey);
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="md:overflow-y-hidden overflow-y-scroll cursor-pointer custom-scrollbar h-screen md:h-full">
        <div className="grid grid-cols-1 lg:grid-cols-7 md:grid-cols-5 h-full mb-12">
          <div className="lg:col-span-3 md:col-span-2 flex justify-center items-center p-4 border-b md:border-b-0 md:border-r border-gray-300 h-full">
            {item?.cover_image && (
              <Image
                src={item?.cover_image}
                width={400}
                height={400}
                className="object-contain w-full max-w-[300px] sm:max-w-[400px]"
                alt="Product Image"
              />
            )}
          </div>

          <div className="lg:col-span-4 md:col-span-3 p-0 m-0 flex flex-col justify-between md:overflow-y-auto md:scrollbar-none">
            <div className="p-5">
              <h2 className="font-sans text-xl mb-3">{name}</h2>

              <div className="flex gap-3 items-center">
                {price && (
                  <h2 className="text-lg font-sans text-kcred font-[500]">
                    AED : {price}
                  </h2>
                )}
                <h2
                  className={`text-lg font-sans text-cblack font-[500] ${
                    discount_percentage ? "line-through opacity-60" : ""
                  }`}
                >
                  AED : {discount_percentage}
                </h2>
              </div>

              <p className="text-sm text-gray-600 mt-5 font-medium leading-6">
                {description}
              </p>

              {/* Special Instructions */}
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="text-lg font-sans text-cblack tracking-wide font-[500]"
                >
                  Special Instructions
                </label>
                <textarea
                  {...register("instructions")} // ✅ Correct way to register
                  name="instructions"
                  rows="4"
                  className="block mt-3 p-2.5 w-full text-sm text-gray-900 tracking-wide bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Please enter instructions about this item..."
                ></textarea>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white grid grid-cols-1 md:grid-cols-7 gap-4 items-center border-t border-gray-300 p-4 mt-5">
              <div className="col-span-2 md:block hidden w-full">
                <div className="flex justify-center md:justify-start items-center gap-3">
                  <button
                    onClick={Removehandle}
                    disabled={quantity === 0}
                    className={`rounded p-2 transition duration-100 ${
                      quantity === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-kcred text-white hover:bg-red-600 hover:scale-110"
                    }`}
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <div className="text-lg font-bold">{quantity}</div>
                  <button
                    onClick={handleAddToCart}
                    className="rounded p-2 transition duration-100 
                        bg-kcred text-white hover:bg-red-600 hover:scale-110"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
              </div>

              <div className="md:col-span-5 w-full">
                <button
                  onClick={handleAddToCart}
                  className="rounded w-full p-3 text-lg font-semibold transition
                      bg-kcred text-white hover:bg-red-600"
                >
                  {btn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
