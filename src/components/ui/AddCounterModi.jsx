import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
const AddCounterModi = ({ minus, Quantity, plus }) => {
  return (
    <>
      {/* Decrement or Delete Icon */}
      {Quantity > 1 ? (
        <button
          type="button" // ✅ prevents page reload
          onClick={minus}
          className="text-red-500 p-1 w-8 flex justify-center hover:scale-125 duration-75"
        >
          <AiOutlineMinus size={17} />
        </button>
      ) : (
        <button
          type="button" // ✅ prevents page reload
          onClick={minus}
          className="text-red-500 p-1 w-8 flex justify-center hover:scale-125 duration-75"
        >
          <RiDeleteBin6Line size={17} />
        </button>
      )}

      {/* Count */}
      <span className="text-red-500 mx-1 text-sm font-semibold">
        {Quantity}
      </span>

      {/* Increment Icon */}
      <button
        type="button" // ✅ prevents page reload
        onClick={plus}
        className="text-red-500 p-1 w-8 flex justify-center hover:scale-125 duration-75"
      >
        <AiOutlinePlus size={17} />
      </button>
    </>
  );
};

export default AddCounterModi;
