import { useCart } from "@/context/CartContext";
export default function TotalPrices() {
  const { grandTotal } = useCart();
  return (
    <>
      <div className="p-4 text-[15px]">
        <table className="table-auto w-full">
          <tbody>
            <tr className="flex justify-between items-center tracking-wide font-semibold">
              <td>Total</td>
              <td>AED : {grandTotal.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
