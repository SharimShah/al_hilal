import Image from "next/image";
import Link from "next/link";
export default function SideBarCard({ item }) {
  return (
    <>
      <Link href={`/product/${item?.slug}`} scroll={false} className="p-2">
        <div className="border-2 border-[#bbbbbb] rounded-lg relative overflow-hidden">
          <Image
            src={item?.cover_image || "/images/noimg.jpg"}
            alt={item?.name}
            width={200}
            height={200}
            className="object-contain"
          />
          <button className="bottom-1 right-1 absolute border border-[#bbbbbb] text-white bg-kcred hover:bg-kcredlight w-[30px] h-[30px] rounded-full text-[20px]">
            +
          </button>
        </div>
        <p className="text-sm font-medium text-gray-700 mt-1">
          AED. {item?.price}
        </p>
        <p className="text-sm text-gray-600 line-clamp-1">{item?.name}</p>
      </Link>
    </>
  );
}
