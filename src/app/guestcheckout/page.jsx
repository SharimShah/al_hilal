import dynamic from "next/dynamic";

// Dynamically imported components
const CheckoutTopLogo = dynamic(() =>
  import("@/components/ui/CheckoutTopLogo")
);
const DeliveryCheckout = dynamic(() => import("@/sections/DeliveryCheckout"));
export const metadata = {
  title: "Checkout | Best Desi & Chinese Food in Dubai | Al Hilal Restaurant",
  description: "",
  keywords: [""],
  robots: {
    index: false,
    follow: false,
    nocache: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
export default function Checkout() {
  return (
    <>
      <div className="kcgcontainer py-10">
        <CheckoutTopLogo />
        <DeliveryCheckout />
      </div>
    </>
  );
}
