import { useCart } from "@/context/CartContext";
import Image from "next/image";
import React from "react";

function NotificationBadge() {
  const { cart, grandTotal } = useCart();
  // Calculate total quantity of all items in the cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="relative inline-block">
      {/* Icon or Element */}
      <div className="flex items-center justify-center">
        <Image
          src="https://kababjeesfriedchicken.com/_next/image?url=%2Fassets%2Fimages%2Fkababbjeesfriedchicken%2FCart-icon.png&w=48&q=75"
          width={30}
          height={30}
          alt="Cart Icon"
        />
      </div>

      {/* Notification Badge */}
      <span className="absolute top-[15px] right-[20px] inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-kcred rounded-full">
        {totalQuantity}
      </span>
    </div>
  );
}

export default NotificationBadge;
