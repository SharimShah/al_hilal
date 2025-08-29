// SpringModal.js
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import { RxCross2 } from "react-icons/rx";

export const SpringModal = () => {
  const { isOpen, modalContent, closeModal, modalSize } = useModal(); // Get modal state from context

  // Define possible modal sizes
  const modalSizes = {
    small: "max-w-[500px] h-[300px]",
    medium: "max-w-[750px] h-[400px]",
    large: "max-w-[1000px] lg:h-[550px] md:h-[550px] sm:h-screen",
    // Add more custom sizes if needed
  };

  // Apply size based on modalSize prop
  const modalSizeClass = modalSizes[modalSize] || modalSizes.large;

  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal} // Close modal when clicking outside
          className="bg-slate-900/20 backdrop-blur fixed inset-0 z-[150] grid plce-items-center overflow-hidden"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing the modal
            className={`m-auto bg-white text-black rounded-lg shadow-xl cursor-default relative overflow-hidden ${modalSizeClass}`}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="bg-kcred absolute top-3 right-3 text-lg text-white  hover:bg-black rounded-full p-1"
            >
              <RxCross2 />
            </button>
            {modalContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
