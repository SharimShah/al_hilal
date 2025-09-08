"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { loadDealFromStorage, saveDealToStorage } from "../hooks/imageStorage";
import { Toaster } from "react-hot-toast";
import { FaArrowCircleRight } from "react-icons/fa";

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
  console.log(addons, "addons");
  const dealKey = `c_variations_${fake_id}`;

  // react-hook-form
  const {
    register,
    watch,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  console.log(isValid, "isValid");
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

  // // Modifier data (mock)
  // const addon_item = [
  //   {
  //     sequence: 3,
  //     subcat_name: "Quantity",
  //     multi_option: "multiple",
  //     require_addons: 1,
  //     sub_item: [
  //       {
  //         sub_item_id: "3115330",
  //         sub_item_name: "Sigle",
  //         price: 0,
  //         checked: 1,
  //       },
  //       { sub_item_id: "3115321", sub_item_name: "Duoble", price: 100 },
  //     ],
  //   },
  //   {
  //     sequence: 2,
  //     subcat_name: "Select your Desserts",
  //     multi_option: "one",
  //     require_addons: 1,
  //     sub_item: [
  //       { sub_item_id: "311530", sub_item_name: "Zarda", price: 0 },
  //       { sub_item_id: "311531", sub_item_name: "Kheer", price: 0 },
  //     ],
  //   },
  //   {
  //     subcat_id: "203072",
  //     sequence: 6,
  //     subcat_name: "ADD ON",
  //     multi_option: "multiple",
  //     require_addons: 0,
  //     sub_item: [{ sub_item_id: "311536", sub_item_name: "Nalli", price: 200 }],
  //   },
  //   {
  //     subcat_id: "203206",
  //     sequence: 7,
  //     subcat_name: "Soft Drink Can",
  //     multi_option: "one",
  //     require_addons: 1,
  //     sub_item: [
  //       { sub_item_id: "312009", sub_item_name: "7up Zero", price: 0 },
  //       { sub_item_id: "312010", sub_item_name: "7up Diet", price: 0 },
  //       { sub_item_id: "312023", sub_item_name: "Pepsi", price: 0 },
  //       { sub_item_id: "312024", sub_item_name: "Mirinda", price: 0 },
  //       { sub_item_id: "312025", sub_item_name: "7up", price: 0 },
  //     ],
  //   },
  // ];

  // Get selected modifiers based on formData
  const getSelectedModifiers = (formData) => {
    const selected = [];
    addons?.forEach((group, i) => {
      const fieldName = `addon_${i}`;
      const selectedValue = formData[fieldName];

      if (group.multi_option === "one" && selectedValue) {
        const found = group.sub_item.find(
          (s) => s.sub_item_id === selectedValue
        );
        if (found) selected.push(found);
      }

      if (group.multi_option === "multi" && Array.isArray(selectedValue)) {
        selectedValue.forEach((id) => {
          const found = group.sub_item.find((s) => s.sub_item_id === id);
          if (found) selected.push(found);
        });
      }
    });
    return selected;
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
    const total = (numericPrice + modifiersPrice) * (quantity || 1);

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
            <div className="p-5">
              <h2 className="font-sans text-xl mb-3">{name}</h2>

              {/* Price */}
              <div className="flex gap-3 items-center">
                <h2 className="text-lg font-sans text-kcred font-[500]">
                  AED : {Total_price || price}
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
                        // Checkbox (multiple options)
                        <Controller
                          name={`addon_${i}`}
                          control={control}
                          rules={{
                            required: group.require_addons
                              ? "This field is required"
                              : false,
                          }}
                          defaultValue={
                            group.sub_item
                              ?.filter((itm) => itm.checked === true)
                              .map((itm) => itm.sub_item_id) || []
                          }
                          render={({ field }) => (
                            <>
                              {group.sub_item.map((itm) => (
                                <label
                                  key={itm.sub_item_id}
                                  className="flex items-center space-x-2 p-2 border-b rounded mb-2 cursor-pointer hover:bg-gray-50"
                                >
                                  <input
                                    type="checkbox"
                                    value={itm.sub_item_id}
                                    checked={field.value.includes(
                                      itm.sub_item_id
                                    )}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      let newValue = [...field.value];
                                      if (checked) {
                                        newValue.push(itm.sub_item_id);
                                      } else {
                                        newValue = newValue.filter(
                                          (id) => id !== itm.sub_item_id
                                        );
                                      }
                                      field.onChange(newValue);
                                    }}
                                    className="form-checkbox text-kcred"
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
                                  {/* <span className="text-gray-500">
                                    {itm.sub_item_name}
                                    {itm.price > 0 && (
                                      <span className="text-gray-500">
                                        {" "}
                                        (+{itm.price}){" "}
                                      </span>
                                    )}
                                  </span> */}
                                </label>
                              ))}
                            </>
                          )}
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
                <p className="font-bold text-lg">Total: AED {Total_price}</p>
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
                  <span>AED : {Total_price}</span>
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
