// ModalContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Create the ModalContext
const ModalContext = createContext();

// Custom hook to use modal context
export const useModal = () => {
  return useContext(ModalContext);
};

// ModalProvider component to wrap your app and provide modal state to all components
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("large"); // Default size
  const [showSideDrawer, setshowSideDrawer] = useState(false);
  const openModal = (content, size = "large") => {
    setModalContent(content); // Set content to be displayed in the modal
    setModalSize(size); // Set the size of the modal
    setIsOpen(true); // Open the modal
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);
  const closeModal = () => {
    setIsOpen(false); // Close the modal
    setModalContent(null); // Clear the modal content
    setModalSize("large"); // Reset modal size to default
  };
  return (
    <ModalContext.Provider
      value={{ isOpen, modalContent, modalSize, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
