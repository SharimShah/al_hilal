"use client";
import Image from "next/image";
import AddCounter from "./AddCounter";
import { useCart } from "@/context/CartContext";
import CardDetail from "./CardDetail";
import { useModal } from "@/context/ModalContext";

export default function SliderCart({ item }) {
  const { openModal, closeModal } = useModal();
  const { cart, addToCart, removeFromCart } = useCart();
  const { name, total_price, cover_image } = item;
  const compo = (
    <CardDetail data={item} closeModal={closeModal} multi={false} />
  );
  const size = "large";
  const openCardModal = () => {
    openModal(compo, size);
  };
  const getCartItemQuantity = (itemId) => {
    const cartItem = cart.find((item) => item.fake_id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };
  return (
    <>
      <div className="grid grid-cols-1">
        <div className="flex items-center w-full">
          <Image
            onClick={openCardModal}
            alt=""
            src={cover_image}
            width={100}
            height={100}
            className="w-[80px] h-[80px] object-cover rounded-md"
          />
          <div className="flex items-center p-2 w-full">
            <div className="w-[60%]" onClick={openCardModal}>
              <h1 className="text-[15px] line-clamp-1 text-black">{name}</h1>
              <div className="flex gap-3 justify-start">
                {/* <div>
                  <h2 className="text-[15px] font-sans line-through opacity-60">
                    AED : {oldPrice}
                  </h2>
                </div> */}
                <div>
                  <h2 className="text-[15px] font-sans text-kcred">
                    AED : {total_price}
                  </h2>
                </div>
              </div>
            </div>
            {getCartItemQuantity(item?.fake_id) > 0 ? (
              <div className="flex items-center justify-center border border-red-500 rounded-full p-1 w-[40%] mx-auto">
                <AddCounter
                  minus={() =>
                    removeFromCart(
                      item?.fake_id,
                      getCartItemQuantity(item?.fake_id)
                    )
                  }
                  plus={() => addToCart(item)}
                  Quantity={getCartItemQuantity(item?.fake_id)}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
