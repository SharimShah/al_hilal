"use client";
import { useModal } from "@/context/LocationContext";
// import RestaurantOrder from "./RestaurantOrder";
export default function LocationSelect() {
  const { isModalVisible, setIsModalVisible } = useModal();
  return (
    <>
      {/* {isModalVisible && ( */}
      <div
        onClick={() => setIsModalVisible(false)}
        className={`min-h-screen flex items-center justify-center bg-slate-900/20 backdrop-blur fixed top-0 w-full z-[1000] scrollbar-none py-8 px-4 ${
          isModalVisible ? "visible" : "hidden"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white p-4 rounded-lg shadow-lg md:w-[600px] w-full h-full m-auto"
        >
          {/* <RestaurantOrder setIsModalVisible={setIsModalVisible} /> */}
        </div>
      </div>
      {/* )} */}
    </>
  );
}
