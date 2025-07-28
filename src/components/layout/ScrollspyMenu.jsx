"use client";
import ScrollSpy from "@/lib/ScrollSpy";
export default function ScrollspyMenu({ MSdata }) {
  return (
    <div
      className={`sticky top-0 z-50 px-4 bg-white shadow-lg h-[60px] flex items-center transition-transform duration-300 ease-in-out`}
      style={{ whiteSpace: "nowrap" }}
    >
      <ScrollSpy
        activeclassName="text-white bg-kcred transition-all duration-200"
        offsetTop={80}
        rootMargin="-60px 0px 0px 0px"
        behavior="smooth"
      >
        <nav className="w-full">
          <ul className="flex items-center justify-center">
            {MSdata?.map((item, i) => (
              <a
                key={i}
                href={`#section-a${i}`}
                className={`text-[15px] text-black font-semibold rounded sm:px-5 px-2 py-2 transition-all duration-200`}
              >
                {item.name}
              </a>
            ))}
          </ul>
        </nav>
      </ScrollSpy>
    </div>
  );
}
