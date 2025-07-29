// import Image from "next/image";
// import { IoMdAddCircle } from "react-icons/io";
// import Link from "next/link";
// export default function Card({ item }) {
//   return (
//     <>
//       <Link
//         href={`/product/${item?.id}`}
//         scroll={false}
//         className="shadow border w-full rounded-[25px] bg-white relative lg:hover:scale-105 hover:scale-105 duration-500 hover:shadow-md"
//       >
//         {item?.image && (
//           <Image
//             alt={item?.name}
//             width={346}
//             height={346}
//             className="p-1 rounded-[25px] w-full"
//             src={item?.image}
//           />
//         )}
//         <div className="p-4">
//           <span className="cursor-pointer">
//             <h2 className="text-[1.2rem] text-kcred font-sans line-clamp-1 mb-1">
//               {item?.name}
//             </h2>
//           </span>
//           <div className="flex justify-between items-end w-100">
//             <span className="cursor-pointer">
//               <p className="text-[14px] font-[500] text-gray-600 leading-5 line-clamp-3 mb-2">
//                 {item?.description}
//               </p>
//             </span>
//             <button className="hover:bg-cblack hover:text-white ms-2 relative top-6 rounded-tl-[3.5rem] rounded-br-lg rounded-tr-none rounded-bl-none btn-red mt-3 py-2 px-4 w-[70px] h-[70px] justify-center items-center flex uppercase">
//               <IoMdAddCircle size={40} />
//             </button>
//           </div>
//           <span className="cursor-pointer">
//             <div className="flex gap-2">
//               <div>
//                 <h2
//                   className={`text-[1rem] font-sans text-cblack font-[500] ${
//                     item?.discounts?.[0]?.discounted_price
//                       ? "line-through opacity-60"
//                       : null
//                   }`}
//                 >
//                   AED : {item?.price}
//                 </h2>
//               </div>
//               {item?.discounts?.[0]?.discounted_price ? (
//                 <div>
//                   <h2 className="text-[1rem] font-sans text-cblack font-[500]">
//                     AED : {item?.discounts?.[0]?.discounted_price}
//                   </h2>
//                 </div>
//               ) : null}
//             </div>
//           </span>
//         </div>
//       </Link>
//     </>
//   );
// }
import React from "react";
import { FaHeart } from "react-icons/fa";

const Card = ({ image, title, desc, price, oldPrice }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 w-full max-w-sm">
      <div className="flex items-start gap-3">
        {/* Deal Image */}
        <div className="w-28 h-28 min-w-[7rem]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Deal Text Content */}
        <div className="flex-1">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{desc}</p>

          <div className="mt-2">
            <p className="text-red-600 font-bold text-base">
              Rs. {price.toFixed(2)}{" "}
              <span className="text-gray-400 line-through text-sm font-normal">
                {oldPrice.toFixed(2)}
              </span>
            </p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <button className="text-red-600 font-semibold text-sm hover:underline">
              Add To Cart
            </button>
            <FaHeart className="text-gray-400 text-lg cursor-pointer hover:text-red-500 transition" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
