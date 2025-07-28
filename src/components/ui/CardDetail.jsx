"use client";
import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";

export default function CardDetail({ data, closeModal, multi }) {
  const [item, setitem] = useState({});
  console.log(item, "item");
  useEffect(() => {
    if (data?.modifiers.length !== 0) {
      if (multi === true) {
        const item = {
          ...data,
          id: data?.id + Math.floor(Math.random() * 10000),
          pro_id: data?.id,
        };
        setitem(item);
      } else {
        setitem(data);
      }
    } else {
      setitem(data);
    }
  }, [data]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedId, setSelectedId] = useState([]);
  const [btn, setbtn] = useState("Add to Cart");
  const [Oprice, setOprice] = useState(
    item?.discounts?.[0]?.discounted_price || item?.price
  );
  const [errors, setErrors] = useState({});
  const sectionRefs = useRef([]);
  const [text, setText] = useState("");
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const { cart, addToCart, removeFromCart, updateModifiers } = useCart();
  // Find same item with same modifiers
  const existingCartItem = cart.find((cartItem) => cartItem.id === item.id);

  const getCartItemQuantity = (itemId) => {
    const match = cart.find((i) => i.id === itemId);
    return match ? match.quantity : 0;
  };
  const quantity = getCartItemQuantity(item.id);
  // Restore selected modifiers if already in cart
  useEffect(() => {
    const Oprice = item?.discounts?.[0]?.discounted_price || item?.price;
    setOprice(Oprice);
    if (data?.modifiers.length === 0) {
      setbtn("Add to Cart");
    } else if (quantity !== 0) {
      setbtn("Update Carts");
    } else {
      setbtn("Add to Cart");
    }
    if (existingCartItem) {
      const selected = {};
      existingCartItem.order.options.forEach((opt) => {
        item.modifiers.forEach((mod) => {
          if (mod.options.find((o) => o.id === opt.modifier_option_id)) {
            selected[mod.id] = selected[mod.id] || [];
            selected[mod.id].push(opt.modifier_option_id);
          }
        });
      });

      setSelectedOptions(selected);
      setSelectedId(existingCartItem.order.options);
      setOprice(existingCartItem.order.total_price);
    }
  }, [existingCartItem, quantity, item]);

  const isAddToCartDisabled = item?.modifiers?.some((mod) => {
    const max = mod?.pivot?.maximum_options || 0;
    const selected = selectedOptions[mod.id]?.length || 0;
    return max > 0 && selected < max;
  });

  const handleCheckboxChange = (modifierId, option, index) => {
    const current = selectedOptions[modifierId] || [];
    const isSelected = current.includes(option.id);
    const mod = item.modifiers.find((m) => m.id === modifierId);
    const maxOptions = mod?.pivot?.maximum_options || Infinity;

    let updatedSelections = [...current];
    let newErrors = { ...errors };

    if (isSelected) return; // ❌ prevent deselect

    if (current.length < maxOptions) {
      updatedSelections.push(option.id);
    } else {
      updatedSelections.shift();
      updatedSelections.push(option.id);
    }

    const updated = { ...selectedOptions, [modifierId]: updatedSelections };
    const allIds = Object.values(updated).flat();

    let totalModifierPrice = 0;
    item.modifiers.forEach((mod) => {
      mod.options.forEach((opt) => {
        if (allIds.includes(opt.id)) {
          totalModifierPrice += opt.price || 0;
        }
      });
    });

    const formattedOptions = allIds.map((id) => ({
      modifier_option_id: id,
      quantity: 1,
      partition: 1,
      unit_price: 0,
    }));

    setOprice(
      item?.discounts?.[0]?.discounted_price + totalModifierPrice ||
        item?.price + totalModifierPrice
    );
    setSelectedId(formattedOptions);
    setSelectedOptions(updated);
    setErrors(newErrors);

    if (updatedSelections.length === maxOptions) {
      const nextRef = sectionRefs.current[index + 1];
      if (nextRef) {
        setTimeout(() => {
          nextRef.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }
    }
  };

  const handleAddToCart = () => {
    const orderPayload = {
      product_id: item?.pro_id || item?.id,
      discount_id: "",
      options: selectedId,
      discount_quantity: 0,
      unit_price: Oprice,
      discount_amount: item?.discounts?.[0]?.discount_amount,
      discount_type: 1,
      total_price: Oprice,
      tax_exclusive_discount_amount: 0,
      tax_exclusive_unit_price: Oprice,
      tax_exclusive_total_price: Oprice,
      kitchen_notes: text,
    };

    const enrichedItem = {
      ...item,
      order: orderPayload,
      // quantity: quantity,
    };

    const isSameModifiers = existingCartItem && existingCartItem.id === item.id;
    if (data?.modifiers.length !== 0) {
      if (isSameModifiers) {
        updateModifiers(existingCartItem, selectedId, Oprice);
        closeModal();
      } else {
        addToCart(enrichedItem);
        closeModal();
      }
    } else {
      addToCart(enrichedItem);
      closeModal();
    }
  };
  const Removehandle = () => {
    removeFromCart(item.id, quantity);
    if (quantity === 1) {
      closeModal();
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-7 md:grid-cols-5 h-full mb-12">
        <div className="lg:col-span-3 md:col-span-2 flex justify-center items-center p-4 border-b md:border-b-0 md:border-r border-gray-300 h-100">
          {item?.image && (
            <Image
              src={item?.image}
              width={400}
              height={400}
              className="object-contain w-full max-w-[300px] sm:max-w-[400px]"
              alt="Product Image"
            />
          )}
        </div>

        <div className="lg:col-span-4 md:col-span-3 p-0 m-0 flex flex-col justify-between overflow-y-auto scrollbar-none">
          <div className="p-5">
            <h2 className="font-sans text-xl mb-3">{item?.name}</h2>

            <div className="flex gap-3 items-center">
              {item?.discounts?.[0]?.discounted_price && (
                <h2 className="text-lg font-sans text-kcred font-[500]">
                  AED : {item?.discounts?.[0]?.discounted_price}
                </h2>
              )}
              <h2
                className={`text-lg font-sans text-cblack font-[500] ${
                  item?.discounts?.[0]?.discounted_price
                    ? "line-through opacity-60"
                    : ""
                }`}
              >
                AED : {item?.price}
              </h2>
            </div>

            <p className="text-sm text-gray-600 mt-5 font-medium leading-6">
              {item?.description}
            </p>

            <div className="mt-4">
              {item?.modifiers?.map((mod, i) => {
                const selectedCount = selectedOptions[mod.id]?.length || 0;
                const maxOptions = mod?.pivot?.maximum_options || Infinity;
                const isComplete = selectedCount === maxOptions;

                return (
                  <div
                    key={mod.id}
                    ref={(el) => (sectionRefs.current[i] = el)}
                    className="mb-6 scroll-mt-28"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-sans text-cblack">
                        {mod?.name}
                      </h3>
                      <div
                        className={`text-white text-[14px] rounded-md py-1 px-2 ${
                          isComplete ? "bg-green-600" : "bg-red-500"
                        }`}
                      >
                        {isComplete ? "Completed" : "Required"}
                      </div>
                    </div>

                    <ul className="grid grid-cols-1 divide-y">
                      {mod?.options?.map((opt) => (
                        <li
                          key={opt.id}
                          className="flex justify-between py-4 items-center"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={
                                selectedOptions[mod.id]?.includes(opt.id) ||
                                false
                              }
                              onChange={() =>
                                handleCheckboxChange(mod.id, opt, i)
                              }
                              className="w-4 h-4 accent-kcred"
                            />
                            <label className="ml-3 text-gray-600 text-[16px] font-medium">
                              {opt.name}
                            </label>
                          </div>
                          <p className="text-sm text-gray-600 font-medium leading-6">
                            AED : {opt.price}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            {/* Special Instructions */}
            <div className="mt-5">
              <label
                htmlFor="message"
                className="text-lg font-sans text-cblack tracking-wide font-[500]"
              >
                Special Instructions
              </label>
              <textarea
                id="message"
                value={text}
                onChange={handleChange}
                rows="4"
                className="block mt-3 p-2.5 w-full text-sm text-gray-900 tracking-wide bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Please enter instructions about this item..."
              ></textarea>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white grid grid-cols-1 md:grid-cols-7 gap-4 items-center border-t border-gray-300 p-4 mt-5">
            <div className="md:col-span-2 flex justify-center md:justify-start items-center gap-3">
              <button
                onClick={Removehandle}
                disabled={quantity === 0 || isAddToCartDisabled}
                className={`rounded p-2 transition duration-100 ${
                  quantity === 0 || isAddToCartDisabled
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-kcred text-white hover:bg-red-600 hover:scale-110"
                }`}
              >
                <FaMinus className="text-sm" />
              </button>
              <div className="text-lg font-bold">{quantity}</div>
              <button
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
                className={`rounded p-2 transition duration-100 ${
                  isAddToCartDisabled
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-kcred text-white hover:bg-red-600 hover:scale-110"
                }`}
              >
                <FaPlus className="text-sm" />
              </button>
            </div>

            <div className="md:col-span-5 w-full">
              <button
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
                className={`rounded w-full p-3 text-lg font-semibold transition ${
                  isAddToCartDisabled
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-kcred text-white hover:bg-red-600"
                }`}
              >
                {btn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
