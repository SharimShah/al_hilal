import { useCart } from "@/context/CartContext";
import React from "react";

export default function ViewCart({ toggleCart }) {
  const { cart, grandTotal } = useCart();
  // Calculate total quantity of all items in the cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      {totalQuantity ? (
        <div className="fixed bottom-0 w-full z-[100] lg:hidden">
          <div className="bg-white w-full sm:max-w-[400px] mx-auto rounded-t-lg p-2 sm:p-0 shadow-lg">
            <div
              onClick={toggleCart}
              aria-label="toggle sidebar"
              className="cursor-pointer flex items-center justify-between bg-kcred rounded-t-lg rounded-b-lg md:rounded-b-none lg:rounded-b-none p-2 sm:p-4"
            >
              {/* Cart Count */}
              <div className="flex items-center justify-center w-[30px] h-[30px] text-white font-medium text-sm border-2 border-white rounded-full">
                {totalQuantity}
              </div>

              {/* View Cart Text */}
              <div className="flex justify-center text-center sm:text-left text-white font-medium text-base mx-2">
                View Cart
              </div>

              {/* Price */}
              <div className="text-white font-medium text-base text-right">
                AED : {grandTotal}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
