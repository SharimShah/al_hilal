import Image from "next/image";
import Link from "next/link";

export default function FindWhatsapp() {
  return (
    <Link
      href="https://wa.me/971503746140?text=Hi%21%20I%20want%20to%20place%20an%20order%20from%20your%20website%20.%20Can%20you%20help%20me%3F"
      target="_blank"
      className="group cursor-pointer relative w-full h-auto min-h-[500px] flex items-center justify-center py-10 px-4 md:px-12"
    >
      <Image
        src="/images/fe8a112ab58989543fb0e42efcd33b0b.jpg"
        alt="WhatsApp Background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        className="z-0"
      />
      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl">
        <div className="relative w-full md:w-1/2 flex justify-center mb-10 md:mb-0"></div>
        {/* Right: Text */}
        <div className="w-full md:w-1/2 md:text-left space-y-4">
          <p className="text-black text-center text-2xl md:text-3xl font-bold">
            Find Us On
          </p>
          <h1 className="text-kcred text-center text-4xl md:text-6xl font-bold tracking-wide">
            WHATSAPP
          </h1>
          <p className="text-white text-2xl text-center md:text-4xl font-[500] tracking-wider">
            +971 503746140
          </p>
          <div className="flex w-full justify-center mt-5">
            <button className="btn-red group-hover:act-btn">Contact Us</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
