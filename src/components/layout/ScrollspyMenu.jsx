"use client";
import { useRef } from "react";
import { Link } from "react-scroll";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // React Icons for arrows

export default function ScrollspyMenu({ categories }) {
  const categoryRefs = useRef({});
  const scrollContainerRef = useRef(null);

  // Scroll to specific category
  const scrollToCategory = (id) => {
    const element = categoryRefs.current[id];
    if (element) {
      element.scrollIntoView({
        inline: "center",
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  // Scroll menu left or right
  const scrollMenu = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust scroll distance
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-kcred sticky top-0">
      <div className="kcgcontainer bg-kcred w-full relative flex items-center">
        {/* Left Arrow */}
        <button
          className="md:block mr-5 px-5 h-full hidden absolute left-0 z-10 p-2 bg-kcred text-black hover:text-gray-300 active:bg-kcredlight active:scale-95 transition-transform duration-150"
          onClick={() => scrollMenu("left")}
        >
          <FaChevronLeft size={10} />
        </button>
        {/* Scrollable Menu */}
        <ul
          ref={scrollContainerRef}
          className="scrollbar-none flex overflow-x-auto whitespace-nowrap list-none flex-nowrap justify-start scroll-smooth"
        >
          {categories.map((category) => (
            <li
              className="inline-block m-[15px]"
              key={category?.id}
              ref={(el) => (categoryRefs.current[category?.id] = el)}
            >
              <Link
                activeClass="activeCategoryLink"
                className={`${category?.id} cursor-pointer font-[600] tracking-wider text-[14px]`}
                to={`section-a${category?.id}`}
                spy={true}
                smooth={true}
                duration={500}
                offset={-50}
                onSetActive={() => scrollToCategory(category?.id)}
              >
                {category?.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Right Arrow */}
        <button
          className="md:block ml-5 px-5 h-full hidden absolute right-0 z-10 p-2 bg-kcred text-black hover:text-gray-300 active:bg-kcredlight active:scale-95 transition-transform duration-150"
          onClick={() => scrollMenu("right")}
        >
          <FaChevronRight size={10} />
        </button>
      </div>
    </div>
  );
}
