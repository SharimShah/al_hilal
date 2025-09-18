"use client";
import CardDetail from "@/components/ui/CardDetail";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
export default function ProModal({ data, id, pagetype = "" }) {
  const router = useRouter();
  useEffect(() => {
    if (id) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [id]);
  const closeModal = () => {
    document.body.style.overflow = "";
    if (pagetype === "modal") {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-slate-900/20 backdrop-blur fixed inset-0 z-[150] grid place-items-center overflow-y-scroll cursor-pointer custom-scrollbar"
        onClick={closeModal}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()} //
          className={`m-auto bg-white text-black rounded-lg shadow-xl cursor-default relative overflow-hidden max-w-[1000px] lg:h-[550px] md:h-[550px] h-[95vh] w-[90%]`}
        >
          <button
            onClick={closeModal}
            className="bg-kcred absolute top-3 right-3 text-lg text-white  hover:bg-black rounded-full p-1"
          >
            <RxCross2 />
          </button>
          <CardDetail
            data={data}
            closeModal={closeModal}
            multi={true}
            pagetype={pagetype}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
