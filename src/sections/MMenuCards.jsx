"use client";
import { useState } from "react";
export default function MMenuCards({ MSdata }) {
  const [Menu, setMenu] = useState(MSdata?.[0]?.id);
  return (
    <>
      <div id="menuCards">
        <div className="max-w-[900px] mx-auto mt-5">
          <div
            className="rounded-md px-6 px-md-3 py-1 d-flex justify-content-center flex-column dicount-bar col-md-12"
            style={{ backgroundColor: "rgb(245, 245, 245)" }}
          >
            <h4 className="text-capitalize md:text-[30px] text-[25px] flex items-center gap-3">
              Flat
              <span className="bg-[#FBF92E] p-2 rounded-full flex items-center justify-center text-[35px] w-[60px] h-[60px]">
                10
              </span>
              % Off
            </h4>
            <p className="text-[18px]">On Your Firts Order.</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:flex-nowrap md:space-x-4 text-center mt-10">
          {MSdata?.map((item, i) => (
            <a href={`#section-a${i}`} key={i} className="flex justify-center">
              <button
                className={`${Menu === item?.id ? "btn-red" : "act-btn"}`}
                onClick={() => setMenu(item?.id)}
              >
                {item}
              </button>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
