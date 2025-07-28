import Image from "next/image";
export default function MenuCards({ MSdata }) {
  console.log(MSdata, "MSdata");

  return (
    <>
      <div className="grid sm:grid-cols-4 grid-cols-2 justify-around relative menus-slide">
        {MSdata?.map((item, i) => (
          <a href={`#section-a${i}`} key={i} className="flex justify-center">
            <div className="w-[120px] text-center">
              <Image alt="" src={item?.image} width={120} height={120} />
              <p className="mt-2 text-black font-bold text-[12px] lg:text-[16px] sm:text-[14px]">
                {item?.name}
              </p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
