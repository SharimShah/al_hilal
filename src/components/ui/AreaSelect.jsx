import { useCart } from "@/context/CartContext";
import { useModal } from "@/context/LocationContext";
import { FaLocationDot } from "react-icons/fa6";
export default function AreaSelect() {
  const { selectedOption } = useCart();
  const { setIsModalVisible } = useModal();
  return (
    <div className="px-5">
      <p className="text-cblack text-sm mb-2 font-medium">
        Please Select Location to CheckOUT
      </p>
      <input
        type="text"
        value={selectedOption?.address}
        placeholder="Area .."
        defaultValue="Default Area"
        readOnly
        className="w-full mb-3  p-2 border rounded bg-gray-200 focus:outline-kcred"
      />
      <button
        onClick={() => setIsModalVisible(true)}
        className="btn-red rounded h-[30px] flex items-center justify-center gap-10 w-full text-[16px]"
      >
        {!selectedOption ? "Select Location" : "Change Location"}
        <FaLocationDot className="text-xl" />
      </button>
      {/* <CreatableSelect
        placeholder="Select your area..."
        isClearable
        options={deliveryOptions}
        value={selectedOption}
        onChange={DlocationHandle}
      /> */}
    </div>
  );
}
