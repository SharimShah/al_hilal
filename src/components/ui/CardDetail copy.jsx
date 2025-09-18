"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { loadDealFromStorage, saveDealToStorage } from "../hooks/imageStorage";
import { Toaster } from "react-hot-toast";
import { FaArrowCircleRight } from "react-icons/fa";
import AddCounterModi from "./AddCounterModi";

export default function CardDetail({ data, closeModal }) {
  const { cart, addToCart, toggleCart, removeFromCart, updatePrice } =
    useCart();
  const [refreshKey, setRefreshKey] = useState(0);
  const [btn, setbtn] = useState("ADD TO CART");
  const [Total_price, setTotal_price] = useState(0);
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
  const regenerateFakeId = () => setRefreshKey((prev) => prev + 1);
  const { id, name, description, price, fake_id, addons } = item;
  const dealKey = `c_variations_${fake_id}`;

  // react-hook-form
  const {
    register,
    watch,
    reset,
    control,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });
  // Restore if already in cart
  useEffect(() => {
    if (quantity !== 0) {
      setbtn("UPDATE CART");
    } else {
      setbtn("ADD TO CART");
    }
  }, [quantity, item]);

  // persist in localStorage
  useEffect(() => {
    if (data?.fake_id) {
      const sub = watch((data) => {
        saveDealToStorage(dealKey, { fields: data });
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

  // Add to Cart
  const handleAddToCart = () => {
    const formData = watch();
    const selectedModifiers = getSelectedModifiers(formData);
    const finalItem = {
      ...item,
      modifiers: selectedModifiers,
      total_price: Total_price, // always correct
    };

    saveDealToStorage(dealKey, { fields: formData });

    if (btn === "UPDATE CART") {
      addToCart(finalItem, true);
      closeModal();
    } else {
      addToCart(finalItem);
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
    localStorage.removeItem(dealKey);
    localStorage.removeItem(`c_variations_${item?.fake_id}`);
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
  // Get selected modifiers based on formData
  const getSelectedModifiers = (formData) => {
    const selected = [];
    addons?.forEach((group, i) => {
      const fieldName = `addon_${i}`;
      const selectedValue = formData[fieldName];

      if (group.multi_option === "one" && selectedValue) {
        const found = group.sub_item.find(
          (s) => s.sub_item_id === selectedValue.id
        );
        if (found)
          selected.push({ ...found, quantity: selectedValue.quantity });
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
  // Load saved modifiers from localStorage
  const getSavedModifiers = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(dealKey);
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  };
  // Watch formData changes (from react-hook-form)
  const selectedFormData = watch();
  const selectedModifiers = getSelectedModifiers(selectedFormData);

  // Sum modifier prices
  const modifiersPrice = selectedModifiers.reduce(
    (sum, mod) => sum + Number(mod.price),
    0
  );

  // Convert base price to number
  const numericPrice = Number(price);

  // Update total price whenever base/modifiers/qty change
  useEffect(() => {
    const total = numericPrice + modifiersPrice;

    updatePrice({
      ...item,
      total_price: total, // ✅ always numeric
    });

    setTotal_price(total);
  }, [numericPrice, modifiersPrice, quantity, item]);
  const isGroupComplete = (group, formData, index) => {
    const fieldName = `addon_${index}`;
    const selectedValue = formData[fieldName];

    if (!group.require_addons) return true; // not required → always complete

    if (group.multi_option === "one") {
      return Boolean(selectedValue); // must pick one
    }

    if (group.multi_option === "multiple") {
      return Array.isArray(selectedValue) && selectedValue.length > 0; // must pick at least one
    }

    return false;
  };
  const showing_price = Total_price * (quantity || 1);
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
                className="object-contain w-full max-w-[300px] sm:max-w-[400px]"
                alt="Product Image"
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
                  AED : {showing_price || price}
                </h2>
              </div>

              <div
                className="text-sm text-gray-600 my-3 font-medium leading-6"
                dangerouslySetInnerHTML={{ __html: description }}
              />

              {/* Modifiers */}
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
                        {group?.require_addons ? (
                          <div
                            className={`text-white text-[12px] rounded-md py-1 px-2 ${
                              isComplete ? "bg-green-600" : "bg-red-500"
                            }`}
                          >
                            {isComplete ? "Completed" : "Required"}
                          </div>
                        ) : null}
                      </div>

                      {/* Radio (one option only) */}
                      {group.multi_option === "one" ? (
                        <Controller
                          name={`addon_${i}`}
                          control={control}
                          rules={{
                            required: group.require_addons
                              ? "This field is required"
                              : false,
                          }}
                          defaultValue={
                            group.sub_item.find((itm) => itm.checked)
                              ?.sub_item_id || ""
                          }
                          render={({ field, fieldState }) => (
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
                              {fieldState.error && (
                                <p className="text-red-500 text-sm">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </>
                          )}
                        />
                      ) : (
                        <Controller
                          name={`addon_${i}`}
                          control={control}
                          rules={{
                            required: group.require_addons
                              ? "This field is required"
                              : false,
                          }}
                          defaultValue={
                            getSavedModifiers()[`addon_${i}`] ||
                            group.sub_item
                              ?.filter((itm) => itm.checked === true)
                              .map((itm) => ({
                                id: itm.sub_item_id,
                                quantity: 1,
                              })) ||
                            []
                          }
                          render={({ field }) => {
                            const updateLocal = (newValue) => {
                              let saved = getSavedModifiers();
                              saved[`addon_${i}`] = newValue;
                              localStorage.setItem(
                                dealKey,
                                JSON.stringify(saved)
                              );
                              field.onChange(newValue);
                            };

                            return (
                              <>
                                {group.sub_item.map((itm) => {
                                  const selectedModifier = field.value.find(
                                    (m) => m.id === itm.sub_item_id
                                  );
                                  const quantity = selectedModifier
                                    ? selectedModifier.quantity
                                    : 0;

                                  return (
                                    <label
                                      key={itm.sub_item_id}
                                      className="text-[12px] md:text-[16px] flex justify-between items-center space-x-2 p-2 border-b rounded mb-2 cursor-pointer hover:bg-gray-50"
                                    >
                                      {/* Checkbox */}
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <input
                                          type="checkbox"
                                          checked={!!selectedModifier}
                                          onChange={(e) => {
                                            const checked = e.target.checked;
                                            let newValue = [...field.value];
                                            if (checked) {
                                              newValue.push({
                                                id: itm.sub_item_id,
                                                quantity: 1,
                                              });
                                            } else {
                                              newValue = newValue.filter(
                                                (m) => m.id !== itm.sub_item_id
                                              );
                                            }
                                            updateLocal(newValue); // ✅ Save to localStorage
                                          }}
                                          className="form-checkbox text-kcred"
                                        />
                                        <span className="text-gray-500 flex items-center gap-1 whitespace-nowrap">
                                          {itm.sub_item_name}
                                          {itm.price > 0 && (
                                            <span className="text-gray-500 flex items-center gap-1 whitespace-nowrap">
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
                                      </div>

                                      {/* Counter + Image */}
                                      <div className="flex items-center gap-3">
                                        {selectedModifier && (
                                          <div className="flex items-center justify-center border border-red-500 rounded-full p-1 w-auto mx-auto">
                                            <AddCounterModi
                                              Quantity={quantity}
                                              minus={() => {
                                                let newValue = [...field.value];
                                                const idx = newValue.findIndex(
                                                  (m) =>
                                                    m.id === itm.sub_item_id
                                                );
                                                if (idx !== -1) {
                                                  if (
                                                    newValue[idx].quantity > 1
                                                  ) {
                                                    newValue[idx].quantity -= 1;
                                                  } else {
                                                    newValue.splice(idx, 1); // remove if qty=0
                                                  }
                                                }
                                                updateLocal(newValue); // ✅ Save
                                              }}
                                              plus={() => {
                                                let newValue = [...field.value];
                                                const idx = newValue.findIndex(
                                                  (m) =>
                                                    m.id === itm.sub_item_id
                                                );
                                                if (idx !== -1) {
                                                  newValue[idx].quantity += 1;
                                                } else {
                                                  newValue.push({
                                                    id: itm.sub_item_id,
                                                    quantity: 1,
                                                  });
                                                }
                                                updateLocal(newValue); // ✅ Save
                                              }}
                                            />
                                          </div>
                                        )}
                                        {itm?.cover_image && (
                                          <Image
                                            src={itm?.cover_image}
                                            width={60}
                                            height={60}
                                            alt=""
                                            className="w-[60px] h-[60px] object-cover rounded hidden md:block"
                                          />
                                        )}
                                      </div>
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

              {/* Live Price Summary */}
              <div className="mt-6 p-4 border rounded bg-gray-50">
                <h3 className="text-lg font-sans text-cblack tracking-wide font-[500] mb-2">
                  Order Summary
                </h3>
                <p className="text-sm">
                  Base Price: <b>AED {price}</b>
                </p>
                {selectedModifiers.map((m) => (
                  <p key={m.sub_item_id} className="text-sm text-gray-700">
                    {m.sub_item_name}: +AED {m.price}
                  </p>
                ))}
                <hr className="my-2" />
                <p className="font-bold text-lg">Total: AED {showing_price}</p>
              </div>
            </div>

            {/* Bottom Buttons */}
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
                    disabled={!isValid}
                    onClick={handleAddToCart}
                    className={`${
                      !isValid ? "opacity-50 cursor-not-allowed" : ""
                    }rounded p-2 transition duration-100 
                        bg-kcred text-white hover:bg-red-600 hover:scale-110`}
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
              </div>
              <div className="md:col-span-5 w-full">
                <button
                  disabled={!isValid} // ✅ disable if form is NOT valid
                  onClick={handleAddToCart}
                  className={`${
                    !isValid ? "opacity-50 cursor-not-allowed" : ""
                  } rounded w-full p-3 text-[16px] font-medium transition flex justify-between bg-kcred text-white hover:bg-red-600`}
                >
                  <span>AED : {showing_price}</span>
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
}
