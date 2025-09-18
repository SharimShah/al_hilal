"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaArrowCircleRight } from "react-icons/fa";
import { loadDealFromStorage, saveDealToStorage } from "../hooks/imageStorage";
import { Toaster } from "react-hot-toast";
import AddCounter from "./AddCounter";
import { useRouter } from "next/navigation";

const CardDetail = ({ data, closeModal, pagetype }) => {
  const { cart, addToCart, toggleCart, removeFromCart, updatePrice } =
    useCart();
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const [btn, setBtn] = useState("ADD TO CART");
  const [totalPrice, setTotalPrice] = useState(0);

  // Ensure every item has a unique fake_id
  const item = useMemo(() => {
    if (data?.fake_id) return data;
    return { ...data, fake_id: data?.id + Math.floor(Math.random() * 10000) };
  }, [data, refreshKey]);

  const { name, description, price, fake_id, addons, modifiers } = item;
  const dealKey = `c_variations_${fake_id}`;

  const {
    register,
    watch,
    reset,
    control,
    getValues,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  // Quantity from cart
  const quantity = cart.find((c) => c.fake_id === fake_id)?.quantity || 0;

  const getCartItemQuantity = (itemId) => {
    const cartItem = cart.find((item) => item.fake_id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Change button label based on cart
  useEffect(() => {
    setBtn(quantity > 0 ? "UPDATE CART" : "ADD TO CART");
  }, [quantity]);

  // Persist changes to localStorage
  useEffect(() => {
    const sub = watch((formData) => {
      if (Object.keys(formData).length > 0) {
        saveDealToStorage(dealKey, { fields: formData });
      }
    });
    return () => sub.unsubscribe();
  }, [control, dealKey]);

  // Restore saved form data on mount
  useEffect(() => {
    const saved = loadDealFromStorage(dealKey);
    if (saved?.fields) reset(saved.fields);
  }, [dealKey, reset]);

  // Helpers
  const regenerateFakeId = () => setRefreshKey((prev) => prev + 1);

  const getSelectedModifiers = (formData) => {
    const selected = [];
    addons?.forEach((group, i) => {
      const fieldName = `addon_${i}`;
      const selectedValue = formData[fieldName];

      if (group.multi_option === "one" && selectedValue) {
        const found = group.sub_item.find(
          (s) => s.sub_item_id === selectedValue
        );
        if (found) selected.push({ ...found, quantity: 1 });
      }

      if (group.multi_option === "multi" && Array.isArray(selectedValue)) {
        selectedValue.forEach((sel) => {
          const found = group.sub_item.find((s) => s.sub_item_id === sel.id);
          if (found) selected.push({ ...found, quantity: sel.quantity });
        });
      }
    });
    return selected;
  };

  // Watch selections
  const selectedFormData = watch();
  const selectedModifiers = getSelectedModifiers(selectedFormData);

  const modifiersPrice = selectedModifiers.reduce(
    (sum, mod) => sum + Number(mod.price) * (mod.quantity || 1),
    0
  );
  const numericPrice = Number(price);

  // Calculate modifiers total directly from cart
  const modifiersTotal = (modifiers || []).reduce((sum, mod) => {
    const qty = getCartItemQuantity(mod.id);
    return sum + Number(mod.price) * qty;
  }, 0);

  // Final showing price
  const showingPrice =
    (numericPrice + modifiersPrice) * (quantity || 1) + modifiersTotal;

  // Update total price for main item (not including separate modifiers)
  useEffect(() => {
    const newTotal = numericPrice + modifiersPrice;
    setTotalPrice(newTotal);
    updatePrice({ fake_id, total_price: newTotal });
  }, [numericPrice, modifiersPrice, quantity, fake_id]);

  // Add to cart (main item with addons)
  const handleAddToCart = () => {
    const formData = getValues();
    const selectedModifiers = getSelectedModifiers(formData);

    const finalItem = {
      ...item,
      variation: selectedModifiers,
      total_price: totalPrice,
    };

    if (Object.keys(formData).length > 0) {
      saveDealToStorage(dealKey, { fields: formData });
    }

    addToCart(finalItem, btn === "UPDATE CART");
    closeModal();
    if (pagetype === "modal") {
      router.push("/");
    }
    if (!data?.fake_id) {
      toggleCart();
      reset();
      regenerateFakeId();
    }
  };

  // Modifier add/remove
  const modiAddToCart = (itm) => {
    const qty = getCartItemQuantity(itm.id) + 1;
    const finalItem = {
      ...itm,
      total_price: Number(itm.price) * qty,
      fake_id: itm.id, // use id as fake_id for modifiers
    };
    addToCart(finalItem);
  };

  const modiRemoveFromCart = (itm) => {
    removeFromCart(itm.id);
  };

  // Remove main item
  const handleRemove = () => {
    removeFromCart(fake_id);
    localStorage.removeItem(dealKey);
  };

  const isGroupComplete = (group, formData, index) => {
    const fieldName = `addon_${index}`;
    const selectedValue = formData[fieldName];
    if (!group.require_addons) return true;
    if (group.multi_option === "one") return Boolean(selectedValue);
    if (group.multi_option === "multi")
      return Array.isArray(selectedValue) && selectedValue.length > 0;
    return false;
  };

  const sectionRefs = useRef([]);
  const handleScrollNext = (index) => {
    if (sectionRefs.current[index + 1]) {
      sectionRefs.current[index + 1].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="md:overflow-y-hidden overflow-y-scroll multiple-scrollbar h-screen md:h-full">
        <div className="grid grid-cols-1 lg:grid-cols-7 md:grid-cols-5 h-full mb-12">
          {/* Image */}
          <div className="lg:col-span-3 md:col-span-2 flex justify-center items-center p-4 border-b md:border-b-0 md:border-r border-gray-300">
            {item?.cover_image && (
              <Image
                src={item?.cover_image}
                width={400}
                height={400}
                className="object-contain w-full max-w-[400px]"
                alt={name}
              />
            )}
          </div>

          {/* Content */}
          <div className="lg:col-span-4 md:col-span-3 flex flex-col justify-between md:overflow-y-auto md:scrollbar-none">
            <div className="md:p-5 p-2">
              <h2 className="font-sans text-xl mb-3">{name}</h2>

              {/* Price */}
              <div className="flex gap-3 items-center">
                <h2 className="text-lg font-sans text-kcred font-[500]">
                  AED : {showingPrice}
                </h2>
              </div>

              <div
                className="text-sm text-gray-600 my-3 font-medium leading-6"
                dangerouslySetInnerHTML={{ __html: description }}
              />

              {/* Addons */}
              <form className="w-full mx-auto space-y-5">
                {addons?.map((group, i) => {
                  const isComplete = isGroupComplete(
                    group,
                    selectedFormData,
                    i
                  );
                  return (
                    <div key={i} ref={(el) => (sectionRefs.current[i] = el)}>
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="font-medium text-[15px]">
                          {group.subcat_name}
                        </h2>
                        {group.require_addons && (
                          <div
                            className={`text-white text-[12px] rounded-md py-1 px-2 ${
                              isComplete ? "bg-green-600" : "bg-red-500"
                            }`}
                          >
                            {isComplete ? "Completed" : "Required"}
                          </div>
                        )}
                      </div>

                      {/* Single choice */}
                      {group.multi_option === "one" ? (
                        <Controller
                          name={`addon_${i}`}
                          control={control}
                          rules={{ required: group.require_addons }}
                          defaultValue={
                            group.sub_item.find((itm) => itm.checked)
                              ?.sub_item_id || ""
                          }
                          render={({ field }) => (
                            <>
                              {group.sub_item.map((itm) => (
                                <label
                                  key={itm.sub_item_id}
                                  className="flex items-center space-x-2 p-2 border-b rounded mb-2 cursor-pointer hover:bg-gray-50"
                                >
                                  <input
                                    type="radio"
                                    value={itm.sub_item_id}
                                    checked={field.value === itm.sub_item_id}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                      handleScrollNext(i);
                                    }}
                                    className="form-radio text-kcred"
                                  />
                                  <span className="text-gray-500 flex items-center gap-1">
                                    {itm.sub_item_name}
                                    {itm.price > 0 && (
                                      <span className="text-gray-500 flex items-center gap-[.5]">
                                        (+{itm.price}
                                        <Image
                                          src="/images/aed.webp"
                                          alt="AED Icon"
                                          width={20}
                                          height={20}
                                        />
                                        )
                                      </span>
                                    )}
                                  </span>
                                </label>
                              ))}
                            </>
                          )}
                        />
                      ) : (
                        // Multi choice
                        <Controller
                          name={`addon_${i}`}
                          control={control}
                          defaultValue={
                            group.sub_item
                              .filter((itm) => itm.checked)
                              .map((itm) => ({
                                id: itm.sub_item_id,
                                quantity: 1,
                              })) || []
                          }
                          render={({ field }) => {
                            const value = Array.isArray(field.value)
                              ? field.value
                              : [];
                            return (
                              <>
                                {group.sub_item.map((itm) => {
                                  const selectedModifier = value.find(
                                    (m) => m.id === itm.sub_item_id
                                  );
                                  return (
                                    <label
                                      key={itm.sub_item_id}
                                      className="flex items-center gap-2 p-2 border-b rounded mb-2 cursor-pointer hover:bg-gray-50"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={!!selectedModifier}
                                        onChange={(e) => {
                                          let newValue = [...value];
                                          if (e.target.checked) {
                                            newValue.push({
                                              id: itm.sub_item_id,
                                              quantity: 1,
                                            });
                                          } else {
                                            newValue = newValue.filter(
                                              (m) => m.id !== itm.sub_item_id
                                            );
                                          }
                                          field.onChange(newValue);
                                        }}
                                        className="form-checkbox text-kcred"
                                      />
                                      {itm.sub_item_name}
                                      {itm.price > 0 && (
                                        <span className="ml-1 text-gray-500">
                                          (+{itm.price})
                                        </span>
                                      )}
                                    </label>
                                  );
                                })}
                              </>
                            );
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </form>

              {/* Extra Modifiers */}
              {modifiers && (
                <div>
                  <h2 className="font-medium text-[15px] mt-5 mb-2">
                    Modifiers
                  </h2>
                  {modifiers?.map((itm, i) => {
                    const qty = getCartItemQuantity(itm.id);
                    return (
                      <div
                        key={i}
                        className="text-[12px] md:text-[16px] flex justify-between items-center space-x-2 p-2 border-b rounded mb-2 cursor-pointer hover:bg-gray-50"
                      >
                        {/* Label */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-gray-500 flex items-center gap-1 whitespace-nowrap">
                            {itm?.cover_image && (
                              <Image
                                src={itm?.cover_image}
                                width={60}
                                height={60}
                                alt=""
                                className="md:w-[60px] w-[50px] md:h-[60px] h-[50px] object-cover mr-2 rounded block"
                              />
                            )}
                            {itm.name}
                            {itm.price > 0 && (
                              <span className="text-gray-500 flex items-center gap-1 whitespace-nowrap">
                                (+{itm.price * (qty || 1)}
                                <Image
                                  src="/images/aed.webp"
                                  alt="AED Icon"
                                  width={20}
                                  height={20}
                                />
                                )
                              </span>
                            )}
                          </span>
                        </div>

                        {/* Counter */}
                        <div className="flex items-center gap-3">
                          {qty === 0 ? (
                            <button
                              className="btn-red rounded-full text-[12px] w-full px-4"
                              onClick={() => modiAddToCart(itm)}
                            >
                              Add +
                            </button>
                          ) : (
                            <div className="flex items-center justify-center border border-red-500 rounded-full p-1 w-auto mx-auto">
                              <AddCounter
                                minus={() => modiRemoveFromCart(itm)}
                                plus={() => modiAddToCart(itm)}
                                Quantity={qty}
                              />
                            </div>
                          )}

                          {/* {itm?.cover_image && (
                            <Image
                              src={itm?.cover_image}
                              width={60}
                              height={60}
                              alt=""
                              className="w-[60px] h-[60px] object-cover rounded hidden md:block"
                            />
                          )} */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Special Instructions */}
              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="text-lg font-sans text-cblack tracking-wide font-[500]"
                >
                  Special Instructions
                </label>
                <textarea
                  {...register("instructions")}
                  rows="4"
                  className="block mt-3 p-2.5 w-full text-sm text-gray-900 tracking-wide bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Please enter instructions about this item..."
                />
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="sticky md:bottom-0 bottom-[25px]  bg-white grid grid-cols-1 md:grid-cols-7 gap-4 items-center border-t border-gray-300 p-4 mt-5">
              <div className="col-span-2 md:block hidden w-full">
                <div className="flex justify-center md:justify-start items-center gap-3">
                  <button
                    onClick={handleRemove}
                    disabled={quantity === 0}
                    className={`rounded p-2 transition ${
                      quantity === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-kcred text-white hover:bg-red-600 hover:scale-110"
                    }`}
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <div className="text-lg font-bold">{quantity}</div>
                  <button
                    disabled={!isValid}
                    onClick={handleAddToCart}
                    className={`rounded p-2 transition bg-kcred text-white hover:bg-red-600 hover:scale-110 ${
                      !isValid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
              </div>
              <div className="md:col-span-5 w-full">
                <button
                  disabled={!isValid}
                  onClick={handleAddToCart}
                  className={`rounded w-full p-3 text-[16px] font-medium transition flex justify-between bg-kcred text-white hover:bg-red-600 ${
                    !isValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span>AED : {showingPrice}</span>
                  <span className="flex gap-2 items-center">
                    {btn} <FaArrowCircleRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetail;
