import Card from "@/components/ui/Card";
export default function Deals({ data, name, id }) {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-12 kcgcontainer" id={id}>
      {/* Header Banner */}
      <div className="bg-kcgreen rounded-xl text-white text-center md:py-20 py-10 md:mb-12 mb-5">
        <h1 className="text-2xl md:text-5xl font-semibold tracking-wide capitalize">
          {name}
        </h1>
      </div>

      {/* Deal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data?.map((item, i) => (
          <Card
            key={i}
            id={item?.id}
            image={item?.image}
            slug={item?.slug}
            title={item?.name}
            desc={item?.description}
            price={item?.price}
            oldPrice={900}
          />
        ))}
      </div>
    </div>
  );
}
