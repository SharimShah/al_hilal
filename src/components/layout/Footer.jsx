import { siteNumber } from "@/domain/domain";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-kcred text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="">
          {/* Logo */}
          <div className="md:flex items-start gap-5">
            <div className="mb-4">
              <Image
                src="/images/white_logo.png" // 🔹 replace with your logo path
                alt="Al Hilal Logo"
                width={140}
                height={80}
                className="object-contain max-w-[200px]"
              />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">Al Hilal</h2>
              <a
                href="tel:+971502828588"
                className="mt-2 leading-relaxed text-white text-sm"
              >
                <span className="font-semibold ">Phone: </span>
                {siteNumber}
              </a>
              <p className="mt-2 leading-relaxed text-white text-sm">
                <span className="font-semibold ">Address: </span>
                12 STREET - Deira - Frij Al Murar - Dubai
              </p>
              <Image
                src="/images/appstore.png" // 🔹 replace with your App Store badge
                alt="App Store"
                width={160}
                height={55}
                className="object-contain mt-4"
              />
            </div>
          </div>
        </div>

        {/* Timings Section */}
        <div className="flex flex-col justify-center ">
          <h3 className="font-bold text-lg text-white">Our Timings</h3>
          <div className="">
            <div className="my-1">
              <p className="text-white text-sm">Monday - Sunday</p>
              <p className="text-white text-sm my-1 ">24 Hours</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-medium text-white mb-2">Follow Us:</p>
              <div className="flex gap-4 text-2xl mb-4">
                <a href="#" className="hover:text-gray-200">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-gray-200">
                  <FaInstagram />
                </a>
              </div>
              <a
                href="#"
                className="underline text-sm hover:text-gray-200 block mb-1"
              >
                Terms and conditions
              </a>
              <a
                href="#"
                className="underline text-sm hover:text-gray-200 block"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
        {/* Social Links Section */}
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-10 text-sm text-gray-200">
        © 2025 Powered by{" "}
        <Link href="/" className="text-white underline hover:text-gray-200">
          Al Hilal Restaurant
        </Link>
      </div>
    </footer>
  );
}
