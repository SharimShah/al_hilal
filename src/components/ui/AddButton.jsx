// AddButton.js
"use client";
import { useModal } from "@/context/ModalContext";

const AddButton = ({ compo, label, size = "large" }) => {
  const { openModal } = useModal();
  const openCardModal = () => {
    openModal(compo, size);
  };
  return (
    <button
      onClick={openCardModal}
      className="btn-red rounded-[30px] mt-3 py-2 px-4 w-full uppercase"
    >
      {label}
    </button>
  );
};

export default AddButton;
