import Card from "@/components/ui/Card";
import Image from "next/image";
export default function Deals({ data, name, image, id }) {
  return (
    <div className="md:my-10 my-10 px-4 sm:px-6 lg:px-12 kcgcontainer" id={id}>
      {/* Header Banner */}
      {image !== null ? (
        <Image
          src={image}
          width={1400}
          alt=""
          className="object-contain w-full mb-9"
          height={50}
        />
      ) : (
        <div className="bg-kcgreen rounded-xl text-white text-center md:py-20 py-10 md:mb-12 mb-5">
          <h1 className="text-2xl md:text-5xl font-semibold tracking-wide capitalize">
            {name}
          </h1>
        </div>
      )}

      {/* Deal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data?.map((item, i) => (
          <Card
            key={i}
            id={item?.id}
            cover_image={item?.cover_image}
            slug={item?.slug}
            title={item?.name}
            desc={item?.description}
            price={item?.price}
            oldPrice={item?.discount_percentage}
          />
        ))}
      </div>
    </div>
  );
}
