import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";

const Card = ({ cover_image, title, desc, price, oldPrice, slug }) => {
  return (
    <div className="bg-white rounded-xl shadow-equal md:p-2 p-1.5 w-full overflow-hidden">
      <Link
        className="flex items-center gap-3"
        href={`/product/${slug}`}
        scroll={false}
      >
        {/* Deal Image */}
        <div href={`/product/${slug}`} scroll={false} className="md:w-36 w-28">
          <Image
            width={300}
            height={300}
            src={cover_image}
            alt={title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Deal Text Content */}
        <div className="grid gap-1 flex-1">
          <h2 className="text-base font-semibold text-gray-900 line-clamp-1 hover:underline">
            {title}
          </h2>

          <div
            className="!text-[12px] text-gray-500 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: desc }}
          />

          {/* Price */}
          <div className="mt-1">
            <p className="text-kcgreen font-bold text-sm">
              AED {price}
              {oldPrice && oldPrice > price && (
                <span className="ml-2 text-gray-400 line-through text-sm font-normal">
                  AED {oldPrice}
                </span>
              )}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-1">
            <button className="text-kcgreen font-semibold text-[16px] hover:underline">
              Add To Cart
            </button>
            <FaRegHeart className="text-gray-400 text-lg cursor-pointer hover:text-red-500 transition" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
