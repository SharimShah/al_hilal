import { data } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  const social = data?.social;
  return (
    <footer className="bg-white text-black py-8 mt-4">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-start gap-3">
          <Image
            src="/images/kcglogo.png"
            alt="Cajun Grill"
            width={150}
            height={50}
          />
          <p className="mt-2 text-sm">
            Savor the artistry where every dish is a culinary masterpiece
          </p>
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            {social.map((item, i) => (
              <a
                key={i}
                href={item?.link}
                className="w-[40px] h-[40px] bg-kcred hover:bg-cblack text-white flex justify-center items-center rounded-[100%]"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:underline">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blogs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Main Menu */}
        <div>
          <h3 className="font-semibold mb-3">Main Menu</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Offers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Menus
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Reservation
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="mailto:marketing@inmg.ae" className="hover:underline">
                marketing@inmg.ae
              </a>
            </li>
            <li>
              <a href="tel:+97143413223" className="hover:underline">
                +971 43413223
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Social media
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-sm mt-6 pt-4">
        <Link href="/">© 2025 KCG | All rights reserved</Link>
      </p>
    </footer>
  );
};

export default Footer;
