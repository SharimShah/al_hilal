import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
const Card = ({ cover_image, title, desc, price, oldPrice, slug }) => {
  return (
    <Link
      href={`/product/${slug}`}
      scroll={false}
      className="bg-white rounded-2xl shadow-equal md:p-2 p-1 w-full overflow-hidden"
    >
      <div className="flex items-start gap-2">
        {/* Deal Image */}
        <div className="w-32 h-w-32 min-w-[7rem]">
          <Image
            width={300}
            height={300}
            src={cover_image}
            alt={title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Deal Text Content */}
        <div className="flex-1">
          <h2 className="text-base font-semibold text-gray-900 line-clamp-1">
            {title}
          </h2>
          <div
            className="text-sm text-gray-500 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
          <div className="mt-1">
            <p className="text-kcgreen font-bold text-sm">
              AED {price}{" "}
              {oldPrice === 0 && (
                <span className="text-gray-400 line-through text-sm font-normal">
                  {oldPrice}
                </span>
              )}
            </p>
          </div>

          <div className="flex justify-between items-center mt-1">
            <button className="text-kcgreen font-semibold text-[16px] hover:underline">
              Add To Cart
            </button>
            <FaRegHeart className="text-gray-400 text-lg cursor-pointer hover:text-red-500 transition" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
