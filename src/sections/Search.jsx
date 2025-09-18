"use client";
import Card from "@/components/ui/Card";
import { FaArrowCircleRight } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const Search = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const [suggestions, setSuggestions] = useState({
    products: [],
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const controller = new AbortController(); // Create abort controller
    const signal = controller.signal;

    const delayDebounce = setTimeout(() => {
      if (query.length < 2) {
        setSuggestions({ products: [] });
        setShowDropdown(false);
        return;
      }

      const fetchSuggestions = async () => {
        try {
          const res = await fetch(
            `/api/search?query=${encodeURIComponent(query)}&skip=0`,
            { signal }
          );
          const data = await res.json();

          setSuggestions({
            products: data?.suggestions?.products || [],
          });
          setShowDropdown(true);
        } catch (error) {
          if (error.name === "AbortError") {
            // Request was aborted - expected during fast typing
            return;
          }
          console.error("Error fetching suggestions:", error);
        }
      };

      fetchSuggestions();
    }, 300); // debounce delay

    return () => {
      clearTimeout(delayDebounce); // Cancel debounce
      controller.abort(); // Cancel previous fetch request
    };
  }, [query]);

  // const handleSelect = (term) => {
  //   setShowDropdown(false);
  //   window.location.href = `/search?q=${encodeURIComponent(term)}`;
  // };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleSelect(query);
  // };

  const placeholders = ["malai boti...", "tea...", "breakfast..."];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0); // current placeholder
  const [subIndex, setSubIndex] = useState(0); // current letter
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === placeholders.length) {
      setIndex(0);
    }

    // typing speed
    const speed = deleting ? 50 : 120;

    const timeout = setTimeout(() => {
      setText(placeholders[index].substring(0, subIndex));

      if (!deleting && subIndex === placeholders[index].length) {
        // pause before deleting
        setTimeout(() => setDeleting(true), 1000);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % placeholders.length);
      }

      setSubIndex((prev) => (deleting ? prev - 1 : prev + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <div
      className="md:my-10 my-5 kcgcontainer relative w-full"
      ref={dropdownRef}
    >
      <form
      // onSubmit={handleSubmit}
      >
        <div className="flex md:justify-center items-center h-[30px] w-full px-15 mt-2 md:mt-0 md:px-0">
          {/* Search Input */}
          <div className="flex md:p-[8px] p-[5px] w-full border-[2px] border-kcred relative rounded-full bg-white">
            <AiOutlineSearch className="h-6 w-auto md:w-6 opacity-90 mx-2 text-kcgreen" />
            <input
              className="outline-none flex-grow placeholder-kcgreen"
              type="text"
              placeholder={`Search for ${text}`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <RxCross2
                className="h-6 w-6 opacity-30 cursor-pointer absolute right-[60px]"
                onClick={() => setQuery("")}
              />
            )}
          </div>
          <FaArrowCircleRight className="absolute right-[60px] h-8 w-8 font-bold text-kcred hidden md:block" />
        </div>
      </form>

      {showDropdown && suggestions.products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
          {suggestions.products.map((item, i) => (
            <Card
              key={i}
              id={item?.id}
              cover_image={item?.cover_image}
              slug={item?.slug}
              title={item?.name}
              desc={item?.description}
              price={item?.price}
              oldPrice={item?.discount_percentage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
