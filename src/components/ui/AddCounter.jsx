import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const AddCounter = ({ minus, Quantity, plus }) => {
  return (
    <>
      {/* Decrement or Delete Icon */}
      {Quantity > 1 ? (
        <button
          onClick={minus}
          className="text-red-500 p-1 w-8 flex justify-center hover:scale-125 duration-75"
        >
          <AiOutlineMinus size={20} />
        </button>
      ) : (
        <button
          onClick={minus}
          className="text-red-500 p-1 w-8 flex justify-center hover:scale-125 duration-75"
        >
          <RiDeleteBin6Line size={20} />
        </button>
      )}

      {/* Count */}
      <span className="text-red-500 mx-1 text-lg font-semibold">
        {Quantity}
      </span>

      {/* Increment Icon */}
      <button
        onClick={plus}
        className="text-red-500 p-1 w-8 flex justify-center hover:scale-125 duration-75"
      >
        <AiOutlinePlus size={20} />
      </button>
    </>
  );
};

export default AddCounter;
