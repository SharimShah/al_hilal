import Image from "next/image";
import React from "react";

export default function Topimg() {
  return (
    <>
      <div className=" bg-back-img bg-cover fixed w-full h-screen top-0 -z-50"></div>
      <Image
        src="https://kababjeesfriedchicken.com/assets/images/kababbjeesfriedchicken/top-image.webp"
        width={2000}
        height={10}
        alt=""
        className="w-full object-cover relative"
      />
    </>
  );
}
