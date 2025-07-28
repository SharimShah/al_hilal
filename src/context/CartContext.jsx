"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { deliveryLocations as locationStrings } from "@/data/SelectBraArea";
import toast, { Toaster } from "react-hot-toast";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption, "contextselectedOption");
  const [isAllowedTime, setIsAllowedTime] = useState(false);
  // Convert string array to select options
  const deliveryOptions = locationStrings.map((loc) => ({
    label: loc,
    value: loc,
  }));

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const isAllowed = hour >= 10 && hour < 23;
    setIsAllowedTime(isAllowed);
    if (!isAllowed) {
      toast.custom(
        <div className="bg-white shadow-md max-w-md rounded-md">
          <p className="p-5 text-kcred font-medium">
            ⏰ We’re open from 10 AM to 11 PM.
          </p>
        </div>,
        { duration: 7000 }
      );
    }
  }, []);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("selectedDeliveryLocation");
      if (saved) {
        setSelectedOption(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to parse localStorage value:", err);
    }
  }, []);
  useEffect(() => {
    const saved = localStorage.getItem("selectedDeliveryLocation");
    const savedCart = localStorage.getItem("cart");
    const savedTime = localStorage.getItem("cartTimestamp");
    if (saved) {
      setSelectedOption(JSON.parse(saved));
    }
    if (savedCart && savedTime) {
      const currentTime = Date.now();
      const timeElapsed = currentTime - parseInt(savedTime);

      if (timeElapsed > 24 * 60 * 60 * 1000) {
        localStorage.removeItem("cart");
        localStorage.removeItem("cartTimestamp");
      } else {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("cartTimestamp", Date.now().toString());
    } else {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartTimestamp");
    }
  }, [cart]);

  const areOptionsEqual = (optionsA, optionsB) => {
    if (optionsA.length !== optionsB.length) return false;

    const sortedA = [...optionsA].sort(
      (a, b) => a.modifier_option_id - b.modifier_option_id
    );
    const sortedB = [...optionsB].sort(
      (a, b) => a.modifier_option_id - b.modifier_option_id
    );

    return sortedA.every(
      (opt, i) => opt.modifier_option_id === sortedB[i].modifier_option_id
    );
  };

  const addToCart = (item) => {
    let isNewItem = false;

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          areOptionsEqual(cartItem.order.options, item.order.options)
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id &&
          areOptionsEqual(cartItem.order.options, item.order.options)
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        isNewItem = true;
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    // Toast only once
    setTimeout(() => {
      if (isNewItem) {
        toast.success("Item added to cart");
      } else {
        toast.success("Item quantity updated in cart");
      }
    }, 0);
  };
  const DlocationHandle = ({ locationData }) => {
    localStorage.setItem(
      "selectedDeliveryLocation",
      JSON.stringify(locationData)
    );
    setSelectedOption(locationData);
  };
  const updateModifiers = (item, updatedOptions, newPrice) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id &&
        areOptionsEqual(cartItem.order.options, item.order.options)
          ? {
              ...cartItem,
              order: {
                ...cartItem.order,
                options: updatedOptions,
                unit_price: newPrice,
                total_price: newPrice,
              },
            }
          : cartItem
      )
    );
    if (updatedOptions) {
      toast.success("Updated Cart");
    }
  };

  const removeFromCart = (itemId, q) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      // Show toast if this action removes the last item

      return updatedCart;
    });
    if (q === 1) {
      toast.error("Cart Removed");
    }
  };

  const grandTotal = cart.reduce(
    (total, item) => total + item.order.total_price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateModifiers,
        DlocationHandle,
        grandTotal,
        isAllowedTime,
        selectedOption,
        deliveryOptions,
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
