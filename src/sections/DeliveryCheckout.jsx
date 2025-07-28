"use client";
import PhoneInputField from "@/components/ui/PhoneInputField";
import { useCart } from "@/context/CartContext";
import { useModal } from "@/context/LocationContext";
import { Api_Url } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
import { RiCheckboxCircleFill } from "react-icons/ri";
const DeliveryOrder = () => {
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState(null); // Initially null to force selection
  const [selectedMethod, setSelectedMethod] = useState("online");
  const { cart, grandTotal, isAllowedTime, selectedOption } = useCart();
  const { setIsModalVisible } = useModal();
  const router = useRouter();
  useEffect(() => {
    const branchDataString = localStorage.getItem("selectedBranch");
    const branchData = branchDataString ? JSON.parse(branchDataString) : null;
    setBranch(branchData);
    if (cart.length === 0 && isAllowedTime === false) {
      router.push("/"); // Navigates to home page
    }
  }, [cart, isAllowedTime, router]);
  const getCartItemQuantity = (itemId) => {
    const match = cart.find((i) => i.id === itemId);
    return match ? match.quantity : 0;
  };
  const OgrandTotal = grandTotal + 7;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  useEffect(() => {
    setValue("address", selectedOption?.address);
  }, [selectedOption]);
  const onSubmit = async (data) => {
    const completeOrder = {
      ...data,
      products: cart,
      // branch_id: branch?.id || "96ac4d2b-84e8-4eb8-af21-ce483c17fed6", //DFC
      branch_id: branch?.id || "96ac4d4c-1478-401d-a393-d7b025788096", //Dubai Mall
      type: 3,
      source: 2,
      guests: 1,
      status: 2,
      kitchen_notes: "",
      customer_notes: "",
      business_date: "2019-12-05",
      subtotal_price: 0,
      discount_amount: 0,
      rounding_amount: 0,
      total_price: OgrandTotal,
      p_method: selectedMethod,
    };
    try {
      setLoading(true);
      const res = await fetch(`${Api_Url}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_LARAVEL_API_TOKEN}`, // <-- if needed
        },
        body: JSON.stringify(completeOrder),
      });

      const result = await res.json();
      setLoading(false);
      if (result?.status === "success") {
        toast.success("Your Order sent successfully!");
        // Only redirect if payment_redirect_url exists
        if (selectedMethod === "cod") {
          window.location.href = "/thank-you";
          localStorage.removeItem("cart");
          localStorage.removeItem("cartTimestamp");
        } else if (result?.payment_redirect_url) {
          window.location.href = result.payment_redirect_url;
        }
      } else if (result?.foodics_error?.errors?.phone) {
        toast.error(result?.foodics_error?.errors?.phone);
      } else if (result?.message) {
        toast.error(result?.message);
      }
    } catch (err) {
      console.error("Order Error:", err);
    }
  };
  const fullName = watch("fullName");
  const phone1 = watch("phone1");
  const email = watch("email");
  const address = watch("address");
  return (
    <>
      {loading ? (
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-[#ffffff94]">
          <div class="text-center">
            <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-kcred mx-auto"></div>
            <h2 class="text-zinc-900 mt-4 animate-pulse">Please Wait...</h2>
          </div>
        </div>
      ) : null}
      <div className="min-h-screen bg-white flex items-center justify-center px-2">
        <div className="w-full max-w-6xl bg-[#F7F7F7] rounded-lg shadow-md flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="w-full md:w-[60%] p-5 border-r border-gray-300">
            <h2 className="text-xl font-medium">
              Checkout <span className="text-red-500">🛵</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Just a last step, please enter your details:
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-">
              <input
                {...register("dial_code")}
                type="text"
                className="hidden"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mt-10 mt-5">
                {/* Full Name */}
                <div className="md:col-span-1 col-span-2">
                  <label className="flex justify-between text-gray-700 font-medium mb-1">
                    <span>Full Name</span>
                    {!fullName || errors.fullName ? (
                      <span className="text-red-600 text-sm italic">
                        *Required
                      </span>
                    ) : (
                      <span className="text-green-600 text-[17px]">
                        <RiCheckboxCircleFill />
                      </span>
                    )}
                  </label>

                  <input
                    {...register("fullName", {
                      required: "Name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name must not contain numbers",
                      },
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 bg-white border text-slate-900 text-md tracking-wider rounded-md focus:outline-kcred"
                  />

                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                {/* Mobile Numbers */}
                <div className="md:col-span-1 col-span-2">
                  <label className="flex justify-between text-gray-700 font-medium mb-1">
                    <span>Mobile Number</span>
                    {!phone1 || errors.phone1 ? (
                      <span className="text-red-600 text-sm italic">
                        *Required
                      </span>
                    ) : (
                      <span className="text-green-600 text-[17px]">
                        <RiCheckboxCircleFill />
                      </span>
                    )}
                  </label>

                  <div>
                    <input
                      maxLength={9}
                      {...register("phone1", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[1-9][0-9]{8}$/,
                          message:
                            "Phone must be 9 digits and not start with 0",
                        },
                      })}
                      type="tel"
                      placeholder="544028723"
                      className="w-full px-4 py-2 bg-white border text-slate-900 text-md tracking-wider rounded-md focus:outline-kcred"
                    />

                    {errors.phone1 && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone1.message}
                      </p>
                    )}
                  </div>
                  {/* <PhoneInputField
                    name="phone1"
                    control={control}
                    errors={errors}
                    label="Phone Number"
                    setValue={setValue}
                  /> */}
                </div>
                {/* Landmark and Email */}
                <div className="md:col-span-1 col-span-2">
                  <label className="flex justify-between text-gray-700 font-medium mb-1">
                    <span>Email</span>
                    {!email || errors.email ? (
                      <span className="text-red-600 text-sm italic">
                        *Required
                      </span>
                    ) : (
                      <span className="text-green-600 text-[17px]">
                        <RiCheckboxCircleFill />
                      </span>
                    )}
                  </label>
                  <input
                    {...register("email", {
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 bg-white border text-slate-900 w-full text-md  tracking-wider rounded-md focus:outline-kcred"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-1 col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Nearest Landmark
                  </label>
                  <input
                    {...register("landmark")}
                    type="text"
                    placeholder="any famous place nearby"
                    className="px-4 py-2 bg-white border text-slate-900 w-full text-md  tracking-wider rounded-md focus:outline-kcred"
                  />
                </div>
                {/* Delivery Address */}
                <div className="col-span-2">
                  <label className="flex justify-between text-gray-700 font-medium mb-1">
                    <span>Delivery Address</span>
                    {!address || errors.address ? (
                      <span className="text-red-600 text-sm italic">
                        *Required
                      </span>
                    ) : (
                      <span className="text-green-600 text-[17px]">
                        <RiCheckboxCircleFill />
                      </span>
                    )}
                  </label>
                  <div className="md:flex gap-2">
                    <input
                      {...register("address", {
                        required: "Delivery Address is required",
                        minLength: {
                          value: 5,
                          message:
                            "Delivery Address must be at least 5 characters",
                        },
                      })}
                      type="text"
                      placeholder="Enter your complete address"
                      className="md:w-[70%] w-full p-2 border rounded bg-white focus:outline-kcred"
                      // className="w-full p-2 border rounded bg-white focus:outline-kcred"
                    />
                    <div
                      onClick={() => setIsModalVisible(true)}
                      className="text-sm leading-4 btn-red rounded flex items-center justify-center gap-10 md:w-[30%] md:mt-0 mt-2 text-[16px]"
                    >
                      {!selectedOption ? "Select Location" : "Change Location"}
                      <FaLocationDot className="text-xl" />
                    </div>
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      Complete address is required
                    </p>
                  )}
                  {/* {(errors.address || errors.area) && (
                    <p className="text-red-500 text-sm">
                      Complete address is required
                    </p>
                  )} */}
                </div>
                {/* Delivery Instructions */}
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Delivery Instructions
                  </label>
                  <textarea
                    {...register("instructions")}
                    rows="3"
                    placeholder="Delivery Instructions"
                    className="px-4 py-2 bg-white border text-slate-900 w-full text-md  tracking-wider rounded-md focus:outline-kcred"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-2 mt-4">
                <div className="w-full sm:w-1/2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Payment Method
                  </label>
                  <div className="flex space-x-4">
                    <div
                      onClick={() => setSelectedMethod("cod")}
                      className={`text-sm border rounded py-4 px-2 flex-1 text-center cursor-pointer ${
                        selectedMethod === "cod"
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      <Image
                        width={100}
                        height={100}
                        src="/images/Cash.png" // Replace with actual path if needed
                        alt="Cash on Delivery"
                        className="mx-auto mb-2 w-8"
                      />
                      Cash on Delivery
                    </div>
                    <div
                      onClick={() => setSelectedMethod("online")}
                      className={`text-sm border rounded py-4 px-2 flex-1 text-center cursor-pointer ${
                        selectedMethod === "online"
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      <Image
                        width={100}
                        height={100}
                        src="/images/Card.webp" // Replace with actual path if needed
                        alt="Online Payment"
                        className="mx-auto mb-2 w-15"
                      />
                      Online Payment
                    </div>
                  </div>
                </div>
                {/* <div className="w-full sm:w-1/2 mt-5 md:mt-0">
                  <label className="block text-gray-700 font-medium mb-1">
                    Coupon Code
                  </label>
                  <input
                    {...register("coupon_code")}
                    type="tel"
                    placeholder="Coupon Code..."
                    className="px-4 py-2 bg-white border text-slate-900 w-full text-md  tracking-wider rounded-md focus:outline-kcred"
                  />
                  {errors.coupon_code && (
                    <p className="text-red-500 text-sm">
                      Coupon Code is required
                    </p>
                  )}
                </div> */}
              </div>
            </form>
          </div>
          {/* Right Section */}
          <div className="w-full md:w-[40%] p-6 bg-gray-50">
            <h3 className="text-lg font-medium mb-4">Your Order</h3>

            <div className="space-y-2 text-sm text-gray-800">
              {cart.map((item, i) => (
                <div
                  className="flex justify-between border-b-1 border-red-600"
                  key={i}
                >
                  <span>
                    {getCartItemQuantity(item?.id)} x {item?.name}
                  </span>
                  <span className="tracking-wider">
                    AED {item?.order?.total_price}
                  </span>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="text-sm tracking-wider space-y-1">
              <div className="flex justify-between">
                <span>Total</span>
                <span>AED {grandTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>AED 7</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-font-medium text-base">
                <span>Grand Total</span>
                <span>AED {grandTotal + 7}</span>
              </div>
            </div>

            {/* ✅ Place Order Button here triggers the form */}
            <button
              className="w-full btn-red mt-5 mb-3"
              onClick={() => document.querySelector("form").requestSubmit()}
            >
              PLACE YOUR ORDER
            </button>
            <div className="flex justify-center items-center w-full mt-2 text-center">
              <Link
                href="/"
                className="w-full text-blue-600 text-md hover:underline mx-auto"
              >
                ← continue to add more items
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryOrder;
