"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useClickAway } from "react-use";
// Create the context for Cart
const CartContext = createContext(undefined);
// CartProvider component that manages cart state and localStorage
export const CartProvider = ({ children }) => {
  const [isAllowedTime, setIsAllowedTime] = useState(false);
  const ref = useRef(null);
  const [token, setToken] = useState("");
  const [cart, setCart] = useState([]);
  const [opencart, setOpencart] = useState(false);
  useClickAway(ref, () => {
    setOpencart(false);
  });
  const toggleCart = () => setOpencart((prev) => !prev);
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
    const timer = setTimeout(() => {
      const storedToken = localStorage.getItem("customization_token");
      setToken(storedToken);
    }, 3000);
    return () => clearTimeout(timer); // Cleanup in case the component unmounts early
  }, []);
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedTime = localStorage.getItem("cartTimestamp");
    if (savedCart && savedTime) {
      const currentTime = Date.now();
      const timeElapsed = currentTime - parseInt(savedTime, 10);
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

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.fake_id === item.fake_id
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.fake_id === item.fake_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };
  const updatePrice = (item) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.fake_id === item.fake_id
          ? { ...cartItem, total_price: item.total_price } // ✅ keep number
          : cartItem
      )
    );
  };
  const removeFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.fake_id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const grandTotal = cart.reduce((total, item) => {
    return total + item?.total_price * item?.quantity;
  }, 0);
  const formattedTotal = grandTotal.toLocaleString();

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        updatePrice,
        toggleCart,
        setCart,
        cart,
        token,
        opencart,
        grandTotal,
        formattedTotal,
        isAllowedTime,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
