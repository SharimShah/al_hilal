"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
export default function PopupModal() {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose} // close on backdrop click
          className="bg-slate-900/20 backdrop-blur fixed inset-0 z-[150] grid place-items-center overflow-hidden"
        >
          <motion.div
            onClick={handleClose} // prevent closing when clicking inside
            className="m-auto text-black rounded-lg shadow-xl cursor-default relative overflow-hidden w-auto h-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="bg-kcred absolute top-3 right-3 text-lg text-white hover:bg-black rounded-full p-1"
            >
              <RxCross2 />
            </button>
            <Image
              width={700}
              height={700}
              src="/images/popup.png"
              alt="popup"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
