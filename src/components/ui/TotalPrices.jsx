import { useCart } from "@/context/CartContext";
export default function TotalPrices() {
  const { cart, grandTotal } = useCart();
  return (
    <>
      <div className="p-4 text-[15px]">
        <table className="table-auto w-full">
          <tbody>
            <tr className="flex justify-between items-center tracking-wide">
              <td>Total</td>
              <td>AED : {grandTotal}</td>
            </tr>
            <tr className="flex justify-between items-center tracking-wide">
              <td>Delivery Fee</td>
              <td>AED : 7</td>
            </tr>
            <tr className="flex justify-between items-center tracking-wide">
              <td>Grand Total</td>
              <td>AED : {grandTotal + 7}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
