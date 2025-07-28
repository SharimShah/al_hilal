import CheckoutTopLogo from "@/components/ui/CheckoutTopLogo";
import DeliveryCheckout from "@/sections/DeliveryCheckout";
export const metadata = {
  title: "Checkout | Kelly Cajun Grill Order Cajun Food Online in Dubai",
  description:
    "Secure and fast checkout at Kelly Cajun Grill. Review your order, choose payment, and get ready to enjoy delicious Cajun food in Dubai!",
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
