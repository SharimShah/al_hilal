"use client";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { RiCheckboxCircleFill } from "react-icons/ri";
const DeliveryOrder = () => {
  const [loading, setLoading] = useState(false);
  const { cart, grandTotal, setCart, isAllowedTime } = useCart();
  const router = useRouter();
  useEffect(() => {
    if (cart.length === 0 && isAllowedTime === false) {
      router.push("/"); // Navigates to home page
    }
  }, [cart, isAllowedTime, router]);
  const getCartItemQuantity = (itemId) => {
    const match = cart.find((i) => i.id === itemId);
    return match ? match.quantity : 0;
  };
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const name = watch("name");
  const phone_number = watch("phone_number");
  const email = watch("email");
  const address = watch("address");
  const onSubmit = async (data) => {
    const custom_details = cart.map((product) => {
      const id = product.id;
      const quantity = product.quantity;
      const fake_id = product.fake_id;
      const variationsKey = `c_variations_${fake_id}`;
      const variationsRaw = localStorage.getItem(variationsKey);
      const variations = variationsRaw ? JSON.parse(variationsRaw) : null;
      return {
        id,
        quantity,
        variations: variations,
      };
    });
    const formData = new FormData();
    formData.append("name", data?.name || "");
    formData.append("email", data?.email || "");
    formData.append("phone_number", data?.phone_number || "");
    formData.append("address", `${data?.address} , ${data?.landmark}` || "");
    formData.append("from_name", "Al Hilal Order");
    formData.append("total_price", grandTotal);
    formData.append("custom_details", JSON.stringify(custom_details));
    try {
      setLoading(true);
      const response = await axios.post("/api/order", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Server Response:", response.data);
      setLoading(false);
      if (response?.data?.order === true) {
        reset();
        // Clear all localStorage
        localStorage.clear();
        setCart([]);
        toast.success("Your Order sent successfully!");
        router.push("/thank-you");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#ffffff94]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-bg_red mx-auto"></div>
            <h2 className="text-zinc-900 mt-4 animate-pulse">Please Wait...</h2>
          </div>
        </div>
      ) : null}
      <div className="min-h-screen flex items-center justify-center px-2">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-md flex flex-col md:flex-row">
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
                    {!name || errors.name ? (
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
                    {...register("name", {
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

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                {/* Mobile Numbers */}
                <div className="md:col-span-1 col-span-2">
                  <label className="flex justify-between text-gray-700 font-medium mb-1">
                    <span>Mobile Number</span>
                    {!phone_number || errors.phone_number ? (
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
                      {...register("phone_number", {
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

                    {errors.phone_number && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>
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
                    Nearest Landmark{" "}
                    <span className="text-red-600 text-[12px]">(Optional)</span>
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
                      className="w-full p-2 border rounded bg-white focus:outline-kcred"
                    />
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
                {/* Instructions */}
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Instructions{" "}
                    <span className="text-red-600 text-[12px]">(Optional)</span>
                  </label>
                  <textarea
                    {...register("instructions")}
                    rows="3"
                    placeholder="Instructions"
                    className="px-4 py-2 bg-white border text-slate-900 w-full text-md  tracking-wider rounded-md focus:outline-kcred"
                  />
                </div>
              </div>
            </form>
          </div>
          {/* Right Section */}
          <div className="w-full md:w-[40%] p-6 bg-gray-50">
            <h3 className="text-lg font-medium mb-4">Your Order</h3>

            <div className="space-y-2 text-sm text-gray-800">
              {cart.map((item, i) => (
                <>
                  <div className="flex justify-between" key={i}>
                    <span className="line-clamp-1">
                      {getCartItemQuantity(item?.id)} x {item?.name}
                    </span>
                    <span className="tracking-wider">
                      AED {item?.total_price}
                    </span>
                  </div>
                  <hr />
                </>
              ))}
            </div>

            <div className="my-4" />

            <div className="text-sm tracking-wider space-y-1">
              <div className="flex justify-between font-font-medium text-base">
                <span>Grand Total</span>
                <span>AED {grandTotal.toLocaleString()}</span>
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
