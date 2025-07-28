import Image from "next/image";
export default function LCard({ mall }) {
  return (
    <>
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        <Image
          width={500}
          height={500}
          src={mall.image}
          alt={mall.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white text-lg font-semibold drop-shadow-lg">
            {mall.name}
          </h3>
        </div>
      </div>
    </>
  );
}
